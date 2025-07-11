import { config } from "@/config";
import axios from "axios";

type FetchAnswersProps = {
  jwt: string;
  questionId: string;
};

export const fetchAnswersByQuestionId = async ({
  jwt,
  questionId,
}: FetchAnswersProps) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/answers/question/${questionId}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
};

type InsertAnswerProps = {
  jwt: string;
  answer: {
    question_id: string;
    answer_text: string;
  };
};

export const insertAnswer = async ({ jwt, answer }: InsertAnswerProps) => {
  try {
    const response = await axios.post(`${config.BASE_URL}/answers`, answer, {
      headers: {
        Authorization: jwt,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};
