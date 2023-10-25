"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import React from "react";
import { loginUser, LoginUserParams } from "../services/index";
import { useRouter } from "next/navigation";
import { toast } from "react-toast";

type LoginPageParams = Omit<LoginUserParams, "confirmPassword">;

export default function Login() {
    const { register, handleSubmit } = useForm<LoginPageParams>();

    const router = useRouter();

    const submitData = async ({ email, password }: LoginPageParams) => {
        try {
            await loginUser({ email, password });
            toast.success("You successfully logged in!");
            router.push("/products");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row md:items-center">
            <section className="md:w-1/2 flex flex-col items-center justify-center bg-bright-red h-full px-3">
                <Image
                    src="https://files.insby.tech/test/static/login_image.png"
                    alt="login"
                    width={412}
                    height={412}
                />
            </section>
            <section className="md:w-1/2 h-fit p-3">
                <div className="max-w-md mx-auto">
                    <h1 className="font-bold text-3xl mb-6">Log in</h1>
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs text-gray-500 mb-4">
                                Email address
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="border-2 border-gray-600 rounded-full text-sm py-3 px-2 mb-5"
                                {...register("email")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs text-gray-500 mb-4">
                                Password
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your password"
                                className="border-2 border-gray-600 rounded-full text-sm py-3 px-2 mb-5"
                                {...register("password")}
                            />
                        </div>
                        <button className="bg-black text-white block font-bold w-full rounded-3xl p-4 cursor-pointer mt-2 mb-6">
                            Log in
                        </button>
                        <Link
                            href="/register"
                            className="block w-fit mx-auto text-gray-500"
                        >
                            Don`t have an account? Register
                        </Link>
                    </form>
                </div>
            </section>
        </div>
    );
}
