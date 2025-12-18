import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hammer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <Hammer className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-gray-900 tracking-tight">SkillConnect</span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-2 items-center">
                            <Link
                                to="/search"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/search')}`}
                            >
                                {t('navbar.findWorkers')}
                            </Link>
                            <Link
                                to="/jobs"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/jobs')}`}
                            >
                                {t('navbar.findJobs')}
                            </Link>
                            <Link
                                to="/profile"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/profile')}`}
                            >
                                {t('navbar.workerProfile')}
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link
                            to="/auth"
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/auth')}`}
                        >
                            {t('navbar.signIn')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
