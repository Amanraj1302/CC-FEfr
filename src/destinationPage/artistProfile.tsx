// src/pages/ProfilePage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaInstagram, FaXTwitter, FaYoutube, FaLinkedin } from "react-icons/fa6";
import { ClipboardCopyIcon, ExternalLinkIcon, DownloadIcon, ZoomInIcon } from "@radix-ui/react-icons";
import { IoVideocam } from "react-icons/io5";
import { FaMicrophone, FaPhotoVideo, FaUserCircle } from "react-icons/fa";
import { getYouTubeEmbedUrl } from "../constants/utubelinkcorrector";

interface PastProject { projectName: string; role: string; workLink: string; }
interface Monologue { language: string; url: string; }

interface Artist {
  screenAge: any;
  fullName: string;
  currentCity?: string;
  currentState?: string;
  headshot?: string;
  shortBio?: string;
  skills?: string[];
  photos?: string[];
  videoReel?: string;
  talentCategory?: string[];
  age?: string;
  height?: string;
  gender?: string;
  language?: string[];
  whatsapp?: string;
  calling?: string;
  email: string;
  pastProjects?: PastProject[];
  monologues?: Monologue[];
  instagram?: string;
  youtube?: string;
  twitter?: string;
  linkedin?: string;
}

export const ProfilePage: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchArtist() {
      try {
        if (!email) throw new Error("Profile ID missing");
        const res = await fetch(`http://localhost:5000/api/artist/${email}`);
        const data = await res.json();
        setArtist(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch artist:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArtist();
  }, [email]);

  if (loading) return <p className="text-center mt-10">Loading profile…</p>;
  if (!artist) return <p className="text-center mt-10 text-red-500">Artist not found.</p>;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const photoUrls = artist.photos?.length
    ? artist.photos.map(p => `http://localhost:5000/uploads/${p}`)
    : [];
  const dpPath = artist?.photos?.find((photo) => (photo.includes("/artistDp")));
  const artistDp = `http://localhost:5000/uploads/${dpPath}`;
  console.log("#####", artistDp);

  const monologues = artist.monologues || [];
  function extractYouTubeId(url: string): string {
    if (url.includes("youtu.be")) {
      return url.split("youtu.be/")[1]?.split("?")[0];
    }
    if (url.includes("watch?v=")) {
      return url.split("v=")[1]?.split("&")[0];
    }
    if (url.includes("/embed/")) {
      return url.split("/embed/")[1]?.split("?")[0];
    }
    return ""; // fallback
  }


  return (
    <div className="flex flex-col items-center pt-20 px-4 md:px-20">
      {/* Profile Header */}
      <div className="w-full  bg-black/30 rounded-3xl shadow-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img src={artistDp} alt={artist.fullName} className="w-32 h-32 rounded-xl object-cover" />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{artist.fullName}</h2>
            {artist.talentCategory?.length && (
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(artist.talentCategory) ? (
                  artist.talentCategory.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))
                ) : artist.talentCategory ? (
                  <span>{artist.talentCategory}</span>
                ) : null}
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1">📍 {artist.currentCity}, {artist.currentState}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleCopy}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2"
          >
            <ClipboardCopyIcon className="w-4 h-4" />
            Copy profile link
          </button>
          <div className="flex gap-3 text-2xl">
            {artist.instagram && <a href={artist.instagram}><FaInstagram /></a>}
            {artist.twitter && <a href={artist.twitter}><FaXTwitter /></a>}
            {artist.youtube && <a href={artist.youtube}><FaYoutube /></a>}
            {artist.linkedin && <a href={artist.linkedin}><FaLinkedin /></a>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Left */}
        <div className="flex-1 space-y-8">
          {/* About */}
          {artist.shortBio && (
            <div>
              <div className="flex items-center mb-2">
                <FaUserCircle className="text-red-600 text-xl mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
              </div>
              <p className="text-gray-700">{artist.shortBio}</p>
            </div>
          )}
          {/* Skills */}
          {artist.skills?.length && (
            <div>
              <div className="flex items-center mb-4">
                <span className="text-red-600 text-xl mr-2">★</span>
                <h2 className="text-lg font-semibold text-gray-900">Skills & Specialties</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {artist.skills.map((skill, i) => (
                  <span key={i} className="border border-red-500 text-red-600 px-4 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Photos */}
          {photoUrls.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaPhotoVideo className="text-red-600 text-xl" /> Photos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photoUrls.map((url, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden group">
                    <img
                      src={url}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-auto object-cover rounded-xl shadow-md"
                    />
                    <div
                      onClick={() => setZoomedImage(url)}
                      className="absolute top-2 right-2 bg-white/80 rounded-full p-1 cursor-pointer group-hover:scale-110 transition"
                    >
                      <ZoomInIcon className="w-4 h-4 text-gray-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {zoomedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
              onClick={() => setZoomedImage(null)}
            >
              <img
                src={zoomedImage}
                alt="Zoomed"
                className="max-w-full max-h-full rounded-xl shadow-lg"
              />
            </div>
          )}
          {/* Video Reel */}
          {artist.videoReel && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <IoVideocam className="text-red-600 text-xl" /> Video Reel
              </h2>
              <iframe
                src={getYouTubeEmbedUrl(artist.videoReel, true)}
                title="Video Reel"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-64 md:h-80 rounded-lg"
              />
            </div>
          )}

        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col items-center gap-6 max-w-md w-full">
          <div className="w-full bg-white rounded-xl shadow-md p-4 text-sm space-y-2 hover:scale-[1.01] transition">
            {[
              ["Age", artist.age],
              ["Height", artist.height],
              ["Gender", artist.gender],
              ["Languages", (
                Array.isArray(artist.language) && artist.language
                  ? artist.language.join(", ")
                  : artist.language || "N/A"
              )],
              ["Screen Age", artist.screenAge],
              ["Current City", artist.currentCity],
              ["WhatsApp", artist.whatsapp],
              ["Calling", artist.calling],
              ["Email", artist.email],
            ].map(([label, value], i) =>
              value ? (
                <div className="flex justify-between pb-3 border-b border-gray-200" key={i}>
                  <span className="font-semibold">{label}:</span>
                  <span>{value}</span>
                </div>
              ) : null
            )}
          </div>
          {artist.pastProjects?.length && (
            <div className="w-full bg-white rounded-xl shadow-md p-4 text-sm hover:scale-[1.01] transition">
              <h3 className="font-semibold mb-2">Past experience:</h3>
              <div className="text-red-600 space-y-2">
                {artist.pastProjects.map((proj, idx) => (
                  <div key={idx} className={idx ? "border-t pt-2" : ""}>
                    <a href={proj.workLink} className="underline">{proj.projectName}</a>
                    <p className="text-gray-700 text-xs">Role – {proj.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {monologues.length > 0 && (
            <div className="w-full bg-white rounded-xl shadow-md p-4 text-sm hover:scale-[1.01] transition">
              <h3 className="font-semibold mb-2">Monologue</h3>
              <div className="text-red-600 space-y-2">
                {monologues.map((m, i) => (
                  <a key={i} href={m.url} className="flex items-center gap-1 underline">
                    Language – {m.language} <ExternalLinkIcon />
                  </a>
                ))}
              </div>
            </div>
          )}
          <button className="flex items-center gap-2 border border-red-600 text-red-600 px-4 py-2 rounded-full text-sm hover:bg-red-50">
            <DownloadIcon />
            Download profile
          </button>
        </div>
      </div>

      {/* Bottom Monologue Videos */}
      {monologues.length > 0 && (
        <div className="w-full mt-12">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6">
            <FaMicrophone className="text-red-600 text-xl" /> Monologue
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monologues.map((m, idx) => (
              <div key={idx} className="shadow-md border p-4 rounded-lg">
                <h2 className="text-lg text-red-600 font-semibold mb-2">{m.language} Monologue</h2>
                <iframe
                  src={getYouTubeEmbedUrl(m.url, false)}
                  title={`${m.language} monologue`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-64 md:h-80 rounded-lg"
                />

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};


