"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    profilePicture: "",
  });

  async function fetchProfile() {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
      setForm({
        displayName: data.displayName || "",
        email: data.email || "",
        profilePicture: data.profilePicture || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setProfile(updated);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading Profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      {editMode ? (
        <form className="flex flex-col gap-2 mb-7" onSubmit={handleSave}>
          <label className="mb-1 text-sm md:text-base">Display Name</label>
          <input
            type="text"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            required
            placeholder="Eg. John Doe"
            className="bg-[#1E1E1E] w-full p-3 border border-[#343434] rounded-lg mb-2 text-white placeholder-neutral-500 transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 text-sm md:text-base"
          />
          <label className="mb-1 text-sm md:text-base">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className="bg-[#1E1E1E] w-full p-3 border border-[#343434] rounded-lg mb-2 text-white placeholder-neutral-500 transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 text-sm md:text-base"
          />
          <label className="mb-1 text-sm md:text-base">
            Profile Picture URL
          </label>
          <input
            type="url"
            name="profilePicture"
            value={form.profilePicture}
            onChange={handleChange}
            placeholder="https://..."
            className="bg-[#1E1E1E] w-full p-3 border border-[#343434] rounded-lg mb-2 text-white placeholder-neutral-500 transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 text-sm md:text-base"
          />
          <div className="flex gap-3 mt-3">
            <button
              type="submit"
              className="bg-white text-[#131313] w-full p-3 rounded-full cursor-pointer font-semibold hover:bg-neutral-200 transition-all duration-200 ease-in-out shadow"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-[#252525] text-white w-full p-3 rounded-full cursor-pointer font-semibold hover:bg-[#343434] transition-all duration-200 ease-in-out shadow"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 relative">
              <Image
                src={profile.profilePicture || "/placeholder.png"}
                alt="Profile"
                fill
                sizes="96px"
                className="rounded-full object-cover border-2 border-[#343434] bg-[#1E1E1E]"
                priority
              />
            </div>
          </div>
          <div className="mb-2 text-center">
            <strong>Name:</strong> {profile.displayName}
          </div>
          <div className="mb-2 text-center">
            <strong>Email:</strong> {profile.email}
          </div>
          <div className="mb-4 text-center">
            <strong>Joined:</strong>{" "}
            {new Date(profile.createdAt).toLocaleDateString()}
          </div>
          {/* <button
            onClick={() => setEditMode(true)}
            className="bg-white text-[#131313] w-full p-3 rounded-full cursor-pointer font-semibold hover:bg-neutral-200 transition-all duration-200 ease-in-out mt-6 shadow"
          >
            Edit Profile
          </button> */}
        </div>
      )}
    </div>
  );
}
