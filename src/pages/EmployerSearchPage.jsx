import React, { useState } from 'react';

import { Search, MapPin, Filter, MoreHorizontal, Phone, MessageSquare, Map as MapIcon, List, Zap } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import VoiceSearch from '../components/VoiceSearch';
import InstantMatch from '../components/InstantMatch';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import SkillScore from '../components/SkillScore';

const MOCK_WORKERS = [
    { id: 1, name: "Mike Johnson", skill: "Electrician", location: "Delhi, India", lat: 28.6139, lng: 77.2090, score: 4.8, verified: true, image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 2, name: "Sarah Smith", skill: "Plumber", location: "Delhi, India", lat: 28.6239, lng: 77.2190, score: 4.5, verified: true, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 3, name: "David Wilson", skill: "Carpenter", location: "Delhi, India", lat: 28.6039, lng: 77.1990, score: 4.2, verified: true, image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 4, name: "James Brown", skill: "Electrician", location: "New York, NY", lat: 40.7128, lng: -74.0060, score: 4.9, verified: true, image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200&h=200" }, // Far away
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
            // Calculate bounds
            const latLngs = workers.map(w => [w.lat || 28.6139, w.lng || 77.2090]);
            const bounds = L.latLngBounds(latLngs);

            // If only one marker, just center, otherwise fit bounds
            if (latLngs.length === 1) {
                map.setView(latLngs[0], 15);
            } else {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [workers, map]);

    return null;
};

const EmployerSearchPage = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [viewMode, setViewMode] = useState("map"); // 'list' or 'map'
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
        // Check if translation exists, otherwise return original
        return i18n.exists(key) ? t(key) : skill;
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header & Search */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('search.title')}</h1>
                        <p className="mt-2 text-slate-500">{t('search.subtitle')}</p>
                    </div>
                    <button
                        onClick={() => setShowInstantMatch(true)}
                        className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-transform hover:scale-105 shadow-xl"
                    >
                        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        {t('common.instantHire')}
                    </button>
                </div>

                <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:max-w-md flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-700"
                                placeholder={t('search.searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <VoiceSearch onSearch={setSearchTerm} />
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
                            >
                                <MapIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                            <Filter className="w-5 h-5 text-slate-400" />
                            <select
                                className="w-full sm:w-48 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 bg-white"
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value)}
                            >
                                <option value="All">{t('search.allSkills')}</option>
                                {skills.filter(s => s !== "All").map(skill => (
                                    <option key={skill} value={skill}>{getTranslatedSkill(skill)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                {viewMode === 'map' ? (
                    <div className="h-[600px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative z-0">
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
                                    <Popup>
                                        <div className="min-w-[150px]">
                                            <h3 className="font-bold">{worker.name}</h3>
                                            <p className="text-sm text-indigo-600">{worker.skill}</p>
                                            <p className="text-xs text-gray-500">⭐ {worker.score}</p>
                                            <button className="mt-2 w-full bg-black text-white text-xs py-1 rounded">
                                                {t('common.bookNow')}
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWorkers.map((worker) => (
                            <div key={worker.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {worker.name}
                                                </h3>
                                                <p className="text-sm font-medium text-indigo-500">{getTranslatedSkill(worker.skill)}</p>
                                            </div>
                                        </div>
                                        {worker.verified && (
                                            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium border border-green-100">
                                                {t('search.verified')}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <SkillScore score={worker.score} />
                                    </div>

                                    <div className="flex items-center text-slate-500 text-sm mb-6">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {worker.location}
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            {t('search.contact')}
                                        </button>
                                        <button className="px-3 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors">
                                            <MessageSquare className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredWorkers.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        {t('search.noWorkersNotFound')}
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
