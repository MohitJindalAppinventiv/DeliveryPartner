// import React, { useEffect, useState } from "react";
// import { useAppDispatch,useAppSelector } from "../../hooks/useAppDispatch";
// import { fetchDeliveryPartner } from "../../store/ProfileSlice";;
// import { selectSelectedPartner,selectPartnersStatus,selectPartnersError } from "../../store/ProfileSlice";
// const Profile: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const profile = useAppSelector(selectSelectedPartner);
//   const status = useAppSelector(selectPartnersStatus);
//   const error = useAppSelector(selectPartnersError);

//   useEffect(() => {
//     // Fetch delivery partner data on component mount
//     dispatch(fetchDeliveryPartner()); // You might need to pass actual ID if required
//   }, [dispatch]);

//   // const profile = {
//   //   id: "user123",
//   //   name: "John Doe",
//   //   email: "john.doe@example.com",
//   //   phone: "9876543210",
//   //   address: "221B Baker Street, London",
//   //   dob: "1995-04-15",
//   //   age: "29",
//   //   vehicleType: "Bike",
//   //   vehicleNumber: "MH12AB1234",
//   //   vehicleColor: "Black",
//   //   drivinglicence: "DL-0123456789",
//   //   rc: "RC-9876543210",
//   //   aadhar: "1234-5678-9012",
//   // };

//   // Group fields into logical sections
//   const personalInfo = ["name", "email", "phone", "address", "dob", "age"];
//   const vehicleInfo = ["vehicleType", "vehicleNumber", "vehicleColor"];
//   const documentInfo = ["drivinglicence", "rc", "aadhar"];

//   return (
//     <div className="space-y-6">
//       {/* Page Header with Actions */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
//           <p className="text-gray-600 mt-1">Manage your account information</p>
//         </div>
//         <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
//           <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Profile Content Cards */}
//       <div className="space-y-5">
//         {/* Personal Information Card */}
//         <ProfileSection
//           title="Personal Information"
//           icon={
//             <svg
//               className="w-5 h-5 text-indigo-500"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           }
//           fields={personalInfo}
//           profile={profile}
//         />

//         {/* Vehicle Information Card */}
//         <ProfileSection
//           title="Vehicle Details"
//           icon={
//             <svg
//               className="w-5 h-5 text-indigo-500"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
//               <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
//             </svg>
//           }
//           fields={vehicleInfo}
//           profile={profile}
//         />

//         {/* Documents Card */}
//         <ProfileSection
//           title="Documents"
//           icon={
//             <svg
//               className="w-5 h-5 text-indigo-500"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           }
//           fields={documentInfo}
//           profile={profile}
//         />
//       </div>
//     </div>
//   );
// };

// // Profile Section Component
// const ProfileSection = ({
//   title,
//   icon,
//   fields,
//   profile,
// }: {
//   title: string;
//   icon: React.ReactNode;
//   fields: string[];
//   profile: any;
// }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//     <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
//       <div className="flex-shrink-0">{icon}</div>
//       <h2 className="font-medium text-gray-800">{title}</h2>
//     </div>
//     <div className="p-5">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//         {fields.map((key) => (
//           <div key={key} className="space-y-1">
//             <label className="text-sm font-medium text-gray-500">
//               {formatLabel(key)}
//             </label>
//             <p className="text-gray-800 break-words">
//               {profile[key] || (
//                 <span className="text-gray-400">Not provided</span>
//               )}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// // Format camelCase to "Camel Case"
// const formatLabel = (key: string) =>
//   key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// export default Profile;

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
// import { fetchDeliveryPartner } from "../../store/ProfileSlice";
// import {
//   selectSelectedPartner,
//   selectPartnersStatus,
//   selectPartnersError,
// } from "../../store/ProfileSlice";

// const Profile: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const profile = useAppSelector(selectSelectedPartner);
//   const status = useAppSelector(selectPartnersStatus);
//   const error = useAppSelector(selectPartnersError);

