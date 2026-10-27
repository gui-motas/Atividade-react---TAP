import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { courses } from "../data.js";

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [completedLessons, setCompletedLessons] = useState(
    Object.fromEntries(courses.map((course) => [course.id, course.completed])),
  );
  const [activeCourseId, setActiveCourseId] = useState("react");
  const [notification, setNotification] = useState(null);
  const notificationId = useRef(0);
  const dismissNotification = useCallback(() => setNotification(null), []);

  function completeLesson(course) {
    const completed = completedLessons[course.id];
    if (completed >= course.lessons) return;
    setCompletedLessons((previous) => ({
      ...previous,
      [course.id]: completed + 1,
    }));
    notificationId.current += 1;
    setNotification({
      id: notificationId.current,
      type: "success",
      message:
        completed + 1 === course.lessons
          ? `Parabéns! Você concluiu ${course.title}.`
          : `Aula concluída! Mais um passo em ${course.title}.`,
    });
  }

  return (
    <LearningContext.Provider
      value={{
        completedLessons,
        activeCourseId,
        setActiveCourseId,
        completeLesson,
        notification,
        dismissNotification,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  return useContext(LearningContext);
}
