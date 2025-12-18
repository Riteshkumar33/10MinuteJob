import React, { useState } from 'react';
import { User, Lock, Phone, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AuthForm = () => {
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        role: 'worker', // worker or employer
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add auth logic here
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex mb-8 bg-gray-100 p-1 rounded-lg">
                <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setIsLogin(true)}
                >
                    {t('auth.login')}
                </button>
                <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setIsLogin(false)}
                >
                    {t('auth.signup')}
                </button>
            </div>

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
                </h2>
                <p className="text-gray-500 text-sm">
                    {isLogin ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">{t('auth.fullName')}</label>
                        <div className="relative">
                            <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{t('auth.phoneEmail')}</label>
                    <div className="relative">
                        <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                {!isLogin && (
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">{t('auth.iAmA')}</label>
                        <div className="relative">
                            <Briefcase className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="worker">{t('auth.worker')}</option>
                                <option value="employer">{t('auth.employer')}</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{t('auth.password')}</label>
                    <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-200 mt-6"
                >
                    {isLogin ? t('auth.signInButton') : t('auth.createAccountButton')}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
