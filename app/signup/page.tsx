"use client";
import Input from "@/components/UI/Input";
import { signUp } from "@/firebase/auth";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: ""
    });

    const handleSignUp = async () => {
        try {
            await signUp(user.email, user.password, user.name);
            router.replace('/');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <main className="h-screen flex justify-center items-center">
            <section className="flex flex-col gap-y-5 shadow-lg bg-white p-12 border border-gray-200 rounded-lg w-xl">
                <h1 className="font-bold text-center">Sign Up</h1>
                <Input type="text" name="username" onChange={e => setUser({ ...user, name: e.target.value })} value={user.name}>
                    Username
                </Input>
                <Input type="email" name="email" onChange={e => setUser({ ...user, email: e.target.value })} value={user.email}>
                    Username
                </Input>
                <Input type="password" name="password" onChange={e => setUser({ ...user, password: e.target.value })} value={user.password}>
                    Password
                </Input>
                <button onClick={handleSignUp} type="submit"
                    className="self-center border border-gray-400 px-3 py-2 rounded-lg w-[150px] bg-blue-400"
                >
                    Sign Up
                </button>
                <p className="mt-4 text-center">
                    Already have an account?
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => router.push('/signin')}
                    >
                        Sign In
                    </span>
                </p>
            </section>
        </main>
    );
};
