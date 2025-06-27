import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchDeliveryPartner } from "../../store/slices/ProfileSlice";
import {
  selectSelectedPartner,
  selectPartnersStatus,
  selectPartnersError,
} from "../../store/slices/ProfileSlice";
import { motion } from "framer-motion";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectSelectedPartner);
  const status = useAppSelector(selectPartnersStatus);
  const error = useAppSelector(selectPartnersError);

  useEffect(() => {
    if (!profile) dispatch(fetchDeliveryPartner());
  }, []);

  const personalInfo = [
    "name",
    "email",
    "mobileNumber",
    "permanentAddress",
    "dob",
    "age",
  ];
  const vehicleInfo = ["vehicleType", "vehicleNumber", "vehicleColor"];

  // Handle loading and error states
  if (status === "loading") {
    return <p className="text-center text-gray-600 mt-6">Loading profile...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center text-red-600 mt-6">
        Unable to Fetch Profile Details
      </p>
    );
  }

  if (error || !profile) {
    return (
      <p className="text-center text-red-500 mt-6">
        {error || "Failed to load profile"}
      </p>
    );
  }

  const enhancedProfile = {
    ...profile,
    ...profile.vehicleDetails,
    ...profile.documents,
    age: calculateAge(profile.dob),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>
        {/* <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Edit Profile
          </button>
        </div> */}
      </div>

      {/* Profile Content Cards */}
      <div className="space-y-5">
        <ProfileSection
          title="Personal Information"
          icon={
            <svg
              className="w-5 h-5 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          }
          fields={personalInfo}
          profile={enhancedProfile}
        />

        <ProfileSection
          title="Vehicle Details"
          icon={
            <svg
              className="w-5 h-5 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
            </svg>
          }
          fields={vehicleInfo}
          profile={enhancedProfile}
        />
      </div>
    </motion.div>
  );
};

interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  fields: string[];
  profile: Record<string, any>;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  icon,
  fields,
  profile,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <h2 className="font-medium text-gray-800">{title}</h2>
    </div>
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {fields?.map((key) => (
          <div key={key} className="space-y-1">
            <label className="text-sm font-medium text-gray-500">
              {formatLabel(key)}
            </label>
            <p className="text-gray-800 break-words">
              {formatValue(key, profile?.[key])}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const formatLabel = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// Format specific fields like DOB or age
const formatValue = (key: string, value: any): string => {
  if (!value) return "Not provided";

  if (key === "dob") {
    const date = new Date(value);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  }

  if (key === "age") {
    return `${value} years`;
  }

  return value;
};

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default Profile;
