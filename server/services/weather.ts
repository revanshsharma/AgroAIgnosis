// Open-Meteo weather service — free, no API key required
// Docs: https://open-meteo.com/en/docs

export interface WeatherData {
  region: string;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    description: string;
    icon: string; // emoji-free: label code
    isRaining: boolean;
  };
  forecast: Array<{
    date: string;
    day: string;
    maxTemp: number;
    minTemp: number;
    precipitation: number;
    description: string;
    icon: string;
  }>;
  farmingAlert: string | null;
}

// WMO weather code → description + icon label
function decodeWeatherCode(code: number): { description: string; icon: string; isRaining: boolean } {
  if (code === 0) return { description: "Clear sky", icon: "sunny", isRaining: false };
  if (code === 1) return { description: "Mainly clear", icon: "sunny", isRaining: false };
  if (code === 2) return { description: "Partly cloudy", icon: "partly_cloudy", isRaining: false };
  if (code === 3) return { description: "Overcast", icon: "cloudy", isRaining: false };
  if (code <= 48) return { description: "Foggy", icon: "foggy", isRaining: false };
  if (code <= 55) return { description: "Drizzle", icon: "drizzle", isRaining: true };
  if (code <= 65) return { description: "Rain", icon: "rainy", isRaining: true };
  if (code <= 67) return { description: "Freezing rain", icon: "rainy", isRaining: true };
  if (code <= 75) return { description: "Snowfall", icon: "snowy", isRaining: false };
  if (code <= 82) return { description: "Rain showers", icon: "rainy", isRaining: true };
  if (code <= 86) return { description: "Snow showers", icon: "snowy", isRaining: false };
  if (code === 95) return { description: "Thunderstorm", icon: "stormy", isRaining: true };
  if (code <= 99) return { description: "Thunderstorm with hail", icon: "stormy", isRaining: true };
  return { description: "Unknown", icon: "cloudy", isRaining: false };
}

function getDayName(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString("en-IN", { weekday: "short" });
}

function buildFarmingAlert(current: WeatherData["current"], forecast: WeatherData["forecast"]): string | null {
  const alerts: string[] = [];

  if (current.isRaining || current.precipitation > 0) {
    alerts.push("Active rain — avoid pesticide/fertiliser application today.");
  }
  if (forecast.slice(0, 3).some(d => d.precipitation > 10)) {
    alerts.push("Heavy rain expected in coming days — ensure field drainage.");
  }
  if (current.temperature > 40) {
    alerts.push("Extreme heat — increase irrigation frequency and use mulching.");
  }
  if (current.temperature < 10) {
    alerts.push("Low temperatures — protect sensitive crops from cold stress.");
  }
  if (current.windSpeed > 30) {
    alerts.push("Strong winds — avoid spraying and support tall crops.");
  }
  if (current.humidity > 85) {
    alerts.push("High humidity — watch for fungal disease outbreaks.");
  }

  return alerts.length > 0 ? alerts[0] : null;
}

