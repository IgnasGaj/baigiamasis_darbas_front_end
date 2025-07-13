import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { QuestionType } from "@/types/question";
import { AnswerType } from "@/types/answer";
import { fetchQuestionById } from "@/api/question";
import { fetchAnswersByQuestionId } from "@/api/answer";
import QuestionView from "@/components/QuestionView/QuestionView";
import Answer from "@/components/Answers/Answers";
import AnswerInsertForm from "@/components/AnswerInsertForm/AnswerInsertForm";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

const QuestionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

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

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAnswerAdded = () => {
    fetchData();
  };

  return (
    <PageTemplate>
      <div style={{ padding: "1rem" }}>
        {!question ? (
          <p>Loading question...</p>
        ) : (
          <>
            <QuestionView question={question} />

            <hr style={{ margin: "1.5rem 0" }} />

            {answers.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#555",
                  padding: "2rem 0",
                  margin: 0,
                }}
              >
                No answers yet.
              </p>
            ) : (
              <>
                <h2
                  style={{
                    textAlign: "center",
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                    margin: 0,
                  }}
                >
                  Answers
                </h2>
                <ul style={{ paddingLeft: "1rem" }}>
                  {answers.map((answer) => (
                    <Answer key={answer.id} answer={answer} />
                  ))}
                </ul>
              </>
            )}

            <AnswerInsertForm
              questionId={id as string}
              onAnswerAdded={handleAnswerAdded}
            />
          </>
        )}
      </div>
    </PageTemplate>
  );
};

export default QuestionDetailPage;
