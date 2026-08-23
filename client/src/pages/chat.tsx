import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Mic, MicOff } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import VoiceRecorder from "@/components/voice-recorder";
import type { ChatMessage } from "@shared/schema";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useLanguage } from "@/hooks/use-language";

interface ChatResponse extends ChatMessage {
  relatedTopics?: string[];
  actionable?: boolean;
}

function Chat() {
  const [location] = useLocation();
  const [message, setMessage] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { profile } = useUserProfile();
  const { t, language } = useLanguage();

  const userId = "user-1";

  // Check if voice mode is enabled from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    if (urlParams.get('voice') === 'true') {
      setIsVoiceMode(true);
    }
  }, [location]);

  const { data: chatHistory, isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat-history", userId],
    enabled: true,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { message: string; isVoice?: boolean }) => {
      const response = await apiRequest("POST", "/api/chat", {
        message: data.message,
        userId,
        isVoice: data.isVoice || false,
        language,
        userRegion: profile?.region || "India",
        userName: profile?.name,
        primaryCrop: profile?.primaryCrop,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat-history", userId] });
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: t.common.error,
        description: `Failed to send message: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (messageText: string, isVoice = false) => {
    if (!messageText.trim()) return;
    sendMessageMutation.mutate({ message: messageText, isVoice });
  };

  const handleVoiceMessage = (transcript: string) => {
    handleSendMessage(transcript, true);
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20" data-testid="button-back">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold" data-testid="text-page-title">KrishiMitra Chat</h1>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className={`text-primary-foreground hover:bg-primary-foreground/20 ${isVoiceMode ? 'bg-primary-foreground/20' : ''}`}
              onClick={() => setIsVoiceMode(!isVoiceMode)}
              data-testid="button-toggle-voice-mode"
            >
              {isVoiceMode ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
        <Card className="h-full flex flex-col" data-testid="card-chat">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t.chat.title}</span>
              {isVoiceMode && (
                <Badge variant="secondary" data-testid="badge-voice-mode">
                  {t.chat.listening}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col overflow-hidden">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4" data-testid="messages-container">
              {isLoading ? (
                <div className="text-center text-muted-foreground py-8">
                  {t.common.loading}
                </div>
              ) : !chatHistory || chatHistory.length === 0 ? (
                <div className="text-center text-muted-foreground py-8" data-testid="text-no-messages">
                  <p className="mb-2">{t.chat.greeting}</p>
                </div>
              ) : (
                <>
                  {chatHistory.reverse().map((chat: ChatMessage) => (
                    <div key={chat.id} className="space-y-3" data-testid={`message-${chat.id}`}>
                      {/* User Message */}
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm">{chat.message}</p>
                          {chat.isVoice === "true" && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              Voice
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Bot Response */}
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
                          <div className="flex items-center mb-2">
                            <div className="bg-secondary text-secondary-foreground rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs font-bold mr-2">
                              K
                            </div>
                            <span className="text-sm font-medium">KrishiMitra</span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{chat.response}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t pt-4">
              {isVoiceMode ? (
                <VoiceRecorder
                  onTranscript={handleVoiceMessage}
                  isLoading={sendMessageMutation.isPending}
                />
              ) : (
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.chat.placeholder}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(message)}
                    disabled={sendMessageMutation.isPending}
                    className="flex-1"
                    data-testid="input-message"
                  />
                  <Button
                    onClick={() => handleSendMessage(message)}
                    disabled={!message.trim() || sendMessageMutation.isPending}
                    data-testid="button-send-message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Chat;
