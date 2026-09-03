export type Language = 'en' | 'hi' | 'mr' | 'pa' | 'gu' | 'ta' | 'te' | 'kn' | 'bn' | 'ml' | 'or' | 'as' | 'ur' | 'kok' | 'ks';

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
  pa: 'ਪੰਜਾਬੀ',
  gu: 'ગુજરાતી',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  bn: 'বাংলা',
  ml: 'മലയാളം',
  or: 'ଓଡ଼ିଆ',
  as: 'অসমীয়া',
  ur: 'اردو',
  kok: 'कोंकणी',
  ks: 'کٲشُر',
};

export const REGION_LANGUAGE_MAP: Record<string, Language> = {
  'Maharashtra': 'mr',
  'Punjab': 'pa',
  'Haryana': 'hi',
  'Uttar Pradesh': 'hi',
  'Madhya Pradesh': 'hi',
  'Rajasthan': 'hi',
  'Bihar': 'hi',
  'Uttarakhand': 'hi',
  'Himachal Pradesh': 'hi',
  'Jharkhand': 'hi',
  'Chhattisgarh': 'hi',
  'Delhi': 'hi',
  'Gujarat': 'gu',
  'Karnataka': 'kn',
  'Tamil Nadu': 'ta',
  'Andhra Pradesh': 'te',
  'Telangana': 'te',
  'Kerala': 'ml',
  'West Bengal': 'bn',
  'Odisha': 'or',
  'Assam': 'as',
  'Goa': 'kok',
  'Jammu & Kashmir': 'ks',
  'Manipur': 'hi',
  'Meghalaya': 'hi',
  'Mizoram': 'hi',
  'Nagaland': 'hi',
  'Sikkim': 'hi',
  'Tripura': 'bn',
  'Arunachal Pradesh': 'hi',
};

export interface Translations {
  nav: {
    home: string;
    scan: string;
    chat: string;
    history: string;
    profile: string;
    schemes: string;
    support: string;
  };
  home: {
    greeting_morning: string;
    greeting_afternoon: string;
    greeting_evening: string;
    subtitle: string;
    total_scans: string;
    issues_found: string;
    healthy_crops: string;
    quick_actions: string;
    crop_analysis: string;
    ask_krishimitra: string;
    gov_schemes: string;
    farmer_support: string;
    recent_analysis: string;
    weather: string;
    no_analysis: string;
    start_first_scan: string;
  };
  analysis: {
    crop_analysis: string;
    soil_analysis: string;
    upload_image: string;
    take_photo: string;
    select_gallery: string;
    analyze_crop: string;
    analyze_soil: string;
    analyzing: string;
    analysis_complete: string;
    upload_hint: string;
    diagnosis: string;
    recommendations: string;
    treatment_steps: string;
    preventive_measures: string;
    confidence: string;
    new_analysis: string;
    status_healthy: string;
    status_disease: string;
    status_attention: string;
  };
  chat: {
    title: string;
    placeholder: string;
    send: string;
    listening: string;
    greeting: string;
    suggestions: string[];
  };
  profile: {
    title: string;
    personal_info: string;
    name: string;
    phone: string;
    region: string;
    primary_crop: string;
    farm_size: string;
    language: string;
    edit: string;
    save: string;
    cancel: string;
    reset: string;
    reset_confirm: string;
    account: string;
    logout: string;
    create_account: string;
  };
  auth: {
    login: string;
    register: string;
    phone: string;
    pin: string;
    pin_hint: string;
    name: string;
    region: string;
    submit_login: string;
    submit_register: string;
    switching: string;
    no_account: string;
    have_account: string;
    guest: string;
    welcome_back: string;
    create_account: string;
    secure_hint: string;
  };
  schemes: {
    title: string;
    subtitle: string;
    apply_now: string;
    learn_more: string;
    eligibility: string;
    benefit: string;
    how_to_apply: string;
  };
  support: {
    title: string;
    subtitle: string;
    helplines: string;
    call_now: string;
    available_24x7: string;
    financial_help: string;
    mental_health: string;
    you_are_not_alone: string;
    talk_to_expert: string;
    success_stories: string;
    legal_aid: string;
    emergency_message: string;
  };
  common: {
    loading: string;
    error: string;
    back: string;
    next: string;
    save: string;
    cancel: string;
    submit: string;
    retry: string;
    offline_message: string;
    offline_title: string;
    app_name: string;
  };
}

const en: Translations = {
  nav: {
    home: 'Home',
    scan: 'Scan',
    chat: 'Chat',
    history: 'History',
    profile: 'Profile',
    schemes: 'Schemes',
    support: 'Support',
  },
  home: {
    greeting_morning: 'Good Morning',
    greeting_afternoon: 'Good Afternoon',
    greeting_evening: 'Good Evening',
    subtitle: 'Ready to care for your crops today?',
    total_scans: 'Total Scans',
    issues_found: 'Issues Found',
    healthy_crops: 'Healthy Crops',
    quick_actions: 'Quick Actions',
    crop_analysis: 'Crop Analysis',
    ask_krishimitra: 'Ask KrishiMitra',
    gov_schemes: 'Government Schemes',
    farmer_support: 'Farmer Support',
    recent_analysis: 'Recent Analysis',
    weather: 'Live Weather',
    no_analysis: 'No analysis yet',
    start_first_scan: 'Start your first crop scan',
  },
  analysis: {
    crop_analysis: 'Crop Analysis',
    soil_analysis: 'Soil Analysis',
    upload_image: 'Upload Image',
    take_photo: 'Open Camera',
    select_gallery: 'Select from Gallery',
    analyze_crop: 'Analyze Crop',
    analyze_soil: 'Analyze Soil',
    analyzing: 'Analyzing...',
    analysis_complete: 'Analysis Complete',
    upload_hint: 'Drag & drop or click to select',
    diagnosis: 'Diagnosis',
    recommendations: 'Recommendations',
    treatment_steps: 'Treatment Steps',
    preventive_measures: 'Preventive Measures',
    confidence: 'Confidence',
    new_analysis: 'New Analysis',
    status_healthy: 'Healthy',
    status_disease: 'Disease Detected',
    status_attention: 'Needs Attention',
  },
  chat: {
    title: 'KrishiMitra Chat',
    placeholder: 'Ask about your crops, soil or weather...',
    send: 'Send',
    listening: 'Listening...',
    greeting: 'Namaste! I am KrishiMitra, your farming assistant. How can I help you today?',
    suggestions: ['What fertilizer for wheat?', 'How to treat yellow leaves?', 'Best crops for monsoon?'],
  },
  profile: {
    title: 'My Profile',
    personal_info: 'Personal Information',
    name: 'Name',
    phone: 'Phone Number',
    region: 'Region / State',
    primary_crop: 'Primary Crop',
    farm_size: 'Farm Size',
    language: 'Language',
    edit: 'Edit Profile',
    save: 'Save Changes',
    cancel: 'Cancel',
    reset: 'Reset Profile',
    reset_confirm: 'This will clear all your data. Are you sure?',
    account: 'Account',
    logout: 'Logout',
    create_account: 'Create Account',
  },
  auth: {
    login: 'Login',
    register: 'Register',
    phone: 'Mobile Number',
    pin: '4-Digit PIN',
    pin_hint: 'Choose a 4-digit PIN you can remember',
    name: 'Your Name',
    region: 'Your State',
    submit_login: 'Login',
    submit_register: 'Create Account',
    switching: 'Continue as Guest',
    no_account: "Don't have an account?",
    have_account: 'Already have an account?',
    guest: 'Use as Guest',
    welcome_back: 'Welcome Back',
    create_account: 'Create Account',
    secure_hint: 'Your data is secure and private',
  },
  schemes: {
    title: 'Government Schemes',
    subtitle: 'Benefits available for Indian farmers',
    apply_now: 'Apply Now',
    learn_more: 'Learn More',
    eligibility: 'Eligibility',
    benefit: 'Benefit',
    how_to_apply: 'How to Apply',
  },
  support: {
    title: 'Farmer Support',
    subtitle: 'You are not alone. Help is always available.',
    helplines: 'Helplines',
    call_now: 'Call Now',
    available_24x7: 'Available 24×7',
    financial_help: 'Financial Help',
    mental_health: 'Mental Health',
    you_are_not_alone: 'You are not alone',
    talk_to_expert: 'Talk to Expert',
    success_stories: 'Success Stories',
    legal_aid: 'Legal Aid for Debt',
    emergency_message: 'If you are in crisis, please call immediately.',
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong. Please try again.',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    retry: 'Retry',
    offline_message: 'You are offline. Some features may not work.',
    offline_title: 'No Internet',
    app_name: 'KrishiMitra',
  },
};

