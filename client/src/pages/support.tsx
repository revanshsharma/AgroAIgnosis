import { Phone, Heart, AlertCircle, BookOpen, Scale, Users, ExternalLink, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

const helplines = [
  {
    name: "Kisan Call Center",
    number: "1800-180-1551",
    shortNumber: "1551",
    description: { en: "Free govt. farming helpline", hi: "मुफ़्त सरकारी किसान हेल्पलाइन", mr: "मोफत सरकारी हेल्पलाइन", pa: "ਮੁਫਤ ਸਰਕਾਰੀ ਹੈਲਪਲਾਈਨ", gu: "મફત સરકારી હેલ્પલાઇન", ta: "இலவச அரசு உதவி எண்", te: "ఉచిత ప్రభుత్వ హెల్ప్‌లైన్", kn: "ಉಚಿತ ಸರ್ಕಾರಿ ಹೆಲ್ಪ್‌ಲೈನ್", bn: "বিনামূল্যে সরকারি হেল্পলাইন", ml: "സൗജന്യ സർക്കാർ ഹെൽപ്‌ലൈൻ", or: "ମୁଫ ସରକାରୀ ହେଲ୍ପଲାଇନ" },
    available: "24×7",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: Phone,
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    shortNumber: "1860-2662-345",
    description: { en: "Mental health & crisis support", hi: "मानसिक स्वास्थ्य सहायता", mr: "मानसिक आरोग्य सहाय", pa: "ਮਾਨਸਿਕ ਸਿਹਤ ਸਹਾਇਤਾ", gu: "માનસિક સ્વાસ્થ્ય સહાય", ta: "மன ஆரோக்கிய உதவி", te: "మానసిక ఆరోగ్య సహాయం", kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸಹಾಯ", bn: "মানসিক স্বাস্থ্য সহায়তা", ml: "മാനസിക ആരോഗ്യ സഹായം", or: "ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟ" },
    available: "24×7",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: Heart,
  },
  {
    name: "iCall (TISS)",
    number: "9152987821",
    shortNumber: "9152987821",
    description: { en: "Free counselling by trained experts", hi: "प्रशिक्षित विशेषज्ञों द्वारा मुफ्त परामर्श", mr: "प्रशिक्षित तज्ञांकडून मोफत समुपदेशन", pa: "ਮਾਹਰਾਂ ਦੁਆਰਾ ਮੁਫਤ ਸਲਾਹ", gu: "નિઃશુલ્ક સલાહ", ta: "இலவச ஆலோசனை", te: "ఉచిత కౌన్సెలింగ్", kn: "ಉಚಿತ ಸಲಹೆ", bn: "বিনামূল্যে কাউন্সেলিং", ml: "സൗജന്യ കൗൺസലിങ്", or: "ମୁଫ ପ୍ରଶିକ୍ଷଣ ପ୍ରଦାନ" },
    available: "Mon–Sat, 8am–10pm",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    icon: Users,
  },
  {
    name: "AASRA",
    number: "9820466627",
    shortNumber: "9820466627",
    description: { en: "Crisis intervention & suicide prevention", hi: "संकट हस्तक्षेप और आत्महत्या रोकथाम", mr: "संकट हस्तक्षेप", pa: "ਸੰਕਟ ਦਖਲਅੰਦਾਜ਼ੀ", gu: "કટોકટી હસ્તક્ષેપ", ta: "நெருக்கடி தலையீடு", te: "సంక్షోభ జోక్యం", kn: "ಬಿಕ್ಕಟ್ಟು ಹಸ್ತಕ್ಷೇಪ", bn: "সংকট হস্তক্ষেপ", ml: "പ്രതിസന്ധി ഇടപെടൽ", or: "ସଂଙ୍କଟ ହସ୍ତକ୍ଷେପ" },
    available: "24×7",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: AlertCircle,
  },
  {
    name: "National Mental Health Helpline",
    number: "14416",
    shortNumber: "14416",
    description: { en: "Government mental health helpline (NIMHANS)", hi: "सरकारी मानसिक स्वास्थ्य हेल्पलाइन", mr: "सरकारी मानसिक आरोग्य हेल्पलाइन", pa: "ਸਰਕਾਰੀ ਮਾਨਸਿਕ ਸਿਹਤ ਹੈਲਪਲਾਈਨ", gu: "સરકારી માનસિક સ્વાસ્થ્ય", ta: "அரசு மன நல உதவி", te: "ప్రభుత్వ మానసిక ఆరోగ్యం", kn: "ಸರ್ಕಾರಿ ಮಾನಸಿಕ ಆರೋಗ್ಯ", bn: "সরকারি মানসিক স্বাস্থ্য", ml: "സർക്കാർ മാനസിക ആരോഗ്യം", or: "ସରକାରୀ ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟ" },
    available: "24×7",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: Phone,
  },
];

const financialResources = [
  {
    title: { en: "PM-Kisan Debt Relief", hi: "पीएम-किसान कर्ज राहत", mr: "पीएम-किसान कर्ज माफी", pa: "ਪੀਐਮ-ਕਿਸਾਨ ਕਰਜ਼ਾ ਰਾਹਤ", gu: "PM-Kisan ઋણ રાહત", ta: "PM-Kisan கடன் நிவாரணம்", te: "PM-Kisan రుణ మాఫీ", kn: "PM-Kisan ಸಾಲ ಮನ್ನಾ", bn: "PM-Kisan ঋণ মাফ", ml: "PM-Kisan കടബാദ്ധ്യത ആശ്വാസം", or: "PM-Kisan ଋଣ ମୁକ୍ତି" },
    desc: { en: "₹6,000/year support + crop loan waivers under state schemes", hi: "₹6,000/वर्ष सहायता + राज्य योजनाओं के तहत फसल ऋण माफी", mr: "₹6,000/वर्ष सहाय + राज्य योजनांतर्गत पीक कर्ज माफी", pa: "₹6,000/ਸਾਲ ਸਹਾਇਤਾ + ਫਸਲ ਕਰਜ਼ਾ ਮੁਆਫੀ", gu: "₹6,000/વર્ષ + ફસલ ઋણ માફી", ta: "₹6,000/ஆண்டு + பயிர் கடன் தள்ளுபடி", te: "₹6,000/సంవత్సరం + పంట రుణ మాఫీ", kn: "₹6,000/ವರ್ಷ + ಬೆಳೆ ಸಾಲ ಮನ್ನಾ", bn: "₹6,000/বছর + ফসল ঋণ মাফ", ml: "₹6,000/വർഷം + വിള വായ്പ ഒഴിവ്", or: "₹6,000/ବର୍ଷ + ଫସଲ ଋଣ ମାଫ" },
    link: "https://pmkisan.gov.in",
  },
  {
    title: { en: "Kisan Credit Card (KCC)", hi: "किसान क्रेडिट कार्ड", mr: "किसान क्रेडिट कार्ड", pa: "ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ", gu: "કિસાન ક્રેડિટ કાર્ડ", ta: "கிசான் கிரெடிட் கார்டு", te: "కిసాన్ క్రెడిట్ కార్డ్", kn: "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್", bn: "কিসান ক্রেডিট কার্ড", ml: "കിസാൻ ക്രെഡിറ്റ് കാർഡ്", or: "କିସାନ କ୍ରେଡ଼ିଟ କାର୍ଡ" },
    desc: { en: "Short-term crop loans at 4% interest rate", hi: "4% ब्याज दर पर अल्पकालिक फसल ऋण", mr: "4% व्याजदरावर अल्पकालीन पीक कर्ज", pa: "4% ਵਿਆਜ ਦਰ 'ਤੇ ਫਸਲ ਕਰਜ਼ੇ", gu: "4% વ્યાજ દરે ટૂંકા ગાળાના ઋણ", ta: "4% வட்டியில் குறுகிய கால கடன்", te: "4% వడ్డీతో పంట రుణాలు", kn: "4% ಬಡ್ಡಿಯಲ್ಲಿ ಅಲ್ಪಾವಧಿ ಸಾಲ", bn: "4% সুদে স্বল্পমেয়াদী ঋণ", ml: "4% പലിശയിൽ ഹ്രസ്വകാല വായ്പ", or: "4% ସୁଧରେ ସ୍ୱଳ୍ପ ଅବଧି ଋଣ" },
    link: "https://www.nabard.org",
  },
  {
    title: { en: "PM Fasal Bima Yojana", hi: "प्रधानमंत्री फसल बीमा योजना", mr: "पंतप्रधान पीक विमा योजना", pa: "ਪ੍ਰਧਾਨਮੰਤਰੀ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ", gu: "PM ફસલ વીમા યોજના", ta: "PM பயிர் காப்பீட்டு திட்டம்", te: "PM పంట బీమా పథకం", kn: "PM ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ", bn: "PM ফসল বীমা প্রকল্প", ml: "PM ഫസൽ ഇൻഷുറൻസ്", or: "PM ଫସଲ ବୀମା ଯୋଜନା" },
    desc: { en: "Low premium crop insurance for weather & pest damage", hi: "मौसम और कीट क्षति के लिए कम प्रीमियम फसल बीमा", mr: "हवामान आणि कीड नुकसानासाठी कमी प्रीमियम पीक विमा", pa: "ਮੌਸਮ ਅਤੇ ਕੀੜੇ ਦੇ ਨੁਕਸਾਨ ਲਈ ਫਸਲ ਬੀਮਾ", gu: "ઓછા પ્રીમિયમ ફસલ વીમો", ta: "குறைந்த பிரீமியம் பயிர் காப்பீடு", te: "తక్కువ ప్రీమియంతో పంట బీమా", kn: "ಕಡಿಮೆ ಪ್ರೀಮಿಯಂ ಬೆಳೆ ವಿಮೆ", bn: "কম প্রিমিয়াম ফসল বীমা", ml: "കുറഞ്ഞ പ്രീമിയം വിള ഇൻഷുറൻസ്", or: "କମ ପ୍ରିମିୟମ ଫସଲ ବୀମା" },
    link: "https://pmfby.gov.in",
  },
];

const successStories = [
  {
    name: "Ramesh Patil",
    state: "Maharashtra",
    story: { en: "Switched to organic farming with PM-Kisan support and increased income by 40%.", hi: "पीएम-किसान की मदद से जैविक खेती अपनाई और आय 40% बढ़ी।", mr: "PM-Kisan मदतीने जैविक शेती केली आणि उत्पन्न 40% वाढले।", pa: "PM-Kisan ਦੀ ਮਦਦ ਨਾਲ ਜੈਵਿਕ ਖੇਤੀ ਕੀਤੀ।", gu: "PM-Kisan ની મદદ ✓", ta: "PM-Kisan உதவியுடன் ஆர்கானிக் விவசாயம்.", te: "PM-Kisan సహాయంతో సేంద్రీయ వ్యవసాయం.", kn: "PM-Kisan ಸಹಾಯದಿಂದ ಸಾವಯವ ಕೃಷಿ.", bn: "PM-Kisan সহায়তায় জৈব চাষ।", ml: "PM-Kisan സഹായത്തോടെ ജൈവകൃഷി.", or: "PM-Kisan ସାହାଯ୍ୟରେ ଜୈବ ଚାଷ।" },
  },
  {
    name: "Gurpreet Singh",
    state: "Punjab",
    story: { en: "Used KCC loan to buy a drip irrigation system and saved 60% water.", hi: "केसीसी ऋण से ड्रिप सिंचाई खरीदी और 60% पानी बचाया।", mr: "KCC कर्जाने ठिबक सिंचन खरेदी केले.", pa: "KCC ਕਰਜ਼ੇ ਨਾਲ ਟਪਕਾਅ ਸਿੰਚਾਈ ਖਰੀਦੀ।", gu: "KCC ઋણ ✓", ta: "KCC கடனால் திவலை நீர்ப்பாசனம்.", te: "KCC రుణంతో డ్రిప్ ఇర్రిగేషన్.", kn: "KCC ಸಾಲದಿಂದ ತುಂತುರು ನೀರಾವರಿ.", bn: "KCC ঋণে ড্রিপ সেচ।", ml: "KCC വായ്പയിൽ ഡ്രിപ്പ് ഇറിഗേഷൻ.", or: "KCC ଋଣ ✓" },
  },
];

export default function SupportPage() {
  const { t, language } = useLanguage();

  const getLang = (obj: Record<string, string>) =>
    obj[language] || obj.en;

  return (
    <div className="pb-24 space-y-6 p-4">
      {/* Emergency Banner */}
      <Card className="border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-red-800 dark:text-red-300 text-sm">
                {t.support.emergency_message}
              </p>
              <a href="tel:14416">
                <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-3 w-3 mr-1" />
                  14416 — {t.support.available_24x7}
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.support.title}</h1>
        <p className="text-muted-foreground mt-1">{t.support.subtitle}</p>
      </div>

      {/* You Are Not Alone */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">{t.support.you_are_not_alone}</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {language === 'hi'
              ? "खेती में उतार-चढ़ाव आते रहते हैं। आर्थिक तनाव, फसल की बर्बादी, या कर्ज - ये सब कठिन हैं। लेकिन हर समस्या का हल होता है। सरकार, समाज और हम सब आपके साथ हैं।"
              : language === 'mr'
              ? "शेतीत चढ-उतार येत असतात. आर्थिक ताण, पीक नुकसान, कर्ज - हे सर्व कठीण आहे. पण प्रत्येक समस्येवर उपाय असतो. सरकार आणि समाज तुमच्यासोबत आहे."
              : "Farming has its ups and downs — financial stress, crop failure, debt — these are real challenges. But every problem has a solution. The government, community, and we at KrishiMitra are always here for you. Please reach out."
            }
          </p>
        </CardContent>
      </Card>

      {/* Helplines */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          {t.support.helplines}
        </h2>
        <div className="space-y-3">
          {helplines.map((h) => (
            <Card key={h.name}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-md ${h.color.split(' ').slice(0,2).join(' ')}`}>
                      <h.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{h.name}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{getLang(h.description)}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">{h.available}</Badge>
                    </div>
                  </div>
                  <a href={`tel:${h.shortNumber.replace(/-/g, '')}`} className="shrink-0">
                    <Button size="sm" variant="default">
                      <Phone className="h-3 w-3 mr-1" />
                      {t.support.call_now}
                    </Button>
                  </a>
                </div>
                <div className="mt-2 ml-11">
                  <a href={`tel:${h.shortNumber.replace(/-/g, '')}`} className="text-primary font-bold text-lg tracking-wide">
                    {h.number}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Financial Help */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {t.support.financial_help}
        </h2>
        <div className="space-y-3">
          {financialResources.map((r) => (
            <Card key={r.link}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{getLang(r.title)}</p>
                    <p className="text-muted-foreground text-xs mt-1">{getLang(r.desc)}</p>
                  </div>
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="shrink-0">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {language === 'hi' ? 'जानें' : language === 'mr' ? 'जाणा' : 'Visit'}
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Legal Aid */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            {t.support.legal_aid}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <a href="https://nalsa.gov.in" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center justify-between p-3 rounded-md hover-elevate cursor-pointer">
                <div>
                  <p className="text-sm font-medium">National Legal Services Authority (NALSA)</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'hi' ? "मुफ्त कानूनी सहायता" : language === 'mr' ? "मोफत कायदेशीर सहाय" : "Free legal aid for farmers"}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </a>
            <a href="tel:15100">
              <div className="flex items-center justify-between p-3 rounded-md hover-elevate cursor-pointer">
                <div>
                  <p className="text-sm font-medium">NALSA Helpline: 15100</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'hi' ? "कानूनी सलाह के लिए कॉल करें" : language === 'mr' ? "कायदेशीर सल्ल्यासाठी कॉल करा" : "Call for legal advice"}
                  </p>
                </div>
                <Phone className="h-4 w-4 text-primary" />
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          {t.support.success_stories}
        </h2>
        <div className="space-y-3">
          {successStories.map((s) => (
            <Card key={s.name}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{s.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{s.name}</p>
                    <p className="text-xs text-muted-foreground mb-1">{s.state}</p>
                    <p className="text-sm text-foreground">{getLang(s.story)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
