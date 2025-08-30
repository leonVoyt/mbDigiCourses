import { useEffect } from "react";
import type { RootState } from "../store/store";
import type { Course, CoursesState } from "../store/slices/coursesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCourses,
  handlePurchase,
  togglePaymentError,
} from "../store/slices/coursesSlice";
import { openVideo } from "../store/slices/videoSlice";

export const CourseList = () => {
  const dispatch = useAppDispatch();
  const { items, purchasedIds, loading, error } = useAppSelector(
    (s: RootState) => s.courses as CoursesState
  );
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(togglePaymentError([...items]));
    }
  }, [dispatch, error, items]);

  if (loading)
    return <div className="course-list__loading">Loading courses...</div>;

  return (
    <div className="course-list">
      {items.map((course: Course) => {
        const isPurchased = purchasedIds.includes(course.id);
        return (
          <div key={course.id} className="course-card">
            <h3 className="course-card__title">{course.title}</h3>
            <p className="course-card__description">{course.description}</p>
            <div className="course-card__footer">
              <span className="course-card__price">
                ${course.price.toFixed(2)}
              </span>
              {course.isPaymentFailed && (
                <span className="course-card__price payment-failed">
                  {error}
                </span>
              )}
              <div className="course-card__actions">
                <button
                  onClick={() => dispatch(openVideo(course.id))}
                  className="btn btn--preview"
                >
                  Preview
                </button>
                <button
                  onClick={() => dispatch(handlePurchase(course.id))}
                  disabled={isPurchased || course.isPaymentFailed}
                  className="btn btn--buy"
                >
                  {isPurchased ? "Purchased" : "Buy"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;
