import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
      navigate('/')
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-4">
          {/* ...email/password fields... */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-2 text-sm text-gray-500">or</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full flex items-center justify-center gap-2 border cursor-pointer border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span>Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
