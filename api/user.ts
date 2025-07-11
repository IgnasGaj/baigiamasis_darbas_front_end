import { config } from "@/config";
import axios from "axios";

type LoginProps = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginProps) => {
  try {
    const response = await axios.post(`${config.BASE_URL}/users/login`, {
      email,
      password,
    });

    return response;
  } catch (err) {
    throw err;
  }
};

type RegisterProps = {
  username: string;
  email: string;
  password: string;
};

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterProps) => {
  try {
    const response = await axios.post(`${config.BASE_URL}/users/register`, {
      username,
      email,
      password,
    });

    return response;
  } catch (err) {
    throw err;
  }
};
