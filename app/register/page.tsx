"use client";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import { useForm } from "react-hook-form";
import React, { useLayoutEffect } from "react";
import {
    initiateApp,
    registerUser,
    RegisterUserParams,
} from "../services/index";
import { useRouter } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toast";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterUserParams>();

    const router = useRouter();

    const submitData = async ({
        email,
        password,
        confirmPassword,
    }: RegisterUserParams) => {
        try {
            await registerUser({ email, password, confirmPassword });
            toast.success("You successfully registered!");
            router.push("/products");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useLayoutEffect(() => {
        initiateApp();
    }, []);

    return (
        <div className="h-full flex flex-col md:flex-row md:items-center">
            <section className="md:w-1/2 flex flex-col items-center relative">
                <Image
                    src="https://files.insby.tech/test/static/signup_image.png"
                    alt="register"
                    width={512}
                    height={512}
                />
            </section>
            <section className="md:w-1/2 h-fit p-3">
                <div className="text-center mb-12 md:mb-36">
                    <h1 className="font-extrabold text-4xl mb-2">Sign up</h1>
                    <p className="text-xs text-gray-400">
                        Enter your details to get started.
                    </p>
                </div>
                <form className="max-w-lg mx-auto" onSubmit={handleSubmit(submitData)}>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="" className="text-xs text-gray-500 mb-4">
                            Email
                        </label>
                        <div className="w-full relative">
                            <FaEnvelope className="absolute top-1/2 right-4 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Enter your email address"
                                className="border-2 border-gray-600 rounded-full text-sm py-3 pl-2 pr-10 w-full"
                                {...register("email", {
                                    required: "Email is required!",
                                    validate: (value) =>
                                        !!value.trim() || "Only whitespaces not allowed",
                                })}
                            />
                        </div>
                        <span className="text-sm text-bright-red mt-1 h-5">
                            {errors.email?.message}
                        </span>
                    </div>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="" className="text-xs text-gray-500 mb-4">
                            Create a password
                        </label>
                        <input
                            type="text"
                            placeholder="Enter a strong password"
                            className="border-2 border-gray-600 rounded-full text-sm py-3 px-2"
                            {...register("password", {
                                required: "Password is required!",
                                minLength: {
                                    value: 5,
                                    message: "Must be at least 5 characters long",
                                },
                                validate: (value) =>
                                    !!value.trim() || "Only whitespaces not allowed",
                            })}
                        />
                        <span className="text-sm text-bright-red mt-1 h-5">
                            {errors.password?.message}
                        </span>
                    </div>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="" className="text-xs text-gray-500 mb-4">
                            Confirm password
                        </label>
                        <input
                            type="text"
                            placeholder="Confirm your password"
                            className="border-2 border-gray-600 rounded-full text-sm py-3 px-2"
                            {...register("confirmPassword", {
                                required: "You must confirm password!",
                                validate: (value, formValues) =>
                                    value === formValues.password || "Password does not match",
                            })}
                        />
                        <span className="text-sm text-bright-red mt-1 h-5">
                            {errors.confirmPassword?.message}
                        </span>
                    </div>
                    <button className="bg-bright-red text-white block font-bold w-full rounded-full p-2 cursor-pointer my-6">
                        Sign up
                    </button>
                    <Link href="/login" className="block w-fit mx-auto text-gray-500">
                        Already have an account? Log in
                    </Link>
                </form>
            </section>
        </div>
    );
}
