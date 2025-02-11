"use client";
import Input from "@/components/UI/Input";
import { signIn } from "@/firebase/auth";
import { LoginUser } from "@/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const router = useRouter();
    const [user, setUser] = useState<LoginUser>({
        email: "",
        password: ""
    });

    const handleSignIn = async () => {
        try {
            const response = await signIn(user.email, user.password);
            console.log(response);
            router.replace('/');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <main className="h-screen flex justify-center items-center">
            <section className="flex flex-col gap-y-5 shadow-lg bg-white p-12 border border-gray-200 rounded-lg w-xl">
                <h1 className="font-bold text-center">Sign In</h1>
                <Input type="email" name="email" onChange={e => setUser({ ...user, email: e.target.value })} value={user.email}>
                    Email
                </Input>
                <Input type="password" name="password" onChange={e => setUser({ ...user, password: e.target.value })} value={user.password}>
                    Password
                </Input>
                <button onClick={handleSignIn} type="submit"
                    className="self-center border border-gray- px-3 py-2 rounded-lg w-[150px] bg-blue-400"
                >
                    Login
                </button>
                <p className="mt-4 text-center">
                    Don't have an account?
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => router.push('/signup')}
                    >
                        Sign Up
                    </span>
                </p>
            </section>
        </main >
    );
};