import type { RootState } from "./store";
import type { CoursesState } from "./slices/coursesSlice";
import type { VideoState } from "./slices/videoSlice";

export const selectCourses = (state: RootState): CoursesState =>
  state.courses as CoursesState;
export const selectVideo = (state: RootState): VideoState =>
  state.video as VideoState;
