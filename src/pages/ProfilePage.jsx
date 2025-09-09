import { useContext, useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import authContext from "../context/authContext";
import avatar from '../../public/avatar.png';

const ProfilePage = () => {

  const context = useContext(authContext);
  const { authUser, isUpdatingProfile, updateProfile } = context;


  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // e.g., 8 MB cap
    const MAX_BYTES = 8 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      toast.error("Please choose an image under 8 MB");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="pt-20 bg-slate-800 text-gray-200 p-4 py-8 min-h-screen flex items-center justify-center">
      <div className="bg-slate-900 w-full md:max-w-xl mx-auto rounded-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-1">{authUser?.fullName}</h1>
          <p>Your profile information</p>
        </div>

        {/* avatar upload section */}

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img src={selectedImg || authUser.profilePic || avatar} alt="Profile" className="size-32 rounded-full object-cover border-4 " />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-yellow-500 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
              <Camera className="w-5 h-5 text-black" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400 h-5">
            {isUpdatingProfile && "Uploading..."}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="text-sm text-zinc-400 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
        </div>

        <div className="bg-base-300 rounded-xl py-2 px-6">
          <h2 className="text-lg font-medium mb-2">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-500">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default ProfilePage;