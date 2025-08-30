import { useMemo, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";
import type { Course, CoursesState } from "../store/slices/coursesSlice";
import { selectVideo } from "../store/selectors";
import { closeVideo, updatePlaybackPosition } from "../store/slices/videoSlice";

export const VideoPlayer = () => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isOpen, currentCourseId, playbackPosition } =
    useAppSelector(selectVideo);

  const course = useAppSelector((s: RootState) =>
    (s.courses as CoursesState).items.find(
      (c: Course) => c.id === currentCourseId
    )
  );

  const videoUrl = useMemo(() => course?.videoUrl, [course]);

  useEffect(() => {
    if (videoRef.current && isOpen && playbackPosition > 0) {
      const video = videoRef.current;

      const handleLoadedMetadata = () => {
        if (playbackPosition > 0) {
          video.currentTime = playbackPosition;
        }
      };

      const fallbackTimer = setTimeout(() => {
        if (playbackPosition > 0 && video.readyState >= 1) {
          video.currentTime = playbackPosition;
        }
      }, 1000);

      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        clearTimeout(fallbackTimer);
      };
    }
  }, [isOpen, playbackPosition]);

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const video = videoRef.current;
    const interval = setInterval(() => {
      if (!video.paused && video.currentTime > 0) {
        dispatch(updatePlaybackPosition(video.currentTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, dispatch]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime > 0) {
      dispatch(updatePlaybackPosition(videoRef.current.currentTime));
    }
  };

  const handleVideoClick = () => {
    if (
      videoRef.current &&
      playbackPosition > 0 &&
      videoRef.current.currentTime === 0
    ) {
      videoRef.current.currentTime = playbackPosition;
    }
  };

  if (!isOpen || !course) return null;

  return (
    <div className="video-modal" onClick={() => dispatch(closeVideo())}>
      <div
        className="video-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="video-modal__header">
          <span className="video-modal__title">{course.title}</span>
          <button
            onClick={() => dispatch(closeVideo())}
            className="video-modal__close"
          >
            Close
          </button>
        </div>
        <video
          ref={videoRef}
          controls
          className="video-modal__video"
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onClick={handleVideoClick}
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
