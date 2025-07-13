import Card from "../Card/Card";
import styles from "./styles.module.css";
import Link from "next/link";

type QuestionType = {
  id: string;
  question_title: string;
  question_text: string;
  createdAt: string;
  username: string;
};

type QuestionsWrapperProps = {
  questions: QuestionType[];
};

const QuestionsWrapper = ({ questions }: QuestionsWrapperProps) => {
  return (
    <div className={styles.container}>
      {questions.map((q) => (
        <Card
          key={q.id}
          id={q.id}
          question_title={q.question_title}
          question_text={q.question_text}
          createdAt={q.createdAt}
          username={q.username}
        />
      ))}
      <Link href="/questionInsert" className={styles.askButton}>
        Ask A Question!
      </Link>
    </div>
  );
};

export default QuestionsWrapper;
