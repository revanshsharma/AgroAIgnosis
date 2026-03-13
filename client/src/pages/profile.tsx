import { useState, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, MapPin, Calendar, Pencil, Check, X, Trash2, Sprout, Phone } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useUserProfile, INDIAN_REGIONS, PRIMARY_CROPS } from "@/hooks/use-user-profile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

function Profile() {
  const { profile, updateProfile, clearProfile } = useUserProfile();
  const [editing, setEditing] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [editName, setEditName] = useState(profile?.name || "");
  const [editPhone, setEditPhone] = useState(profile?.phone || "");
  const [editRegion, setEditRegion] = useState(profile?.region || "");
  const [editFarmSize, setEditFarmSize] = useState(profile?.farmSize || "");
  const [editCrop, setEditCrop] = useState(profile?.primaryCrop || "");

  const startEdit = () => {
    setEditName(profile?.name || "");
    setEditPhone(profile?.phone || "");
    setEditRegion(profile?.region || "");
    setEditFarmSize(profile?.farmSize || "");
    setEditCrop(profile?.primaryCrop || "");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const saveEdit = () => {
    if (!editName.trim() || !editRegion) return;
    updateProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      region: editRegion,
      farmSize: editFarmSize,
      primaryCrop: editCrop,
    });
    setEditing(false);
    toast({ title: "Profile updated", description: "Your information has been saved." });
  };

  const handleReset = () => {
    clearProfile();
    setLocation("/");
  };

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button size="icon" variant="ghost" className="text-primary-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-5 max-w-lg">
        {/* Avatar + Name */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold truncate">{profile?.name}</p>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{profile?.region || "Region not set"}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
                  <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Member since {profile?.joinedDate}</span>
                </div>
              </div>
              {!editing && (
                <Button size="icon" variant="outline" onClick={startEdit}>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit / View Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <>
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    type="tel"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>State / Region *</Label>
                  <Select onValueChange={setEditRegion} value={editRegion}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_REGIONS.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Primary Crop</Label>
                  <Select onValueChange={setEditCrop} value={editCrop}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="What do you mainly grow?" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIMARY_CROPS.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Farm Size</Label>
                  <Input
                    value={editFarmSize}
                    onChange={(e) => setEditFarmSize(e.target.value)}
                    placeholder="e.g. 2 acres, 5 bigha"
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={cancelEdit} className="flex-1">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={saveEdit} disabled={!editName.trim() || !editRegion} className="flex-1">
                    <Check className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <InfoRow icon={<User className="h-4 w-4" />} label="Name" value={profile?.name} />
                <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={profile?.phone || "Not provided"} />
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Region" value={profile?.region} />
                <InfoRow icon={<Sprout className="h-4 w-4" />} label="Primary Crop" value={profile?.primaryCrop || "Not specified"} />
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Farm Size" value={profile?.farmSize || "Not specified"} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">About KrishiMitra</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              KrishiMitra is your AI-powered farming companion, helping Indian farmers diagnose crop diseases,
              analyse soil conditions, and get expert agricultural advice tailored to your region.
            </p>
            <p className="text-xs text-muted-foreground">Version 1.0.0 &nbsp;·&nbsp; © 2025 KrishiMitra</p>
          </CardContent>
        </Card>

        {/* Reset */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full text-destructive border-destructive/40">
              <Trash2 className="mr-2 h-4 w-4" />
              Reset Profile
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset your profile?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear all your saved information and take you back to setup. Your analysis history will also be cleared.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground">
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value?: string }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value || "—"}</p>
      </div>
    </div>
  );
}

export default Profile;
