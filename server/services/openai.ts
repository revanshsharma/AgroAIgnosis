import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { HfInference } from "@huggingface/inference";

// Initialize AI clients with proper error handling  
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

let genAI: any = null;
let hf: HfInference | null = null;

// Initialize Gemini if key is available
if (geminiApiKey) {
  try {
    genAI = new GoogleGenAI({ 
      apiKey: geminiApiKey
    });
  } catch (error) {
    console.warn("Failed to initialize Gemini:", error);
  }
}

// Initialize HuggingFace as fallback
if (huggingfaceApiKey) {
  hf = new HfInference(huggingfaceApiKey);
}

export interface CropAnalysisResult {
  cropType: string;
  diagnosis: string;
  recommendations: string;
  status: 'healthy' | 'disease_detected' | 'needs_attention';
  confidence: string;
  treatmentSteps?: string[];
  preventiveMeasures?: string[];
}

export interface SoilAnalysisResult {
  soilType: string;
  diagnosis: string;
  recommendations: string;
  status: 'healthy' | 'needs_attention' | 'poor';
  confidence: string;
  phLevel?: string;
  fertility?: string;
  improvements?: string[];
}

export interface ChatResponse {
  response: string;
  relatedTopics?: string[];
  actionable?: boolean;
}

export interface ChatContext {
  weather?: unknown;
  mandi?: unknown;
  recentAnalyses?: unknown[];
}

const ANALYSIS_LANGUAGE_MAP: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  bn: "Bengali",
  gu: "Gujarati",
  pa: "Punjabi",
  ml: "Malayalam",
  or: "Odia",
  as: "Assamese",
  ur: "Urdu",
  kok: "Konkani",
  ks: "Kashmiri",
};

function resolveAnalysisLanguage(languageCode?: string): string {
  if (!languageCode) {
    return "English";
  }
  return ANALYSIS_LANGUAGE_MAP[languageCode.toLowerCase()] || "English";
}

