import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { QuestionType } from "@/types/question";
import { AnswerType } from "@/types/answer";
import { fetchQuestionById } from "@/api/question";
import { fetchAnswersByQuestionId, insertAnswer } from "@/api/answer";
import styles from "./styles.module.css";

const QuestionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = Cookie.get("qa-app-user-jwt-token");
        if (!jwt || !id) return;

        const questionRes = await fetchQuestionById({ id: id as string, jwt });
        const answersRes = await fetchAnswersByQuestionId({
          questionId: id as string,
          jwt,
        });

        setQuestion(questionRes.data.question);
        setAnswers(answersRes.data.answers);
      } catch (err) {
        console.error("Error fetching question or answers:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleAnswerSubmit = async () => {
    try {
      const jwt = Cookie.get("qa-app-user-jwt-token");
      if (!jwt || !id) {
        alert("You must be logged in to submit an answer.");
        return;
      }

      if (answerText.trim().length < 6) {
        alert("Answer must be at least 6 characters long.");
        return;
      }

      console.log("Submitting answer for questionId:", id);

      const answer = {
        answer_text: answerText,
      };

      const response = await insertAnswer({
        jwt,
        questionId: id as string,
        answer,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Answer submitted successfully!");
        setAnswerText("");

        const answersRes = await fetchAnswersByQuestionId({
          questionId: id as string,
          jwt,
        });
        setAnswers(answersRes.data.answers);
      } else {
        alert("Failed to submit answer.");
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred while submitting answer.");
    }
  };

  return (
    <div>
      {!question ? (
        <p>Loading question...</p>
      ) : (
        <div style={{ padding: "1rem" }}>
          <h1>{question.question_title}</h1>
          <p>{question.question_text}</p>
          <p>
            <strong>Asked by:</strong> {question.username}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(question.createdAt).toLocaleString()}
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <h2>Answers</h2>
          {answers.length === 0 ? (
            <p>No answers yet.</p>
          ) : (
            <ul style={{ paddingLeft: "1rem" }}>
              {answers.map((answer) => (
                <li key={answer.id} style={{ marginBottom: "1rem" }}>
                  <p>{answer.answer_text}</p>
                  <small>
                    By User: {answer.username} |{" "}
                    {new Date(answer.createdAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.container} style={{ marginTop: "2rem" }}>
            <h2>Submit Your Answer</h2>

            <textarea
              value={answerText}
              placeholder="Write your answer here..."
              rows={6}
              onChange={(e) => setAnswerText(e.target.value)}
              className={styles.textarea}
            />

            <button onClick={handleAnswerSubmit} disabled={!answerText.trim()}>
              Submit Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetailPage;