const hi: Translations = {
  nav: {
    home: 'होम',
    scan: 'स्कैन',
    chat: 'चैट',
    history: 'इतिहास',
    profile: 'प्रोफाइल',
    schemes: 'योजनाएं',
    support: 'सहायता',
  },
  home: {
    greeting_morning: 'शुभ प्रभात',
    greeting_afternoon: 'नमस्ते',
    greeting_evening: 'शुभ संध्या',
    subtitle: 'आज अपनी फसल की देखभाल के लिए तैयार हैं?',
    total_scans: 'कुल स्कैन',
    issues_found: 'समस्याएं मिलीं',
    healthy_crops: 'स्वस्थ फसलें',
    quick_actions: 'त्वरित क्रियाएं',
    crop_analysis: 'फसल विश्लेषण',
    ask_krishimitra: 'KrishiMitra से पूछें',
    gov_schemes: 'सरकारी योजनाएं',
    farmer_support: 'किसान सहायता',
    recent_analysis: 'हाल का विश्लेषण',
    weather: 'लाइव मौसम',
    no_analysis: 'अभी तक कोई विश्लेषण नहीं',
    start_first_scan: 'अपना पहला फसल स्कैन शुरू करें',
  },
  analysis: {
    crop_analysis: 'फसल विश्लेषण',
    soil_analysis: 'मिट्टी विश्लेषण',
    upload_image: 'फोटो अपलोड करें',
    take_photo: 'कैमरा खोलें',
    select_gallery: 'गैलरी से चुनें',
    analyze_crop: 'फसल जांचें',
    analyze_soil: 'मिट्टी जांचें',
    analyzing: 'जांच हो रही है...',
    analysis_complete: 'विश्लेषण पूरा',
    upload_hint: 'फोटो यहाँ डालें या क्लिक करें',
    diagnosis: 'निदान',
    recommendations: 'सुझाव',
    treatment_steps: 'उपचार के कदम',
    preventive_measures: 'बचाव के उपाय',
    confidence: 'निश्चितता',
    new_analysis: 'नई जांच',
    status_healthy: 'स्वस्थ',
    status_disease: 'बीमारी मिली',
    status_attention: 'ध्यान चाहिए',
  },
  chat: {
    title: 'KrishiMitra चैट',
    placeholder: 'फसल, मिट्टी या मौसम के बारे में पूछें...',
    send: 'भेजें',
    listening: 'सुन रहे हैं...',
    greeting: 'नमस्ते! मैं KrishiMitra हूँ, आपका खेती सहायक। आज मैं आपकी कैसे मदद कर सकता हूँ?',
    suggestions: ['गेहूं के लिए कौन सी खाद?', 'पीली पत्तियों का इलाज कैसे करें?', 'बारिश में कौन सी फसल बोएं?'],
  },
  profile: {
    title: 'मेरी प्रोफाइल',
    personal_info: 'व्यक्तिगत जानकारी',
    name: 'नाम',
    phone: 'मोबाइल नंबर',
    region: 'राज्य / क्षेत्र',
    primary_crop: 'मुख्य फसल',
    farm_size: 'खेत का आकार',
    language: 'भाषा',
    edit: 'प्रोफाइल संपादित करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    reset: 'प्रोफाइल रीसेट करें',
    reset_confirm: 'यह आपका सारा डेटा मिटा देगा। क्या आप सुनिश्चित हैं?',
    account: 'खाता',
    logout: 'लॉग आउट',
    create_account: 'खाता बनाएं',
  },
  auth: {
    login: 'लॉग इन',
    register: 'पंजीकरण',
    phone: 'मोबाइल नंबर',
    pin: '4-अंकीय पिन',
    pin_hint: 'एक 4 अंकीय पिन चुनें जो आपको याद रहे',
    name: 'आपका नाम',
    region: 'आपका राज्य',
    submit_login: 'लॉग इन करें',
    submit_register: 'खाता बनाएं',
    switching: 'अतिथि के रूप में जारी रखें',
    no_account: 'खाता नहीं है?',
    have_account: 'पहले से खाता है?',
    guest: 'अतिथि के रूप में उपयोग करें',
    welcome_back: 'वापस आपका स्वागत है',
    create_account: 'खाता बनाएं',
    secure_hint: 'आपका डेटा सुरक्षित और निजी है',
  },
  schemes: {
    title: 'सरकारी योजनाएं',
    subtitle: 'भारतीय किसानों के लिए उपलब्ध लाभ',
    apply_now: 'अभी आवेदन करें',
    learn_more: 'अधिक जानें',
    eligibility: 'पात्रता',
    benefit: 'लाभ',
    how_to_apply: 'आवेदन कैसे करें',
  },
  support: {
    title: 'किसान सहायता',
    subtitle: 'आप अकेले नहीं हैं। मदद हमेशा उपलब्ध है।',
    helplines: 'हेल्पलाइन',
    call_now: 'अभी कॉल करें',
    available_24x7: '24×7 उपलब्ध',
    financial_help: 'आर्थिक सहायता',
    mental_health: 'मानसिक स्वास्थ्य',
    you_are_not_alone: 'आप अकेले नहीं हैं',
    talk_to_expert: 'विशेषज्ञ से बात करें',
    success_stories: 'सफलता की कहानियां',
    legal_aid: 'कर्ज के लिए कानूनी सहायता',
    emergency_message: 'अगर आप संकट में हैं, तो कृपया तुरंत कॉल करें।',
  },
  common: {
    loading: 'लोड हो रहा है...',
    error: 'कुछ गलत हो गया। कृपया फिर कोशिश करें।',
    back: 'वापस',
    next: 'आगे',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    submit: 'जमा करें',
    retry: 'पुनः प्रयास',
    offline_message: 'आप ऑफलाइन हैं। कुछ सुविधाएं काम नहीं कर सकतीं।',
    offline_title: 'इंटरनेट नहीं है',
    app_name: 'KrishiMitra',
  },
};

const mr: Translations = {
  nav: {
    home: 'मुख्यपृष्ठ',
    scan: 'स्कॅन',
    chat: 'चॅट',
    history: 'इतिहास',
    profile: 'प्रोफाइल',
    schemes: 'योजना',
    support: 'मदत',
  },
  home: {
    greeting_morning: 'शुभ प्रभात',
    greeting_afternoon: 'नमस्कार',
    greeting_evening: 'शुभ संध्याकाळ',
    subtitle: 'आज आपल्या पिकांची काळजी घेण्यास तयार आहात?',
    total_scans: 'एकूण स्कॅन',
    issues_found: 'समस्या आढळल्या',
    healthy_crops: 'निरोगी पिके',
    quick_actions: 'त्वरित क्रिया',
    crop_analysis: 'पीक विश्लेषण',
    ask_krishimitra: 'KrishiMitra ला विचारा',
    gov_schemes: 'सरकारी योजना',
    farmer_support: 'शेतकरी मदत',
    recent_analysis: 'अलीकडील विश्लेषण',
    weather: 'थेट हवामान',
    no_analysis: 'अद्याप कोणतेही विश्लेषण नाही',
    start_first_scan: 'आपला पहिला पीक स्कॅन सुरू करा',
  },
  analysis: {
    crop_analysis: 'पीक विश्लेषण',
    soil_analysis: 'माती विश्लेषण',
    upload_image: 'फोटो अपलोड करा',
    take_photo: 'कॅमेरा उघडा',
    select_gallery: 'गॅलरीतून निवडा',
    analyze_crop: 'पीक तपासा',
    analyze_soil: 'माती तपासा',
    analyzing: 'तपासत आहे...',
    analysis_complete: 'विश्लेषण पूर्ण',
    upload_hint: 'फोटो येथे टाका किंवा क्लिक करा',
    diagnosis: 'निदान',
    recommendations: 'शिफारसी',
    treatment_steps: 'उपचाराचे टप्पे',
    preventive_measures: 'प्रतिबंधात्मक उपाय',
    confidence: 'निश्चितता',
    new_analysis: 'नवीन विश्लेषण',
    status_healthy: 'निरोगी',
    status_disease: 'रोग आढळला',
    status_attention: 'लक्ष हवे',
  },
  chat: {
    title: 'KrishiMitra चॅट',
    placeholder: 'पीक, माती किंवा हवामानाबद्दल विचारा...',
    send: 'पाठवा',
    listening: 'ऐकत आहे...',
    greeting: 'नमस्कार! मी KrishiMitra आहे, आपला शेती सहाय्यक. आज मी आपली कशी मदत करू शकतो?',
    suggestions: ['गव्हासाठी कोणते खत?', 'पिवळ्या पानांवर उपाय?', 'पावसात कोणते पीक घ्यावे?'],
  },
  profile: {
    title: 'माझी प्रोफाइल',
    personal_info: 'वैयक्तिक माहिती',
    name: 'नाव',
    phone: 'मोबाइल नंबर',
    region: 'राज्य / प्रदेश',
    primary_crop: 'मुख्य पीक',
    farm_size: 'शेताचा आकार',
    language: 'भाषा',
    edit: 'प्रोफाइल संपादित करा',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    reset: 'प्रोफाइल रीसेट करा',
    reset_confirm: 'हे आपला सर्व डेटा मिटवेल. आपण खात्री आहात?',
    account: 'खाते',
    logout: 'लॉग आउट',
    create_account: 'खाते तयार करा',
  },
  auth: {
    login: 'लॉग इन',
    register: 'नोंदणी',
    phone: 'मोबाइल नंबर',
    pin: '4-अंकी पिन',
    pin_hint: '4 अंकी पिन निवडा जो तुम्हाला आठवेल',
    name: 'आपले नाव',
    region: 'आपले राज्य',
    submit_login: 'लॉग इन करा',
    submit_register: 'खाते तयार करा',
    switching: 'पाहुणे म्हणून सुरू ठेवा',
    no_account: 'खाते नाही?',
    have_account: 'आधीच खाते आहे?',
    guest: 'पाहुणे म्हणून वापरा',
    welcome_back: 'परत स्वागत आहे',
    create_account: 'खाते तयार करा',
    secure_hint: 'आपला डेटा सुरक्षित आणि खाजगी आहे',
  },
  schemes: {
    title: 'सरकारी योजना',
    subtitle: 'भारतीय शेतकऱ्यांसाठी उपलब्ध लाभ',
    apply_now: 'आता अर्ज करा',
    learn_more: 'अधिक जाणा',
    eligibility: 'पात्रता',
    benefit: 'लाभ',
    how_to_apply: 'अर्ज कसा करावा',
  },
  support: {
    title: 'शेतकरी मदत',
    subtitle: 'तुम्ही एकटे नाही आहात. मदत नेहमी उपलब्ध आहे.',
    helplines: 'हेल्पलाइन',
    call_now: 'आता कॉल करा',
    available_24x7: '24×7 उपलब्ध',
    financial_help: 'आर्थिक मदत',
    mental_health: 'मानसिक आरोग्य',
    you_are_not_alone: 'तुम्ही एकटे नाही आहात',
    talk_to_expert: 'तज्ञांशी बोला',
    success_stories: 'यशोगाथा',
    legal_aid: 'कर्जासाठी कायदेशीर मदत',
    emergency_message: 'जर तुम्ही संकटात असाल तर कृपया लगेच कॉल करा.',
  },
  common: {
    loading: 'लोड होत आहे...',
    error: 'काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.',
    back: 'मागे',
    next: 'पुढे',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    submit: 'सबमिट करा',
    retry: 'पुन्हा प्रयत्न करा',
    offline_message: 'तुम्ही ऑफलाइन आहात. काही सुविधा काम करणार नाहीत.',
    offline_title: 'इंटरनेट नाही',
    app_name: 'KrishiMitra',
  },
};