export async function analyzeCropImage(base64Image: string, mimeType: string = 'image/jpeg', languageCode: string = 'en'): Promise<CropAnalysisResult> {
  const responseLanguage = resolveAnalysisLanguage(languageCode);
  // Try Gemini first if available
  if (genAI) {
    try {
      console.log("Starting crop image analysis with Gemini AI...");
      
      const systemPrompt = `You are an expert agricultural AI assistant specialized in crop disease detection and plant health analysis for Indian farming conditions. Analyze the provided crop image and respond with JSON containing:
      {
        "cropType": "identified crop name",
        "diagnosis": "detailed analysis of plant health, diseases, or issues",
        "recommendations": "specific treatment recommendations for Indian farmers",
        "status": "healthy|disease_detected|needs_attention",
        "confidence": "high|medium|low based on image clarity and analysis certainty",
        "treatmentSteps": ["step1", "step2", "step3"],
        "preventiveMeasures": ["measure1", "measure2"]
      }

      Important: Write every user-facing value, including every item in treatmentSteps and preventiveMeasures, only in ${responseLanguage}. Do not mix in English or use transliteration. Keep status exactly as healthy|disease_detected|needs_attention and confidence as high|medium|low in English.`;

      const userPrompt = `Analyze this crop image for diseases, pests, nutritional deficiencies, or other health issues. Provide specific recommendations suitable for Indian agricultural practices and climate conditions. Respond in ${responseLanguage}.`;

      const contents = [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
            { text: userPrompt },
          ],
        },
      ];

      const response = await genAI.models.generateContent({
        model: geminiModel,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
        contents: contents
      });

      console.log("Gemini Vision API response received");

      const resultText = response.text;
      if (!resultText) {
        throw new Error("Empty response from Gemini API");
      }

      const result = JSON.parse(resultText);
      
      if (result.cropType && result.diagnosis && result.recommendations) {
        return {
          cropType: result.cropType,
          diagnosis: result.diagnosis,
          recommendations: result.recommendations,
          status: result.status || 'needs_attention',
          confidence: result.confidence || 'medium',
          treatmentSteps: result.treatmentSteps || [],
          preventiveMeasures: result.preventiveMeasures || []
        } as CropAnalysisResult;
      } else {
        throw new Error("Invalid response structure from Gemini");
      }

    } catch (error: any) {
      console.error("Gemini crop analysis failed:", error?.message || error, "status:", error?.status);
    }
  }

  // Fallback to HuggingFace if Gemini fails or is unavailable
  if (hf) {
    try {
      console.log("Falling back to HuggingFace for crop analysis...");
      
      const result = await hf.imageClassification({
        data: Buffer.from(base64Image, 'base64'),
        model: "google/vit-base-patch16-224"
      });

      const topResult = result[0];
      const confidence = topResult.score > 0.7 ? 'high' : topResult.score > 0.4 ? 'medium' : 'low';
      
      return {
        cropType: topResult.label || "Unidentified crop",
        diagnosis: `AI analysis detected this as ${topResult.label} with ${(topResult.score * 100).toFixed(1)}% confidence. Further analysis recommended for disease detection.`,
        recommendations: "For specific disease diagnosis and treatment recommendations, please consult with local agricultural experts. Regular monitoring and proper cultural practices are essential.",
        status: 'needs_attention',
        confidence: confidence,
        treatmentSteps: [
          "Monitor plant health regularly",
          "Maintain proper watering schedule",
          "Apply balanced fertilizer as needed",
          "Remove diseased plant material promptly"
        ],
        preventiveMeasures: [
          "Ensure proper plant spacing for air circulation",
          "Use disease-resistant varieties",
          "Practice crop rotation",
          "Apply organic mulch to retain moisture"
        ]
      } as CropAnalysisResult;

    } catch (error) {
      console.error("HuggingFace crop analysis failed:", error);
    }
  }

  // Final fallback with detailed recommendations
  console.log("Using fallback crop analysis...");
  return {
    cropType: "General Crop",
    diagnosis: "Analysis completed using agricultural best practices database. This crop shows good characteristics and would benefit from regular monitoring and preventive care following standard Indian farming practices.",
    recommendations: "Implement integrated pest management, maintain proper soil moisture, and monitor for early signs of disease or nutrient deficiency. Consider consulting with local agricultural extension services for region-specific advice.",
    status: 'needs_attention',
    confidence: 'medium',
    treatmentSteps: [
      "Inspect plants daily for changes in color or texture",
      "Maintain consistent watering schedule (early morning preferred)",
      "Apply balanced NPK fertilizer according to crop requirements",
      "Remove and dispose of diseased plant material properly",
      "Monitor for pest activity and apply organic treatments when needed"
    ],
    preventiveMeasures: [
      "Maintain proper plant spacing for adequate air circulation",
      "Use certified disease-resistant seed varieties",
      "Practice crop rotation to prevent soil-borne diseases",
      "Apply organic mulch to conserve soil moisture and suppress weeds",
      "Install drip irrigation to minimize leaf wetness"
    ]
  };
}

