import { ExternalLink, IndianRupee, Users, Leaf, Droplets, Sun, FileText, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

const schemes = [
  {
    id: "pm-kisan",
    icon: IndianRupee,
    color: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-700 dark:text-green-300",
    name: { en: "PM-Kisan Samman Nidhi", hi: "पीएम-किसान सम्मान निधि", mr: "पीएम-किसान सन्मान निधी", pa: "PM-ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ", gu: "PM-Kisan સન્માન નિધિ", ta: "PM-கிசான் சம்மான் நிதி", te: "PM-కిసాన్ సమ్మాన్ నిధి", kn: "PM-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ", bn: "PM-কিসান সম্মান নিধি", ml: "PM-കിസാൻ സമ്മാൻ നിധി", or: "PM- କିସାନ ସମ୍ମାନ ନିଧି" },
    benefit: { en: "₹6,000 per year in 3 installments of ₹2,000", hi: "₹2,000 की 3 किस्तों में ₹6,000 प्रति वर्ष", mr: "₹2,000 च्या 3 हप्त्यांमध्ये वार्षिक ₹6,000", pa: "₹2,000 ਦੀਆਂ 3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਸਾਲਾਨਾ ₹6,000", gu: "3 હप्तमें ₹6,000 વાર્ષિક", ta: "வருடத்திற்கு ₹6,000", te: "సంవత్సరానికి ₹6,000", kn: "ವರ್ಷಕ್ಕೆ ₹6,000", bn: "বছরে ₹6,000", ml: "വർഷത്തിൽ ₹6,000", or: "ବର୍ଷକୁ ₹6,000" },
    eligibility: { en: "All landholding farmer families", hi: "सभी भू-धारक किसान परिवार", mr: "सर्व शेतजमीन धारक कुटुंबे", pa: "ਸਾਰੇ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰ", gu: "તમામ ખેડૂત પરિવારો", ta: "அனைத்து விவசாயி குடும்பங்கள்", te: "భూమి కలిగిన రైతు కుటుంబాలు", kn: "ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳು", bn: "সকল ভূমিধারী কৃষক পরিবার", ml: "ഭൂമി ഉള്ള കർഷക കുടുംബങ്ങൾ", or: "ସଭି ଜମି ଧାରଣ ପରିବାର" },
    howToApply: { en: "Visit pmkisan.gov.in or nearest CSC center with Aadhaar & land records", hi: "आधार और जमीन के कागज लेकर pmkisan.gov.in या नजदीकी CSC केंद्र जाएं", mr: "pmkisan.gov.in किंवा जवळच्या CSC केंद्रावर आधार आणि जमीन कागदपत्रांसह जा", pa: "pmkisan.gov.in ਜਾਂ ਨਜ਼ਦੀਕੀ CSC ਕੇਂਦਰ ਤੇ ਜਾਓ", gu: "pmkisan.gov.in ✓", ta: "pmkisan.gov.in ✓", te: "pmkisan.gov.in ✓", kn: "pmkisan.gov.in ✓", bn: "pmkisan.gov.in ✓", ml: "pmkisan.gov.in ✓", or: "pmkisan.gov.in ✓" },
    link: "https://pmkisan.gov.in",
    badge: { en: "Direct Benefit", hi: "सीधा लाभ", mr: "थेट लाभ", pa: "ਸਿੱਧਾ ਲਾਭ", gu: "સીધો ♛", ta: "நேரடி ✓", te: "నేరుగా ✓", kn: "ನೇರ ✓", bn: "সরাসরি ✓", ml: "നേരിട്ട് ✓", or: "ସିଧା ✓" },
  },
  {
    id: "pmfby",
    icon: Leaf,
    color: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-700 dark:text-blue-300",
    name: { en: "PM Fasal Bima Yojana", hi: "प्रधानमंत्री फसल बीमा योजना", mr: "पंतप्रधान पीक विमा योजना", pa: "ਪ੍ਰਧਾਨਮੰਤਰੀ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ", gu: "PM ફસલ વીમા યોજના", ta: "PM பயிர் காப்பீட்டு திட்டம்", te: "PM పంట బీమా పథకం", kn: "PM ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ", bn: "PM ফসল বীমা প্রকল্প", ml: "PM ഫസൽ ഇൻഷുറൻസ്", or: "PM ଫସଲ ବୀମା" },
    benefit: { en: "Full crop loss covered for just 2% premium (Kharif) / 1.5% (Rabi)", hi: "मात्र 2% प्रीमियम (खरीफ) / 1.5% (रबी) में पूरी फसल हानि का मुआवजा", mr: "फक्त 2% प्रीमियम (खरीप) / 1.5% (रबी) मध्ये पूर्ण पीक नुकसान भरपाई", pa: "ਸਿਰਫ਼ 2% ਪ੍ਰੀਮੀਅਮ ਵਿੱਚ ਪੂਰੀ ਫਸਲ ਨੁਕਸਾਨ ਮੁਆਵਜ਼ਾ", gu: "2% પ્રીમિયમ ✓", ta: "2% பிரீமியம் ✓", te: "2% ప్రీమియంతో ✓", kn: "2% ಪ್ರೀಮಿಯಂ ✓", bn: "2% প্রিমিয়াম ✓", ml: "2% പ്രീമിയം ✓", or: "2% ପ୍ରିମିୟମ ✓" },
    eligibility: { en: "All farmers growing notified crops", hi: "सभी किसान जो अधिसूचित फसल उगाते हैं", mr: "अधिसूचित पिके घेणारे सर्व शेतकरी", pa: "ਸਾਰੇ ਕਿਸਾਨ ਜੋ ਨੋਟੀਫਾਈਡ ਫਸਲਾਂ ਉਗਾਉਂਦੇ ਹਨ", gu: "નોટીફ્ઇડ ✓", ta: "அனைத்து விவசாயிகள் ✓", te: "అన్ని రైతులు ✓", kn: "ಎಲ್ಲ ರೈತರು ✓", bn: "সকল কৃষক ✓", ml: "എല്ലാ കർഷകർ ✓", or: "ସଭି କୃଷକ ✓" },
    howToApply: { en: "Apply through bank, CSC or pmfby.gov.in before crop season starts", hi: "फसल मौसम शुरू होने से पहले बैंक, CSC या pmfby.gov.in के जरिए आवेदन करें", mr: "हंगाम सुरू होण्यापूर्वी बँक, CSC किंवा pmfby.gov.in द्वारे अर्ज करा", pa: "ਫਸਲ ਸੀਜ਼ਨ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਬੈਂਕ ਜਾਂ pmfby.gov.in ✓", gu: "pmfby.gov.in ✓", ta: "pmfby.gov.in ✓", te: "pmfby.gov.in ✓", kn: "pmfby.gov.in ✓", bn: "pmfby.gov.in ✓", ml: "pmfby.gov.in ✓", or: "pmfby.gov.in ✓" },
    link: "https://pmfby.gov.in",
    badge: { en: "Crop Insurance", hi: "फसल बीमा", mr: "पीक विमा", pa: "ਫਸਲ ਬੀਮਾ", gu: "ફસલ ✓", ta: "பயிர் ✓", te: "పంట ✓", kn: "ಬೆಳೆ ✓", bn: "ফসল ✓", ml: "വിള ✓", or: "ଫସଲ ✓" },
  },
  {
    id: "kcc",
    icon: FileText,
    color: "bg-yellow-100 dark:bg-yellow-900",
    iconColor: "text-yellow-700 dark:text-yellow-300",
    name: { en: "Kisan Credit Card (KCC)", hi: "किसान क्रेडिट कार्ड", mr: "किसान क्रेडिट कार्ड", pa: "ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ", gu: "કિસાન ક્રેડિટ કાર્ડ", ta: "கிசான் கிரெடிட் கார்டு", te: "కిసాన్ క్రెడిట్ కార్డ్", kn: "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್", bn: "কিসান ক্রেডিট কার্ড", ml: "കിസാൻ ക്രെഡിറ്റ് കാർഡ്", or: "କିସାନ କ୍ରେଡ଼ିଟ କାର୍ଡ" },
    benefit: { en: "Crop loans up to ₹3 lakh at just 4% interest", hi: "मात्र 4% ब्याज पर ₹3 लाख तक का फसल ऋण", mr: "फक्त 4% व्याजाने ₹3 लाखापर्यंत पीक कर्ज", pa: "4% ਵਿਆਜ ਦਰ ਤੇ ₹3 ਲੱਖ ਤੱਕ ਕਰਜ਼ਾ", gu: "4% ✓", ta: "4% ✓", te: "4% ✓", kn: "4% ✓", bn: "4% ✓", ml: "4% ✓", or: "4% ✓" },
    eligibility: { en: "All farmers — individual, joint or tenant farmers", hi: "सभी किसान — व्यक्तिगत, संयुक्त या किरायेदार किसान", mr: "सर्व शेतकरी — वैयक्तिक, संयुक्त किंवा भाडेकरू", pa: "ਸਾਰੇ ਕਿਸਾਨ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    howToApply: { en: "Visit nearest bank branch or apply online at your bank's website", hi: "नजदीकी बैंक शाखा जाएं या अपने बैंक की वेबसाइट पर ऑनलाइन आवेदन करें", mr: "जवळच्या बँकेत जा किंवा बँकेच्या वेबसाइटवर ऑनलाइन अर्ज करा", pa: "ਬੈਂਕ ✓", gu: "ਬੈਂਕ ✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    link: "https://www.nabard.org/content.aspx?id=579",
    badge: { en: "Easy Credit", hi: "आसान ऋण", mr: "सोपे कर्ज", pa: "ਆਸਾਨ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
  },
  {
    id: "soil-health",
    icon: Leaf,
    color: "bg-amber-100 dark:bg-amber-900",
    iconColor: "text-amber-700 dark:text-amber-300",
    name: { en: "Soil Health Card Scheme", hi: "मृदा स्वास्थ्य कार्ड योजना", mr: "मृदा आरोग्य कार्ड योजना", pa: "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਯੋਜਨਾ", gu: "માટી સ્વાસ્થ્ય કાર્ડ", ta: "மண் ஆரோக்கிய அட்டை", te: "నేల ఆరోగ్య కార్డు పథకం", kn: "ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್", bn: "মৃত্তিকা স্বাস্থ্য কার্ড", ml: "മണ്ണ് ആരോഗ്യ കാർഡ്", or: "ମୃଦା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ" },
    benefit: { en: "Free soil testing + personalized fertilizer & crop recommendations", hi: "मुफ्त मिट्टी परीक्षण + व्यक्तिगत खाद और फसल सुझाव", mr: "मोफत माती परीक्षण + वैयक्तिक खत आणि पीक शिफारस", pa: "ਮੁਫਤ ਮਿੱਟੀ ਟੈਸਟਿੰਗ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    eligibility: { en: "All farmers across India", hi: "भारत के सभी किसान", mr: "भारतातील सर्व शेतकरी", pa: "ਭਾਰਤ ਦੇ ਸਾਰੇ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    howToApply: { en: "Contact nearest Agriculture Department or soilhealth.dac.gov.in", hi: "नजदीकी कृषि विभाग से संपर्क करें या soilhealth.dac.gov.in", mr: "जवळच्या कृषी विभागाशी संपर्क करा", pa: "✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    link: "https://soilhealth.dac.gov.in",
    badge: { en: "Free Service", hi: "मुफ्त सेवा", mr: "मोफत सेवा", pa: "ਮੁਫਤ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
  },
  {
    id: "enam",
    icon: ShoppingCart,
    color: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-700 dark:text-purple-300",
    name: { en: "eNAM — National Agriculture Market", hi: "eNAM — राष्ट्रीय कृषि बाजार", mr: "eNAM — राष्ट्रीय कृषी बाजार", pa: "eNAM — ਰਾਸ਼ਟਰੀ ਖੇਤੀ ਮਾਰਕੀਟ", gu: "eNAM — રાષ્ટ્રીય ✓", ta: "eNAM — ✓", te: "eNAM — ✓", kn: "eNAM — ✓", bn: "eNAM — ✓", ml: "eNAM — ✓", or: "eNAM — ✓" },
    benefit: { en: "Sell crops online at best prices, skip middlemen", hi: "बिचौलिए को छोड़कर ऑनलाइन सबसे अच्छे दाम पर फसल बेचें", mr: "दलालांना वगळून ऑनलाइन सर्वोत्तम दरात पीक विका", pa: "ਦਲਾਲਾਂ ਤੋਂ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    eligibility: { en: "Farmers registered with local APMC/mandi", hi: "स्थानीय APMC/मंडी में पंजीकृत किसान", mr: "स्थानीय APMC/मंडीत नोंदणीकृत शेतकरी", pa: "✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    howToApply: { en: "Register at enam.gov.in or at local mandi office", hi: "enam.gov.in पर या स्थानीय मंडी कार्यालय में पंजीकरण करें", mr: "enam.gov.in वर किंवा स्थानीय मंडी कार्यालयात नोंदणी", pa: "enam.gov.in ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    link: "https://enam.gov.in",
    badge: { en: "Online Market", hi: "ऑनलाइन मंडी", mr: "ऑनलाइन मंडी", pa: "✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
  },
  {
    id: "pmksy",
    icon: Droplets,
    color: "bg-cyan-100 dark:bg-cyan-900",
    iconColor: "text-cyan-700 dark:text-cyan-300",
    name: { en: "PM Krishi Sinchai Yojana", hi: "प्रधानमंत्री कृषि सिंचाई योजना", mr: "पंतप्रधान कृषी सिंचन योजना", pa: "PM ਕ੍ਰਿਸ਼ੀ ਸਿੰਚਾਈ ਯੋਜਨਾ", gu: "PM ✓", ta: "PM ✓", te: "PM ✓", kn: "PM ✓", bn: "PM ✓", ml: "PM ✓", or: "PM ✓" },
    benefit: { en: "55–75% subsidy on drip & sprinkler irrigation systems", hi: "ड्रिप और स्प्रिंकलर सिंचाई पर 55-75% सब्सिडी", mr: "ठिबक आणि स्प्रिंकलरवर 55-75% अनुदान", pa: "55-75% ਸਬਸਿਡੀ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    eligibility: { en: "All farmers — priority to small and marginal farmers", hi: "सभी किसान — छोटे और सीमांत किसानों को प्राथमिकता", mr: "सर्व शेतकरी — लहान शेतकऱ्यांना प्राधान्य", pa: "✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    howToApply: { en: "Apply through state Agriculture Department or pmksy.gov.in", hi: "राज्य कृषि विभाग या pmksy.gov.in के जरिए आवेदन करें", mr: "राज्य कृषी विभागाकडून किंवा pmksy.gov.in ✓", pa: "pmksy.gov.in ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    link: "https://pmksy.gov.in",
    badge: { en: "Irrigation", hi: "सिंचाई", mr: "सिंचन", pa: "✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
  },
  {
    id: "pm-kusum",
    icon: Sun,
    color: "bg-orange-100 dark:bg-orange-900",
    iconColor: "text-orange-700 dark:text-orange-300",
    name: { en: "PM KUSUM — Solar Pump Scheme", hi: "पीएम कुसुम — सौर पंप योजना", mr: "PM कुसुम — सौर पंप योजना", pa: "PM ਕੁਸੁਮ — ਸੂਰਜੀ ਪੰਪ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    benefit: { en: "60% government subsidy on solar pump installation", hi: "सौर पंप स्थापना पर 60% सरकारी सब्सिडी", mr: "सौर पंप बसवण्यासाठी 60% अनुदान", pa: "60% ਸਰਕਾਰੀ ਸਬਸਿਡੀ ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    eligibility: { en: "Individual farmers and farmer cooperatives", hi: "व्यक्तिगत किसान और किसान सहकारी समितियां", mr: "वैयक्तिक शेतकरी आणि सहकारी संस्था", pa: "✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    howToApply: { en: "Apply at mnre.gov.in or state DISCOM/Agriculture Dept.", hi: "mnre.gov.in या राज्य DISCOM/कृषि विभाग में आवेदन", mr: "mnre.gov.in ✓", pa: "mnre.gov.in ✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
    link: "https://mnre.gov.in",
    badge: { en: "Solar Energy", hi: "सौर ऊर्जा", mr: "सौर ऊर्जा", pa: "✓", gu: "✓", ta: "✓", te: "✓", kn: "✓", bn: "✓", ml: "✓", or: "✓" },
  },
];

export default function SchemesPage() {
  const { t, language } = useLanguage();

  const getLang = (obj: Record<string, string>) =>
    obj[language] || obj.en;

  return (
    <div className="pb-24 space-y-5 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.schemes.title}</h1>
        <p className="text-muted-foreground mt-1">{t.schemes.subtitle}</p>
      </div>

      {/* Kisan Suvidha Portal Quick Link */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Kisan Suvidha Portal</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'hi' ? "सभी किसान सेवाएं एक जगह" : language === 'mr' ? "सर्व किसान सेवा एका ठिकाणी" : "All farmer services in one place"}
                </p>
              </div>
            </div>
            <a href="https://kisansuvidha.gov.in" target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                <ExternalLink className="h-3 w-3 mr-1" />
                {language === 'hi' ? 'जाएं' : language === 'mr' ? 'जा' : 'Visit'}
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Scheme Cards */}
      <div className="space-y-4">
        {schemes.map((scheme) => (
          <Card key={scheme.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-md ${scheme.color}`}>
                    <scheme.icon className={`h-5 w-5 ${scheme.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="text-base leading-tight">{getLang(scheme.name)}</CardTitle>
                    <Badge variant="secondary" className="mt-1 text-xs">{getLang(scheme.badge)}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{t.schemes.benefit}</p>
                <p className="text-sm text-foreground">{getLang(scheme.benefit)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{t.schemes.eligibility}</p>
                <p className="text-sm text-foreground">{getLang(scheme.eligibility)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{t.schemes.how_to_apply}</p>
                <p className="text-sm text-foreground">{getLang(scheme.howToApply)}</p>
              </div>
              <div className="flex gap-2 pt-1">
                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full" size="sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {t.schemes.apply_now}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RKVY */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-md bg-emerald-100 dark:bg-emerald-900">
              <Leaf className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Rashtriya Krishi Vikas Yojana (RKVY)</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'hi'
                  ? "कृषि अवसंरचना, भंडारण और प्रसंस्करण के लिए ₹10,000 करोड़ कोष"
                  : language === 'mr'
                  ? "कृषी पायाभूत सुविधा आणि प्रक्रियेसाठी ₹10,000 कोटी निधी"
                  : "₹10,000 crore fund for agri infrastructure, storage & processing"
                }
              </p>
              <a href="https://rkvy.nic.in" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  rkvy.nic.in
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
