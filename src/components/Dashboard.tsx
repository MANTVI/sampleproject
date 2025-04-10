'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import authService from '@/firebase/authService'
import { logout } from '@/store/authSlice'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { handleLogout} from '@/app/auth/action'
import { useRouter } from "next/navigation";

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]


export default function Example() {
   
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const authStatus = useSelector((state:any) => state.auth.status)
    const userData = useSelector((state:any) => state.auth.userData);
    /* eslint-enable @typescript-eslint/no-explicit-any */
    useEffect(() => {
        setActive(true);
    }, []);

    const logoutHandler = async() => {
        authService.logout().then(() => {
            
            dispatch(logout());
        })
        await handleLogout();
        router.push('/auth/login')
    }

    return (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen relative">
            <header className="absolute inset-x-0 top-0 z-50">
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>

                <div className='mt-[2rem] ml-[2rem] flex items-center justify-between lg:gap-x-12'>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className="text-sm font-semibold text-gray-900">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    {!active ? null : (
                        authStatus ? (
                            <div className='hidden lg:flex text-sm font-semibold text-gray-900 mr-[2rem]'>
                                <button onClick={logoutHandler}>Logout</button>
                            </div>
                        ) : (
                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                <Link href={'/auth/login'} className="text-sm font-semibold text-gray-900 mr-[2rem]">
                                    Log in
                                </Link>
                                <Link href={'/auth/signup'} className="text-sm font-semibold text-gray-900 mr-[2rem]">
                                    Sign in
                                </Link>
                            </div>
                        )
                    )}
                </div>

                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                {!active ? null : (
                                    !authStatus ? (
                                        <div>
                                            <div className="py-6">
                                                <Link href={'/auth/login'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                                    Log in
                                                </Link>
                                            </div>
                                            <div className="py-6">
                                                <Link href={'/auth/signup'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                                   Sign up
                                                </Link>
                                            </div>
                                        </div>
                                    ):(
                                        <div className='text-sm font-semibold text-gray-900 mr-[2rem]'>
                                <button onClick={logoutHandler}>Logout</button>
                            </div>

                                    )
                                )}
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        {!active ? (
                            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                                Loading...
                            </h1>
                        ) : (
                            authStatus ? (
                                <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                                    {userData?.displayName ? `Hello, ${userData.displayName}` : "Hello, User"}
                                </h1>
                            ) : (
                                <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                                    Sample Project
                                </h1>
                            )
                        )}
                        <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                            fugiat veniam occaecat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