//   useEffect(() => {
//     dispatch(fetchDeliveryPartner());
//   }, [dispatch]);

//   const personalInfo = ["name", "email", "mobileNumber", "permanentAddress", "dob", "age"];
//   const vehicleInfo = ["vehicleType", "vehicleNumber", "vehicleColor"];
//   const documentInfo = ["drivinglicence", "rc", "aadhar"];

//   // Handle loading and error states
//   if (status === "loading") {
//     return <p className="text-center text-gray-600 mt-6">Loading profile...</p>;
//   }

//   if (error || !profile) {
//     return (
//       <p className="text-center text-red-500 mt-6">
//         {error || "Failed to load profile"}
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
//           <p className="text-gray-600 mt-1">Manage your account information</p>
//         </div>
//         <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
//           <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Profile Content Cards */}
//       <div className="space-y-5">
//         <ProfileSection
//           title="Personal Information"
//           icon={
//             <svg
//               className="w-5 h-5 text-indigo-500"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           }
//           fields={personalInfo}
//           profile={profile}
//         />

//         <ProfileSection
//           title="Vehicle Details"
//           icon={
//             <svg
//               className="w-5 h-5 text-indigo-500"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
//               <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
//             </svg>
//           }
//           fields={vehicleInfo}
//           profile={profile.vehicleDetails}
//         />

//         {/* <ProfileSection
//           title="Documents"
//           icon={
//             <svg
//               className="w-5 h-5 text-indigo-500"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           }
//           fields={documentInfo}
//           profile={profile.documents}
//         /> */}
//       </div>
//     </div>
//   );
// };

// interface ProfileSectionProps {
//   title: string;
//   icon: React.ReactNode;
//   fields: string[];
//   profile: Record<string, any>;
// }

// const ProfileSection: React.FC<ProfileSectionProps> = ({
//   title,
//   icon,
//   fields,
//   profile,
// }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//     <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
//       <div className="flex-shrink-0">{icon}</div>
//       <h2 className="font-medium text-gray-800">{title}</h2>
//     </div>
//     <div className="p-5">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//         {fields.map((key) => (
//           <div key={key} className="space-y-1">
//             <label className="text-sm font-medium text-gray-500">
//               {formatLabel(key)}
//             </label>
//             <p className="text-gray-800 break-words">
//               {profile?.[key] ?? <span className="text-gray-400">Not provided</span>}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// // Format camelCase to "Camel Case"
// const formatLabel = (key: string) =>
//   key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// export default Profile;

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
// import { fetchDeliveryPartner } from "../../store/ProfileSlice";
// import {
//   selectSelectedPartner,
//   selectPartnersStatus,
//   selectPartnersError,
// } from "../../store/ProfileSlice";

// const Profile: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const profile = useAppSelector(selectSelectedPartner);
//   const status = useAppSelector(selectPartnersStatus);
//   const error = useAppSelector(selectPartnersError);

//   useEffect(() => {
//     dispatch(fetchDeliveryPartner());
//   }, [dispatch]);

//   const personalInfo = ["name", "email", "mobileNumber", "permanentAddress", "dob", "age"];
//   const vehicleInfo = ["vehicleType", "vehicleNumber", "vehicleColor"];
//   const documentInfo = ["drivinglicence", "rc", "aadhar"];

//   // Handle loading and error states
//   if (status === "loading") {
//     return <p className="text-center text-gray-600 mt-6">Loading profile...</p>;
//   }

//   if (error || !profile) {
//     return (
//       <p className="text-center text-red-500 mt-6">
//         {error || "Failed to load profile"}
//       </p>
//     );
//   }

//   // Merge age into profile
//   const enhancedProfile = {
//     ...profile,
//     ...profile.vehicleDetails,
//     ...profile.documents,
//     age: calculateAge(profile.dob),
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
//           <p className="text-gray-600 mt-1">Manage your account information</p>
//         </div>
//         <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
//           <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Profile Content Cards */}
//       <div className="space-y-5">
//         <ProfileSection
//           title="Personal Information"
//           icon={
//             <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           }
//           fields={personalInfo}
//           profile={enhancedProfile}
//         />

