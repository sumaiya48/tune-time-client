import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn, googleSignIn } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred during Google Sign-In. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An error occurred during login. Please try again.",
          showConfirmButton: true,
        });
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="flex flex-col lg:flex-row-reverse items-center max-w-5xl mx-auto p-4">
        <div className="text-center lg:text-left lg:w-1/2 px-4">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card w-full max-w-md lg:w-1/2 shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <div className="form-control mt-6">
              <button className="btn btn-outline" onClick={handleGoogleSignIn}>Login with Google</button>
            </div>
            <div className="mt-4">
              New to Time & Tune? <Link to="/signup" className="link link-primary">Register Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
