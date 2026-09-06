const SARVAM_LANGUAGE_CODES: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  bn: "bn-IN",
  ta: "ta-IN",
  te: "te-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  gu: "gu-IN",
  pa: "pa-IN",
  or: "od-IN",
};

export async function generateSpeech(text: string, languageCode: string) {
  const apiKey = process.env.SARVAM_API_KEY;
  const language = SARVAM_LANGUAGE_CODES[languageCode] || "en-IN";

  if (!apiKey) {
    throw new Error("SARVAM_API_KEY is not configured");
  }

  const response = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "api-subscription-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text.slice(0, 2500),
      model: "bulbul:v3",
      speaker: "shubh",
      language_code: language,
      pace: 1,
      speech_sample_rate: 24000,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Sarvam TTS failed (${response.status}): ${details.slice(0, 300)}`);
  }

  const result = await response.json() as { audios?: string[] };
  const audio = result.audios?.[0];
  if (!audio) throw new Error("Sarvam TTS returned no audio");

  return { audio, language };
}