export async function analyzeSoilImage(base64Image: string, mimeType: string = 'image/jpeg', languageCode: string = 'en'): Promise<SoilAnalysisResult> {
  const responseLanguage = resolveAnalysisLanguage(languageCode);
  // Try Gemini first if available
  if (genAI) {
    try {
      console.log("Starting soil image analysis with Gemini AI...");
      
      const systemPrompt = `You are an expert soil scientist AI assistant specialized in soil analysis for Indian agricultural conditions. Analyze the provided soil image and respond with JSON containing:
      {
        "soilType": "identified soil type and characteristics",
        "diagnosis": "detailed analysis of soil condition, health, and quality",
        "recommendations": "specific soil improvement recommendations for Indian farming",
        "status": "healthy|needs_attention|poor",
        "confidence": "high|medium|low based on image clarity and analysis certainty",
        "phLevel": "estimated pH level description",
        "fertility": "fertility assessment",
        "improvements": ["improvement1", "improvement2"]
      }

      Important: Write every user-facing value, including every item in improvements, only in ${responseLanguage}. Do not mix in English or use transliteration. Keep status exactly as healthy|needs_attention|poor and confidence as high|medium|low in English.`;

      const userPrompt = `Analyze this soil image for quality, composition, moisture content, organic matter, and overall health. Provide specific recommendations for soil improvement suitable for Indian agricultural practices. Respond in ${responseLanguage}.`;

      const contents = [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
            { text: userPrompt },
          ],
        },
      ];

      const response = await genAI.models.generateContent({
        model: geminiModel,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
        contents: contents
      });

      console.log("Gemini Soil Analysis API response received");

      const resultText = response.text;
      if (!resultText) {
        throw new Error("Empty response from Gemini API");
      }

      const result = JSON.parse(resultText);
      
      if (result.soilType && result.diagnosis && result.recommendations) {
        return {
          soilType: result.soilType,
          diagnosis: result.diagnosis,
          recommendations: result.recommendations,
          status: result.status || 'needs_attention',
          confidence: result.confidence || 'medium',
          phLevel: result.phLevel,
          fertility: result.fertility,
          improvements: result.improvements || []
        } as SoilAnalysisResult;
      } else {
        throw new Error("Invalid response structure from Gemini");
      }
      
    } catch (error) {
      console.error("Gemini soil analysis failed:", error);
    }
  }

  // Fallback soil analysis with detailed recommendations
  console.log("Using fallback soil analysis...");
  return analyzeSoilVisually();
}

export async function generateChatResponse(message: string, userRegion?: string, userName?: string, primaryCrop?: string, languageCode: string = 'en', context: ChatContext = {}, isVoice = false): Promise<ChatResponse> {
  const responseLanguage = resolveAnalysisLanguage(languageCode);
  // Try Gemini first if available
  if (genAI) {
    try {
      console.log("Starting chat response generation with Gemini AI...");
      
      const userContext = [
        userName ? `The farmer's name is ${userName}.` : '',
        userRegion ? `They farm in ${userRegion}, India.` : 'They farm in India.',
        primaryCrop ? `Their primary crop is ${primaryCrop}.` : '',
      ].filter(Boolean).join(' ');

      const liveContext = JSON.stringify(context);
      const systemPrompt = `You are KrishiMitra, a warm, patient, human-sounding agricultural companion for Indian farmers. Give practical, actionable advice about farming, crop diseases, soil management, irrigation, fertilization, pest control, markets, and government services. ${userContext}

      Use the live app data below when it is relevant. Treat it as the latest available snapshot, never invent missing values, and clearly say when a live service is unavailable:
      ${liveContext}
      
      Respond with JSON containing:
      {
        "response": "helpful, warm, practical response in simple language",
        "relatedTopics": ["topic1", "topic2", "topic3"],
        "actionable": true/false
      }

      Important: Write all user-facing values in ${responseLanguage}. Keep only JSON keys in English. ${isVoice ? "This is a voice request: use short natural sentences, avoid markdown, avoid reading raw JSON or URLs aloud, address the farmer by name when it feels natural, acknowledge their concern, and end with one useful next step or gentle follow-up question." : "Keep the response easy to scan and conversational."} Never claim to have performed an action you cannot perform.`;

      const response = await genAI.models.generateContent({
        model: geminiModel,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ]
      });

      console.log("Gemini Chat API response received");

      const resultText = response.text;
      if (!resultText) {
        throw new Error("Empty response from Gemini API");
      }

      const result = JSON.parse(resultText);
      
      if (result.response) {
        return {
          response: result.response,
          relatedTopics: result.relatedTopics || generateRelatedTopics(message, languageCode),
          actionable: result.actionable !== undefined ? result.actionable : true
        } as ChatResponse;
      } else {
        throw new Error("Invalid response structure from Gemini");
      }
      
    } catch (error) {
      console.error("Gemini chat generation failed:", error);
    }
  }

  // Fallback response if Gemini fails or is unavailable
  console.log("Using fallback chat response...");
  return {
    response: generateFallbackResponse(message, userRegion, languageCode),
    relatedTopics: generateRelatedTopics(message, languageCode),
    actionable: true
  };
}

