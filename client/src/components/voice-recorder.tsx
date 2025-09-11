import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Square, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English
      
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
          title: "Voice Recognition Error",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive",
        });
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition. Please use text input instead.",
        variant: "destructive",
      });
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, toast]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast({
          title: "Error",
          description: "Failed to start voice recording. Please try again.",
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
            Voice input is not supported in your browser. Please use text input instead.
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
              <span className="font-medium text-primary">Recording...</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Speak your question about crops, diseases, or farming techniques
            </p>
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
                Processing...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" />
                Start Voice Message
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
            Stop Recording
          </Button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Click the microphone button and speak your question clearly.</p>
        <p>Ask about crop diseases, soil problems, fertilization, or any farming topic.</p>
      </div>
    </div>
  );
}

export default VoiceRecorder;