const pa: Translations = {
  nav: { home: 'ਘਰ', scan: 'ਸਕੈਨ', chat: 'ਚੈਟ', history: 'ਇਤਿਹਾਸ', profile: 'ਪ੍ਰੋਫਾਈਲ', schemes: 'ਯੋਜਨਾਵਾਂ', support: 'ਸਹਾਇਤਾ' },
  home: { greeting_morning: 'ਸ਼ੁਭ ਸਵੇਰ', greeting_afternoon: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', greeting_evening: 'ਸ਼ੁਭ ਸੰਧਿਆ', subtitle: 'ਅੱਜ ਆਪਣੀਆਂ ਫਸਲਾਂ ਦੀ ਦੇਖਭਾਲ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?', total_scans: 'ਕੁੱਲ ਸਕੈਨ', issues_found: 'ਸਮੱਸਿਆਵਾਂ ਮਿਲੀਆਂ', healthy_crops: 'ਸਿਹਤਮੰਦ ਫਸਲਾਂ', quick_actions: 'ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ', crop_analysis: 'ਫਸਲ ਵਿਸ਼ਲੇਸ਼ਣ', ask_krishimitra: 'KrishiMitra ਤੋਂ ਪੁੱਛੋ', gov_schemes: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ', farmer_support: 'ਕਿਸਾਨ ਸਹਾਇਤਾ', recent_analysis: 'ਤਾਜ਼ਾ ਵਿਸ਼ਲੇਸ਼ਣ', weather: 'ਲਾਈਵ ਮੌਸਮ', no_analysis: 'ਅਜੇ ਕੋਈ ਵਿਸ਼ਲੇਸ਼ਣ ਨਹੀਂ', start_first_scan: 'ਆਪਣਾ ਪਹਿਲਾ ਫਸਲ ਸਕੈਨ ਸ਼ੁਰੂ ਕਰੋ' },
  analysis: { crop_analysis: 'ਫਸਲ ਵਿਸ਼ਲੇਸ਼ਣ', soil_analysis: 'ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ', upload_image: 'ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ', take_photo: 'ਕੈਮਰਾ ਖੋਲ੍ਹੋ', select_gallery: 'ਗੈਲਰੀ ਤੋਂ ਚੁਣੋ', analyze_crop: 'ਫਸਲ ਜਾਂਚੋ', analyze_soil: 'ਮਿੱਟੀ ਜਾਂਚੋ', analyzing: 'ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...', analysis_complete: 'ਵਿਸ਼ਲੇਸ਼ਣ ਪੂਰਾ', upload_hint: 'ਫੋਟੋ ਇੱਥੇ ਪਾਓ ਜਾਂ ਕਲਿੱਕ ਕਰੋ', diagnosis: 'ਨਿਦਾਨ', recommendations: 'ਸੁਝਾਅ', treatment_steps: 'ਇਲਾਜ ਦੇ ਕਦਮ', preventive_measures: 'ਬਚਾਅ ਦੇ ਉਪਾਅ', confidence: 'ਭਰੋਸਾ', new_analysis: 'ਨਵੀਂ ਜਾਂਚ', status_healthy: 'ਸਿਹਤਮੰਦ', status_disease: 'ਬਿਮਾਰੀ ਮਿਲੀ', status_attention: 'ਧਿਆਨ ਚਾਹੀਦਾ' },
  chat: { title: 'KrishiMitra ਚੈਟ', placeholder: 'ਫਸਲ, ਮਿੱਟੀ ਜਾਂ ਮੌਸਮ ਬਾਰੇ ਪੁੱਛੋ...', send: 'ਭੇਜੋ', listening: 'ਸੁਣ ਰਹੇ ਹਾਂ...', greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ KrishiMitra ਹਾਂ, ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ।', suggestions: ['ਕਣਕ ਲਈ ਕਿਹੜੀ ਖਾਦ?', 'ਪੀਲੇ ਪੱਤਿਆਂ ਦਾ ਇਲਾਜ?', 'ਬਰਸਾਤ ਵਿੱਚ ਕਿਹੜੀ ਫਸਲ?'] },
  profile: { title: 'ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ', personal_info: 'ਨਿੱਜੀ ਜਾਣਕਾਰੀ', name: 'ਨਾਮ', phone: 'ਮੋਬਾਈਲ ਨੰਬਰ', region: 'ਰਾਜ / ਖੇਤਰ', primary_crop: 'ਮੁੱਖ ਫਸਲ', farm_size: 'ਖੇਤ ਦਾ ਆਕਾਰ', language: 'ਭਾਸ਼ਾ', edit: 'ਪ੍ਰੋਫਾਈਲ ਬਦਲੋ', save: 'ਸੁਰੱਖਿਅਤ ਕਰੋ', cancel: 'ਰੱਦ ਕਰੋ', reset: 'ਪ੍ਰੋਫਾਈਲ ਰੀਸੈੱਟ ਕਰੋ', reset_confirm: 'ਕੀ ਤੁਸੀਂ ਯਕੀਨੀ ਹੋ?', account: 'ਖਾਤਾ', logout: 'ਲੌਗ ਆਉਟ', create_account: 'ਖਾਤਾ ਬਣਾਓ' },
  auth: { login: 'ਲੌਗ ਇਨ', register: 'ਰਜਿਸਟਰ', phone: 'ਮੋਬਾਈਲ ਨੰਬਰ', pin: '4-ਅੰਕ ਪਿਨ', pin_hint: '4 ਅੰਕਾਂ ਵਾਲਾ ਪਿਨ ਚੁਣੋ', name: 'ਤੁਹਾਡਾ ਨਾਮ', region: 'ਤੁਹਾਡਾ ਰਾਜ', submit_login: 'ਲੌਗ ਇਨ ਕਰੋ', submit_register: 'ਖਾਤਾ ਬਣਾਓ', switching: 'ਮਹਿਮਾਨ ਵਜੋਂ ਜਾਰੀ ਰੱਖੋ', no_account: 'ਖਾਤਾ ਨਹੀਂ?', have_account: 'ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?', guest: 'ਮਹਿਮਾਨ ਵਜੋਂ ਵਰਤੋ', welcome_back: 'ਵਾਪਸ ਸੁਆਗਤ ਹੈ', create_account: 'ਖਾਤਾ ਬਣਾਓ', secure_hint: 'ਤੁਹਾਡਾ ਡੇਟਾ ਸੁਰੱਖਿਅਤ ਹੈ' },
  schemes: { title: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ', subtitle: 'ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਉਪਲਬਧ ਲਾਭ', apply_now: 'ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ', learn_more: 'ਹੋਰ ਜਾਣੋ', eligibility: 'ਯੋਗਤਾ', benefit: 'ਲਾਭ', how_to_apply: 'ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ' },
  support: { title: 'ਕਿਸਾਨ ਸਹਾਇਤਾ', subtitle: 'ਤੁਸੀਂ ਇਕੱਲੇ ਨਹੀਂ ਹੋ। ਮਦਦ ਹਮੇਸ਼ਾ ਉਪਲਬਧ ਹੈ।', helplines: 'ਹੈਲਪਲਾਈਨਾਂ', call_now: 'ਹੁਣੇ ਕਾਲ ਕਰੋ', available_24x7: '24×7 ਉਪਲਬਧ', financial_help: 'ਵਿੱਤੀ ਮਦਦ', mental_health: 'ਮਾਨਸਿਕ ਸਿਹਤ', you_are_not_alone: 'ਤੁਸੀਂ ਇਕੱਲੇ ਨਹੀਂ ਹੋ', talk_to_expert: 'ਮਾਹਰ ਨਾਲ ਗੱਲ ਕਰੋ', success_stories: 'ਸਫਲਤਾ ਦੀਆਂ ਕਹਾਣੀਆਂ', legal_aid: 'ਕਰਜ਼ੇ ਲਈ ਕਾਨੂੰਨੀ ਮਦਦ', emergency_message: 'ਜੇ ਤੁਸੀਂ ਸੰਕਟ ਵਿੱਚ ਹੋ, ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਕਾਲ ਕਰੋ।' },
  common: { loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...', error: 'ਕੁਝ ਗਲਤ ਹੋਇਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।', back: 'ਵਾਪਸ', next: 'ਅੱਗੇ', save: 'ਸੁਰੱਖਿਅਤ ਕਰੋ', cancel: 'ਰੱਦ ਕਰੋ', submit: 'ਜਮ੍ਹਾਂ ਕਰੋ', retry: 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ', offline_message: 'ਤੁਸੀਂ ਔਫਲਾਈਨ ਹੋ। ਕੁਝ ਸੁਵਿਧਾਵਾਂ ਕੰਮ ਨਹੀਂ ਕਰ ਸਕਦੀਆਂ।', offline_title: 'ਇੰਟਰਨੈੱਟ ਨਹੀਂ ਹੈ', app_name: 'KrishiMitra' },
};

const gu: Translations = {
  nav: { home: 'ઘર', scan: 'સ્કૅન', chat: 'ચૅટ', history: 'ઇતિહાસ', profile: 'પ્રોફાઇલ', schemes: 'યોજનાઓ', support: 'સહાય' },
  home: { greeting_morning: 'શુભ સવાર', greeting_afternoon: 'નમસ્તે', greeting_evening: 'શુભ સાંજ', subtitle: 'આજે તમારા પાક ની સંભાળ માટે તૈયાર છો?', total_scans: 'કુલ સ્કૅન', issues_found: 'સમસ્યાઓ મળી', healthy_crops: 'સ્વસ્થ પાક', quick_actions: 'ઝડપી ક્રિયાઓ', crop_analysis: 'પાક વિશ્લેષણ', ask_krishimitra: 'KrishiMitra ને પૂછો', gov_schemes: 'સરકારી યોજનાઓ', farmer_support: 'ખેડૂત સહાય', recent_analysis: 'તાજેતરનું વિશ્લેષણ', weather: 'જીવંત હવામાન', no_analysis: 'હજી કોઈ વિશ્લેષણ નહીં', start_first_scan: 'તમારું પ્રથમ પાક સ્કૅન શરૂ કરો' },
  analysis: { crop_analysis: 'પાક વિશ્લેષણ', soil_analysis: 'માટી વિશ્લેષણ', upload_image: 'ફોટો અપલોડ કરો', take_photo: 'કૅમેરા ખોલો', select_gallery: 'ગૅલેરીમાંથી પસંદ કરો', analyze_crop: 'પાક તપાસો', analyze_soil: 'માટી તપાસો', analyzing: 'તપાસ થઈ રહી છે...', analysis_complete: 'વિશ્લેષણ પૂર્ણ', upload_hint: 'ફોટો અહીં મૂકો અથવા ક્લિક કરો', diagnosis: 'નિદાન', recommendations: 'સૂચનો', treatment_steps: 'સારવારના પગલાં', preventive_measures: 'નિવારક ઉપાયો', confidence: 'વિશ્વાસ', new_analysis: 'નવું વિશ્લેષણ', status_healthy: 'સ્વસ્થ', status_disease: 'રોગ મળ્યો', status_attention: 'ધ્યાન જોઈએ' },
  chat: { title: 'KrishiMitra ચૅટ', placeholder: 'પાક, માટી અથવા હવામાન વિશે પૂછો...', send: 'મોકલો', listening: 'સાંભળી રહ્યા છીએ...', greeting: 'નમસ્તે! હું KrishiMitra છું, તમારો ખેતી સહાયક.', suggestions: ['ઘઉં માટે ખાતર?', 'પીળા પાન નો ઇલાજ?', 'ચોમાસામાં કઈ ખેતી?'] },
  profile: { title: 'મારી પ્રોફાઇલ', personal_info: 'વ્યક્તિગત માહિતી', name: 'નામ', phone: 'મોબાઇલ નંબર', region: 'રાજ્ય / વિસ્તાર', primary_crop: 'મુખ્ય પાક', farm_size: 'ખેતરનું કદ', language: 'ભાષા', edit: 'પ્રોફાઇલ સંપાદિત કરો', save: 'સાચવો', cancel: 'રદ કરો', reset: 'પ્રોફાઇલ રીસેટ કરો', reset_confirm: 'શું તમે ખાતરી છો?', account: 'ખાતું', logout: 'લૉગ આઉટ', create_account: 'ખાતું બનાવો' },
  auth: { login: 'લૉગ ઇન', register: 'નોંધણી', phone: 'મોબાઇલ નંબર', pin: '4-અંકનો પિન', pin_hint: '4 અંકનો પિન પસંદ કરો', name: 'તમારું નામ', region: 'તમારું રાજ્ય', submit_login: 'લૉગ ઇન કરો', submit_register: 'ખાતું બનાવો', switching: 'મહેમાન તરીકે ચાલુ રાખો', no_account: 'ખાતું નથી?', have_account: 'પહેલેથી ખાતું છે?', guest: 'મહેમાન તરીકે ઉપયોગ કરો', welcome_back: 'પાછા સ્વાગત છે', create_account: 'ખાતું બનાવો', secure_hint: 'તમારો ડૅટા સુરક્ષિત છે' },
  schemes: { title: 'સરકારી યોજનાઓ', subtitle: 'ભારતીય ખેડૂતો માટે ઉપલબ્ધ લાભ', apply_now: 'અત્યારે અરજી કરો', learn_more: 'વધુ જાણો', eligibility: 'પાત્રતા', benefit: 'લાભ', how_to_apply: 'અરજી કેવી રીતે કરવી' },
  support: { title: 'ખેડૂત સહાય', subtitle: 'તમે એકલા નથી. મદદ હંમેશા ઉપલબ્ધ છે.', helplines: 'હૅલ્પલાઇન', call_now: 'અત્યારે ફોન કરો', available_24x7: '24×7 ઉપલબ્ધ', financial_help: 'આર્થિક મદદ', mental_health: 'માનસિક સ્વાસ્થ્ય', you_are_not_alone: 'તમે એકલા નથી', talk_to_expert: 'નિષ્ણાત સાથે વાત કરો', success_stories: 'સફળતાની વાર્તાઓ', legal_aid: 'દેવા માટે કાનૂની સહાય', emergency_message: 'જો તમે સંકટમાં હો, કૃપા કરીને તરત ફોન કરો.' },
  common: { loading: 'લોડ થઈ રહ્યું છે...', error: 'કંઈ ખોટું થઈ ગયું. ફરી પ્રયાસ કરો.', back: 'પાછળ', next: 'આગળ', save: 'સાચવો', cancel: 'રદ કરો', submit: 'સબમિટ કરો', retry: 'ફરી પ્રયાસ', offline_message: 'તમે ઑફલાઇન છો. કેટલીક સુવિધાઓ કામ ન કરે.', offline_title: 'ઇન્ટરનેટ નથી', app_name: 'KrishiMitra' },
};

const ta: Translations = {
  nav: { home: 'முகப்பு', scan: 'ஸ்கேன்', chat: 'அரட்டை', history: 'வரலாறு', profile: 'சுயவிவரம்', schemes: 'திட்டங்கள்', support: 'உதவி' },
  home: { greeting_morning: 'காலை வணக்கம்', greeting_afternoon: 'மதிய வணக்கம்', greeting_evening: 'மாலை வணக்கம்', subtitle: 'இன்று உங்கள் பயிர்களை கவனிக்க தயாரா?', total_scans: 'மொத்த ஸ்கேன்கள்', issues_found: 'பிரச்சனைகள் கண்டறியப்பட்டன', healthy_crops: 'ஆரோக்கியமான பயிர்கள்', quick_actions: 'விரைவு செயல்கள்', crop_analysis: 'பயிர் பகுப்பாய்வு', ask_krishimitra: 'KrishiMitra கேளுங்கள்', gov_schemes: 'அரசு திட்டங்கள்', farmer_support: 'விவசாயி உதவி', recent_analysis: 'சமீபத்திய பகுப்பாய்வு', weather: 'நேரடி வானிலை', no_analysis: 'இன்னும் பகுப்பாய்வு இல்லை', start_first_scan: 'உங்கள் முதல் பயிர் ஸ்கேன் தொடங்குங்கள்' },
  analysis: { crop_analysis: 'பயிர் பகுப்பாய்வு', soil_analysis: 'மண் பகுப்பாய்வு', upload_image: 'படம் பதிவேற்றுங்கள்', take_photo: 'கேமரா திறங்கள்', select_gallery: 'தொகுப்பிலிருந்து தேர்வு', analyze_crop: 'பயிரை சோதியுங்கள்', analyze_soil: 'மண்ணை சோதியுங்கள்', analyzing: 'சோதிக்கப்படுகிறது...', analysis_complete: 'பகுப்பாய்வு முடிந்தது', upload_hint: 'படத்தை இங்கே இடுங்கள் அல்லது கிளிக் செய்யுங்கள்', diagnosis: 'நோயறிதல்', recommendations: 'பரிந்துரைகள்', treatment_steps: 'சிகிச்சை படிகள்', preventive_measures: 'தடுப்பு நடவடிக்கைகள்', confidence: 'நம்பகத்தன்மை', new_analysis: 'புதிய பகுப்பாய்வு', status_healthy: 'ஆரோக்கியம்', status_disease: 'நோய் கண்டறியப்பட்டது', status_attention: 'கவனம் தேவை' },
  chat: { title: 'KrishiMitra அரட்டை', placeholder: 'பயிர், மண் அல்லது வானிலை பற்றி கேளுங்கள்...', send: 'அனுப்பு', listening: 'கேட்கிறோம்...', greeting: 'வணக்கம்! நான் KrishiMitra, உங்கள் விவசாய உதவியாளர்.', suggestions: ['கோதுமைக்கு எரு?', 'மஞ்சள் இலைகளுக்கு தீர்வு?', 'மழைக்காலத்தில் என்ன பயிர்?'] },
  profile: { title: 'என் சுயவிவரம்', personal_info: 'தனிப்பட்ட தகவல்', name: 'பெயர்', phone: 'மொபைல் எண்', region: 'மாநிலம்', primary_crop: 'முக்கிய பயிர்', farm_size: 'நிலம் அளவு', language: 'மொழி', edit: 'சுயவிவரம் திருத்து', save: 'சேமி', cancel: 'ரத்து', reset: 'சுயவிவரம் மீட்டமை', reset_confirm: 'நீங்கள் உறுதியாக இருக்கிறீர்களா?', account: 'கணக்கு', logout: 'வெளியேறு', create_account: 'கணக்கு உருவாக்கு' },
  auth: { login: 'உள்நுழை', register: 'பதிவு', phone: 'மொபைல் எண்', pin: '4-இலக்க பின்', pin_hint: '4 இலக்க பின் தேர்வு செய்யுங்கள்', name: 'உங்கள் பெயர்', region: 'உங்கள் மாநிலம்', submit_login: 'உள்நுழைய', submit_register: 'கணக்கு உருவாக்கு', switching: 'விருந்தினராக தொடரவும்', no_account: 'கணக்கு இல்லையா?', have_account: 'ஏற்கனவே கணக்கு உள்ளதா?', guest: 'விருந்தினராக பயன்படுத்தவும்', welcome_back: 'மீண்டும் வரவேற்கிறோம்', create_account: 'கணக்கு உருவாக்கு', secure_hint: 'உங்கள் தரவு பாதுகாப்பானது' },
  schemes: { title: 'அரசு திட்டங்கள்', subtitle: 'இந்திய விவசாயிகளுக்கு கிடைக்கும் சலுகைகள்', apply_now: 'இப்போதே விண்ணப்பிக்கவும்', learn_more: 'மேலும் அறிக', eligibility: 'தகுதி', benefit: 'சலுகை', how_to_apply: 'எப்படி விண்ணப்பிக்கவும்' },
  support: { title: 'விவசாயி உதவி', subtitle: 'நீங்கள் தனியல்ல. உதவி எப்போதும் கிடைக்கும்.', helplines: 'உதவி எண்கள்', call_now: 'இப்போதே அழைக்கவும்', available_24x7: '24×7 கிடைக்கும்', financial_help: 'நிதி உதவி', mental_health: 'மன ஆரோக்கியம்', you_are_not_alone: 'நீங்கள் தனியல்ல', talk_to_expert: 'நிபுணரிடம் பேசுங்கள்', success_stories: 'வெற்றிக் கதைகள்', legal_aid: 'கடனுக்கு சட்ட உதவி', emergency_message: 'நீங்கள் நெருக்கடியில் இருந்தால், உடனடியாக அழைக்கவும்.' },
  common: { loading: 'ஏற்றுகிறது...', error: 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.', back: 'பின்', next: 'அடுத்து', save: 'சேமி', cancel: 'ரத்து', submit: 'சமர்ப்பி', retry: 'மீண்டும் முயற்சி', offline_message: 'நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். சில அம்சங்கள் வேலை செய்யாது.', offline_title: 'இணையம் இல்லை', app_name: 'KrishiMitra' },
};

const te: Translations = {
  nav: { home: 'హోమ్', scan: 'స్కాన్', chat: 'చాట్', history: 'చరిత్ర', profile: 'ప్రొఫైల్', schemes: 'పథకాలు', support: 'సహాయం' },
  home: { greeting_morning: 'శుభోదయం', greeting_afternoon: 'నమస్కారం', greeting_evening: 'శుభ సాయంత్రం', subtitle: 'ఈరోజు మీ పంటలను చూసుకోవడానికి సిద్ధంగా ఉన్నారా?', total_scans: 'మొత్తం స్కాన్లు', issues_found: 'సమస్యలు కనుగొనబడ్డాయి', healthy_crops: 'ఆరోగ్యకరమైన పంటలు', quick_actions: 'త్వరిత చర్యలు', crop_analysis: 'పంట విశ్లేషణ', ask_krishimitra: 'KrishiMitra అడగండి', gov_schemes: 'ప్రభుత్వ పథకాలు', farmer_support: 'రైతు సహాయం', recent_analysis: 'ఇటీవలి విశ్లేషణ', weather: 'లైవ్ వాతావరణం', no_analysis: 'ఇంకా విశ్లేషణ లేదు', start_first_scan: 'మీ మొదటి పంట స్కాన్ ప్రారంభించండి' },
  analysis: { crop_analysis: 'పంట విశ్లేషణ', soil_analysis: 'మట్టి విశ్లేషణ', upload_image: 'ఫోటో అప్లోడ్ చేయండి', take_photo: 'కెమెరా తెరవండి', select_gallery: 'గ్యాలరీ నుండి ఎంచుకోండి', analyze_crop: 'పంటను పరీక్షించండి', analyze_soil: 'మట్టిని పరీక్షించండి', analyzing: 'పరీక్షిస్తోంది...', analysis_complete: 'విశ్లేషణ పూర్తయింది', upload_hint: 'ఫోటోను ఇక్కడ ఉంచండి లేదా క్లిక్ చేయండి', diagnosis: 'రోగనిర్ణయం', recommendations: 'సిఫార్సులు', treatment_steps: 'చికిత్స దశలు', preventive_measures: 'నివారణ చర్యలు', confidence: 'నమ్మకం', new_analysis: 'కొత్త విశ్లేషణ', status_healthy: 'ఆరోగ్యకరం', status_disease: 'వ్యాధి కనుగొనబడింది', status_attention: 'శ్రద్ధ అవసరం' },
  chat: { title: 'KrishiMitra చాట్', placeholder: 'పంట, మట్టి లేదా వాతావరణం గురించి అడగండి...', send: 'పంపు', listening: 'వింటున్నాం...', greeting: 'నమస్కారం! నేను KrishiMitra, మీ వ్యవసాయ సహాయకుడు.', suggestions: ['గోధుమకు ఎరువు?', 'పసుపు ఆకులకు పరిష్కారం?', 'వర్షాకాలంలో ఏ పంట?'] },
  profile: { title: 'నా ప్రొఫైల్', personal_info: 'వ్యక్తిగత సమాచారం', name: 'పేరు', phone: 'మొబైల్ నంబర్', region: 'రాష్ట్రం', primary_crop: 'ప్రధాన పంట', farm_size: 'పొలం పరిమాణం', language: 'భాష', edit: 'ప్రొఫైల్ సవరించు', save: 'సేవ్ చేయి', cancel: 'రద్దు', reset: 'ప్రొఫైల్ రీసెట్', reset_confirm: 'మీరు నిర్ధారిస్తున్నారా?', account: 'ఖాతా', logout: 'లాగ్ అవుట్', create_account: 'ఖాతా సృష్టించు' },
  auth: { login: 'లాగిన్', register: 'నమోదు', phone: 'మొబైల్ నంబర్', pin: '4-అంకె పిన్', pin_hint: '4 అంకెల పిన్ ఎంచుకోండి', name: 'మీ పేరు', region: 'మీ రాష్ట్రం', submit_login: 'లాగిన్ చేయండి', submit_register: 'ఖాతా సృష్టించు', switching: 'అతిథిగా కొనసాగండి', no_account: 'ఖాతా లేదా?', have_account: 'ఇప్పటికే ఖాతా ఉందా?', guest: 'అతిథిగా ఉపయోగించు', welcome_back: 'తిరిగి స్వాగతం', create_account: 'ఖాతా సృష్టించు', secure_hint: 'మీ డేటా సురక్షితం' },
  schemes: { title: 'ప్రభుత్వ పథకాలు', subtitle: 'భారతీయ రైతులకు అందుబాటులో ఉన్న ప్రయోజనాలు', apply_now: 'ఇప్పుడే దరఖాస్తు చేయండి', learn_more: 'మరింత తెలుసుకోండి', eligibility: 'అర్హత', benefit: 'ప్రయోజనం', how_to_apply: 'దరఖాస్తు ఎలా చేయాలి' },
  support: { title: 'రైతు సహాయం', subtitle: 'మీరు ఒంటరిగా లేరు. సహాయం ఎల్లప్పుడూ అందుబాటులో ఉంది.', helplines: 'హెల్ప్‌లైన్లు', call_now: 'ఇప్పుడే కాల్ చేయండి', available_24x7: '24×7 అందుబాటు', financial_help: 'ఆర్థిక సహాయం', mental_health: 'మానసిక ఆరోగ్యం', you_are_not_alone: 'మీరు ఒంటరిగా లేరు', talk_to_expert: 'నిపుణుడితో మాట్లాడండి', success_stories: 'విజయగాథలు', legal_aid: 'రుణానికి న్యాయ సహాయం', emergency_message: 'మీరు సంక్షోభంలో ఉంటే, దయచేసి వెంటనే కాల్ చేయండి.' },
  common: { loading: 'లోడ్ అవుతోంది...', error: 'ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.', back: 'వెనుక', next: 'తదుపరి', save: 'సేవ్ చేయి', cancel: 'రద్దు', submit: 'సమర్పించు', retry: 'మళ్ళీ ప్రయత్నించు', offline_message: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. కొన్ని ఫీచర్లు పని చేయవు.', offline_title: 'ఇంటర్నెట్ లేదు', app_name: 'KrishiMitra' },
};

const kn: Translations = {
  nav: { home: 'ಮನೆ', scan: 'ಸ್ಕ್ಯಾನ್', chat: 'ಚಾಟ್', history: 'ಇತಿಹಾಸ', profile: 'ಪ್ರೊಫೈಲ್', schemes: 'ಯೋಜನೆಗಳು', support: 'ಸಹಾಯ' },
  home: { greeting_morning: 'ಶುಭ ಮುಂಜಾನೆ', greeting_afternoon: 'ನಮಸ್ಕಾರ', greeting_evening: 'ಶುಭ ಸಂಜೆ', subtitle: 'ಇಂದು ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ನೋಡಿಕೊಳ್ಳಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಾ?', total_scans: 'ಒಟ್ಟು ಸ್ಕ್ಯಾನ್‌ಗಳು', issues_found: 'ಸಮಸ್ಯೆಗಳು ಕಂಡುಬಂದವು', healthy_crops: 'ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳು', quick_actions: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು', crop_analysis: 'ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ', ask_krishimitra: 'KrishiMitra ಕೇಳಿ', gov_schemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', farmer_support: 'ರೈತ ಸಹಾಯ', recent_analysis: 'ಇತ್ತೀಚಿನ ವಿಶ್ಲೇಷಣೆ', weather: 'ನೇರ ಹವಾಮಾನ', no_analysis: 'ಇನ್ನೂ ವಿಶ್ಲೇಷಣೆ ಇಲ್ಲ', start_first_scan: 'ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ' },
  analysis: { crop_analysis: 'ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ', soil_analysis: 'ಮಣ್ಣು ವಿಶ್ಲೇಷಣೆ', upload_image: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', take_photo: 'ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ', select_gallery: 'ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆ ಮಾಡಿ', analyze_crop: 'ಬೆಳೆ ಪರೀಕ್ಷಿಸಿ', analyze_soil: 'ಮಣ್ಣು ಪರೀಕ್ಷಿಸಿ', analyzing: 'ಪರೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ...', analysis_complete: 'ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ', upload_hint: 'ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ಹಾಕಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ', diagnosis: 'ರೋಗನಿರ್ಣಯ', recommendations: 'ಶಿಫಾರಸುಗಳು', treatment_steps: 'ಚಿಕಿತ್ಸಾ ಹಂತಗಳು', preventive_measures: 'ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು', confidence: 'ವಿಶ್ವಾಸ', new_analysis: 'ಹೊಸ ವಿಶ್ಲೇಷಣೆ', status_healthy: 'ಆರೋಗ್ಯಕರ', status_disease: 'ರೋಗ ಕಂಡುಬಂದಿದೆ', status_attention: 'ಗಮನ ಬೇಕಾಗಿದೆ' },
  chat: { title: 'KrishiMitra ಚಾಟ್', placeholder: 'ಬೆಳೆ, ಮಣ್ಣು ಅಥವಾ ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ...', send: 'ಕಳುಹಿಸಿ', listening: 'ಕೇಳುತ್ತಿದ್ದೇವೆ...', greeting: 'ನಮಸ್ಕಾರ! ನಾನು KrishiMitra, ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ.', suggestions: ['ಗೋಧಿಗೆ ಗೊಬ್ಬರ?', 'ಹಳದಿ ಎಲೆಗಳಿಗೆ ಪರಿಹಾರ?', 'ಮಳೆಗಾಲದಲ್ಲಿ ಯಾವ ಬೆಳೆ?'] },
  profile: { title: 'ನನ್ನ ಪ್ರೊಫೈಲ್', personal_info: 'ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ', name: 'ಹೆಸರು', phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', region: 'ರಾಜ್ಯ', primary_crop: 'ಮುಖ್ಯ ಬೆಳೆ', farm_size: 'ಜಮೀನಿನ ಗಾತ್ರ', language: 'ಭಾಷೆ', edit: 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ', save: 'ಉಳಿಸಿ', cancel: 'ರದ್ದು', reset: 'ಪ್ರೊಫೈಲ್ ರೀಸೆಟ್', reset_confirm: 'ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?', account: 'ಖಾತೆ', logout: 'ಲಾಗ್ ಔಟ್', create_account: 'ಖಾತೆ ರಚಿಸಿ' },
  auth: { login: 'ಲಾಗಿನ್', register: 'ನೋಂದಣಿ', phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', pin: '4-ಅಂಕಿ ಪಿನ್', pin_hint: '4 ಅಂಕಿಯ ಪಿನ್ ಆಯ್ಕೆ ಮಾಡಿ', name: 'ನಿಮ್ಮ ಹೆಸರು', region: 'ನಿಮ್ಮ ರಾಜ್ಯ', submit_login: 'ಲಾಗಿನ್ ಮಾಡಿ', submit_register: 'ಖಾತೆ ರಚಿಸಿ', switching: 'ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ', no_account: 'ಖಾತೆ ಇಲ್ಲವೇ?', have_account: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?', guest: 'ಅತಿಥಿಯಾಗಿ ಬಳಸಿ', welcome_back: 'ಮರಳಿ ಸ್ವಾಗತ', create_account: 'ಖಾತೆ ರಚಿಸಿ', secure_hint: 'ನಿಮ್ಮ ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿದೆ' },
  schemes: { title: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', subtitle: 'ಭಾರತೀಯ ರೈತರಿಗೆ ಲಭ್ಯವಿರುವ ಪ್ರಯೋಜನಗಳು', apply_now: 'ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ', learn_more: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ', eligibility: 'ಅರ್ಹತೆ', benefit: 'ಪ್ರಯೋಜನ', how_to_apply: 'ಅರ್ಜಿ ಹೇಗೆ ಸಲ್ಲಿಸಬೇಕು' },
  support: { title: 'ರೈತ ಸಹಾಯ', subtitle: 'ನೀವು ಒಂಟಿಯಾಗಿಲ್ಲ. ಸಹಾಯ ಯಾವಾಗಲೂ ಲಭ್ಯ.', helplines: 'ಹೆಲ್ಪ್‌ಲೈನ್‌ಗಳು', call_now: 'ಈಗಲೇ ಕರೆ ಮಾಡಿ', available_24x7: '24×7 ಲಭ್ಯ', financial_help: 'ಆರ್ಥಿಕ ಸಹಾಯ', mental_health: 'ಮಾನಸಿಕ ಆರೋಗ್ಯ', you_are_not_alone: 'ನೀವು ಒಂಟಿಯಾಗಿಲ್ಲ', talk_to_expert: 'ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ', success_stories: 'ಯಶಸ್ಸಿನ ಕಥೆಗಳು', legal_aid: 'ಸಾಲಕ್ಕೆ ಕಾನೂನು ಸಹಾಯ', emergency_message: 'ನೀವು ಸಂಕಷ್ಟದಲ್ಲಿದ್ದರೆ, ತಕ್ಷಣ ಕರೆ ಮಾಡಿ.' },
  common: { loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', error: 'ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.', back: 'ಹಿಂದೆ', next: 'ಮುಂದೆ', save: 'ಉಳಿಸಿ', cancel: 'ರದ್ದು', submit: 'ಸಲ್ಲಿಸಿ', retry: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ', offline_message: 'ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ಕೆಲವು ವೈಶಿಷ್ಟ್ಯಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುವುದಿಲ್ಲ.', offline_title: 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲ', app_name: 'KrishiMitra' },
};

const bn: Translations = {
  nav: { home: 'হোম', scan: 'স্ক্যান', chat: 'চ্যাট', history: 'ইতিহাস', profile: 'প্রোফাইল', schemes: 'প্রকল্প', support: 'সহায়তা' },
  home: { greeting_morning: 'শুভ সকাল', greeting_afternoon: 'নমস্কার', greeting_evening: 'শুভ সন্ধ্যা', subtitle: 'আজ আপনার ফসলের যত্ন নিতে প্রস্তুত?', total_scans: 'মোট স্ক্যান', issues_found: 'সমস্যা পাওয়া গেছে', healthy_crops: 'সুস্থ ফসল', quick_actions: 'দ্রুত কাজ', crop_analysis: 'ফসল বিশ্লেষণ', ask_krishimitra: 'KrishiMitra জিজ্ঞেস করুন', gov_schemes: 'সরকারি প্রকল্প', farmer_support: 'কৃষক সহায়তা', recent_analysis: 'সাম্প্রতিক বিশ্লেষণ', weather: 'লাইভ আবহাওয়া', no_analysis: 'এখনও কোনো বিশ্লেষণ নেই', start_first_scan: 'আপনার প্রথম ফসল স্ক্যান শুরু করুন' },
  analysis: { crop_analysis: 'ফসল বিশ্লেষণ', soil_analysis: 'মাটি বিশ্লেষণ', upload_image: 'ছবি আপলোড করুন', take_photo: 'ক্যামেরা খুলুন', select_gallery: 'গ্যালারি থেকে নির্বাচন করুন', analyze_crop: 'ফসল পরীক্ষা করুন', analyze_soil: 'মাটি পরীক্ষা করুন', analyzing: 'পরীক্ষা করা হচ্ছে...', analysis_complete: 'বিশ্লেষণ সম্পূর্ণ', upload_hint: 'ছবি এখানে রাখুন বা ক্লিক করুন', diagnosis: 'রোগ নির্ণয়', recommendations: 'পরামর্শ', treatment_steps: 'চিকিৎসার ধাপ', preventive_measures: 'প্রতিরোধমূলক ব্যবস্থা', confidence: 'আস্থা', new_analysis: 'নতুন বিশ্লেষণ', status_healthy: 'সুস্থ', status_disease: 'রোগ পাওয়া গেছে', status_attention: 'মনোযোগ প্রয়োজন' },
  chat: { title: 'KrishiMitra চ্যাট', placeholder: 'ফসল, মাটি বা আবহাওয়া সম্পর্কে জিজ্ঞেস করুন...', send: 'পাঠান', listening: 'শুনছি...', greeting: 'নমস্কার! আমি KrishiMitra, আপনার কৃষি সহকারী।', suggestions: ['গম এর জন্য সার?', 'হলুদ পাতার সমাধান?', 'বর্ষায় কোন ফসল?'] },
  profile: { title: 'আমার প্রোফাইল', personal_info: 'ব্যক্তিগত তথ্য', name: 'নাম', phone: 'মোবাইল নম্বর', region: 'রাজ্য', primary_crop: 'প্রধান ফসল', farm_size: 'জমির আকার', language: 'ভাষা', edit: 'প্রোফাইল সম্পাদনা', save: 'সংরক্ষণ করুন', cancel: 'বাতিল', reset: 'প্রোফাইল রিসেট', reset_confirm: 'আপনি কি নিশ্চিত?', account: 'অ্যাকাউন্ট', logout: 'লগ আউট', create_account: 'অ্যাকাউন্ট তৈরি করুন' },
  auth: { login: 'লগইন', register: 'নিবন্ধন', phone: 'মোবাইল নম্বর', pin: '4-সংখ্যার পিন', pin_hint: '4 সংখ্যার পিন বেছে নিন', name: 'আপনার নাম', region: 'আপনার রাজ্য', submit_login: 'লগইন করুন', submit_register: 'অ্যাকাউন্ট তৈরি করুন', switching: 'অতিথি হিসেবে চালিয়ে যান', no_account: 'অ্যাকাউন্ট নেই?', have_account: 'ইতিমধ্যে অ্যাকাউন্ট আছে?', guest: 'অতিথি হিসেবে ব্যবহার করুন', welcome_back: 'আবার স্বাগত', create_account: 'অ্যাকাউন্ট তৈরি করুন', secure_hint: 'আপনার ডেটা নিরাপদ' },
  schemes: { title: 'সরকারি প্রকল্প', subtitle: 'ভারতীয় কৃষকদের জন্য উপলব্ধ সুবিধা', apply_now: 'এখনই আবেদন করুন', learn_more: 'আরও জানুন', eligibility: 'যোগ্যতা', benefit: 'সুবিধা', how_to_apply: 'কীভাবে আবেদন করবেন' },
  support: { title: 'কৃষক সহায়তা', subtitle: 'আপনি একা নন। সাহায্য সবসময় পাওয়া যায়।', helplines: 'হেল্পলাইন', call_now: 'এখনই কল করুন', available_24x7: '24×7 উপলব্ধ', financial_help: 'আর্থিক সহায়তা', mental_health: 'মানসিক স্বাস্থ্য', you_are_not_alone: 'আপনি একা নন', talk_to_expert: 'বিশেষজ্ঞের সাথে কথা বলুন', success_stories: 'সাফল্যের গল্প', legal_aid: 'ঋণের জন্য আইনি সহায়তা', emergency_message: 'যদি আপনি সংকটে থাকেন, অনুগ্রহ করে অবিলম্বে কল করুন।' },
  common: { loading: 'লোড হচ্ছে...', error: 'কিছু ভুল হয়েছে। আবার চেষ্টা করুন।', back: 'পিছনে', next: 'পরবর্তী', save: 'সংরক্ষণ', cancel: 'বাতিল', submit: 'জমা দিন', retry: 'আবার চেষ্টা', offline_message: 'আপনি অফলাইনে আছেন। কিছু বৈশিষ্ট্য কাজ করবে না।', offline_title: 'ইন্টারনেট নেই', app_name: 'KrishiMitra' },
};

const ml: Translations = {
  nav: { home: 'ഹോം', scan: 'സ്കാൻ', chat: 'ചാറ്റ്', history: 'ചരിത്രം', profile: 'പ്രൊഫൈൽ', schemes: 'പദ്ധതികൾ', support: 'സഹായം' },
  home: { greeting_morning: 'ശുഭ പ്രഭാതം', greeting_afternoon: 'നമസ്കാരം', greeting_evening: 'ശുഭ സന്ധ്യ', subtitle: 'ഇന്ന് നിങ്ങളുടെ വിളകളെ പരിചരിക്കാൻ തയ്യാറാണോ?', total_scans: 'മൊത്തം സ്കാനുകൾ', issues_found: 'പ്രശ്നങ്ങൾ കണ്ടെത്തി', healthy_crops: 'ആരോഗ്യകരമായ വിളകൾ', quick_actions: 'ദ്രുത പ്രവർത്തനങ്ങൾ', crop_analysis: 'വിള വിശകലനം', ask_krishimitra: 'KrishiMitra ചോദിക്കൂ', gov_schemes: 'സർക്കാർ പദ്ധതികൾ', farmer_support: 'കർഷക സഹായം', recent_analysis: 'സമീപകാല വിശകലനം', weather: 'തത്സമയ കാലാവസ്ഥ', no_analysis: 'ഇതുവരെ വിശകലനം ഇല്ല', start_first_scan: 'നിങ്ങളുടെ ആദ്യ വിള സ്കാൻ ആരംഭിക്കുക' },
  analysis: { crop_analysis: 'വിള വിശകലനം', soil_analysis: 'മണ്ണ് വിശകലനം', upload_image: 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക', take_photo: 'ക്യാമറ തുറക്കുക', select_gallery: 'ഗ്യാലറിയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക', analyze_crop: 'വിള പരിശോധിക്കുക', analyze_soil: 'മണ്ണ് പരിശോധിക്കുക', analyzing: 'പരിശോധിക്കുന്നു...', analysis_complete: 'വിശകലനം പൂർത്തിയായി', upload_hint: 'ഫോട്ടോ ഇവിടെ ഇടുക അല്ലെങ്കിൽ ക്ലിക്ക് ചെയ്യുക', diagnosis: 'രോഗനിർണ്ണയം', recommendations: 'ശുപാർശകൾ', treatment_steps: 'ചികിത്സാ ഘട്ടങ്ങൾ', preventive_measures: 'പ്രതിരോധ നടപടികൾ', confidence: 'വിശ്വാസ്യത', new_analysis: 'പുതിയ വിശകലനം', status_healthy: 'ആരോഗ്യകരം', status_disease: 'രോഗം കണ്ടെത്തി', status_attention: 'ശ്രദ്ധ ആവശ്യം' },
  chat: { title: 'KrishiMitra ചാറ്റ്', placeholder: 'വിള, മണ്ണ് അല്ലെങ്കിൽ കാലാവസ്ഥ കുറിച്ച് ചോദിക്കൂ...', send: 'അയയ്ക്കുക', listening: 'കേൾക്കുന്നു...', greeting: 'നമസ്കാരം! ഞാൻ KrishiMitra, നിങ്ങളുടെ കൃഷി സഹായി.', suggestions: ['ഗോതമ്പിന് വളം?', 'മഞ്ഞ ഇലകൾക്ക് പരിഹാരം?', 'മഴക്കാലത്ത് ഏത് വിള?'] },
  profile: { title: 'എന്റെ പ്രൊഫൈൽ', personal_info: 'വ്യക്തിഗത വിവരം', name: 'പേര്', phone: 'മൊബൈൽ നമ്പർ', region: 'സംസ്ഥാനം', primary_crop: 'പ്രധാന വിള', farm_size: 'ഭൂമിയുടെ വലിപ്പം', language: 'ഭാഷ', edit: 'പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക', save: 'സേവ് ചെയ്യുക', cancel: 'റദ്ദാക്കുക', reset: 'പ്രൊഫൈൽ റീസെറ്റ്', reset_confirm: 'നിങ്ങൾ ഉറപ്പാണോ?', account: 'അക്കൗണ്ട്', logout: 'ലോഗ് ഔട്ട്', create_account: 'അക്കൗണ്ട് ഉണ്ടാക്കുക' },
  auth: { login: 'ലോഗിൻ', register: 'രജിസ്ട്രേഷൻ', phone: 'മൊബൈൽ നമ്പർ', pin: '4-അക്ക പിൻ', pin_hint: '4 അക്കത്തിലുള്ള പിൻ തിരഞ്ഞെടുക്കുക', name: 'നിങ്ങളുടെ പേര്', region: 'നിങ്ങളുടെ സംസ്ഥാനം', submit_login: 'ലോഗിൻ ചെയ്യുക', submit_register: 'അക്കൗണ്ട് ഉണ്ടാക്കുക', switching: 'അതിഥിയായി തുടരുക', no_account: 'അക്കൗണ്ട് ഇല്ലേ?', have_account: 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?', guest: 'അതിഥിയായി ഉപയോഗിക്കുക', welcome_back: 'തിരിച്ചു സ്വാഗതം', create_account: 'അക്കൗണ്ട് ഉണ്ടാക്കുക', secure_hint: 'നിങ്ങളുടെ ഡേറ്റ സുരക്ഷിതമാണ്' },
  schemes: { title: 'സർക്കാർ പദ്ധതികൾ', subtitle: 'ഇന്ത്യൻ കർഷകർക്ക് ലഭ്യമായ ആനുകൂല്യങ്ങൾ', apply_now: 'ഇപ്പോൾ അപേക്ഷിക്കുക', learn_more: 'കൂടുതൽ അറിയുക', eligibility: 'യോഗ്യത', benefit: 'ആനുകൂല്യം', how_to_apply: 'എങ്ങനെ അപേക്ഷിക്കണം' },
  support: { title: 'കർഷക സഹായം', subtitle: 'നിങ്ങൾ ഒറ്റയ്ക്കല്ല. സഹായം എപ്പോഴും ലഭ്യമാണ്.', helplines: 'ഹെൽപ്‌ലൈനുകൾ', call_now: 'ഇപ്പോൾ വിളിക്കുക', available_24x7: '24×7 ലഭ്യം', financial_help: 'സാമ്പത്തിക സഹായം', mental_health: 'മാനസിക ആരോഗ്യം', you_are_not_alone: 'നിങ്ങൾ ഒറ്റയ്ക്കല്ല', talk_to_expert: 'വിദഗ്ധനോട് സംസാരിക്കുക', success_stories: 'വിജയഗാഥകൾ', legal_aid: 'കടത്തിന് നിയമ സഹായം', emergency_message: 'നിങ്ങൾ പ്രതിസന്ധിയിലാണെങ്കിൽ, ദയവായി ഉടൻ വിളിക്കുക.' },
  common: { loading: 'ലോഡ് ചെയ്യുന്നു...', error: 'എന്തോ തകരാർ സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.', back: 'പിന്നോട്ട്', next: 'അടുത്തത്', save: 'സേവ് ചെയ്യുക', cancel: 'റദ്ദാക്കുക', submit: 'സമർപ്പിക്കുക', retry: 'വീണ്ടും ശ്രമിക്കുക', offline_message: 'നിങ്ങൾ ഓഫ്‌ലൈനിലാണ്. ചില ഫീച്ചറുകൾ പ്രവർത്തിക്കില്ല.', offline_title: 'ഇന്റർനെറ്റ് ഇല്ല', app_name: 'KrishiMitra' },
};

const or: Translations = {
  nav: { home: 'ହୋମ', scan: 'ସ୍କ୍ୟାନ', chat: 'ଚ୍ୟାଟ', history: 'ଇତିହାସ', profile: 'ପ୍ରୋଫାଇଲ', schemes: 'ଯୋଜନା', support: 'ସହାୟତା' },
  home: { greeting_morning: 'ଶୁଭ ସକାଳ', greeting_afternoon: 'ନମସ୍କାର', greeting_evening: 'ଶୁଭ ସନ୍ଧ୍ୟା', subtitle: 'ଆଜି ଆପଣଙ୍କ ଫସଲ ଯତ୍ନ ନେବାକୁ ପ୍ରସ୍ତୁତ?', total_scans: 'ମୋଟ ସ୍କ୍ୟାନ', issues_found: 'ସମସ୍ୟା ମିଳିଛି', healthy_crops: 'ସୁସ୍ଥ ଫସଲ', quick_actions: 'ଦ୍ରୁତ କ୍ରିୟା', crop_analysis: 'ଫସଲ ବିଶ୍ଳେଷଣ', ask_krishimitra: 'KrishiMitra ପଚାରନ୍ତୁ', gov_schemes: 'ସରକାରୀ ଯୋଜନା', farmer_support: 'କୃଷକ ସହାୟତା', recent_analysis: 'ସାମ୍ପ୍ରତିକ ବିଶ୍ଳେଷଣ', weather: 'ଲାଇଭ ପାଣିପାଗ', no_analysis: 'ଏ ପର୍ଯ୍ୟନ୍ତ ବିଶ୍ଳେଷଣ ନାହିଁ', start_first_scan: 'ପ୍ରଥମ ଫସଲ ସ୍କ୍ୟାନ ଆରମ୍ଭ କରନ୍ତୁ' },
  analysis: { crop_analysis: 'ଫସଲ ବିଶ୍ଳେଷଣ', soil_analysis: 'ମାଟି ବିଶ୍ଳେଷଣ', upload_image: 'ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ', take_photo: 'କ୍ୟାମେରା ଖୋଲନ୍ତୁ', select_gallery: 'ଗ୍ୟାଲେରୀରୁ ବାଛନ୍ତୁ', analyze_crop: 'ଫସଲ ପରୀକ୍ଷା କରନ୍ତୁ', analyze_soil: 'ମାଟି ପରୀକ୍ଷା କରନ୍ତୁ', analyzing: 'ପରୀକ୍ଷା ହେଉଛି...', analysis_complete: 'ବିଶ୍ଳେଷଣ ସମ୍ପୂର୍ଣ', upload_hint: 'ଫଟୋ ଏଠାରେ ରଖନ୍ତୁ ବା କ୍ଲିକ କରନ୍ତୁ', diagnosis: 'ରୋଗ ନିଦାନ', recommendations: 'ସୁପାରିଶ', treatment_steps: 'ଚିକିତ୍ସା ଧାପ', preventive_measures: 'ପ୍ରତିରୋଧ ଉପାୟ', confidence: 'ବିଶ୍ୱାସ', new_analysis: 'ନୂଆ ବିଶ୍ଳେଷଣ', status_healthy: 'ସୁସ୍ଥ', status_disease: 'ରୋଗ ମିଳିଛି', status_attention: 'ଧ୍ୟାନ ଦରକାର' },
  chat: { title: 'KrishiMitra ଚ୍ୟାଟ', placeholder: 'ଫସଲ, ମାଟି ବା ପାଣିପାଗ ବିଷୟରେ ପଚାରନ୍ତୁ...', send: 'ପଠାନ୍ତୁ', listening: 'ଶୁଣୁଛୁ...', greeting: 'ନମସ୍କାର! ମୁଁ KrishiMitra, ଆପଣଙ୍କ କୃଷି ସହାୟକ।', suggestions: ['ଗହମ ପାଇଁ ସାର?', 'ହଳଦିଆ ପତ୍ରର ସମାଧାନ?', 'ବର୍ଷାରେ କେଉଁ ଫସଲ?'] },
  profile: { title: 'ମୋ ପ୍ରୋଫାଇଲ', personal_info: 'ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ', name: 'ନାମ', phone: 'ମୋବାଇଲ ନମ୍ବର', region: 'ରାଜ୍ୟ', primary_crop: 'ମୁଖ୍ୟ ଫସଲ', farm_size: 'ଜମି ଆକାର', language: 'ଭାଷା', edit: 'ପ୍ରୋଫାଇଲ ସମ୍ପାଦନ', save: 'ସଞ୍ଚୟ', cancel: 'ବାତିଲ', reset: 'ପ୍ରୋଫାଇଲ ରିସେଟ', reset_confirm: 'ଆପଣ ନିଶ୍ଚିତ?', account: 'ଖାତା', logout: 'ଲଗ ଆଉଟ', create_account: 'ଖାତା ଖୋଲନ୍ତୁ' },
  auth: { login: 'ଲଗ ଇନ', register: 'ପଞ୍ଜୀକରଣ', phone: 'ମୋବାଇଲ ନମ୍ବର', pin: '4-ଅଙ୍କ ପିନ', pin_hint: '4 ଅଙ୍କର ପିନ ବାଛନ୍ତୁ', name: 'ଆପଣଙ୍କ ନାମ', region: 'ଆପଣଙ୍କ ରାଜ୍ୟ', submit_login: 'ଲଗ ଇନ କରନ୍ତୁ', submit_register: 'ଖାତା ଖୋଲନ୍ତୁ', switching: 'ଅତିଥି ଭାବରେ ଜାରି ରଖନ୍ତୁ', no_account: 'ଖାତା ନାହିଁ?', have_account: 'ଆଗରୁ ଖାତା ଅଛି?', guest: 'ଅତିଥି ଭାବରେ ବ୍ୟବହାର', welcome_back: 'ସ୍ୱାଗତ', create_account: 'ଖାତା ଖୋଲନ୍ତୁ', secure_hint: 'ଆପଣଙ୍କ ଡାଟା ସୁରକ୍ଷିତ' },
  schemes: { title: 'ସରକାରୀ ଯୋଜନା', subtitle: 'ଭାରତୀୟ କୃଷକଙ୍କ ପାଇଁ ଉପଲବ୍ଧ ସୁବିଧା', apply_now: 'ଏବେ ଆବେଦନ କରନ୍ତୁ', learn_more: 'ଅଧିକ ଜାଣନ୍ତୁ', eligibility: 'ଯୋଗ୍ୟତା', benefit: 'ଲାଭ', how_to_apply: 'ଆବେଦନ କିପରି' },
  support: { title: 'କୃଷକ ସହାୟତା', subtitle: 'ଆପଣ ଏକୁଟିଆ ନୁହଁନ୍ତି। ସାହାଯ୍ୟ ସବୁ ସମୟ ମିଳିବ।', helplines: 'ହେଲ୍ପଲାଇନ', call_now: 'ଏବେ ଫୋନ କରନ୍ତୁ', available_24x7: '24×7 ଉପଲବ୍ଧ', financial_help: 'ଆର୍ଥିକ ସାହାଯ୍ୟ', mental_health: 'ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟ', you_are_not_alone: 'ଆପଣ ଏକୁଟିଆ ନୁହଁନ୍ତି', talk_to_expert: 'ବିଶେଷଜ୍ଞଙ୍କ ସହ କଥା', success_stories: 'ସଫଳତার ଗଳ୍ପ', legal_aid: 'ଋଣ ପାଇଁ ଆଇନ ସହାୟ', emergency_message: 'ଯଦି ଆପଣ ସଂଙ୍କଟରେ ଅଛନ୍ତି, ଦୟାକରି ତୁରନ୍ତ ଫୋନ କରନ୍ତୁ।' },
  common: { loading: 'ଲୋଡ ହେଉଛି...', error: 'କିଛି ଭୁଲ ହୋଇଗଲା। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।', back: 'ପଛକୁ', next: 'ଆଗକୁ', save: 'ସଞ୍ଚୟ', cancel: 'ବାତିଲ', submit: 'ଦାଖଲ', retry: 'ପୁଣି ଚେଷ୍ଟା', offline_message: 'ଆପଣ ଅଫଲାଇନ ଅଛନ୍ତି। କିଛି ସୁବିଧା କାମ ନ କରିପାରେ।', offline_title: 'ଇଣ୍ଟରନେଟ ନାହିଁ', app_name: 'KrishiMitra' },
};

// These additions retain English as a graceful fallback for less-common UI copy,
// while ensuring the selected language is used for AI responses and voice input.
const as: Translations = {
  ...en,
  nav: { ...en.nav, home: 'হোম', scan: 'স্কেন', chat: 'চেট', history: 'ইতিহাস', profile: 'প্ৰফাইল', schemes: 'আঁচনি', support: 'সহায়' },
  home: { ...en.home, greeting_morning: 'সুপ্ৰভাত', greeting_afternoon: 'নমস্কাৰ', greeting_evening: 'শুভ সন্ধিয়া', subtitle: 'আজি আপোনাৰ শস্যৰ যত্ন ল’বলৈ সাজু নে?', crop_analysis: 'শস্য বিশ্লেষণ', ask_krishimitra: 'KrishiMitraক সোধক', gov_schemes: 'চৰকাৰী আঁচনি', farmer_support: 'কৃষক সহায়', weather: 'সজীৱ বতৰ' },
  chat: { ...en.chat, title: 'KrishiMitra চেট', placeholder: 'শস্য, মাটি বা বতৰৰ বিষয়ে সোধক...', send: 'পঠাওক', listening: 'শুনিছে...' },
  profile: { ...en.profile, title: 'মোৰ প্ৰফাইল', language: 'ভাষা', region: 'ৰাজ্য / অঞ্চল', save: 'সংৰক্ষণ কৰক', cancel: 'বাতিল কৰক' },
  common: { ...en.common, loading: 'লোড হৈ আছে...', error: 'কিবা ভুল হ’ল। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।', back: 'পিছলৈ', next: 'আগলৈ', save: 'সংৰক্ষণ কৰক', cancel: 'বাতিল কৰক', retry: 'পুনৰ চেষ্টা কৰক' },
};

const ur: Translations = {
  ...en,
  nav: { ...en.nav, home: 'ہوم', scan: 'اسکین', chat: 'چیٹ', history: 'تاریخ', profile: 'پروفائل', schemes: 'اسکیمیں', support: 'مدد' },
  home: { ...en.home, greeting_morning: 'صبح بخیر', greeting_afternoon: 'آداب', greeting_evening: 'شام بخیر', subtitle: 'کیا آپ آج اپنی فصلوں کی دیکھ بھال کے لیے تیار ہیں؟', crop_analysis: 'فصل کا تجزیہ', ask_krishimitra: 'KrishiMitra سے پوچھیں', gov_schemes: 'سرکاری اسکیمیں', farmer_support: 'کسان مدد', weather: 'موسم' },
  chat: { ...en.chat, title: 'KrishiMitra چیٹ', placeholder: 'فصل، مٹی یا موسم کے بارے میں پوچھیں...', send: 'بھیجیں', listening: 'سن رہے ہیں...' },
  profile: { ...en.profile, title: 'میرا پروفائل', language: 'زبان', region: 'ریاست / علاقہ', save: 'محفوظ کریں', cancel: 'منسوخ کریں' },
  common: { ...en.common, loading: 'لوڈ ہو رہا ہے...', error: 'کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔', back: 'واپس', next: 'آگے', save: 'محفوظ کریں', cancel: 'منسوخ کریں', retry: 'دوبارہ کوشش کریں' },
};

const kok: Translations = {
  ...en,
  nav: { ...en.nav, home: 'मुखेल', scan: 'स्कॅन', chat: 'गप्पा', history: 'इतिहास', profile: 'प्रोफाइल', schemes: 'योजना', support: 'आदार' },
  home: { ...en.home, greeting_morning: 'सुप्रभात', greeting_afternoon: 'नमस्कार', greeting_evening: 'शुभ सांज', subtitle: 'आयज तुमच्या पिकांचो सांबाळ घेवपाक तयार आसा?', crop_analysis: 'पिक विश्लेषण', ask_krishimitra: 'KrishiMitra कडेन विचारात', gov_schemes: 'सरकारी योजना', farmer_support: 'शेतकार आदार', weather: 'थेट हवामान' },
  chat: { ...en.chat, title: 'KrishiMitra गप्पा', placeholder: 'पिकां, माती वा हवामानाविशीं विचारात...', send: 'धाडात', listening: 'आयकता...' },
  profile: { ...en.profile, title: 'म्हजो प्रोफाइल', language: 'भास', region: 'राज्य / प्रदेश', save: 'जतन करात', cancel: 'रद्द करात' },
  common: { ...en.common, loading: 'लोड जाता...', error: 'कितें तरी चुकलें. परत येत्न करात.', back: 'फाटीं', next: 'मुखार', save: 'जतन करात', cancel: 'रद्द करात', retry: 'परत येत्न करात' },
};

const ks: Translations = {
  ...en,
  nav: { ...en.nav, home: 'گَر', scan: 'سکین', chat: 'چیٹ', history: 'توٲریخ', profile: 'پروفائل', schemes: 'سکیم', support: 'مدد' },
  home: { ...en.home, greeting_morning: 'صُبح بخیر', greeting_afternoon: 'آداب', greeting_evening: 'شام بخیر', subtitle: 'کیاہ چھُو تُہۍ اَز پَننِی فصلَن ہُنٛد خیال تھاونہٕ خٲطرٕ تیار؟', crop_analysis: 'فصل تجزیہ', ask_krishimitra: 'KrishiMitra سٕتۍ پُژھیو', gov_schemes: 'سرکاری سکیم', farmer_support: 'کسان مدد', weather: 'موسم' },
  chat: { ...en.chat, title: 'KrishiMitra چیٹ', placeholder: 'فصل، مٔٹی یا موسم باپت پُژھیو...', send: 'پھیریو', listening: 'سُنان...' },
  profile: { ...en.profile, title: 'مےٚ پروفائل', language: 'زبان', region: 'ریاست / علاقہ', save: 'محفوظ کٔریو', cancel: 'منسوخ کٔریو' },
  common: { ...en.common, loading: 'لوڈ گژھان...', error: 'کینٛہہ گوٚ غلط۔ دوبارٕ کوشش کٔریو۔', back: 'واپس', next: 'اگےٚ', save: 'محفوظ کٔریو', cancel: 'منسوخ کٔریو', retry: 'دوبارٕ کوشش کٔریو' },
};

export const TRANSLATIONS: Record<Language, Translations> = {
  en, hi, mr, pa, gu, ta, te, kn, bn, ml, or, as, ur, kok, ks,
};
