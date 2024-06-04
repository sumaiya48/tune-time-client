import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email };
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            });
                    })
                    .catch(error => console.log(error));
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="flex flex-col lg:flex-row-reverse items-center max-w-5xl mx-auto p-4">
                <div className="text-center lg:text-left lg:w-1/2 px-4">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card w-full max-w-md lg:w-1/2 shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                name="name"
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                placeholder="Name"
                                className="input input-bordered"
                            />
                            {errors.name && <span className="text-red-700 py-1">{errors.name.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                name="photoURL"
                                {...register("photoURL", { required: "Photo URL is required" })}
                                type="text"
                                placeholder="Photo URL"
                                className="input input-bordered"
                            />
                            {errors.name && <span className="text-red-700 py-1">{errors.name.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                            />
                            {errors.email && <span className="text-red-700 py-1">{errors.email.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                        message: "Password must contain at least one capital letter and one special character",
                                    },
                                })}
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                            />
                            {errors.password && <span className="text-red-700 py-1">{errors.password.message}</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>
                        <div>
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                        <SocialLogin />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
