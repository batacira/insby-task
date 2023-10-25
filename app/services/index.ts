"use server";
import { axiosInstance } from "../api/index";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export type RegisterUserParams = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUserParams = Omit<RegisterUserParams, "confirmPassword">;

type Prices = {
  price: number;
  member_price: number;
};

type SingleProduct = {
  title: string;
  body: string;
  image_url: string;
  product_id: number;
  prices: Prices[];
};

type ProductsData = {
  data: {
    data: SingleProduct[];
  };
};

export const initiateApp = async () => {
  const username =
    "hQtwpolwKTjUkNAkZGeSiOkhp2OP8UA6TAPyA7bOWLFXTPPJOMzQUOOhLg43uXoFIuA5T4yKySJnHZhhVNWBqfNLcaKBfrAx";
  const password =
    "lolci3wdjsHDhFsQOnubYma5Zl33BPwE4NA5wftU9qxJnmIkP3ju8qw0F6ECjF4kvmp3SwNuLZrEMQezkFHqOMYjCBVJJzxv";

  const cookiesList = cookies();
  const newUuid = uuidv4();
  const body = {
    uuid: newUuid,
    uuidOS: "Windows",
  };
  const base64Token = btoa(`${username}:${password}`);

  const response = await axiosInstance.post("/v2/init/app", body, {
    headers: {
      Authorization: `Basic ${base64Token}`,
      "Content-Type": "application/json",
    },
  });

  if (response?.data?.data?.token) {
    cookiesList.set("InitToken", response?.data?.data?.token);
  }
};

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: RegisterUserParams) => {
  const cookiesList = cookies();
  const token = cookiesList.get("InitToken")?.value;
  const response = await axiosInstance.post(
    "/session/customer-sign-in",
    { login: email, password, confirmPassword, autoRegister: true },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response?.data?.data?.token) {
    cookiesList.set("LoginToken", response?.data?.data?.token);
    cookiesList.set("user", response?.data?.data?.customer?.email);
  }
};

export const loginUser = async ({ email, password }: LoginUserParams) => {
  const cookiesList = cookies();
  const token = cookiesList.get("InitToken")?.value;
  const response = await axiosInstance.post(
    "/session/customer-sign-in",
    { login: email, password, autoRegister: true },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response?.data?.data?.token) {
    cookiesList.set("LoginToken", response?.data?.data?.token);
    cookiesList.set("user", response?.data?.data?.customer?.email);
  }
};

export const fetchProducts = async () => {
  const cookiesList = cookies();
  const token = cookiesList.get("LoginToken")?.value;
  const response = await axiosInstance.get<null, ProductsData>(
    "/v2/session/product",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const handleLogout = async () => {
  const cookiesList = cookies();
  cookiesList.delete("LoginToken");
};
