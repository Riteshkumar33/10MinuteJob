import React from 'react';
import AuthForm from '../components/AuthForm';
import { Hammer } from 'lucide-react';

const AuthPage = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-slate-50 relative overflow-hidden">
            {/* Background Gradient Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-500"></div>
            </div>

            {/* Left Side - Brand (Hidden on mobile) */}
            <div className="hidden md:flex flex-1 flex-col justify-center px-12 lg:px-24 z-10 bg-white/50 backdrop-blur-sm border-r border-white/50">
                <div className="mb-8 p-3 bg-brand-600 w-fit rounded-2xl shadow-xl shadow-brand-500/20">
                    <Hammer className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                    Join the future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">
                        skilled labor
                    </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-md">
                    Connect with top-rated professionals or find regular work in your local area instantly.
                </p>

                <div className="mt-12 flex items-center gap-4 text-sm font-medium text-slate-500">
                    <div className="flex -space-x-3">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                    </div>
                    <span>Trusted by 10,000+ workers</span>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 z-10 bg-white/30 backdrop-blur-sm">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                    <AuthForm />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