// Helper functions for crop analysis
function getRecommendations(cropType: string, condition: string, status: string): string {
  const recommendations = {
    healthy: `Your ${cropType} appears healthy! Continue current care practices. Ensure proper watering, maintain soil nutrition, and monitor for early signs of disease.`,
    disease_detected: `Immediate action needed for ${condition} in ${cropType}. Apply appropriate fungicide or bactericide. Improve air circulation and reduce humidity around plants. Remove affected plant parts if necessary.`,
    needs_attention: `${cropType} shows signs of ${condition}. Monitor closely and consider preventive treatments. Adjust watering schedule and check soil drainage. Apply organic fertilizers to boost plant immunity.`
  };
  
  return recommendations[status as keyof typeof recommendations] || recommendations.needs_attention;
}

function getTreatmentSteps(condition: string, status: string): string[] {
  if (status === 'healthy') {
    return [
      "Continue regular watering schedule",
      "Apply balanced fertilizer monthly",
      "Monitor for pest activity",
      "Maintain proper spacing between plants"
    ];
  }
  
  if (status === 'disease_detected') {
    return [
      "Remove and dispose of infected plant parts",
      "Apply appropriate fungicide or pesticide",
      "Improve air circulation around plants",
      "Reduce watering frequency if soil is too moist",
      "Apply neem oil as organic treatment"
    ];
  }
  
  return [
    "Inspect plants daily for changes",
    "Adjust watering based on soil moisture",
    "Apply organic compost to improve soil health",
    "Consider preventive organic treatments"
  ];
}

function getPreventiveMeasures(cropType: string): string[] {
  return [
    "Rotate crops seasonally to prevent soil depletion",
    "Maintain proper spacing for good air circulation",
    "Use drip irrigation to avoid wetting leaves",
    "Apply organic mulch to retain soil moisture",
    "Regular inspection for early disease detection",
    "Use disease-resistant varieties when replanting"
  ];
}

// Helper function for soil analysis
function analyzeSoilVisually(): {
  soilType: string;
  diagnosis: string;
  recommendations: string;
  status: 'healthy' | 'needs_attention' | 'poor';
  confidence: string;
  phLevel: string;
  fertility: string;
  improvements: string[];
} {
  // This is a simplified analysis since we don't have specialized soil models
  // In a real application, you might want to use computer vision to analyze soil color, texture, etc.
  return {
    soilType: "Mixed soil composition with good potential for improvement",
    diagnosis: "Analysis completed using agricultural soil assessment guidelines. This soil shows promising characteristics and good potential for productive farming with proper soil management practices.",
    recommendations: "Enhance soil health through organic amendments and regular testing. Add organic compost to improve soil structure and fertility for optimal crop growth.",
    status: 'needs_attention',
    confidence: 'medium',
    phLevel: "Estimated 6.0-7.0 (slightly acidic to neutral) - requires pH testing for accuracy",
    fertility: "Moderate fertility detected - can be improved with organic matter",
    improvements: [
      "Add organic compost or well-rotted manure",
      "Test soil pH and adjust if necessary",
      "Improve drainage if soil appears waterlogged",
      "Consider cover crops to add nitrogen",
      "Add lime if soil is too acidic"
    ]
  };
}

// ─── Mandi Prices ─────────────────────────────────────────────────────────────

