import { LanguageCode } from '../types';

export interface WeatherWidgetTranslations {
  title: string;
  subtitle: string;
  currentTemp: string;
  feelsLike: string;
  humidity: string;
  rainProbability: string;
  todayPeakRain: string;
  precipitation: string;
  windSpeed: string;
  farmingAdvisory: string;
  sprayingAdvice: string;
  irrigationAdvice: string;
  hourlyForecast: string;
  dailyForecast: string;
  detectLocation: string;
  gpsActive: string;
  gpsInactive: string;
  refresh: string;
  searchPlaceholder: string;
  loading: string;
  errorGps: string;
  usePreset: string;
  viewDetails: string;
  hideDetails: string;
  updatedAt: string;
  conditions: {
    clear: string;
    cloudy: string;
    rain: string;
    drizzle: string;
    thunderstorm: string;
    fog: string;
  };
}

export const weatherTranslations: Record<LanguageCode, WeatherWidgetTranslations> = {
  en: {
    title: "Live Farm Weather",
    subtitle: "Real-time field conditions & agricultural insights",
    currentTemp: "Temperature",
    feelsLike: "Feels like",
    humidity: "Air Humidity",
    rainProbability: "Rain Probability",
    todayPeakRain: "Today's Peak Rain Risk",
    precipitation: "Precipitation",
    windSpeed: "Wind Speed",
    farmingAdvisory: "Farming Advisory",
    sprayingAdvice: "Spraying Advisory",
    irrigationAdvice: "Irrigation Advisory",
    hourlyForecast: "Upcoming Hours",
    dailyForecast: "3-Day Forecast",
    detectLocation: "Use Device GPS",
    gpsActive: "GPS Location Active",
    gpsInactive: "Default / Selected Region",
    refresh: "Refresh Weather",
    searchPlaceholder: "Search district or village...",
    loading: "Fetching real-time farm weather...",
    errorGps: "Location permission denied. Showing default agricultural region.",
    usePreset: "Quick Regions",
    viewDetails: "View Forecast & Advisories",
    hideDetails: "Hide Forecast",
    updatedAt: "Updated",
    conditions: {
      clear: "Clear / Sunny",
      cloudy: "Cloudy",
      rain: "Rainy",
      drizzle: "Drizzle",
      thunderstorm: "Thunderstorm",
      fog: "Foggy / Mist"
    }
  },
  hi: {
    title: "खेत का लाइव मौसम",
    subtitle: "रीयल-टाइम मौसम और किसान कृषि सलाह",
    currentTemp: "तापमान",
    feelsLike: "अनुभव तापमान",
    humidity: "हवा में नमी",
    rainProbability: "बारिश की संभावना",
    todayPeakRain: "आज बारिश का अधिकतम जोखिम",
    precipitation: "वर्षा मात्रा",
    windSpeed: "हवा की गति",
    farmingAdvisory: "किसान मौसम सलाह",
    sprayingAdvice: "कीटनाशक छिड़काव सलाह",
    irrigationAdvice: "सिंचाई सलाह",
    hourlyForecast: "अगले कुछ घंटे",
    dailyForecast: "3 दिवसीय पूर्वानुमान",
    detectLocation: "डिवाइस GPS से स्थान लें",
    gpsActive: "GPS स्थान सक्रिय",
    gpsInactive: "चुना हुआ क्षेत्र",
    refresh: "ताज़ा करें",
    searchPlaceholder: "जिला या गांव खोजें...",
    loading: "खेत का ताजा मौसम लोड हो रहा है...",
    errorGps: "लोकेशन अनुमति अस्वीकृत। मानक कृषि क्षेत्र का मौसम दिखाया जा रहा है।",
    usePreset: "त्वरित क्षेत्र",
    viewDetails: "पूर्वानुमान और सलाह देखें",
    hideDetails: "पूर्वानुमान छुपाएं",
    updatedAt: "अपडेट",
    conditions: {
      clear: "साफ़ / धूप",
      cloudy: "बादल",
      rain: "बारिश",
      drizzle: "बूंदाबांदी",
      thunderstorm: "गरज के साथ बारिश",
      fog: "कोहरा / धुंध"
    }
  },
  pa: {
    title: "ਖੇਤ ਦਾ ਲਾਈਵ ਮੌਸਮ",
    subtitle: "ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਲਾਹ",
    currentTemp: "ਤਾਪਮਾਨ",
    feelsLike: "ਮਹਿਸੂਸ ਤਾਪਮਾਨ",
    humidity: "ਨਮੀ",
    rainProbability: "ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ",
    todayPeakRain: "ਅੱਜ ਮੀਂਹ ਦਾ ਸਭ ਤੋਂ ਵੱਧ ਖਤਰਾ",
    precipitation: "ਬਰਸਾਤ",
    windSpeed: "ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ",
    farmingAdvisory: "ਖੇਤੀ ਮੌਸਮ ਸਲਾਹ",
    sprayingAdvice: "ਛਿੜਕਾਅ ਸਲਾਹ",
    irrigationAdvice: "ਸਿੰਚਾਈ ਸਲਾਹ",
    hourlyForecast: "ਅਗਲੇ ਕੁਝ ਘੰਟੇ",
    dailyForecast: "3-ਦਿਨਾ ਪੂਰਵ ਅਨੁਮਾਨ",
    detectLocation: "GPS ਲੋਕੇਸ਼ਨ ਲਵੋ",
    gpsActive: "GPS ਲੋਕੇਸ਼ਨ ਚਾਲੂ",
    gpsInactive: "ਚੁਣਿਆ ਹੋਇਆ ਇਲਾਕਾ",
    refresh: "ਤਾਜ਼ਾ ਕਰੋ",
    searchPlaceholder: "ਜ਼ਿਲ੍ਹਾ ਜਾਂ ਪਿੰਡ ਲੱਭੋ...",
    loading: "ਖੇਤ ਦਾ ਤਾਜ਼ਾ ਮੌਸਮ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    errorGps: "ਲੋਕੇਸ਼ਨ ਆਗਿਆ ਨਹੀਂ ਮਿਲੀ। ਮਿਆਰੀ ਖੇਤਰ ਦਿਖਾਇਆ ਜਾ ਰਿਹਾ ਹੈ।",
    usePreset: "ਪ੍ਰਸਿੱਧ ਖੇਤਰ",
    viewDetails: "ਵੇਰਵੇ ਦੇਖੋ",
    hideDetails: "ਵੇਰਵੇ ਛੁਪਾਓ",
    updatedAt: "ਅੱਪਡੇਟ",
    conditions: {
      clear: "ਸਾਫ਼ ਧੁੱਪ",
      cloudy: "ਬੱਦਲਵਾਈ",
      rain: "ਮੀਂਹ",
      drizzle: "ਹਲਕੀ ਬੂੰਦਾਬਾਂਦੀ",
      thunderstorm: "ਗਰਜ ਨਾਲ ਤੂਫ਼ਾਨ",
      fog: "ਧੁੰਦ"
    }
  },
  bn: {
    title: "খামারের লাইভ আবহাওয়া",
    subtitle: "রিয়েল-টাইম ক্ষেত্র পরিস্থিতি ও কৃষি পরামর্শ",
    currentTemp: "তাপমাত্রা",
    feelsLike: "অনুভূত তাপমাত্রা",
    humidity: "বাতাসের আর্দ্রতা",
    rainProbability: "বৃষ্টির সম্ভাবনা",
    todayPeakRain: "আজকের বৃষ্টির সর্বোচ্চ ঝুঁকি",
    precipitation: "বৃষ্টিপাত",
    windSpeed: "বাতাসের গতি",
    farmingAdvisory: "কৃষি আবহাওয়া পরামর্শ",
    sprayingAdvice: "স্প্রে করার পরামর্শ",
    irrigationAdvice: "সেচ পরামর্শ",
    hourlyForecast: "পরবর্তী কয়েক ঘণ্টা",
    dailyForecast: "৩ দিনের পূর্বাভাস",
    detectLocation: "ডিভাইস জিপিএস ব্যবহার করুন",
    gpsActive: "জিপিএস অবস্থান সক্রিয়",
    gpsInactive: "নির্বাচিত এলাকা",
    refresh: "আবহাওয়া রিফ্রেশ",
    searchPlaceholder: "জেলা বা গ্রাম খুঁজুন...",
    loading: "আবহাওয়ার তথ্য লোড হচ্ছে...",
    errorGps: "লোকেশন অনুমতি অস্বীকৃত। ডিফল্ট এলাকা দেখানো হচ্ছে।",
    usePreset: "জনপ্রিয় এলাকা",
    viewDetails: "পূর্বাভাস ও পরামর্শ দেখুন",
    hideDetails: "পূর্বাভাস লুকান",
    updatedAt: "আপডেট",
    conditions: {
      clear: "পরিষ্কার রোদ",
      cloudy: "মেঘলা",
      rain: "বৃষ্টি",
      drizzle: "ঝিরিঝিরি বৃষ্টি",
      thunderstorm: "বজ্রবিদ্যুৎ সহ ঝড়",
      fog: "কুয়াশা"
    }
  },
  mr: {
    title: "शेताचे लाईव्ह हवामान",
    subtitle: "रिअल-टाइम हवामान आणि कृषी सल्ला",
    currentTemp: "तापमान",
    feelsLike: "जाणवणारे तापमान",
    humidity: "हवेतील आर्द्रता",
    rainProbability: "पावसाची शक्यता",
    todayPeakRain: "आज पावसाचा सर्वाधिक धोका",
    precipitation: "पर्जन्यमान",
    windSpeed: "वाऱ्याचा वेग",
    farmingAdvisory: "शेतकरी हवामान सल्ला",
    sprayingAdvice: "फवारणी सल्ला",
    irrigationAdvice: "सिंचन सल्ला",
    hourlyForecast: "पुढील काही तास",
    dailyForecast: "३ दिवसांचा अंदाज",
    detectLocation: "GPS लोकेशन वापरा",
    gpsActive: "GPS लोकेशन सक्रिय",
    gpsInactive: "निवडलेला विभाग",
    refresh: "ताजे करा",
    searchPlaceholder: "जिल्हा किंवा गाव शोधा...",
    loading: "हवामान माहिती लोड होत आहे...",
    errorGps: "लोकेशन परवानगी नाकारली. नेहमीचा विभाग दाखवला जात आहे.",
    usePreset: "महत्त्वाचे विभाग",
    viewDetails: "तपशील व सल्ला पहा",
    hideDetails: "तपशील लपवा",
    updatedAt: "अपडेट",
    conditions: {
      clear: "निरभ्र / ऊन",
      cloudy: "ढगाळ",
      rain: "पाऊस",
      drizzle: "रिमझिम",
      thunderstorm: "वादळी पाऊस",
      fog: "धुके"
    }
  },
  gu: {
    title: "ખેતરનું લાઈવ હવામાન",
    subtitle: "રીઅલ-ટાઇમ હવામાન અને ખેતી સલાહ",
    currentTemp: "તાપમાન",
    feelsLike: "અનુભવાતું તાપમાન",
    humidity: "હવામાં ભેજ",
    rainProbability: "વરસાદની શક્યતા",
    todayPeakRain: "આજનો મહત્તમ વરસાદી જોખમ",
    precipitation: "વરસાદ",
    windSpeed: "પવનની ઝડપ",
    farmingAdvisory: "ખેતી હવામાન સલાહ",
    sprayingAdvice: "દવા છંટકાવ સલાહ",
    irrigationAdvice: "પિયત સલાહ",
    hourlyForecast: "આગામી કલાકો",
    dailyForecast: "૩ દિવસની આગાહી",
    detectLocation: "GPS સ્થાન લો",
    gpsActive: "GPS સ્થાન સક્રિય",
    gpsInactive: "પસંદ કરેલ પ્રદેશ",
    refresh: "રીફ્રેશ કરો",
    searchPlaceholder: "જિલ્લો કે ગામ શોધો...",
    loading: "હવામાન માહિતી લવાઈ રહી છે...",
    errorGps: "સ્થાન પરવાનગી નકારી. સામાન્ય પ્રદેશ દર્શાવાઈ રહ્યો છે.",
    usePreset: "ઝડપી પ્રદેશો",
    viewDetails: "આગાહી અને સલાહ જુઓ",
    hideDetails: "વિગતો છુપાવો",
    updatedAt: "અપડેટ",
    conditions: {
      clear: "સ્વચ્છ / તડકો",
      cloudy: "વાદળછાયું",
      rain: "વરસાદ",
      drizzle: "ઝરમર",
      thunderstorm: "ગાજવીજ સાથે વરસાદ",
      fog: "ધુમ્મસ"
    }
  },
  te: {
    title: "వ్యవసాయ ప్రత్యక్ష వాతావరణం",
    subtitle: "నిజ-సమయ వాతావరణం & సాగు సలహాలు",
    currentTemp: "ఉష్ణోగ్రత",
    feelsLike: "అనిపించే ఉష్ణోగ్రత",
    humidity: "గాలిలో తేమ",
    rainProbability: "వర్షం పడే అవకాశం",
    todayPeakRain: "ఈ రోజు గరిష్ట వర్ష ప్రమాదం",
    precipitation: "వర్షపాతం",
    windSpeed: "గాలి వేగం",
    farmingAdvisory: "రైతు వాతావరణ సలహా",
    sprayingAdvice: "మందుల పిచికారీ సలహా",
    irrigationAdvice: "నీటిపారుదల సలహా",
    hourlyForecast: "రాబోయే గంటలు",
    dailyForecast: "3-రోజుల సూచన",
    detectLocation: "GPS స్థానాన్ని వాడండి",
    gpsActive: "GPS స్థానం క్రియాశీలం",
    gpsInactive: "ఎంచుకున్న ప్రాంతం",
    refresh: "తాజాకరించు",
    searchPlaceholder: "జిల్లా లేదా గ్రామం వెతకండి...",
    loading: "వాతావరణ డేటా లోడ్ అవుతోంది...",
    errorGps: "స్థాన అనుమతి నిరాకరించబడింది. డిఫాల్ట్ ప్రాంతం చూపబడుతోంది.",
    usePreset: "ముఖ్య ప్రాంతాలు",
    viewDetails: "వివరాలు చూడండి",
    hideDetails: "వివరాలు దాచు",
    updatedAt: "నవీకరించబడింది",
    conditions: {
      clear: "స్పష్టమైన ఎండ",
      cloudy: "మేఘావృతం",
      rain: "వర్షం",
      drizzle: "తుంపర్లు",
      thunderstorm: "ఉరుములతో కూడిన వర్షం",
      fog: "పొగమంచు"
    }
  },
  kn: {
    title: "ಜಮೀನಿನ ನೇರ ಹವಾಮಾನ",
    subtitle: "ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳು",
    currentTemp: "ತಾಪಮಾನ",
    feelsLike: "ಅನುಭವವಾಗುವ ತಾಪಮಾನ",
    humidity: "ಗಾಳಿಯಲ್ಲಿ ತೇವಾಂಶ",
    rainProbability: "ಮಳೆಯ ಸಂಭವನೀಯತೆ",
    todayPeakRain: "ಇಂದಿನ ಗರಿಷ್ಠ ಮಳೆ ಅಪಾಯ",
    precipitation: "ಮಳೆ ಪ್ರಮಾಣ",
    windSpeed: "ಗಾಳಿಯ ವೇಗ",
    farmingAdvisory: "ರೈತ ಹವಾಮಾನ ಸಲಹೆ",
    sprayingAdvice: "ಸಿಂಪಡಣೆ ಸಲಹೆ",
    irrigationAdvice: "ನೀರಾವರಿ ಸಲಹೆ",
    hourlyForecast: "ಮುಂದಿನ ಗಂಟೆಗಳು",
    dailyForecast: "3-ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
    detectLocation: "GPS ಸ್ಥಳ ಬಳಸಿ",
    gpsActive: "GPS ಸ್ಥಳ ಸಕ್ರಿಯ",
    gpsInactive: "ಆಯ್ಕೆಮಾಡಿದ ಪ್ರದೇಶ",
    refresh: "ನವೀಕರಿಸಿ",
    searchPlaceholder: "ಜಿಲ್ಲೆ ಅಥವಾ ಗ್ರಾಮ ಹುಡುಕಿ...",
    loading: "ಹವಾಮಾನ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    errorGps: "ಸ್ಥಳದ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಡೀಫಾಲ್ಟ್ ಪ್ರದೇಶ ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
    usePreset: "ಮುಖ್ಯ ಪ್ರದೇಶಗಳು",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    hideDetails: "ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ",
    updatedAt: "ಅಪ್‌ಡೇಟ್",
    conditions: {
      clear: "ಸ್ವಚ್ಛ ಬಿಸಿಲು",
      cloudy: "ಮೋಡ ಕವಿದ",
      rain: "ಮಳೆ",
      drizzle: "ತುಂತುರು ಮಳೆ",
      thunderstorm: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
      fog: "ಮಂಜು"
    }
  },
  rwr: {
    title: "खेत को जीवंत मौसम",
    subtitle: "ताजा मौसम अर किसान भाईयां खातर सलाह",
    currentTemp: "तापमान",
    feelsLike: "लागण आळो ताप",
    humidity: "हवा में नमी",
    rainProbability: "बरसात की संभावना",
    todayPeakRain: "आज मेह को घणो जोखिम",
    precipitation: "बारिश",
    windSpeed: "पवण की रफ्तार",
    farmingAdvisory: "किसान मौसम सलाह",
    sprayingAdvice: "छिड़काव सलाह",
    irrigationAdvice: "सिंचाई सलाह",
    hourlyForecast: "आगामी घंटां",
    dailyForecast: "३ दिनां को अनुमान",
    detectLocation: "जीपीएस सूं जगह लो",
    gpsActive: "GPS लोकेशन चालू",
    gpsInactive: "चुणी हुई जगह",
    refresh: "ताजो करो",
    searchPlaceholder: "जिलो या गांव खोजो...",
    loading: "मौसम को हाल लोड हो रह्यो है...",
    errorGps: "लोकेशन नी मिली। सामान्य क्षेत्र को मौसम दिखा रह्या हां।",
    usePreset: "खास इलाका",
    viewDetails: "पूरी जानकारी देखो",
    hideDetails: "जानकारी छुपाओ",
    updatedAt: "अपडेट",
    conditions: {
      clear: "साफ धूप",
      cloudy: "बादळ",
      rain: "मेह / बारिश",
      drizzle: "छांटा-छूंटी",
      thunderstorm: "गाज-बीजली",
      fog: "धुंध"
    }
  },
  bgc: {
    title: "खेत का लाइव मौसम",
    subtitle: "ताजा मौसम और जमींदारां खातर सलाह",
    currentTemp: "तापमान",
    feelsLike: "लागण आळा तापमान",
    humidity: "हवा में नमी",
    rainProbability: "बरसात की उम्मीद",
    todayPeakRain: "आज मींह का सबतैं घना जोखिम",
    precipitation: "बारिश",
    windSpeed: "हवा की चाल",
    farmingAdvisory: "किसान मौसम सलाह",
    sprayingAdvice: "स्प्रे की सलाह",
    irrigationAdvice: "सिंचाई की सलाह",
    hourlyForecast: "आगले घंटे",
    dailyForecast: "३ दिनां का अनुमान",
    detectLocation: "GPS तैं जगह लो",
    gpsActive: "GPS लोकेशन चालू",
    gpsInactive: "चुणी हुई जगह",
    refresh: "ताजा करो",
    searchPlaceholder: "जिला या गाम खोजो...",
    loading: "मौसम की खबर आवै है...",
    errorGps: "लोकेशन ना मिली। आम क्षेत्र का मौसम दिखावै सैं।",
    usePreset: "खास इलाके",
    viewDetails: "पूरी खबर देखो",
    hideDetails: "खबर छुपाओ",
    updatedAt: "अपडेट",
    conditions: {
      clear: "साफ धूप",
      cloudy: "बादळ",
      rain: "मींह / बारिश",
      drizzle: "बूंदाबांदी",
      thunderstorm: "गाज तैं बारिश",
      fog: "धुंध"
    }
  },
  bho: {
    title: "खेत के लाइव मौसम",
    subtitle: "ताजा मौसम आउर किसान सलाह",
    currentTemp: "तापमान",
    feelsLike: "महसूस होखे वाला तापमान",
    humidity: "हवा में नमी",
    rainProbability: "बरसात के संभावना",
    todayPeakRain: "आज पानी बरसे के जादे जोखिम",
    precipitation: "बरसात",
    windSpeed: "हवा के रफ्तार",
    farmingAdvisory: "किसान मौसम सलाह",
    sprayingAdvice: "छिड़काव सलाह",
    irrigationAdvice: "सिंचाई सलाह",
    hourlyForecast: "आवे वाला घंटा",
    dailyForecast: "३ दिन के अनुमान",
    detectLocation: "GPS से जगह चुनीं",
    gpsActive: "GPS लोकेशन चालू बा",
    gpsInactive: "चुनल इलाका",
    refresh: "ताजा करीं",
    searchPlaceholder: "जिला भा गाँव खोजीं...",
    loading: "मौसम के जानकारी आवत बा...",
    errorGps: "लोकेशन अनुमति ना मिलल। डिफ़ॉल्ट इलाका देखावल जा रहल बा।",
    usePreset: "खास इलाका",
    viewDetails: "विस्तार देखीं",
    hideDetails: "विस्तार छुपाईं",
    updatedAt: "अपडेट",
    conditions: {
      clear: "साफ घाम",
      cloudy: "बादल",
      rain: "बरसात / पानी",
      drizzle: "फुहार",
      thunderstorm: "बिजली-गरज",
      fog: "कुहासा"
    }
  }
};
