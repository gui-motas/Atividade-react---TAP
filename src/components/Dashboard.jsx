import { useState } from "react";
import { courses, questions } from "../data.js";
import { useLearning } from "../context/LearningContext.jsx";
import Accordion from "./Accordion.jsx";
import CourseCard from "./CourseCard.jsx";
import Dropdown from "./Dropdown.jsx";
import Icon from "./Icon.jsx";
import Pagination from "./Pagination.jsx";
import ProgressBar from "./ProgressBar.jsx";
import Tabs from "./Tabs.jsx";
import Toast from "./Toast.jsx";

const categoryOptions = [
  { value: "all", label: "Todas as categorias" },
  { value: "Desenvolvimento", label: "Desenvolvimento" },
  { value: "Design", label: "Design" },
  { value: "Ferramentas", label: "Ferramentas" },
];
const pageSize = 3;

export default function Dashboard() {
  const { completedLessons, activeCourseId, completeLesson } = useLearning();
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const activeCourse = courses.find((course) => course.id === activeCourseId);
  const completed = completedLessons[activeCourse.id];
  const finishedCount = courses.filter(
    (course) => completedLessons[course.id] === course.lessons,
  ).length;
  const totalCompleted = Object.values(completedLessons).reduce(
    (total, count) => total + count,
    0,
  );
  const totalLessons = courses.reduce(
    (total, course) => total + course.lessons,
    0,
  );

  function renderCourses(status) {
    const filtered = courses.filter(
      (course) =>
        (category === "all" || course.category === category) &&
        (status === "completed"
          ? completedLessons[course.id] === course.lessons
          : completedLessons[course.id] < course.lessons),
    );
    const totalPages = Math.ceil(filtered.length / pageSize);
    const page = Math.max(1, Math.min(currentPage, totalPages));
    return (
      <>
        {filtered.length > 0 ? (
          <div className="course-grid">
            {filtered
              .slice((page - 1) * pageSize, page * pageSize)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="book" size={30} />
            <h3>
              {status === "completed"
                ? "Nenhum curso concluído por aqui."
                : "Nenhum curso nesta categoria."}
            </h3>
            <p>
              {status === "completed"
                ? "Uma aula de cada vez. Seus próximos capítulos estão esperando."
                : "Escolha outra categoria para continuar explorando."}
            </p>
          </div>
        )}
        <div className="catalog-footer">
          <span>
            {filtered.length
              ? `Mostrando ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} de ${filtered.length} cursos`
              : "0 cursos"}{" "}
          </span>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setCurrentPage}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <aside className="sidebar" aria-label="Navegação principal">
        <a href="#conteudo" className="brand" aria-label="Ritmo, início">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          ritmo<span className="brand-dot">.</span>
        </a>
        <span className="sidebar-label">SEU ESPAÇO</span>
        <nav className="main-nav">
          <a className="nav-active" href="#conteudo">
            <Icon name="grid" />
            Visão geral
          </a>
          <a href="#cursos">
            <Icon name="book" />
            Meus cursos<span className="nav-count">{courses.length}</span>
          </a>
          <a href="#continuar">
            <Icon name="target" />
            Minha jornada
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <Icon name="spark" size={23} />
            <p>
              Pequenos passos.
              <br />
              <strong>Grandes descobertas.</strong>
            </p>
            <span>Seu futuro agradece o que você aprende hoje.</span>
          </div>
          <a className="help-link" href="#perguntas">
            <Icon name="help" />
            Precisa de uma mão?
          </a>
          <div className="profile">
            <span className="avatar">VE</span>
            <div>
              <strong>Você, estudante</strong>
              <span>Uma mente curiosa</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <span>
            Meu aprendizado <span className="breadcrumb-separator">/</span>
            <strong>Visão geral</strong>
          </span>
          <a href="#perguntas" aria-label="Ir para perguntas frequentes">
            <Icon name="help" size={20} />
            <span>Ajuda</span>
          </a>
        </header>
        <main id="conteudo" className="main-content">
          <div className="welcome">
            <div>
              <p className="greeting">BOM TE VER POR AQUI</p>
              <h1>Seu próximo passo começa aqui.</h1>
              <p>Um pouco de curiosidade, um novo mundo de possibilidades.</p>
            </div>
            <span className="welcome-label">
              <Icon name="spark" size={16} />
              No seu tempo. No seu ritmo.
            </span>
          </div>

          <div className="overview-grid">
            <section
              className="featured"
              id="continuar"
              tabIndex={-1}
              aria-labelledby="featured-title"
            >
              <div className="featured-copy">
                <span className="feature-eyebrow">
                  <span className="live-dot" />
                  CONTINUE DE ONDE PAROU
                </span>
                <h2 id="featured-title">{activeCourse.title}</h2>
                <p>
                  {completed === activeCourse.lessons
                    ? "Você chegou lá. Que tal descobrir um novo curso?"
                    : `Aula ${completed + 1} de ${activeCourse.lessons} · ${activeCourse.id === "react" ? "Construindo com componentes" : activeCourse.description}`}
                </p>
                <ProgressBar
                  value={(completed / activeCourse.lessons) * 100}
                  label={`Progresso em ${activeCourse.title}`}
                />
                <button
                  className="primary-button"
                  disabled={completed === activeCourse.lessons}
                  onClick={() => completeLesson(activeCourse)}
                >
                  {completed === activeCourse.lessons
                    ? "Curso concluído"
                    : "Concluir próxima aula"}
                  <Icon
                    name={
                      completed === activeCourse.lessons ? "check" : "arrow"
                    }
                    size={18}
                  />
                </button>
              </div>
              <div className="feature-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit orbit-three" />
                <span className="orbit-center">{activeCourse.symbol}</span>
                <span className="floating-code code-top">
                  &lt;Aprender /&gt;
                </span>
                <span className="floating-code code-bottom">
                  const futuro = você;
                </span>
              </div>
            </section>
            <section
              className="journey-summary"
              aria-labelledby="summary-title"
            >
              <div className="summary-heading">
                <span className="summary-icon">
                  <Icon name="target" size={20} />
                </span>
                <h2 id="summary-title">Sua jornada</h2>
              </div>
              <div className="summary-numbers">
                <div>
                  <strong>{String(totalCompleted).padStart(2, "0")}</strong>
                  <span>aulas concluídas</span>
                </div>
                <div>
                  <strong>{String(finishedCount).padStart(2, "0")}</strong>
                  <span>cursos concluídos</span>
                </div>
              </div>
              <ProgressBar
                value={(totalCompleted / totalLessons) * 100}
                label="Progresso geral"
              />
              <p>
                <Icon name="spark" size={15} />
                Cada aula faz a diferença. Continue!
              </p>
            </section>
          </div>

          <section
            className="catalog"
            id="cursos"
            aria-labelledby="courses-title"
          >
            <div className="section-heading">
              <div>
                <h2 id="courses-title">
                  Meus cursos
                  <span className="heading-count">{courses.length}</span>
                </h2>
                <p>Conhecimento que acompanha a sua próxima versão.</p>
              </div>
              <Dropdown
                options={categoryOptions}
                value={category}
                label="Filtrar por categoria"
                onChange={(value) => {
                  setCategory(value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Tabs
              items={[
                {
                  id: "ongoing",
                  label: "Em andamento",
                  count: courses.length - finishedCount,
                },
                { id: "completed", label: "Concluídos", count: finishedCount },
              ]}
              onTabChange={() => setCurrentPage(1)}
            >
              {renderCourses}
            </Tabs>
          </section>

          <section
            className="faq-section"
            id="perguntas"
            aria-labelledby="faq-title"
          >
            <div className="faq-intro">
              <span className="faq-icon">
                <Icon name="help" size={22} />
              </span>
              <h2 id="faq-title">Ficou com alguma dúvida?</h2>
              <p>
                Algumas respostas para deixar
                <br className="desktop-break" /> seu caminho mais simples.
              </p>
              <span className="faq-note">APRENDER TAMBÉM É PERGUNTAR.</span>
            </div>
            <Accordion items={questions} />
          </section>
          <footer className="page-footer">
            <span>
              ritmo. <span>Aprender é seguir em movimento.</span>
            </span>
            <span>Feito com React e curiosidade.</span>
          </footer>
        </main>
      </div>
      <Toast />
    </>
  );
}