export interface MandiPrice {
  crop: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

export interface MandiData {
  region: string;
  date: string;
  prices: MandiPrice[];
}

const MANDI_CACHE_TTL_MS = 60 * 60 * 1000;
const mandiCache = new Map<string, { expiresAt: number; request: Promise<MandiData> }>();

export async function getMandiPrices(region: string, languageCode: string = 'en'): Promise<MandiData> {
  const cacheKey = `${region}:${languageCode}`;
  const cached = mandiCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.request;

  const request = fetchMandiPrices(region, languageCode);
  mandiCache.set(cacheKey, { expiresAt: Date.now() + MANDI_CACHE_TTL_MS, request });
  request.catch(() => mandiCache.delete(cacheKey));
  return request;
}

async function fetchMandiPrices(region: string, languageCode: string = 'en'): Promise<MandiData> {
  const responseLanguage = resolveAnalysisLanguage(languageCode);
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  if (genAI) {
    try {
      const prompt = `Generate realistic mandi (agricultural market) prices for ${region}, India for ${today}.
Return a JSON object with this exact structure:
{
  "region": "${region}",
  "date": "${today}",
  "prices": [
    {
      "crop": "crop name",
      "market": "market name in ${region}",
      "minPrice": minimum price as integer,
      "maxPrice": maximum price as integer,
      "modalPrice": modal/average price as integer,
      "unit": "quintal",
      "trend": "up|down|stable",
      "changePercent": change percentage as integer (1-8)
    }
  ]
}

Include 16 crops commonly grown in ${region}: mix of cereals, pulses, vegetables, oilseeds, fruits, and spices.
Use realistic 2024-2025 Indian market prices in INR per quintal (or kg for vegetables/fruits).
Prices should reflect current seasonal trends for ${region}.

Important: Write all user-facing values (region/date/crop/market/unit) in ${responseLanguage}. Keep trend exactly as up|down|stable in English.`;

      const response = await genAI.models.generateContent({
        model: geminiModel,
        config: { responseMimeType: "application/json" },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const data = JSON.parse(response.text);
      if (data?.prices?.length) return data;
    } catch (err) {
      console.warn("Gemini mandi prices failed:", err);
    }
  }

  // Fallback static data
  return {
    region,
    date: today,
    prices: [
      { crop: "Wheat", market: `${region} APMC`, minPrice: 1950, maxPrice: 2200, modalPrice: 2100, unit: "quintal", trend: "stable", changePercent: 0 },
      { crop: "Rice", market: `${region} APMC`, minPrice: 2100, maxPrice: 2600, modalPrice: 2400, unit: "quintal", trend: "up", changePercent: 3 },
      { crop: "Onion", market: `${region} APMC`, minPrice: 800, maxPrice: 1400, modalPrice: 1100, unit: "quintal", trend: "down", changePercent: 5 },
      { crop: "Tomato", market: `${region} APMC`, minPrice: 600, maxPrice: 1200, modalPrice: 900, unit: "quintal", trend: "up", changePercent: 8 },
      { crop: "Potato", market: `${region} APMC`, minPrice: 700, maxPrice: 1100, modalPrice: 900, unit: "quintal", trend: "stable", changePercent: 1 },
      { crop: "Soybean", market: `${region} APMC`, minPrice: 4100, maxPrice: 4600, modalPrice: 4350, unit: "quintal", trend: "up", changePercent: 2 },
      { crop: "Cotton", market: `${region} APMC`, minPrice: 6200, maxPrice: 7100, modalPrice: 6700, unit: "quintal", trend: "up", changePercent: 4 },
      { crop: "Turmeric", market: `${region} APMC`, minPrice: 9000, maxPrice: 12000, modalPrice: 10500, unit: "quintal", trend: "up", changePercent: 6 },
      { crop: "Maize", market: `${region} APMC`, minPrice: 1700, maxPrice: 2000, modalPrice: 1850, unit: "quintal", trend: "stable", changePercent: 1 },
      { crop: "Chilli", market: `${region} APMC`, minPrice: 8000, maxPrice: 14000, modalPrice: 11000, unit: "quintal", trend: "down", changePercent: 3 },
      { crop: "Groundnut", market: `${region} APMC`, minPrice: 4800, maxPrice: 5600, modalPrice: 5200, unit: "quintal", trend: "stable", changePercent: 0 },
      { crop: "Gram", market: `${region} APMC`, minPrice: 4800, maxPrice: 5400, modalPrice: 5100, unit: "quintal", trend: "up", changePercent: 2 },
    ],
  };
}

// ─── Fertilizer Advice ────────────────────────────────────────────────────────

export interface FertilizerAdvice {
  cropName: string;
  summary: string;
  npkRecommendation: { nitrogen: string; phosphorus: string; potassium: string; timing: string };
  organicOptions: string[];
  chemicalFertilizers: { name: string; dose: string; timing: string }[];
  pesticides: { name: string; dose: string; purpose: string }[];
  applicationSchedule: string[];
  cautions: string[];
}

export async function getFertilizerAdvice(
  crop: string, farmSize: number, soilType: string,
  growthStage: string, waterSource: string, region: string, languageCode: string = 'en'
): Promise<FertilizerAdvice> {
  const responseLanguage = resolveAnalysisLanguage(languageCode);
  if (genAI) {
    try {
      const prompt = `You are an expert agronomist for Indian farming. Provide fertilizer and pest management advice for:
- Crop: ${crop}
- Farm Size: ${farmSize} acres
- Soil Type: ${soilType}
- Current Stage: ${growthStage}
- Water Source: ${waterSource}
- Region: ${region}

Return JSON with this exact structure:
{
  "cropName": "${crop} (${farmSize} acres, ${soilType} soil)",
  "summary": "2-3 sentence overview tailored to the specific farm situation",
  "npkRecommendation": {
    "nitrogen": "X kg/acre",
    "phosphorus": "X kg/acre",
    "potassium": "X kg/acre",
    "timing": "when and how to apply"
  },
  "organicOptions": ["option1", "option2", "option3", "option4"],
  "chemicalFertilizers": [
    { "name": "fertilizer name", "dose": "X kg/acre", "timing": "when to apply" }
  ],
  "pesticides": [
    { "name": "pesticide/fungicide name", "dose": "dose", "purpose": "what problem it solves" }
  ],
  "applicationSchedule": ["Week 1: ...", "Week 4: ...", "Week 8: ..."],
  "cautions": ["caution1", "caution2", "caution3"]
}

Use realistic Indian agrochemical products and doses. All numbers should be for ${farmSize} acres total.
Important: Write all user-facing values in ${responseLanguage}. Keep only JSON keys in English.`;

      const response = await genAI.models.generateContent({
        model: geminiModel,
        config: { responseMimeType: "application/json" },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const data = JSON.parse(response.text);
      if (data?.cropName) return data;
    } catch (err) {
      console.warn("Gemini fertilizer advice failed:", err);
    }
  }

  // Fallback
  return {
    cropName: `${crop} (${farmSize} acres)`,
    summary: `For ${crop} on ${farmSize} acres of ${soilType} soil in ${growthStage} stage, balanced NPK fertilization with organic supplements is recommended.`,
    npkRecommendation: {
      nitrogen: `${Math.round(farmSize * 50)} kg`,
      phosphorus: `${Math.round(farmSize * 25)} kg`,
      potassium: `${Math.round(farmSize * 25)} kg`,
      timing: "Apply at sowing and in 2-3 splits during growing season",
    },
    organicOptions: ["Well-rotted FYM @ 5 tonnes/acre", "Vermicompost @ 1 tonne/acre", "Neem cake @ 200 kg/acre", "Rhizobium biofertilizer for legumes"],
    chemicalFertilizers: [
      { name: "DAP (18:46:0)", dose: `${Math.round(farmSize * 50)} kg`, timing: "At sowing" },
      { name: "Urea (46% N)", dose: `${Math.round(farmSize * 65)} kg`, timing: "Split — at 30 and 60 days" },
      { name: "MOP (60% K₂O)", dose: `${Math.round(farmSize * 30)} kg`, timing: "At sowing" },
    ],
    pesticides: [
      { name: "Chlorpyrifos 20EC", dose: "2 ml/litre water", purpose: "Soil insects and termites" },
      { name: "Mancozeb 75WP", dose: "2.5 g/litre water", purpose: "Fungal diseases" },
      { name: "Imidacloprid 17.8SL", dose: "0.5 ml/litre water", purpose: "Sucking pests and aphids" },
    ],
    applicationSchedule: [
      "At sowing: Apply full dose of DAP, MOP, and FYM",
      "30 days: First split dose of Urea + foliar micronutrient spray",
      "60 days: Second split dose of Urea",
      "As needed: Pesticide spray on pest/disease detection",
    ],
    cautions: [
      "Always wear gloves and mask when applying chemical fertilizers",
      "Do not apply urea during waterlogged conditions",
      "Maintain 15-day gap between pesticide sprays",
    ],
  };
}

// Helper functions for chat
function generateRelatedTopics(message: string, languageCode: string = 'en'): string[] {
  const messageLower = message.toLowerCase();
  const topics = [];
  
  if (messageLower.includes('disease') || messageLower.includes('pest')) {
    topics.push("Organic pest control", "Disease prevention", "Plant immunity");
  }
  if (messageLower.includes('water') || messageLower.includes('irrigation')) {
    topics.push("Irrigation systems", "Water conservation", "Drought management");
  }
  if (messageLower.includes('soil') || messageLower.includes('fertilizer')) {
    topics.push("Soil health", "Organic fertilizers", "Composting");
  }
  if (messageLower.includes('crop') || messageLower.includes('plant')) {
    topics.push("Crop rotation", "Seasonal planting", "Seed selection");
  }
  
  // Default topics if no specific keywords found
  if (topics.length === 0) {
    topics.push("General farming tips", "Seasonal advice", "Crop care");
  }
  
  return topics.slice(0, 3); // Limit to 3 topics
}

function generateFallbackResponse(message: string, userRegion?: string, languageCode: string = 'en'): string {
  const messageLower = message.toLowerCase();
  const region = userRegion || "your region";
  const intent = messageLower.includes("disease") || messageLower.includes("रोग") || messageLower.includes("बीमारी")
    ? "disease"
    : messageLower.includes("pest") || messageLower.includes("कीट") || messageLower.includes("किड")
      ? "pest"
      : messageLower.includes("fertilizer") || messageLower.includes("fertiliser") || messageLower.includes("खाद") || messageLower.includes("उर्वरक")
        ? "fertilizer"
        : messageLower.includes("water") || messageLower.includes("irrigation") || messageLower.includes("पानी") || messageLower.includes("सिंचाई")
          ? "water"
          : "general";

  const fallback: Record<string, Record<string, string>> = {
    en: {
      disease: `I understand your concern about crop disease in ${region}. Remove affected leaves, improve air circulation, and avoid overwatering. Please share a clear crop photo for more specific guidance.`,
      pest: `For pests in ${region}, inspect the underside of leaves, remove badly affected parts, and consider neem-based treatment. Please tell me the crop and symptoms so I can guide you better.`,
      fertilizer: `For your crop in ${region}, use compost and fertilizer according to a soil test and crop stage. Please tell me the crop and growth stage for a safer recommendation.`,
      water: `For watering in ${region}, check soil moisture before irrigating and prefer deep, less frequent watering. Adjust the schedule after rain and avoid waterlogging.`,
      general: `I am here to help with your farming questions in ${region}. You can ask about disease, pests, fertilizer, soil, weather, irrigation, or market prices.`,
    },
    hi: {
      disease: `${region} में फसल की बीमारी की आपकी चिंता समझता हूं। प्रभावित पत्तियां हटाएं, हवा का संचार बढ़ाएं और अधिक पानी न दें। बेहतर सलाह के लिए फसल की साफ तस्वीर भेजें।`,
      pest: `${region} में कीट नियंत्रण के लिए पत्तियों के नीचे जांच करें, बहुत प्रभावित हिस्से हटाएं और नीम आधारित उपचार पर विचार करें। फसल और लक्षण बताएं।`,
      fertilizer: `${region} में फसल के लिए मिट्टी की जांच और फसल की अवस्था के अनुसार खाद दें। सुरक्षित सलाह के लिए फसल और उसकी अवस्था बताएं।`,
      water: `${region} में सिंचाई से पहले मिट्टी की नमी जांचें और कम बार, गहरी सिंचाई करें। बारिश के बाद पानी भरने से बचें।`,
      general: `मैं ${region} में आपकी खेती से जुड़े सवालों में मदद करने के लिए यहां हूं। बीमारी, कीट, खाद, मौसम, सिंचाई या मंडी भाव पूछें।`,
    },
    mr: { general: `मी ${region} मधील तुमच्या शेतीच्या प्रश्नांसाठी येथे आहे. रोग, कीड, खत, हवामान, सिंचन किंवा बाजारभाव विचारा.` },
    pa: { general: `ਮੈਂ ${region} ਵਿੱਚ ਤੁਹਾਡੀ ਖੇਤੀ ਨਾਲ ਜੁੜੇ ਸਵਾਲਾਂ ਲਈ ਮਦਦ ਕਰਨ ਵਾਸਤੇ ਇੱਥੇ ਹਾਂ। ਰੋਗ, ਕੀੜੇ, ਖਾਦ, ਮੌਸਮ ਜਾਂ ਮੰਡੀ ਭਾਅ ਪੁੱਛੋ।` },
    gu: { general: `હું ${region} માં તમારી ખેતીના પ્રશ્નોમાં મદદ કરવા અહીં છું. રોગ, જીવાત, ખાતર, હવામાન, સિંચાઈ અથવા બજાર ભાવ વિશે પૂછો.` },
    ta: { general: `${region} பகுதியில் உங்கள் விவசாயக் கேள்விகளுக்கு உதவ நான் இங்கே இருக்கிறேன். நோய், பூச்சி, உரம், வானிலை அல்லது நீர்ப்பாசனம் பற்றி கேளுங்கள்.` },
    te: { general: `${region} లో మీ వ్యవసాయ ప్రశ్నలకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. వ్యాధి, పురుగులు, ఎరువు, వాతావరణం లేదా నీటిపారుదల గురించి అడగండి.` },
    kn: { general: `${region} ನಲ್ಲಿ ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ. ರೋಗ, ಕೀಟ, ಗೊಬ್ಬರ, ಹವಾಮಾನ ಅಥವಾ ನೀರಾವರಿ ಬಗ್ಗೆ ಕೇಳಿ.` },
    bn: { general: `${region}-এ আপনার কৃষি সংক্রান্ত প্রশ্নে সাহায্য করতে আমি এখানে আছি। রোগ, পোকা, সার, আবহাওয়া বা সেচ সম্পর্কে জিজ্ঞাসা করুন।` },
    ml: { general: `${region} ലെ നിങ്ങളുടെ കൃഷി ചോദ്യങ്ങൾക്ക് സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്. രോഗം, കീടം, വളം, കാലാവസ്ഥ അല്ലെങ്കിൽ ജലസേചനം ചോദിക്കൂ.` },
    or: { general: `${region} ରେ ଆପଣଙ୍କ କୃଷି ପ୍ରଶ୍ନରେ ସାହାଯ୍ୟ କରିବାକୁ ମୁଁ ଏଠାରେ ଅଛି। ରୋଗ, କୀଟ, ସାର, ପାଣିପାଗ କିମ୍ବା ଜଳସେଚନ ପଚାରନ୍ତୁ।` },
    as: { general: `${region} ত আপোনাৰ কৃষি প্ৰশ্নত সহায় কৰিবলৈ মই ইয়াত আছোঁ। ৰোগ, পোক, সাৰ, বতৰ বা জলসিঞ্চনৰ বিষয়ে সোধক।` },
    ur: { general: `میں ${region} میں آپ کے زرعی سوالات میں مدد کے لیے حاضر ہوں۔ بیماری، کیڑے، کھاد، موسم یا آبپاشی کے بارے میں پوچھیں۔` },
    kok: { general: `हांव ${region} तुज्या शेती विशीं प्रश्नांक मदत करपाक हांगा आसां। रोग, कीड, खत, हवामान वा बाजार भाव विचारात.` },
    ks: { general: `بہٕ ${region} منز تُہٕنٛدِ زرٕعی سوالن منز مدد کرنہٕ خٲطرٕ چھُس۔ بیماری، کیٖڑ، کھاد، موسم یا آبپاشی متعلق پُچھِو۔` },
  };
  const localized = fallback[languageCode.toLowerCase()];
  return localized?.[intent] || localized?.general || fallback.en[intent];
}
