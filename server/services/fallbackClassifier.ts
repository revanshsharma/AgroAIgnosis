import * as ort from "onnxruntime-node";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SERVICE_DIR = path.dirname(fileURLToPath(import.meta.url));
const MODEL_DIR = [
  path.resolve(SERVICE_DIR, "..", "models"),
  path.resolve(SERVICE_DIR, "..", "server", "models"),
].find((directory) => fs.existsSync(path.join(directory, "plant_disease_model.onnx")))
  || path.resolve(SERVICE_DIR, "..", "models");
const MODEL_PATH = path.join(MODEL_DIR, "plant_disease_model.onnx");
const CLASS_INDICES_PATH = path.join(MODEL_DIR, "class_indices.json");
const TREATMENT_PATH = path.join(MODEL_DIR, "treatment_info.json");
const IMAGE_SIZE = 224;

type Treatment = {
  summary?: string;
  steps?: string[];
  note?: string;
};

export interface FallbackClassificationResult {
  crop: string;
  diagnosis: string;
  confidence: number;
  isHealthy: boolean;
  topPredictions: Array<{
    rawClass: string;
    crop: string;
    condition: string;
    confidence: number;
  }>;
  treatment: Treatment;
  source: "fallback_model";
}

let session: ort.InferenceSession | null = null;
let classIndices: Record<string, string> = {};
let treatmentInfo: Record<string, Treatment> = {};
let inputName = "input";
let outputName = "output";

export async function initFallbackClassifier(): Promise<void> {
  if (session) return;

  if (!fs.existsSync(MODEL_PATH)) {
    return;
  }

  session = await ort.InferenceSession.create(MODEL_PATH);
  inputName = session.inputNames[0];
  outputName = session.outputNames[0];
  classIndices = JSON.parse(fs.readFileSync(CLASS_INDICES_PATH, "utf8"));

  if (fs.existsSync(TREATMENT_PATH)) {
    treatmentInfo = JSON.parse(fs.readFileSync(TREATMENT_PATH, "utf8"));
  }

  console.log(
    `[fallbackClassifier] Loaded ONNX model with ${Object.keys(classIndices).length} classes ` +
      `(input="${inputName}", output="${outputName}")`,
  );
}

export function isFallbackClassifierReady(): boolean {
  return session !== null;
}

function formatClassName(rawName: string): { crop: string; condition: string } {
  const [rawCrop, rawCondition = "Unknown"] = rawName.split("___");
  return {
    crop: rawCrop.replace(/_/g, " "),
    condition: rawCondition.replace(/_/g, " "),
  };
}

export async function classifyWithFallbackModel(
  imageBuffer: Buffer,
): Promise<FallbackClassificationResult> {
  if (!session) {
    await initFallbackClassifier();
  }
  if (!session) {
    throw new Error("Fallback classifier model is not available");
  }

  const { data, info } = await sharp(imageBuffer)
    .resize(IMAGE_SIZE, IMAGE_SIZE, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (info.channels !== 3) {
    throw new Error(`Expected 3 channels after preprocessing, got ${info.channels}`);
  }

  const inputData = new Float32Array(IMAGE_SIZE * IMAGE_SIZE * 3);
  for (let index = 0; index < data.length; index += 1) {
    inputData[index] = data[index] / 127.5 - 1;
  }

  const inputTensor = new ort.Tensor("float32", inputData, [1, IMAGE_SIZE, IMAGE_SIZE, 3]);
  const results = await session.run({ [inputName]: inputTensor });
  const predictions = results[outputName].data as Float32Array;
  const topPredictions = Array.from(predictions)
    .map((probability, index) => ({ index, probability }))
    .sort((left, right) => right.probability - left.probability)
    .slice(0, 3)
    .map(({ index, probability }) => {
      const rawClass = classIndices[String(index)] ?? "Unknown";
      const { crop, condition } = formatClassName(rawClass);
      return { rawClass, crop, condition, confidence: probability };
    });

  const best = topPredictions[0];
  if (!best) {
    throw new Error("Fallback classifier returned no predictions");
  }

  const isHealthy = best.rawClass.toLowerCase().includes("healthy");
  return {
    crop: best.crop,
    diagnosis: isHealthy ? "Healthy" : best.condition,
    confidence: best.confidence,
    isHealthy,
    topPredictions,
    treatment: treatmentInfo[best.rawClass] ?? { note: "No treatment info available" },
    source: "fallback_model",
  };
}
