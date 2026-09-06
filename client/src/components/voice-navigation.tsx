import { useEffect, useRef, useState } from "react";
import { LoaderCircle, MessageCircle, Mic, MicOff, Navigation, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useLocation } from "wouter";

const SPEECH_LANGUAGES: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  pa: "pa-IN",
  gu: "gu-IN",
  ta: "ta-IN",
  te: "te-IN",
  kn: "kn-IN",
  bn: "bn-IN",
  ml: "ml-IN",
  or: "or-IN",
  as: "as-IN",
  ur: "ur-IN",
  kok: "kok-IN",
  ks: "ks-IN",
};

const LANGUAGE_VOICE_HINTS: Record<string, string[]> = {
  en: ["english", "united states", "united kingdom"],
  hi: ["hindi", "हिन्दी", "india", "google हिन्दी", "microsoft heera", "sangeeta"],
  mr: ["marathi", "मराठी", "google मराठी", "microsoft heera", "microsoft hera"],
  pa: ["punjabi", "ਪੰਜਾਬੀ", "google ਪੰਜਾਬੀ"],
  gu: ["gujarati", "ગુજરાતી", "google ગુજરાતી"],
  ta: ["tamil", "தமிழ்", "google தமிழ்"],
  te: ["telugu", "తెలుగు", "google తెలుగు"],
  kn: ["kannada", "ಕನ್ನಡ", "google ಕನ್ನಡ"],
  bn: ["bengali", "বাংলা", "google বাংলা"],
  ml: ["malayalam", "മലയാളം", "google മലയാളം"],
  or: ["odia", "oriya", "ଓଡ଼ିଆ", "google ଓଡ଼ିଆ"],
  as: ["assamese", "অসমীয়া", "google অসমীয়া"],
  ur: ["urdu", "اردو", "google اردو"],
};

