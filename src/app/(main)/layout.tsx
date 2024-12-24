"use client";
import { useEffect } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(()=>{
        const Token =  localStorage.getItem("Token") ?? null;
        if(!Token){
            window.location.href = "/"
        }
    },[])
    return (
        <>
            <main>{children}</main>
        </>
    )
}