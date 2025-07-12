import React, { useState } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { insertAnswer } from "@/api/answer";

type AnswerInsertFormProps = {
  questionId: string;
  onAnswerAdded: () => void;
};

const AnswerInsertForm = ({
  questionId,
  onAnswerAdded,
}: AnswerInsertFormProps) => {
  const [answerText, setAnswerText] = useState("");

  const handleSubmit = async () => {
    try {
      const jwt = Cookies.get("qa-app-user-jwt-token");
      if (!jwt) {
        toast.error("You must be logged in to submit an answer.");
        return;
      }

      const answer = {
        answer_text: answerText,
      };

      const response = await insertAnswer({ jwt, questionId, answer });

      if (response.status === 200 || response.status === 201) {
        toast.success("Answer submitted successfully!");
        setAnswerText("");
        onAnswerAdded();
      } else {
        toast.error("Failed to submit answer");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div className={styles.container}>
      <h3>Your Answer</h3>

      <textarea
        value={answerText}
        placeholder="Write your answer here..."
        rows={5}
        onChange={(e) => setAnswerText(e.target.value)}
        className={styles.textarea}
      />

      <button onClick={handleSubmit}>Submit Answer</button>

      <ToastContainer />
    </div>
  );
};

export default AnswerInsertForm;
