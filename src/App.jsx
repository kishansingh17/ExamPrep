import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [finished, setFinished] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("id");

      if (error) {
        setLoadError(error.message);
      } else {
        setQuestions(data);
      }

      setLoadingQuestions(false);
    }

    loadQuestions();
  }, []);

  useEffect(() => {
    if (!started || finished) return;

    if (secondsLeft <= 0) {
      setFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((seconds) => seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished, secondsLeft]);

  const question = questions[current];

  const score = questions.reduce((total, item, index) => {
    return total + (answers[index] === item.answer ? 1 : 0);
  }, 0);

  const time = `${Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0")}:${(secondsLeft % 60).toString().padStart(2, "0")}`;

  function startQuiz() {
    setCurrent(0);
    setAnswers({});
    setSecondsLeft(120);
    setFinished(false);
    setStarted(true);
  }

  function selectAnswer(optionIndex) {
    if (answers[current] !== undefined) return;

    setAnswers((previous) => ({
      ...previous,
      [current]: optionIndex,
    }));
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((previous) => previous + 1);
    } else {
      setFinished(true);
    }
  }

  function previousQuestion() {
    setCurrent((previous) => Math.max(0, previous - 1));
  }

  return (
    <div className="app">
      <header className="navbar">
        <a
          className="brand"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setStarted(false);
            setFinished(false);
          }}
        >
          <span className="brand-icon">E</span>
          ExamPrep
        </a>
        <span className="nav-label">UNIVERSITY EXAM PRACTICE</span>
      </header>

      <main className="main">
        {!started ? (
          <section className="hero">
            <div className="eyebrow">YOUR PERSONAL STUDY SPACE</div>
            <h1>
              Prepare smarter.
              <br />
              <span>Score higher.</span>
            </h1>
            <p className="hero-text">
              Practice university questions, test your knowledge, and discover
              what you need to revise.
            </p>

            <div className="feature-grid">
              <div className="feature-card">
                <span>01</span>
                <h3>Practice MCQs</h3>
                <p>Answer questions and check your understanding.</p>
              </div>
              <div className="feature-card">
                <span>02</span>
                <h3>Beat the clock</h3>
                <p>Build confidence with timed practice tests.</p>
              </div>
              <div className="feature-card">
                <span>03</span>
                <h3>Learn from mistakes</h3>
                <p>Read explanations and review your results.</p>
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={startQuiz}
              disabled={loadingQuestions || questions.length === 0}
            >
              {loadingQuestions ? "Loading questions..." : "Start practicing"}
              <span>→</span>
            </button>

            {loadError && (
              <p role="alert">Could not load questions: {loadError}</p>
            )}

            <p className="small-note">
              Demo quiz · {questions.length} questions · 2 minutes
            </p>
          </section>
        ) : finished ? (
          <section className="result-card">
            <div className="eyebrow">QUIZ COMPLETED</div>
            <div className="score-circle">
              <strong>
                {score}/{questions.length}
              </strong>
              <span>correct</span>
            </div>
            <h1>
              {score === questions.length ? "Perfect score!" : "Good effort!"}
            </h1>
            <p className="hero-text">
              You answered {score} of {questions.length} questions correctly.
              Review the explanations to improve your next attempt.
            </p>
            <div className="result-stats">
              <div>
                <strong>{Math.round((score / questions.length) * 100)}%</strong>
                <span>Accuracy</span>
              </div>
              <div>
                <strong>{questions.length - score}</strong>
                <span>To revise</span>
              </div>
            </div>

            <div className="review-list">
              {questions.map((item, index) => (
                <div className="review-item" key={index}>
                  <strong>
                    {index + 1}. {item.question}
                  </strong>
                  <p>
                    Your answer:{" "}
                    {answers[index] === undefined
                      ? "Not answered"
                      : item.options[answers[index]]}
                  </p>
                  <p className="correct-answer">
                    Correct answer: {item.options[item.answer]}
                  </p>
                  <p>{item.explanation}</p>
                </div>
              ))}
            </div>

            <button className="primary-btn" onClick={startQuiz}>
              Try again <span>↻</span>
            </button>
          </section>
        ) : (
          <section className="quiz-card">
            <div className="quiz-top">
              <div>
                <div className="eyebrow">PRACTICE SESSION</div>
                <h2>Knowledge check</h2>
              </div>
              <div className="timer">
                <span>TIME LEFT</span>
                <strong>{time}</strong>
              </div>
            </div>

            <div className="progress-info">
              <span>
                Question {current + 1} of {questions.length}
              </span>
              <span>
                {Math.round(((current + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <div className="topic-label">{question.subject}</div>
            <h2 className="question-title">{question.question}</h2>

            <div className="options">
              {question.options.map((option, index) => {
                const selected = answers[current] === index;
                const answered = answers[current] !== undefined;
                const correct = question.answer === index;

                let className = "option";
                if (answered && correct) className += " correct";
                else if (selected && !correct) className += " incorrect";

                return (
                  <button
                    className={className}
                    key={option}
                    onClick={() => selectAnswer(index)}
                    disabled={answered}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {answered && correct && (
                      <span className="option-status">✓</span>
                    )}
                    {selected && !correct && (
                      <span className="option-status">×</span>
                    )}
                  </button>
                );
              })}
            </div>

            {answers[current] !== undefined && (
              <div className="explanation">
                <strong>
                  {answers[current] === question.answer
                    ? "Correct answer!"
                    : "Not quite — learn from this."}
                </strong>
                <p>{question.explanation}</p>
              </div>
            )}

            <div className="quiz-footer">
              <button
                className="secondary-btn"
                onClick={previousQuestion}
                disabled={current === 0}
              >
                ← Previous
              </button>
              <button className="primary-btn" onClick={nextQuestion}>
                {current === questions.length - 1
                  ? "See results"
                  : "Next question →"}
              </button>
            </div>
          </section>
        )}
      </main>

      <footer>Built for learners who want to do better.</footer>
    </div>
  );
}

export default App;
