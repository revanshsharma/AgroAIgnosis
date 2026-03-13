import { useState, useEffect, useContext, createContext } from "react";

export interface UserProfile {
  name: string;
  region: string;
  farmSize?: string;
  primaryCrop?: string;
  phone?: string;
  joinedDate: string;
}

const STORAGE_KEY = "krishimitra_user_profile";

export interface UserProfileContextValue {
  profile: UserProfile | null;
  isLoading: boolean;
  hasProfile: boolean;
  saveProfile: (data: UserProfile) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  clearProfile: () => void;
}

export const UserProfileContext = createContext<UserProfileContextValue | null>(null);

export function useUserProfile(): UserProfileContextValue {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error("useUserProfile must be used within UserProfileProvider");
  }
  return ctx;
}

export function useUserProfileState(): UserProfileContextValue {
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
    const updated = {
      ...(profile || {
        name: "",
        region: "",
        joinedDate: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
      }),
      ...data,
    };
    saveProfile(updated as UserProfile);
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