//         <ProfileSection
//           title="Vehicle Details"
//           icon={
//             <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
//               <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
//             </svg>
//           }
//           fields={vehicleInfo}
//           profile={enhancedProfile}
//         />

//         {/* <ProfileSection
//           title="Documents"
//           icon={
//             <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           }
//           fields={documentInfo}
//           profile={enhancedProfile}
//         /> */}
//       </div>
//     </div>
//   );
// };

// interface ProfileSectionProps {
//   title: string;
//   icon: React.ReactNode;
//   fields: string[];
//   profile: Record<string, any>;
// }

// const ProfileSection: React.FC<ProfileSectionProps> = ({
//   title,
//   icon,
//   fields,
//   profile,
// }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//     <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
//       <div className="flex-shrink-0">{icon}</div>
//       <h2 className="font-medium text-gray-800">{title}</h2>
//     </div>
//     <div className="p-5">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//         {fields.map((key) => (
//           <div key={key} className="space-y-1">
//             <label className="text-sm font-medium text-gray-500">
//               {formatLabel(key)}
//             </label>
//             <p className="text-gray-800 break-words">
//               {formatValue(key, profile?.[key])}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// // Format camelCase or field names to readable labels
// const formatLabel = (key: string) =>
//   key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// // Format specific fields like DOB or age
// const formatValue = (key: string, value: any): string => {
//   if (!value) return "Not provided";

//   if (key === "dob") {
//     const date = new Date(value);
//     return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
//   }

//   if (key === "age") {
//     return `${value} years`;
//   }

//   return value;
// };

// // Utility function to calculate age from DOB
// const calculateAge = (dob: string): number => {
//   const birthDate = new Date(dob);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// export default Profile;

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchDeliveryPartner } from "../../store/ProfileSlice";
import {
  selectSelectedPartner,
  selectPartnersStatus,
  selectPartnersError,
} from "../../store/ProfileSlice";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectSelectedPartner);
  const status = useAppSelector(selectPartnersStatus);
  const error = useAppSelector(selectPartnersError);

  useEffect(() => {
    dispatch(fetchDeliveryPartner());
  }, [dispatch]);

  const personalInfo = [
    "name",
    "email",
    "mobileNumber",
    "permanentAddress",
    "dob",
    "age",
  ];
  const vehicleInfo = ["vehicleType", "vehicleNumber", "vehicleColor"];
  const documentInfo = ["drivinglicence", "rc", "aadhar"];

  // Handle loading and error states
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-4">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-red-600 mb-2">
            {error || "Failed to load profile"}
          </p>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // Merge age into profile
  const enhancedProfile = {
    ...profile,
    ...profile.vehicleDetails,
    ...profile.documents,
    age: calculateAge(profile.dob),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-25 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                My Profile
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Manage your account information
              </p>
            </div>
            <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Content Cards */}
          <div className="space-y-6">
            <ProfileSection
              title="Personal Information"
              icon={
                <div className="p-2 bg-gray-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              }
              fields={personalInfo}
              profile={enhancedProfile}
            />

            <ProfileSection
              title="Vehicle Details"
              icon={
                <div className="p-2 bg-gray-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                  </svg>
                </div>
              }
              fields={vehicleInfo}
              profile={enhancedProfile}
            />
          </div>
        </div>
      </div>
    </div>
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
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex items-center gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <h2 className="text-xl font-bold text-gray-800 tracking-wide">{title}</h2>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {fields.map((key) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {formatLabel(key)}
            </label>
            <p className="text-gray-800 font-medium text-lg break-words bg-gray-50 rounded-lg px-4 py-3 border-l-4 border-gray-300">
              {formatValue(key, profile?.[key])}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Format camelCase or field names to readable labels
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

// Utility function to calculate age from DOB
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
