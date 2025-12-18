
import React, { useState, useEffect } from 'react';
import { Search, MapPin, User, Star, Phone, X, Shield, Clock, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const InstantMatch = ({ skill, isOpen, onClose }) => {
    const { t } = useTranslation();
    const [status, setStatus] = useState('searching'); // searching, connecting, found
    const [matchedWorker, setMatchedWorker] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setStatus('searching');

            // Phase 1: Searching (Scanning radar)
            const searchTimer = setTimeout(() => {
                setStatus('connecting');
            }, 2500);

            // Phase 2: Connecting (Simulated handshake)
            const connectTimer = setTimeout(() => {
                setStatus('found');
                setMatchedWorker({
                    name: "Raju Kumar",
                    distance: "0.8 km",
                    time: "5 mins",
                    rating: 4.8,
                    trade: skill || "Worker",
                    jobs: 142,
                    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200&h=200"
                });
            }, 4500);

            return () => {
                clearTimeout(searchTimer);
                clearTimeout(connectTimer);
            };
        }
    }, [isOpen, skill]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {status === 'searching' && (
                    <div className="p-10 flex flex-col items-center justify-center text-center">
                        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                            <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-20"></div>
                            <div className="absolute inset-4 bg-brand-500 rounded-full animate-ping opacity-20 animation-delay-200"></div>
                            <div className="absolute inset-8 bg-brand-100 rounded-full flex items-center justify-center">
                                <Search className="w-12 h-12 text-brand-600 animate-pulse" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            {t('match.finding', { skill: skill || t('search.allSkills') })}
                        </h3>
                        <p className="text-slate-500">{t('match.scanning')}</p>
                    </div>
                )}

                {status === 'connecting' && (
                    <div className="p-10 flex flex-col items-center justify-center text-center">
                        <div className="relative w-32 h-32 mb-8">
                            <div className="absolute inset-0 border-4 border-t-brand-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200&h=200" className="w-20 h-20 rounded-full opacity-50 blur-sm transition-all duration-1000 scale-100" alt="" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Connecting...</h3>
                        <p className="text-slate-500">Negotiating best rates</p>
                    </div>
                )}

                {status === 'found' && matchedWorker && (
                    <div>
                        {/* Map Header */}
                        <div className="h-32 bg-slate-100 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                        </div>

                        <div className="px-6 pb-6 -mt-12 relative">
                            <div className="flex justify-between items-end mb-6">
                                <img
                                    src={matchedWorker.image}
                                    className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                                    alt={matchedWorker.name}
                                />
                                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-100 flex items-center gap-2 font-bold shadow-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    Worker Nearby
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">{matchedWorker.name}</h2>
                                <p className="text-brand-600 font-medium flex items-center gap-2">
                                    {matchedWorker.trade}
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500 text-sm font-normal">{matchedWorker.jobs} jobs completed</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                                    <Clock className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                                    <div className="font-bold text-slate-900">{matchedWorker.time}</div>
                                    <div className="text-xs text-slate-500">Arrival</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                                    <Navigation className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                                    <div className="font-bold text-slate-900">{matchedWorker.distance}</div>
                                    <div className="text-xs text-slate-500">Distance</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                                    <Star className="w-5 h-5 mx-auto mb-1 text-yellow-400 fill-yellow-400" />
                                    <div className="font-bold text-slate-900">{matchedWorker.rating}</div>
                                    <div className="text-xs text-slate-500">Rating</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2 active:scale-95"
                                    onClick={() => alert(t('match.connecting', { name: "Raju" }))}
                                >
                                    <Phone className="w-5 h-5" />
                                    {t('match.callNow')}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                                >
                                    {t('match.cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstantMatch;
