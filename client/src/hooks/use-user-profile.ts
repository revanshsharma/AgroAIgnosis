import { useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  region: string;
  farmSize?: string;
  primaryCrop?: string;
  phone?: string;
  joinedDate: string;
}

const STORAGE_KEY = "krishimitra_user_profile";

const defaultProfile: UserProfile = {
  name: "",
  region: "",
  farmSize: "",
  primaryCrop: "",
  phone: "",
  joinedDate: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
};

export function useUserProfile() {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfileState(JSON.parse(stored));
      } catch {
        setProfileState(null);
      }
    } else {
      setProfileState(null);
    }
    setIsLoading(false);
  }, []);

  const saveProfile = (data: UserProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setProfileState(data);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    const updated = { ...(profile || defaultProfile), ...data };
    saveProfile(updated);
  };

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfileState(null);
  };

  const hasProfile = !isLoading && profile !== null && profile.name !== "" && profile.region !== "";

  return { profile, isLoading, hasProfile, saveProfile, updateProfile, clearProfile };
}

export const INDIAN_REGIONS = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const PRIMARY_CROPS = [
  "Rice (Paddy)",
  "Wheat",
  "Maize (Corn)",
  "Sugarcane",
  "Cotton",
  "Soybean",
  "Groundnut",
  "Sunflower",
  "Mustard",
  "Jowar (Sorghum)",
  "Bajra (Pearl Millet)",
  "Ragi (Finger Millet)",
  "Chickpea (Chana)",
  "Pigeon Pea (Tur Dal)",
  "Lentils (Masoor)",
  "Tomato",
  "Onion",
  "Potato",
  "Brinjal",
  "Chili",
  "Turmeric",
  "Ginger",
  "Banana",
  "Mango",
  "Grapes",
  "Mixed Vegetables",
  "Other",
];
