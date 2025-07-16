import { Navigate } from "react-router-dom";

export const UserDropdown = ({
  userName,
  role,
  onEditProfile,
  onLogout,
  onChangePassword
}: {
  userName: string;
  role: string;
  onEditProfile: () => void;
  onLogout: () => void;
  onChangePassword: () => void;
}) => (
  <div className="absolute right-2 top-full mt-2 w-64 max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg ">
    <div className="px-4 py-3 text-sm text-gray-700 font-medium border-b border-gray-100 break-words truncate">
      Hi, <strong className="break-all">{userName}</strong>
    </div>
{role === "artist" && (
    <button
      onClick={onEditProfile}
      className="w-full px-4 py-3 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
        stroke-linecap="round" stroke-linejoin="round"
        className="w-4 h-4" height="1em" width="1em"
        xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
        </path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
      Edit Profile
    </button>
)}
    <button
      onClick={onChangePassword}
      className="w-full px-4 py-3 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
    >
      <svg stroke="currentColor"
        fill="none" stroke-width="2" viewBox="0 0 24 24"
        stroke-linecap="round" stroke-linejoin="round"
        className="w-4 h-4" height="1em" width="1em"
        xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      Change Password
    </button>
    <button
      onClick={onLogout}
      className="w-full px-4 py-3 flex items-center gap-2 text-sm text-red-700 hover:bg-gray-50 rounded-lg transition"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" 
      viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" 
      className="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4">
          </path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
      Logout
    </button>

  </div>
);
