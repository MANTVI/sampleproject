'use client';

import React, { JSX, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import authService from '@/firebase/authService';
import Link from 'next/link';
import Input from './Input';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import {login as authLogin } from '@/store/authSlice'




function LoginFrom(): JSX.Element {
    interface LoginFormInputs {
        email: string;
        password: string;
    }
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch()

    const login = async (data: LoginFormInputs): Promise<void> => {
        setError("");
        try {
            const session =await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser()
            
                if(userData) dispatch(authLogin(userData));
                setMessage("Account login successfully!");
                
                router.push('/dashboard');
            }
            
           
            }
           
        catch (error) {
            if (error instanceof Error) {
                setMessage("signup failed! " + error.message);
            } else {
                setMessage("signup failed! An unexpected error occurred.");
            }
            
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="relative mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <button>
                    <Link
                        href={'/dashboard'}>
                        <XMarkIcon
                            aria-hidden="true"
                            className="w-6 h-6 absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
                        />
                    </Link>
                </button>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link href="/auth/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {message && <p className="text-green-600 mt-4 text-center">{message}</p>}

                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Invalid email address",
                            },
                        })}
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: "Password is required" })}
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginFrom;
