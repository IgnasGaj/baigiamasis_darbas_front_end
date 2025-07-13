import React from "react";
import { AnswerType } from "@/types/answer";
import styles from "./styles.module.css";

type AnswerProps = {
  answer: AnswerType;
};

const Answer = ({ answer }: AnswerProps) => {
  return (
    <div className={styles.container}>
      <li className={styles.answerItem}>
        <p>{answer.answer_text}</p>
        <small>
          By User: {answer.username} |{" "}
          {new Date(answer.createdAt).toLocaleString()}
        </small>

        <div className={styles.actions}>
          <button className={styles.likeBtn}>Like</button>
          <button className={styles.dislikeBtn}>Dislike</button>
        </div>
      </li>
    </div>
  );
};

export default Answer;
