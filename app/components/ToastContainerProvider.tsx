"use client";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toast";

export default function ToastContainerProvider({
    children,
}: PropsWithChildren<{}>) {
    return (
        <>
            <ToastContainer position="top-right" delay={2000} />
            {children}
        </>
    );
}
