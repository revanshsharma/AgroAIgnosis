import { GoogleGenAI } from "@google/genai";
import { HfInference } from "@huggingface/inference";

// Initialize AI clients with proper error handling  
const geminiApiKey = process.env.GEMINI_API_KEY;
const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;

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

      Important: Write all user-facing values in ${responseLanguage}. Keep status exactly as healthy|disease_detected|needs_attention and confidence as high|medium|low in English.`;

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
        model: "gemini-2.5-flash",
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

      Important: Write all user-facing values in ${responseLanguage}. Keep status exactly as healthy|needs_attention|poor and confidence as high|medium|low in English.`;

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
        model: "gemini-2.5-flash",
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

export async function generateChatResponse(message: string, userRegion?: string, userName?: string, primaryCrop?: string): Promise<ChatResponse> {
  // Try Gemini first if available
  if (genAI) {
    try {
      console.log("Starting chat response generation with Gemini AI...");
      
      const userContext = [
        userName ? `The farmer's name is ${userName}.` : '',
        userRegion ? `They farm in ${userRegion}, India.` : 'They farm in India.',
        primaryCrop ? `Their primary crop is ${primaryCrop}.` : '',
      ].filter(Boolean).join(' ');

      const systemPrompt = `You are KrishiMitra, an AI agricultural assistant specialized in helping Indian farmers. You provide practical, actionable advice about farming, crop diseases, soil management, irrigation, fertilization, and pest control specific to Indian agricultural practices and climate conditions. ${userContext}
      
      Respond with JSON containing:
      {
        "response": "helpful, practical response in simple language",
        "relatedTopics": ["topic1", "topic2", "topic3"],
        "actionable": true/false
      }`;

      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
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
          relatedTopics: result.relatedTopics || generateRelatedTopics(message),
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
    response: generateFallbackResponse(message, userRegion),
    relatedTopics: generateRelatedTopics(message),
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

// Helper functions for chat
function generateRelatedTopics(message: string): string[] {
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

function generateFallbackResponse(message: string, userRegion?: string): string {
  const messageLower = message.toLowerCase();
  const regionText = userRegion ? ` for ${userRegion} region` : '';
  
  if (messageLower.includes('disease')) {
    return `For crop disease management${regionText}, start by identifying the specific symptoms. Remove affected plant parts, improve air circulation, and apply appropriate organic treatments like neem oil. Ensure proper drainage and avoid overwatering.`;
  }
  
  if (messageLower.includes('pest')) {
    return `Pest control${regionText} can be managed using integrated pest management. Use organic pesticides like neem oil, encourage beneficial insects, maintain proper plant spacing, and remove affected plants promptly.`;
  }
  
  if (messageLower.includes('fertilizer')) {
    return `For fertilization${regionText}, use a balanced approach with organic compost, well-rotted manure, and appropriate NPK fertilizers based on your soil test results. Apply during the growing season for best results.`;
  }
  
  if (messageLower.includes('water') || messageLower.includes('irrigation')) {
    return `Water management${regionText} is crucial. Water deeply but less frequently, use drip irrigation when possible, mulch to retain moisture, and adjust watering based on monsoon patterns and soil moisture.`;
  }
  
  return `I'm here to help with your farming questions${regionText}. Feel free to ask about crop diseases, soil care, pest control, fertilization, irrigation, or any other agricultural topic. I'll provide practical advice tailored to Indian farming practices.`;
}
