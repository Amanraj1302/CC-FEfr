import { useNavigate } from 'react-router-dom';

export const AuthButtons = ({ showSignIn, showSignUp }: { showSignIn: boolean, showSignUp: boolean }) => {
  const navigate = useNavigate();
  return (
    <>
      {showSignIn && (
        <button
          className="px-4 py-2 border-2 border-red-500 rounded-xl font-semibold text-gray-600 hover:text-red-500 hover:shadow-md"
          onClick={() => navigate('/signIn')}
        >
          Sign in
        </button>
      )}
      {showSignUp && (
        <button
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:shadow-md hover:opacity-80"
          onClick={() => navigate('/signUp')}
        >
          Sign up
        </button>
      )}
    </>
  );
};