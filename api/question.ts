import { config } from "@/config";
import axios from "axios";

type FetchQuestionsProps = {
  jwt: string;
};

export const fetchAllQuestions = async ({ jwt }: FetchQuestionsProps) => {
  try {
    const response = await axios.get(`${config.BASE_URL}/questions`, {
      headers: {
        Authorization: jwt,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

type InsertQuestionProps = {
  jwt: string;
  question: {
    question_title: string;
    question_text: string;
  };
};

export const insertQuestion = async ({
  jwt,
  question,
}: InsertQuestionProps) => {
  try {
    const response = await axios.post(
      `${config.BASE_URL}/questions`,
      question,
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

type FetchQuestionByIdProps = {
  jwt: string;
  id: string;
};

export const fetchQuestionById = async ({
  id,
  jwt,
}: FetchQuestionByIdProps) => {
  try {
    const response = await axios.get(`${config.BASE_URL}/questions/${id}`, {
      headers: {
        Authorization: jwt,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};
