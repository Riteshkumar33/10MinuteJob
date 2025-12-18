import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English Translations
const translationEN = {
    navbar: {
        findWorkers: "Find Workers",
        findJobs: "Find Jobs Near Me",
        workerProfile: "Worker Profile",
        signIn: "Sign In",
        signIn: "Sign In",
        language: "Language"
    },
    common: {
        goOnline: "GO ONLINE",
        youAreOnline: "YOU ARE ONLINE",
        instantHire: "INSTANT HIRE (10 MINS)",
        bookNow: "Book Now",
        searchingNearby: "Searching for jobs nearby...",
        searchingNearby: "Searching for jobs nearby...",
        locationActive: "Location active",
        locating: "Locating..."
    },
    match: {
        finding: "Finding {{skill}} nearby...",
        scanning: "Scanning 2km radius",
        found: "Worker Found Near You",
        callNow: "CALL NOW",
        cancel: "Cancel Search",
        connecting: "Connecting you to {{name}}..."
    },
    auth: {
        login: "Login",
        signup: "Sign Up",
        welcomeBack: "Welcome Back",
        createAccount: "Create Account",
        loginSubtitle: "Enter your details to access your account",
        signupSubtitle: "Join thousands of skilled workers today",
        fullName: "Full Name",
        phoneEmail: "Phone Number/Email",
        iAmA: "I am a...",
        worker: "Skilled Worker",
        employer: "Contractor/Employer",
        password: "Password",
        signInButton: "Sign In",
        createAccountButton: "Create Account"
    },
    profile: {
        skillVerification: "Skill Verification",
        selectTrade: "Select Your Trade",
        selectPlaceholder: "Select a skill...",
        clickToUpload: "Click to upload proof",
        dragDrop: "or drag and drop video/certificate",
        verifying: "Verifying with AI...",
        uploadVerify: "Upload & Verify Skill",
        verificationComplete: "Verification Complete!",
        proofValidated: "Your proof has been validated.",
        aiScore: "AI Skill Score",
        trades: {
            plumber: "Plumber",
            electrician: "Electrician",
            carpenter: "Carpenter",
            welder: "Welder",
            mason: "Mason",
            designer: "Designer"
        }
    },
    search: {
        title: "Find Professionals",
        subtitle: "Connect with verified skilled workers in your area.",
        searchPlaceholder: "Search by name or location...",
        verified: "Verified",
        contact: "Contact",
        noWorkersNotFound: "No workers found matching your criteria.",
        allSkills: "All"
    },
    jobs: {
        title: "Jobs Near You",
        subtitle: "Find opportunities based on your location",
        filterDistance: "Filter by Distance",
        km: "km",
        apply: "Apply Now",
        description: "Job Description",
        salary: "Salary",
        posted: "Posted",
        requirements: "Requirements",
        selectJob: "Select a job on the map to view details",
        locationPermission: "Please enable location access to see jobs near you.",
        loadingLocation: "Detecting your location...",
        searchLocation: "Search location..."
    }
};

// Hindi Translations
const translationHI = {
    navbar: {
        findWorkers: "कामगार खोजें",
        findJobs: "पास की नौकरियां",
        workerProfile: "कामगार प्रोफाइल",
        signIn: "लॉग इन करें",
        signIn: "लॉग इन करें",
        language: "भाषा"
    },
    common: {
        goOnline: "ऑनलाइन जाएं",
        youAreOnline: "आप ऑनलाइन हैं",
        instantHire: "तुरंत हायर करें (10 मिनट)",
        bookNow: "अभी बुक करें",
        searchingNearby: "आस-पास नौकरियां खोजी जा रही हैं...",
        searchingNearby: "आस-पास नौकरियां खोजी जा रही हैं...",
        locationActive: "लोकेशन सक्रिय",
        locating: "लोकेशन ढूंढी जा रही है..."
    },
    match: {
        finding: "आपके पास {{skill}} खोज रहा है...",
        scanning: "2 किमी के दायरे में स्कैनिंग",
        found: "आपके पास कामगार मिला",
        callNow: "अभी कॉल करें",
        cancel: "खोज रद्द करें",
        connecting: "{{name}} से कनेक्ट कर रहा है..."
    },
    auth: {
        login: "लॉग इन",
        signup: "साइन अप",
        welcomeBack: "वापस स्वागत है",
        createAccount: "खाता बनाएं",
        loginSubtitle: "अपने खाते तक पहुंचने के लिए विवरण दर्ज करें",
        signupSubtitle: "आज ही हजारों कुशल कामगारों से जुड़ें",
        fullName: "पूरा नाम",
        phoneEmail: "फ़ोन नंबर / ईमेल",
        iAmA: "मैं एक...",
        worker: "कुशल कामगार हूँ",
        employer: "ठेकेदार / नियोक्ता हूँ",
        password: "पासवर्ड",
        signInButton: "लॉग इन करें",
        createAccountButton: "खाता बनाएं"
    },
    profile: {
        skillVerification: "कौशल सत्यापन",
        selectTrade: "अपना व्यवसाय चुनें",
        selectPlaceholder: "एक कौशल चुनें...",
        clickToUpload: "प्रमाण अपलोड करने के लिए क्लिक करें",
        dragDrop: "या वीडियो/प्रमाणपत्र यहाँ खींचें",
        verifying: "AI के साथ सत्यापन हो रहा है...",
        uploadVerify: "अपलोड और कौशल सत्यापित करें",
        verificationComplete: "सत्यापन पूरा हुआ!",
        proofValidated: "आपका प्रमाण मान्य कर दिया गया है।",
        aiScore: "AI कौशल स्कोर",
        trades: {
            plumber: "प्लंबर",
            electrician: "इलेक्ट्रीशियन",
            carpenter: "बढ़ई",
            welder: "वेल्डर",
            mason: "राजमिस्त्री",
            designer: "डिज़ाइनर"
        }
    },
    search: {
        title: "पेशेवर खोजें",
        subtitle: "अपने क्षेत्र में सत्यापित कुशल कामगारों से जुड़ें।",
        searchPlaceholder: "नाम या स्थान से खोजें...",
        verified: "सत्यापित",
        contact: "संपर्क करें",
        noWorkersNotFound: "आपके मानदंडों से मेल खाने वाले कोई कामगार नहीं मिले।",
        allSkills: "सभी"
    },
    jobs: {
        title: "आपके पास की नौकरियां",
        subtitle: "अपने स्थान के आधार पर अवसर खोजें",
        filterDistance: "दूरी के अनुसार फ़िल्टर करें",
        km: "किमी",
        apply: "अभी आवेदन करें",
        description: "नौकरी का विवरण",
        salary: "वेतन",
        posted: "पोस्ट किया गया",
        requirements: "आवश्यकताएँ",
        selectJob: "विवरण देखने के लिए मानचित्र पर नौकरी चुनें",
        locationPermission: "कृपया अपने आस-पास की नौकरियां देखने के लिए लोकेशन एक्सेस सक्षम करें।",
        loadingLocation: "आपके स्थान का पता लगाया जा रहा है...",
        searchLocation: "स्थान खोजें..."
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: translationEN
            },
            hi: {
                translation: translationHI
            }
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
