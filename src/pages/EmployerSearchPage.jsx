import React, { useState } from 'react';
import { Search, MapPin, Filter, Phone, MessageSquare, Map as MapIcon, List, Zap, Star, ShieldCheck } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import VoiceSearch from '../components/VoiceSearch';
import InstantMatch from '../components/InstantMatch';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import SkillScore from '../components/SkillScore';

// Mock data (kept same structure but can easily be expanded)
const MOCK_WORKERS = [
    { id: 1, name: "Mike Johnson", skill: "Electrician", location: "Delhi, India", lat: 28.6139, lng: 77.2090, score: 4.8, verified: true, image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 2, name: "Sarah Smith", skill: "Plumber", location: "Delhi, India", lat: 28.6239, lng: 77.2190, score: 4.5, verified: true, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 3, name: "David Wilson", skill: "Carpenter", location: "Delhi, India", lat: 28.6039, lng: 77.1990, score: 4.2, verified: true, image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 4, name: "James Brown", skill: "Electrician", location: "New York, NY", lat: 40.7128, lng: -74.0060, score: 4.9, verified: true, image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 5, name: "Emily Davis", skill: "Designer", location: "Delhi, India", lat: 28.6339, lng: 77.2290, score: 4.7, verified: false, image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 6, name: "Chris Martinez", skill: "Mason", location: "Delhi, India", lat: 28.5939, lng: 77.1890, score: 4.4, verified: true, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200" },
];

// Fix for default Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapRecenter = ({ workers }) => {
    const map = useMap();
    React.useEffect(() => {
        if (workers.length > 0) {
            const latLngs = workers.map(w => [w.lat || 28.6139, w.lng || 77.2090]);
            const bounds = L.latLngBounds(latLngs);
            if (latLngs.length === 1) map.setView(latLngs[0], 15);
            else map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [workers, map]);
    return null;
};

const EmployerSearchPage = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [viewMode, setViewMode] = useState("list");
    const [showInstantMatch, setShowInstantMatch] = useState(false);

    const filteredWorkers = MOCK_WORKERS.filter(worker => {
        const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSkill = selectedSkill === "All" || worker.skill === selectedSkill;
        return matchesSearch && matchesSkill;
    });

    const skills = ["All", ...new Set(MOCK_WORKERS.map(w => w.skill))];

    const getTranslatedSkill = (skill) => {
        if (skill === "All") return t('search.allSkills');
        const key = `profile.trades.${skill.toLowerCase()}`;
        return i18n.exists(key) ? t(key) : skill;
    };

    return (
        <div className="min-h-screen bg-slate-50 relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-brand-900 rounded-b-[3rem] shadow-2xl z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute top-12 left-12 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-10"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">

                {/* Header Phase */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-slide-up">
                    <div className="text-white">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                            {t('search.title')}
                        </h1>
                        <p className="text-brand-100 text-lg max-w-2xl font-light">
                            {t('search.subtitle')}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowInstantMatch(true)}
                        className="group relative bg-white text-brand-900 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl hover:shadow-white/20 hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="bg-brand-900 p-2 rounded-lg text-yellow-400 group-hover:rotate-12 transition-transform">
                            <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-lg">{t('common.instantHire')}</span>
                    </button>
                </div>

                {/* Search & Filter Container */}
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-xl shadow-brand-900/5 mb-10 border border-slate-100 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-12 py-4 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-sm"
                                placeholder={t('search.searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <VoiceSearch onSearch={setSearchTerm} />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative min-w-[180px] w-full lg:w-48">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-slate-400" />
                                </div>
                                <select
                                    className="block w-full pl-10 pr-10 py-4 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all appearance-none cursor-pointer font-medium"
                                    value={selectedSkill}
                                    onChange={(e) => setSelectedSkill(e.target.value)}
                                >
                                    <option value="All">{t('search.allSkills')}</option>
                                    {skills.filter(s => s !== "All").map(skill => (
                                        <option key={skill} value={skill}>{getTranslatedSkill(skill)}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-3 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-md text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={`p-3 rounded-lg transition-all duration-200 ${viewMode === 'map' ? 'bg-white shadow-md text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <MapIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {viewMode === 'map' ? (
                        <div className="h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative z-0">
                            <MapContainer
                                center={[28.6139, 77.2090]}
                                zoom={13}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <MapRecenter workers={filteredWorkers} />
                                {filteredWorkers.map(worker => (
                                    <Marker
                                        key={worker.id}
                                        position={[worker.lat || 28.6139, worker.lng || 77.2090]}
                                    >
                                        <Popup className="custom-popup">
                                            <div className="p-1 min-w-[160px]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src={worker.image} className="w-8 h-8 rounded-full object-cover" alt="" />
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 leading-tight">{worker.name}</h3>
                                                        <p className="text-xs text-brand-600 font-medium">{worker.skill}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 mb-2">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-xs font-bold">{worker.score}</span>
                                                </div>
                                                <button className="w-full bg-brand-900 text-white text-xs font-medium py-1.5 rounded-lg hover:bg-brand-800 transition-colors">
                                                    {t('common.bookNow')}
                                                </button>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredWorkers.map((worker) => (
                                <div key={worker.id} className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform duration-500" />
                                                    {worker.verified && (
                                                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                                                            <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-50" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors">
                                                        {worker.name}
                                                    </h3>
                                                    <p className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-1">
                                                        {getTranslatedSkill(worker.skill)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                    <span className="font-bold text-slate-900">{worker.score}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6 space-y-3">
                                            <SkillScore score={worker.score} />
                                            <div className="flex items-center text-slate-500 text-sm">
                                                <MapPin className="w-4 h-4 mr-2 text-brand-400" />
                                                {worker.location}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4 border-t border-slate-50">
                                            <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20">
                                                <Phone className="w-4 h-4" />
                                                {t('search.contact')}
                                            </button>
                                            <button className="px-4 border-2 border-slate-100 hover:border-brand-200 hover:bg-brand-50 rounded-xl text-slate-600 hover:text-brand-600 transition-colors">
                                                <MessageSquare className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {filteredWorkers.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-slate-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{t('search.noWorkersNotFound')}</h3>
                        <p className="text-slate-500">{t('search.tryAdjustingFilters')}</p>
                    </div>
                )}

                <InstantMatch
                    skill={selectedSkill !== "All" ? selectedSkill : null}
                    isOpen={showInstantMatch}
                    onClose={() => setShowInstantMatch(false)}
                />
            </div>
        </div>
    );
};

export default EmployerSearchPage;
