import React, { useState } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { insertQuestion } from "@/api/question";

const QuestionInsertForm = () => {
  const router = useRouter();

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");

  const handleSubmit = async () => {
    try {
      const jwt = Cookies.get("qa-app-user-jwt-token");

      const question = {
        question_title: questionTitle,
        question_text: questionText,
      };

      const response = await insertQuestion({ jwt: jwt!, question });

      if (response.status === 200 || response.status === 201) {
        toast.success("Question created successfully!");
        setTimeout(() => router.push("/"), 1500);
      } else {
        toast.error("Failed to create question");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Ask a Question</h2>

      <input
        value={questionTitle}
        placeholder="Question Title"
        onChange={(e) => setQuestionTitle(e.target.value)}
      />

      <textarea
        value={questionText}
        placeholder="Describe your question"
        rows={6}
        onChange={(e) => setQuestionText(e.target.value)}
        className={styles.textarea}
      />

      <button onClick={handleSubmit}>Submit</button>

      <ToastContainer />
    </div>
  );
};

export default QuestionInsertForm;
