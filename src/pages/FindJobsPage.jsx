import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Briefcase, DollarSign, Clock, Filter, Navigation, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to update map center
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

const FindJobsPage = () => {
    const { t } = useTranslation();
    const [userLocation, setUserLocation] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [radius, setRadius] = useState(10); // km
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Generate random jobs around a location
    const generateJobs = (lat, lng) => {
        const jobTitles = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Welder', 'Mechanic'];
        const newJobs = Array.from({ length: 15 }).map((_, i) => {
            // Random offset within ~10km
            const latOffset = (Math.random() - 0.5) * 0.15;
            const lngOffset = (Math.random() - 0.5) * 0.15;
            return {
                id: i,
                title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
                company: `Company ${i + 1}`,
                lat: lat + latOffset,
                lng: lng + lngOffset,
                salary: `$${20 + Math.floor(Math.random() * 30)}/hr`,
                type: 'Full-time',
                posted: `${Math.floor(Math.random() * 5) + 1} days ago`,
                description: `We are looking for a skilled ${jobTitles[Math.floor(Math.random() * jobTitles.length)]} to join our team. Must have experience and valid certification.`,
                requirements: ['3+ years experience', 'Valid License', 'Own tools']
            };
        });
        setJobs(newJobs);
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    generateJobs(latitude, longitude);
                    setLoading(false);
                },
                (err) => {
                    console.error("Error getting location:", err);
                    setError(t('jobs.locationPermission'));
                    // Fallback to New York
                    const fallbackLocation = [40.7128, -74.0060];
                    setUserLocation(fallbackLocation);
                    generateJobs(fallbackLocation[0], fallbackLocation[1]);
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
        }
    }, [t]);

    // Calculate distance between two points in km (Haversine formula)
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const handleLocationSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newLocation = [parseFloat(lat), parseFloat(lon)];
                setUserLocation(newLocation);
                generateJobs(parseFloat(lat), parseFloat(lon));
                setSelectedJob(null);
            }
        } catch (err) {
            console.error("Error searching location:", err);
        } finally {
            setIsSearching(false);
        }
    };

    const filteredJobs = userLocation ? jobs.filter(job => {
        const dist = getDistance(userLocation[0], userLocation[1], job.lat, job.lng);
        return dist <= radius;
    }) : [];

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-slate-50 relative">
            {/* Map Section */}
            <div className={`flex-1 h-1/2 md:h-full relative z-0 transition-all`}>
                {!loading && userLocation ? (
                    <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <ChangeView center={userLocation} zoom={13} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* User Marker */}
                        <Marker position={userLocation} icon={new L.Icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        })}>
                            <Popup>You are here</Popup>
                        </Marker>

                        {/* Job Markers */}
                        {filteredJobs.map(job => (
                            <Marker
                                key={job.id}
                                position={[job.lat, job.lng]}
                                icon={new L.Icon({
                                    iconUrl: selectedJob?.id === job.id
                                        ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
                                        : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                })}
                                eventHandlers={{
                                    click: () => setSelectedJob(job),
                                }}
                            />
                        ))}
                    </MapContainer>
                ) : (
                    <div className="flex items-center justify-center h-full bg-slate-100 text-slate-500">
                        {error || t('jobs.loadingLocation')}
                    </div>
                )}

                {/* Floating Controls Container */}
                <div className="absolute top-4 right-4 z-[400] flex flex-col gap-3 items-end">
                    {/* Search Box */}
                    <form onSubmit={handleLocationSearch} className="bg-white p-2 rounded-lg shadow-lg border border-slate-200 flex gap-2">
                        <input
                            type="text"
                            placeholder={t('jobs.searchLocation')}
                            className="w-48 px-2 py-1 text-sm outline-none text-slate-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Filter Box */}
                    <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                            <Filter className="w-4 h-4 text-indigo-600" />
                            <span className="font-semibold text-sm text-slate-700">{t('jobs.filterDistance')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={radius}
                                onChange={(e) => setRadius(parseInt(e.target.value))}
                                className="w-32 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <span className="text-sm font-medium text-slate-600">{radius} {t('jobs.km')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Details Sidebar (Right Panel) */}
            <div className={`md:h-full bg-white shadow-xl border-l border-slate-200 transition-all duration-300 absolute md:relative bottom-0 w-full md:w-[300px] z-20 ${selectedJob ? 'h-1/2 translate-y-0' : 'h-0 md:w-0 translate-y-full md:translate-y-0 md:overflow-hidden'}`}>
                {selectedJob ? (
                    <div className="h-full overflow-y-auto">
                        <div className="p-6 pb-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{selectedJob.title}</h2>
                                    <p className="text-indigo-600 font-medium">{selectedJob.company}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="p-1 hover:bg-slate-100 rounded-full text-slate-400 flex-shrink-0"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>{selectedJob.lat.toFixed(4)}, {selectedJob.lng.toFixed(4)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                                    <span>{selectedJob.salary}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span>{selectedJob.posted}</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4 mt-4">
                                <h3 className="font-semibold text-slate-900 mb-2">{t('jobs.description')}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{selectedJob.description}</p>
                            </div>

                            <div className="border-t border-slate-100 pt-4 mt-4">
                                <h3 className="font-semibold text-slate-900 mb-2">{t('jobs.requirements')}</h3>
                                <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                                    {selectedJob.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>

                            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-100">
                                {t('jobs.apply')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center p-8 text-center text-slate-400">
                        <div>
                            <Navigation className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>{t('jobs.selectJob')}</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default FindJobsPage;
