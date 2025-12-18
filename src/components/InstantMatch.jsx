
import React, { useState, useEffect } from 'react';
import { Search, MapPin, User, Star, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const InstantMatch = ({ skill, isOpen, onClose }) => {
    const { t } = useTranslation();
    const [status, setStatus] = useState('searching'); // searching, found
    const [matchedWorker, setMatchedWorker] = useState(null);

    useEffect(() => {
        if (isOpen && status === 'searching') {
            // Simulate search delay
            const timer = setTimeout(() => {
                setStatus('found');
                setMatchedWorker({
                    name: "Raju Kumar",
                    distance: "0.8 km",
                    time: "5 mins",
                    rating: 4.8,
                    trade: skill || "Worker"
                });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, status, skill]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10">

                {status === 'searching' ? (
                    <div className="text-center py-8">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
                            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Search className="w-10 h-10 text-indigo-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('match.finding', { skill: skill || t('search.allSkills') })}</h3>
                        <p className="text-gray-500">{t('match.scanning')}</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
                        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6 text-sm font-semibold">
                            <MapPin className="w-4 h-4" />
                            {t('match.found')}
                        </div>

                        <div className="flex items-center gap-4 mb-6 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-gray-500" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900">{matchedWorker.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {matchedWorker.rating}</span>
                                    <span>•</span>
                                    <span>{matchedWorker.trade}</span>
                                </div>
                                <div className="text-indigo-600 font-bold text-sm mt-1">
                                    ~ {matchedWorker.time} away ({matchedWorker.distance})
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            onClick={() => alert(t('match.connecting', { name: "Raju" }))}
                        >
                            <Phone className="w-5 h-5" />
                            {t('match.callNow')}
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-4 text-gray-500 hover:text-gray-900 text-sm font-medium"
                        >
                            {t('match.cancel')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstantMatch;
