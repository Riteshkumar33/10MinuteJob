import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, FileVideo, FileText, X, Power, MapPin, Radio } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import SkillScore from '../components/SkillScore';
import { useWorkerContext } from '../context/WorkerContext';

const WorkerProfilePage = () => {
    const { t } = useTranslation();
    const { isOnline, toggleOnlineStatus, location } = useWorkerContext();
    const [skill, setSkill] = useState("");
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const fileInputRef = useRef(null);

    // Mock score - in real app, this comes from backend after verification
    const [verifiedScore, setVerifiedScore] = useState(null);

    const handleFileSelect = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            // Reset status if new file selected
            setUploadComplete(false);
            setVerifiedScore(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selected = e.dataTransfer.files[0];
        if (selected) {
            setFile(selected);
            setUploadComplete(false);
            setVerifiedScore(null);
        }
    };

    const handleUpload = () => {
        if (!file || !skill) return;

        setIsUploading(true);
        // Simulate upload delay
        setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
            setVerifiedScore(4.5); // Mock AI verified score
        }, 2000);
    };

    const removeFile = () => {
        setFile(null);
        setUploadComplete(false);
        setVerifiedScore(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header & Status Toggle */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                JD
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                                <p className="text-gray-500">{t('auth.worker')}</p>
                            </div>
                        </div>

                        {/* Rapido-Style Go Online Toggle */}
                        <button
                            onClick={toggleOnlineStatus}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 shadow-lg ${isOnline
                                ? 'bg-green-500 hover:bg-green-600 ring-4 ring-green-200'
                                : 'bg-gray-800 hover:bg-gray-900 ring-4 ring-gray-200'
                                }`}
                        >
                            <Power className="w-5 h-5" />
                            {isOnline ? t('common.youAreOnline') : t('common.goOnline')}
                        </button>
                    </div>

                    {/* Online Dashboard Status */}
                    {isOnline && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-green-800">{t('common.searchingNearby')}</p>
                                        <div className="flex items-center text-green-700 text-sm mt-1">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {location ? t('common.locationActive') : t('common.locating')}
                                        </div>
                                    </div>
                                </div>
                                <Radio className="w-8 h-8 text-green-300 animate-pulse" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Verification Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-indigo-600" />
                        {t('profile.skillVerification')}
                    </h2>

                    <div className="space-y-6">
                        {/* Skill Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('profile.selectTrade')}
                            </label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                            >
                                <option value="">{t('profile.selectPlaceholder')}</option>
                                <option value="plumber">{t('profile.trades.plumber')}</option>
                                <option value="electrician">{t('profile.trades.electrician')}</option>
                                <option value="carpenter">{t('profile.trades.carpenter')}</option>
                                <option value="welder">{t('profile.trades.welder')}</option>
                                <option value="mason">{t('profile.trades.mason')}</option>
                            </select>
                        </div>

                        {/* File Upload Area */}
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${file ? 'border-indigo-200 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                                }`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="video/*,image/*,.pdf"
                                onChange={handleFileSelect}
                            />

                            {!file ? (
                                <div
                                    className="cursor-pointer flex flex-col items-center"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <p className="text-lg font-medium text-gray-900">{t('profile.clickToUpload')}</p>
                                    <p className="text-sm text-gray-500 mt-1">{t('profile.dragDrop')}</p>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                            {file.type.startsWith('video') ? <FileVideo /> : <FileText />}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={removeFile}
                                        className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Action Button */}
                        {file && !uploadComplete && (
                            <button
                                onClick={handleUpload}
                                disabled={isUploading || !skill}
                                className={`w-full py-3 rounded-xl font-semibold text-white transition-all shadow-lg ${isUploading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                                    }`}
                            >
                                {isUploading ? t('profile.verifying') : t('profile.uploadVerify')}
                            </button>
                        )}

                        {/* Results Display */}
                        {uploadComplete && verifiedScore && (
                            <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-100 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-green-900 mb-1">{t('profile.verificationComplete')}</h3>
                                        <p className="text-green-700 text-sm">{t('profile.proofValidated')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-600 mb-1">{t('profile.aiScore')}</p>
                                        <SkillScore score={verifiedScore} max={5} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfilePage;