// Hardcoded coordinates for Indian states (geocoding fallback)
const STATE_COORDS: Record<string, { lat: number; lon: number; city: string }> = {
  "Andhra Pradesh": { lat: 15.9129, lon: 79.7400, city: "Amaravati" },
  "Assam": { lat: 26.2006, lon: 92.9376, city: "Guwahati" },
  "Bihar": { lat: 25.5941, lon: 85.1376, city: "Patna" },
  "Chhattisgarh": { lat: 21.2787, lon: 81.8661, city: "Raipur" },
  "Goa": { lat: 15.2993, lon: 74.1240, city: "Panaji" },
  "Gujarat": { lat: 23.0225, lon: 72.5714, city: "Ahmedabad" },
  "Haryana": { lat: 30.7333, lon: 76.7794, city: "Chandigarh" },
  "Himachal Pradesh": { lat: 31.1048, lon: 77.1734, city: "Shimla" },
  "Jammu & Kashmir": { lat: 34.0837, lon: 74.7973, city: "Srinagar" },
  "Jharkhand": { lat: 23.3441, lon: 85.3096, city: "Ranchi" },
  "Karnataka": { lat: 12.9716, lon: 77.5946, city: "Bengaluru" },
  "Kerala": { lat: 8.5241, lon: 76.9366, city: "Thiruvananthapuram" },
  "Madhya Pradesh": { lat: 23.2599, lon: 77.4126, city: "Bhopal" },
  "Maharashtra": { lat: 19.0760, lon: 72.8777, city: "Mumbai" },
  "Manipur": { lat: 24.6637, lon: 93.9063, city: "Imphal" },
  "Meghalaya": { lat: 25.5788, lon: 91.8933, city: "Shillong" },
  "Mizoram": { lat: 23.1645, lon: 92.9376, city: "Aizawl" },
  "Nagaland": { lat: 25.6751, lon: 94.1086, city: "Kohima" },
  "Odisha": { lat: 20.2961, lon: 85.8245, city: "Bhubaneswar" },
  "Punjab": { lat: 30.9010, lon: 75.8573, city: "Ludhiana" },
  "Rajasthan": { lat: 26.9124, lon: 75.7873, city: "Jaipur" },
  "Sikkim": { lat: 27.3389, lon: 88.6065, city: "Gangtok" },
  "Tamil Nadu": { lat: 13.0827, lon: 80.2707, city: "Chennai" },
  "Telangana": { lat: 17.3850, lon: 78.4867, city: "Hyderabad" },
  "Tripura": { lat: 23.9408, lon: 91.9882, city: "Agartala" },
  "Uttar Pradesh": { lat: 26.8467, lon: 80.9462, city: "Lucknow" },
  "Uttarakhand": { lat: 30.3165, lon: 78.0322, city: "Dehradun" },
  "West Bengal": { lat: 22.5726, lon: 88.3639, city: "Kolkata" },
};

const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000;
const weatherCache = new Map<string, { expiresAt: number; request: Promise<WeatherData> }>();

export async function getWeatherForRegion(region: string): Promise<WeatherData> {
  const cached = weatherCache.get(region);
  if (cached && cached.expiresAt > Date.now()) return cached.request;

  const request = fetchWeatherForRegion(region);
  weatherCache.set(region, { expiresAt: Date.now() + WEATHER_CACHE_TTL_MS, request });
  request.catch(() => weatherCache.delete(region));
  return request;
}

async function fetchWeatherForRegion(region: string): Promise<WeatherData> {
  const coords = STATE_COORDS[region] || STATE_COORDS["Maharashtra"];
  const { lat, lon, city } = coords;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FKolkata&forecast_days=5`;

  const response = await fetch(weatherUrl);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();
  const c = data.current;
  const daily = data.daily;

  const currentWeather = decodeWeatherCode(c.weather_code);
  const current: WeatherData["current"] = {
    temperature: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    humidity: Math.round(c.relative_humidity_2m),
    windSpeed: Math.round(c.wind_speed_10m),
    precipitation: c.precipitation,
    description: currentWeather.description,
    icon: currentWeather.icon,
    isRaining: currentWeather.isRaining,
  };

  const forecast: WeatherData["forecast"] = daily.time.slice(0, 5).map((date: string, i: number) => {
    const w = decodeWeatherCode(daily.weather_code[i]);
    return {
      date,
      day: getDayName(date),
      maxTemp: Math.round(daily.temperature_2m_max[i]),
      minTemp: Math.round(daily.temperature_2m_min[i]),
      precipitation: Math.round(daily.precipitation_sum[i] * 10) / 10,
      description: w.description,
      icon: w.icon,
    };
  });

  const farmingAlert = buildFarmingAlert(current, forecast);

  return {
    region: `${city}, ${region}`,
    current,
    forecast,
    farmingAlert,
  };
}
