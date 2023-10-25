"use client";
import { useState } from "react";

type UserDropdownProps = {
    userName: string;
};

export default function UserDropdown({ userName }: UserDropdownProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="absolute top-14 right-16 flex flex-col items-center w-40">
            <div
                className="rounded-full w-12 h-12 bg-white text-bright-red font-bold relative border border-gray-300 cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
            >
                <div className="capitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
                    {userName[0]}
                </div>
            </div>
            {showDropdown ? (
                <div className="rounded-md w-full bg-gray-50 shadow-lg mt-1 border border-gray-200 flex flex-col overflow-hidden">
                    <div className="py-2 px-1 text-center text-bright-red text-sm break-words">
                        {userName}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
