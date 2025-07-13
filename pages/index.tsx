import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { QuestionType } from "@/types/question";
import QuestionsWrapper from "@/components/QuestionsWrapper/QuestionsWrapper";
import { fetchAllQuestions } from "@/api/question";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import axios from "axios";

export default function QuestionsPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const getAllQuestions = async () => {
    const jwt = Cookie.get("qa-app-user-jwt-token");

    if (!jwt) {
      router.push("/login");
      return;
    }

    try {
      const result = await fetchAllQuestions({ jwt });
      setQuestions(result.data.questions);
    } catch (err) {
      console.log(err);

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <PageTemplate>
      <QuestionsWrapper questions={questions} />
    </PageTemplate>
  );
}