function VoiceNavigation() {
  const { language, t } = useLanguage();
  const { profile } = useUserProfile();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const recognitionRef = useRef<any>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [heardText, setHeardText] = useState("");
  const [assistantReply, setAssistantReply] = useState("");
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const findMatchingVoice = (langCode: string, voices: SpeechSynthesisVoice[]) => {
    const locale = SPEECH_LANGUAGES[langCode] || "en-IN";
    const normalizedLocale = locale.toLowerCase();
    const normalizedLanguage = langCode.toLowerCase();
    const hints = LANGUAGE_VOICE_HINTS[normalizedLanguage] || [];

    return voices.find((voice) => voice.lang.toLowerCase() === normalizedLocale)
      || voices.find((voice) => voice.lang.toLowerCase().startsWith(`${normalizedLanguage}-`))
      || voices.find((voice) => voice.lang.toLowerCase().startsWith(normalizedLanguage))
      || voices.find((voice) => hints.some((hint) => voice.name.toLowerCase().includes(hint)))
      || voices.find((voice) => voice.name.toLowerCase().includes(normalizedLanguage))
      || null;
  };

  const speakWithBrowser = (message: string) => {
    if (!("speechSynthesis" in window) || !message) return;

    const speakWithSelection = (voiceList: SpeechSynthesisVoice[]) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message.slice(0, 900));
      const locale = SPEECH_LANGUAGES[language] || "en-IN";
      utterance.lang = locale;

      const matchingVoice = findMatchingVoice(language, voiceList);
      if (matchingVoice) utterance.voice = matchingVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    };

    const trySpeak = (attempt = 0) => {
      const voiceList = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
      if (voiceList.length === 0 && attempt < 8) {
        window.setTimeout(() => trySpeak(attempt + 1), 250 + attempt * 150);
        return;
      }

      speakWithSelection(voiceList.length > 0 ? voiceList : window.speechSynthesis.getVoices());
    };

    trySpeak();
  };

  const speak = async (message: string) => {
    if (!message) return;
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message, language }),
      });
      if (!response.ok) throw new Error("TTS unavailable");
      const result = await response.json() as { audio?: string };
      if (!result.audio) throw new Error("No audio returned");
      const audio = new Audio(result.audio);
      await audio.play();
    } catch {
      speakWithBrowser(message);
    }
  };

  const askKrishiMitra = async (message: string) => {
    setIsResponding(true);
    setAssistantReply("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          userId: "user-1",
          isVoice: true,
          language,
          userRegion: profile?.region || "India",
          userName: profile?.name,
          primaryCrop: profile?.primaryCrop,
        }),
      });
      if (!response.ok) throw new Error("Unable to get a response");
      const result = await response.json();
      const reply = result.response || t.common.error;
      setAssistantReply(reply);
      void speak(reply);
    } catch {
      toast({ title: t.common.error, description: "KrishiMitra could not answer right now. Please try again.", variant: "destructive" });
    } finally {
      setIsResponding(false);
    }
  };

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = SPEECH_LANGUAGES[language] || "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
      setHeardText("");
    };
    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }
      setHeardText(transcript);

      if (event.results[event.results.length - 1].isFinal) {
        const command = transcript.toLowerCase().trim();
        const destinations = [
          { path: "/analysis", words: ["scan", "crop", "disease", "फसल", "स्कैन", "रोग", "पिक"] },
          { path: "/chat", words: ["chat", "question", "ask", "talk", "चैट", "पूछ", "सवाल", "बोला"] },
          { path: "/schemes", words: ["scheme", "subsidy", "government", "योजना", "सब्सिडी", "सरकार"] },
          { path: "/support", words: ["support", "help", "helpline", "मदद", "सहायता", "हेल्पलाइन"] },
          { path: "/mandi", words: ["mandi", "market", "price", "बाजार", "मंडी", "भाव"] },
          { path: "/calendar", words: ["calendar", "sowing", "harvest", "कैलेंडर", "बुवाई", "कटाई"] },
          { path: "/calculator", words: ["fertilizer", "calculator", "खाद", "उर्वरक", "गणना"] },
          { path: "/history", words: ["history", "past", "पुराना", "इतिहास"] },
          { path: "/profile", words: ["profile", "account", "प्रोफाइल", "खाता"] },
          { path: "/", words: ["home", "मुख्य", "होम", "घर"] },
        ];
        const destination = destinations.find(({ words }) => words.some((word) => command.includes(word)));
        if (destination) {
          navigate(destination.path);
          toast({ title: "Opening KrishiMitra", description: `Going to ${destination.path === "/" ? "home" : destination.path.slice(1)}.` });
        } else {
          void askKrishiMitra(transcript);
        }
        setIsListening(false);
      }
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast({ title: "Voice guide needs another try", description: "Please allow the microphone and speak clearly.", variant: "destructive" });
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [language, navigate, toast, profile, t]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({ title: "Voice guide is not available", description: "Please use Chrome or another browser with microphone support." });
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      return;
    }
    window.speechSynthesis?.cancel();
    try {
      recognitionRef.current.start();
    } catch {
      toast({ title: "Microphone is already active", description: "Please wait a moment and try again." });
    }
  };

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
      {(isListening || isResponding || assistantReply) && (
        <Card className="w-64 border-primary/30 shadow-lg" data-testid="voice-navigation-status">
          <CardContent className="p-3">
            {isListening && <>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Volume2 className="h-4 w-4 animate-pulse" />
                {t.chat.listening}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ask a farm question, or say “scan crop”, “mandi prices”, or “government schemes”.
              </p>
            </>}
            {isResponding && <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              KrishiMitra is preparing your answer…
            </div>}
            {heardText && <p className="text-sm mt-2 bg-muted rounded p-2">{heardText}</p>}
            {assistantReply && !isResponding && <>
              <div className="flex items-center gap-2 mt-2 text-primary font-semibold text-sm">
                <MessageCircle className="h-4 w-4" />
                KrishiMitra
              </div>
              <p className="text-sm mt-1 leading-relaxed max-h-40 overflow-y-auto">{assistantReply}</p>
              <Button variant="ghost" size="sm" className="mt-1 px-2 h-7 text-xs" onClick={() => void speak(assistantReply)}>
                <Volume2 className="h-3.5 w-3.5 mr-1" /> Read aloud
              </Button>
            </>}
          </CardContent>
        </Card>
      )}
      <Button
        onClick={toggleListening}
        size="lg"
        className="rounded-full shadow-lg gap-2 px-4"
        aria-label={isListening ? "Stop listening" : "Talk to KrishiMitra"}
        data-testid="button-voice-navigation"
      >
        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        <span className="hidden sm:inline">{isListening ? "Stop listening" : "Talk to KrishiMitra"}</span>
        {!isListening && <Navigation className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default VoiceNavigation;
