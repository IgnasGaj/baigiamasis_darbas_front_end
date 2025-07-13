import { QuestionType } from "@/types/question";
import Cookie from "js-cookie";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { config } from "@/config";

type QuestionViewProps = {
  question: QuestionType;
};

const QuestionView = ({ question }: QuestionViewProps) => {
  const router = useRouter();

  const onDeleteQuestion = async () => {
    try {
      const jwt = Cookie.get("qa-app-user-jwt-token");

      const response = await axios.delete(
        `${config.BASE_URL}/questions/${question.id}`,
        {
          headers: {
            Authorization: jwt!,
          },
        }
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.description}>
          <h1>{question.question_title}</h1>
          <h3>Asked by: {question.username}</h3>
          <p>{question.question_text}</p>
          <h4>Created at: {new Date(question.createdAt).toLocaleString()}</h4>

          <Button
            title="Delete Question"
            type="DANGER"
            onClick={onDeleteQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
