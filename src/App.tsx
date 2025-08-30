import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./store/hooks";
import AuthForm from "./components/AuthForm";
import CourseList from "./components/CourseList";
import VideoPlayer from "./components/VideoPlayer";
import { loadPurchasedFromStorage } from "./store/slices/coursesSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPurchasedFromStorage());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Courses</h1>
        <AuthForm />
      </header>
      <CourseList />
      <VideoPlayer />
    </div>
  );
}

export default App;
