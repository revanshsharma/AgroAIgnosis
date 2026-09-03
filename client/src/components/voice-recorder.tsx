import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Square, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  isLoading?: boolean;
}

function VoiceRecorder({ onTranscript, isLoading = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const SPEECH_LOCALE: Record<string, string> = {
    en: "en-IN",
    hi: "hi-IN",
    mr: "mr-IN",
    ta: "ta-IN",
    te: "te-IN",
    kn: "kn-IN",
    bn: "bn-IN",
    gu: "gu-IN",
    pa: "pa-IN",
    ml: "ml-IN",
    or: "or-IN",
    as: "as-IN",
    ur: "ur-IN",
    kok: "kok-IN",
    ks: "ks-IN",
  };

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = SPEECH_LOCALE[language] || 'en-IN';
      
      recognition.onstart = () => {
        setIsRecording(true);
        setTranscript("");
      };
      
      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        
        setTranscript(currentTranscript);
        
        // If the result is final, send it
        if (event.results[event.results.length - 1].isFinal) {
          onTranscript(currentTranscript);
          setIsRecording(false);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        toast({
          title: t.common.error,
          description: t.common.retry,
          variant: "destructive",
        });
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      toast({
        title: t.common.error,
        description: t.chat.placeholder,
        variant: "destructive",
      });
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onTranscript, t.chat.placeholder, t.common.error, t.common.retry, toast]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast({
          title: t.common.error,
          description: t.common.retry,
          variant: "destructive",
        });
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  if (!isSupported) {
    return (
      <Card data-testid="voice-not-supported">
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">
            {t.chat.placeholder}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Recording Status */}
      {isRecording && (
        <Card className="bg-primary/10 border-primary/20" data-testid="recording-status">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-4 h-4 bg-destructive rounded-full animate-pulse mr-2"></div>
              <span className="font-medium text-primary">{t.chat.listening}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{t.chat.placeholder}</p>
            {transcript && (
              <div className="bg-background rounded-lg p-3 mb-3">
                <p className="text-sm">{transcript}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Voice Control Buttons */}
      <div className="flex justify-center space-x-4">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            disabled={isLoading}
            size="lg"
            className="flex-1 max-w-sm"
            data-testid="button-start-recording"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t.common.loading}
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" />
                {t.chat.send}
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            variant="destructive"
            size="lg"
            className="flex-1 max-w-sm"
            data-testid="button-stop-recording"
          >
            <Square className="mr-2 h-4 w-4" />
            {t.common.cancel}
          </Button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <p>{t.chat.greeting}</p>
      </div>
    </div>
  );
}

export default VoiceRecorder;
