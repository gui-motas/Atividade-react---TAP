import { useLearning } from "../context/LearningContext.jsx";
import Icon from "./Icon.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function CourseCard({ course }) {
  const { completedLessons, setActiveCourseId } = useLearning();
  const completed = completedLessons[course.id];
  return (
    <article className="course-card">
      <div className={`course-art art-${course.artwork}`} aria-hidden="true">
        <span className="art-shape shape-one" />
        <span className="art-shape shape-two" />
        <span className="art-symbol">{course.symbol}</span>
        <span className="art-caption">
          {course.category === "Desenvolvimento"
            ? "construa o próximo."
            : course.category === "Design"
              ? "ideias ganham forma."
              : "simplifique o caminho."}
        </span>
      </div>
      <div className="course-content">
        <div className="course-meta">
          <span>{course.category}</span>
          <span>{course.level}</span>
        </div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-details">
          <span>
            <Icon name="book" size={14} />
            {course.lessons} aulas
          </span>
          <span>
            <Icon name="clock" size={14} />
            {course.duration}
          </span>
        </div>
        <div className="course-progress-label">
          <span>
            {completed} de {course.lessons} aulas
          </span>
          <strong>{Math.round((completed / course.lessons) * 100)}%</strong>
        </div>
        <ProgressBar
          value={(completed / course.lessons) * 100}
          label={`Progresso do curso ${course.title}`}
          showValue={false}
        />
        <button
          className="course-continue"
          aria-label={`${completed === course.lessons ? "Revisar curso" : "Continuar curso"}: ${course.title}`}
          onClick={() => {
            setActiveCourseId(course.id);
            document.getElementById("continuar").focus();
            document
              .getElementById("continuar")
              .scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          {completed === course.lessons ? "Revisar curso" : "Continuar curso"}
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </article>
  );
}
