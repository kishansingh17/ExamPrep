
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function DatabaseTest() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("id, subject, question")
        .order("id");

      if (error) {
        setError(error.message);
      } else {
        setQuestions(data);
      }

      setLoading(false);
    }

    loadQuestions();
  }, []);

  if (loading) return <p>Connecting to Supabase...</p>;
  if (error) return <p>Database error: {error}</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1>ExamPrep Database Test</h1>
      <p>Questions loaded: {questions.length}</p>

      {questions.map((item) => (
        <article key={item.id}>
          <h3>{item.subject}</h3>
          <p>{item.question}</p>
        </article>
      ))}
    </main>
  );
}
