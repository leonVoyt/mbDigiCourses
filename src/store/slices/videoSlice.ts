import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type VideoState = {
  currentCourseId: string | null;
  isOpen: boolean;
  playbackPosition: number;
};

const initialState: VideoState = {
  currentCourseId: null,
  isOpen: false,
  playbackPosition: 0,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    openVideo(state, action: PayloadAction<string>) {
      state.currentCourseId = action.payload;
      state.isOpen = true;
      const savedPosition = localStorage.getItem(
        `video_position_${action.payload}`
      );
      if (savedPosition) {
        const position = parseFloat(savedPosition);
        if (position > 0) {
          state.playbackPosition = position;
        }
      }
    },
    closeVideo(state) {
      if (state.currentCourseId && state.playbackPosition > 0) {
        localStorage.setItem(
          `video_position_${state.currentCourseId}`,
          state.playbackPosition.toString()
        );
      }
      state.isOpen = false;
      state.currentCourseId = null;
    },
    updatePlaybackPosition(state, action: PayloadAction<number>) {
      if (action.payload >= 0) {
        state.playbackPosition = action.payload;
      }
    },
  },
});

export const { openVideo, closeVideo, updatePlaybackPosition } =
  videoSlice.actions;
export default videoSlice.reducer;
