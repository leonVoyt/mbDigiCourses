import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Course = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  price: number;
  isPaymentFailed: boolean;
};

export type CoursesState = {
  items: Course[];
  purchasedIds: string[];
  loading: boolean;
  error: string | null;
};

const initialState: CoursesState = {
  items: [],
  purchasedIds: [],
  loading: false,
  error: null,
};

const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Basics",
    description: "Learn the fundamentals of React.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    price: 19.99,
    isPaymentFailed: false,
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    description: "Types, generics, and advanced patterns.",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    price: 29.99,
    isPaymentFailed: false,
  },
];

export const fetchCourses = createAsyncThunk("courses/fetch", async () => {
  await new Promise((r) => setTimeout(r, 700));
  return mockCourses;
});

export const togglePaymentError = createAsyncThunk(
  "courses/reload",
  async (courses: Course[]) => {
    await new Promise((r) => setTimeout(r, 700));

    return courses.map((course) => ({
      ...course,
      isPaymentFailed: false,
    }));
  }
);

export const handlePurchase = createAsyncThunk(
  "courses/purchase",
  async (courseId: string) => {
    await new Promise((r) => setTimeout(r, 500));
    if (Math.random() > 0.1) {
      // alert(`Payment with id ${courseId} failed`);
      throw new Error(`Payment failed`);
    }
    return courseId;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    loadPurchasedFromStorage(state) {
      const saved = localStorage.getItem("purchased_course_ids");
      state.purchasedIds = saved ? (JSON.parse(saved) as string[]) : [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load courses";
      })
      .addCase(
        handlePurchase.fulfilled,
        (state, action: PayloadAction<string>) => {
          if (!state.purchasedIds.includes(action.payload)) {
            state.purchasedIds.push(action.payload);
            localStorage.setItem(
              "purchased_course_ids",
              JSON.stringify(state.purchasedIds)
            );
          }
        }
      )
      .addCase(handlePurchase.rejected, (state, action) => {
        state.error = action.error.message || "Payment failed";
        state.items = state.items.map((item) => {
          if (item.id === action.meta.arg) {
            return { ...item, isPaymentFailed: true };
          }
          return item;
        });
      })
      .addCase(togglePaymentError.fulfilled, (state, action) => {
        state.error = null;
        console.log(action.payload);

        state.items = action.payload;
      });
  },
});

export const { loadPurchasedFromStorage } = coursesSlice.actions;
export default coursesSlice.reducer;
