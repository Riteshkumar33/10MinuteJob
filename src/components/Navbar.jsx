import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hammer, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path
            ? 'bg-brand-50 text-brand-600'
            : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50';
    };

    const navLinks = [
        { path: '/search', label: t('navbar.findWorkers') },
        { path: '/jobs', label: t('navbar.findJobs') },
        { path: '/profile', label: t('navbar.workerProfile') },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/60 support-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="bg-brand-600 p-2 rounded-xl shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105 group-hover:rotate-3">
                            <Hammer className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-xl text-slate-900 tracking-tight">SkillConnect</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link
                            to="/auth"
                            className="bg-brand-900 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-brand-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {t('navbar.signIn')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <LanguageSwitcher />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 shadow-xl animate-fade-in">
                    <div className="px-4 py-6 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.path)}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-100 mt-4">
                            <Link
                                to="/auth"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-center bg-brand-900 text-white px-4 py-3 rounded-xl font-bold hover:bg-brand-800 transition-colors"
                            >
                                {t('navbar.signIn')}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
