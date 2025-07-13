import { config } from "@/config";
import axios, { AxiosResponse } from "axios";

type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = {
  username: string;
  email: string;
  password: string;
};

type LoginResponse = AxiosResponse<{
  message: string;
  jwt: string;
  username: string;
}>;

type RegisterResponse = AxiosResponse<{
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}>;

export const loginUser = async ({
  email,
  password,
}: LoginProps): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${config.BASE_URL}/users/login`, {
      email,
      password,
    });

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw new Error("Unexpected login error");
  }
};

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterProps): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${config.BASE_URL}/users/register`, {
      username,
      email,
      password,
    });

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw new Error("Unexpected registration error");
  }
};
