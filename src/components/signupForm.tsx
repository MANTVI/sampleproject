'use client';

import React, { JSX, useState } from 'react';
import {  XMarkIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import authService from '@/firebase/authService';
import Link from 'next/link';
import Input from './Input';
import Button from './Button';
import {useDispatch} from 'react-redux'
import { login } from '@/store/authSlice';
function SignupFrom() {
    interface LoginFormInputs {
        email: string;
        password: string;
        name: string;
        confirmPassword: string;
    }
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const router = useRouter();
    const [message, setMessage] = useState<string>("");
    const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginFormInputs>()

    const create= async (data: LoginFormInputs): Promise<void> => {
        setError("");
        try {
            const userData=await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData));
                    setMessage("Account created successfully!");
                    router.push('/dashboard');
                }
                
            }
            
          
        } catch (error) {
            if (error instanceof Error) {
                setMessage("signup failed! " + error.message);
            } else {
                setMessage("signup failed! An unexpected error occurred.");
            }
        }
    };

    return (
        <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div className={`relative mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <button>
                    <Link
                        href={'/dashboard'}>
                        <XMarkIcon
                            aria-hidden="true"
                            className="w-6 h-6 absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
                        />
                    </Link>
                </button>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        href={"/auth/login"}
                        className="font-medium color-red text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <div>
                            <Input
                                label="Full Name: "
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: 'Enter your name',
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: 'Email is required',
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: 'Enter your password',
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        <div>

                            <Input
                                label="Confirm Password:"
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword", {
                                    required: "Confirm your password",
                                    validate: (value) => value === watch("password") || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">

                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignupFrom