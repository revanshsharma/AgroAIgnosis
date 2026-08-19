import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Navigation, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
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
};

function VoiceNavigation() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const recognitionRef = useRef<any>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [heardText, setHeardText] = useState("");

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
          toast({
            title: "I heard you",
            description: "Try saying: scan crop, mandi prices, government schemes, or help.",
          });
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
  }, [language, navigate, toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({ title: "Voice guide is not available", description: "Please use Chrome or another browser with microphone support." });
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      return;
    }
    try {
      recognitionRef.current.start();
    } catch {
      toast({ title: "Microphone is already active", description: "Please wait a moment and try again." });
    }
  };

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
      {isListening && (
        <Card className="w-64 border-primary/30 shadow-lg" data-testid="voice-navigation-status">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Volume2 className="h-4 w-4 animate-pulse" />
              Listening for a command…
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Say “scan my crop”, “mandi prices”, or “government schemes”.
            </p>
            {heardText && <p className="text-sm mt-2 bg-muted rounded p-2">{heardText}</p>}
          </CardContent>
        </Card>
      )}
      <Button
        onClick={toggleListening}
        size="lg"
        className="rounded-full shadow-lg gap-2 px-4"
        aria-label={isListening ? "Stop voice navigation" : "Speak to navigate KrishiMitra"}
        data-testid="button-voice-navigation"
      >
        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        <span className="hidden sm:inline">{isListening ? "Stop listening" : "Speak to navigate"}</span>
        {!isListening && <Navigation className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default VoiceNavigation;