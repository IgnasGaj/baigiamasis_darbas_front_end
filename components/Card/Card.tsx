import styles from "./styles.module.css";
import Link from "next/link";

type QuestionCardProps = {
  id: string;
  question_title: string;
  question_text: string;
  createdAt: string;
  username: string;
};

const QuestionCard = ({
  id,
  question_title,
  question_text,
  createdAt,
  username,
}: QuestionCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleString("lt-LT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link href={`/question/${id}`} className={styles.container}>
      <div>
        <h2>{question_title}</h2>
        <p>{question_text}</p>
        <p className={styles.meta}>
          Asked by <strong>{username}</strong> on {formattedDate}
        </p>
      </div>
    </Link>
  );
};

export default QuestionCard;
