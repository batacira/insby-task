import Image from "@/node_modules/next/image";
import React from "react";

type SingleProductProps = {
    title: string;
    body: string;
    imageUrl: string;
    price: number;
    memberPrice: number;
};

export default function SingleProduct({
    title,
    body,
    imageUrl,
    price,
    memberPrice,
}: SingleProductProps) {
    return (
        <div className="flex flex-col md:flex-row">
            <Image
                src={imageUrl}
                alt={title}
                width={500}
                height={500}
                className="rounded-2xl"
            />
            <div className="flex flex-col pt-12 pl-8 lg:pl-20 pr-2 pb-6 flex-1">
                <div className="mb-4">
                    <h1 className="font-bold text-3xl mb-5">{title}</h1>
                    <p className="text-sm text-gray-500">{body}</p>
                </div>
                <div className="flex gap-4 mt-auto">
                    <span className="rounded-full bg-black text-white font-bold min-w-[100px] p-3 text-center">
                        {price}
                    </span>
                    <span className="rounded-full bg-bright-red text-white font-bold min-w-[100px] p-3 text-center">
                        {memberPrice}
                    </span>
                </div>
            </div>
        </div>
    );
}
