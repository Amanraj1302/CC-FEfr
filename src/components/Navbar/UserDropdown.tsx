import { Navigate } from "react-router-dom";

export const UserDropdown = ({
  userName,
  onEditProfile,
  onLogout,
}: {
  userName: string;
  onEditProfile: () => void;
  onLogout: () => void;
}) => (
  <div className="absolute right-2 top-full mt-2 w-64 max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg ">
    <div className="px-4 py-3 text-sm text-gray-700 font-medium border-b border-gray-100 break-words truncate">
      Hi, <strong className="break-all">{userName}</strong>
    </div>

    <button
      onClick={onEditProfile}
      className="w-full px-4 py-3 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-600 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.232 5.232l3.536 3.536M9 11l6.293-6.293a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L12 15l-4 1 1-4z"
        />
      </svg>
      Edit Profile
    </button>

    <button
      onClick={onLogout}
      className="w-full px-4 py-3 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-600 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
        />
      </svg>
      Logout
    </button>
  </div>
);
