import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-100 font-sans overflow-x-hidden">
            {/* Top cyan header */}
            <header className="h-22.5 bg-secondary border-b-[3px] border-white/30 flex items-center">
                <div className="w-[min(1200px,92%)] mx-auto flex items-center">
                    {/* Replace with your logo */}
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-18 w-auto object-contain"
                    />
                </div>
            </header>

            {/* Main area */}
            <main className="relative min-h-[calc(100vh-90px-95px)] flex items-center justify-center">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-center bg-cover "
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=60)",
                    }}
                />

                {/* Content */}
                <div className="flex items-center justify-center">
                    <div className="relative w-full grid grid-cols-1 gap-10 py-10">

                        {/* Left Login Card */}
                        <section className="bg-white/95  shadow-[0_8px_22px_rgba(0,0,0,0.12)] rounded overflow-hidden">
                            <div className="bg-secondary text-white px-4 py-3 flex items-center gap-2">
                                <span className="text-sm">✎</span>
                                <h3 className="text-[18px] font-bold">User Login</h3>
                            </div>

                            <div className="p-5">
                                <div className="grid grid-cols-[110px_1fr] gap-3 items-center py-2">
                                    <label className="text-sm font-semibold text-gray-800">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        className="h-7.5 border border-gray-300 rounded-sm px-3 outline-none bg-white"
                                    />
                                </div>

                                <div className="grid grid-cols-[110px_1fr] gap-3 items-center py-2">
                                    <label className="text-sm font-semibold text-gray-800">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="h-7.5 border border-gray-300 rounded-sm px-3 outline-none bg-white"
                                    />
                                </div>

                                <button
                                    onClick={() => navigate("/home")}
                                    className="w-full mt-4 h-11 rounded bg-secondary text-white font-extrabold tracking-widest hover:brightness-95"
                                >
                                    LOGIN
                                </button>

                                <p className="mt-3 text-center text-xs text-gray-600">
                                    If you are unable to login, please contact to lab management.
                                </p>
                            </div>
                        </section>

                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="h-23.75 bg-secondary border-t border-black/10 flex items-center">
                <div className="w-[min(1200px,92%)] mx-auto flex items-center justify-between">
                    {/* Replace with your footer logo */}
                    <img
                        src="/images/logo.png"
                        alt="NextStep"
                        className="h-18 w-auto object-contain"
                    />

                    <p className="text-xs text-white">
                        © Copyright - Hi-Tech Core. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Login;
