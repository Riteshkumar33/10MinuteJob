import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative group z-50">
            <button className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md transition-colors">
                <Languages className="w-5 h-5" />
                <span className="text-sm uppercase">{i18n.language.split('-')[0]}</span>
            </button>

            {/* 
        Using pt-2 instead of mt-2 and placing the content in an inner div.
        The padding acts as a transparent bridge so the mouse doesn't leave the hover area.
      */}
            <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block hover:block z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <button
                        onClick={() => changeLanguage('en')}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${i18n.language.startsWith('en') ? 'text-indigo-600 font-medium' : 'text-gray-700'
                            }`}
                    >
                        English
                        {i18n.language.startsWith('en') && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                    </button>
                    <button
                        onClick={() => changeLanguage('hi')}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${i18n.language.startsWith('hi') ? 'text-indigo-600 font-medium' : 'text-gray-700'
                            }`}
                    >
                        हिंदी
                        {i18n.language.startsWith('hi') && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
