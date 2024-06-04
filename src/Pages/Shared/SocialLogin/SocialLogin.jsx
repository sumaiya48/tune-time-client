import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const loggedInUser = result.user;
      const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email };

      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saveUser)
      });

      const data = await response.json();
      if (data.insertedId || data.message === 'User already exists') {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("An error occurred during Google Sign-In. Please try again.");
    }
  };

  return (
    <div>
      <div className="divider"></div>
      <div className="w-full text-center my-4">
        <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
          <FcGoogle />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
