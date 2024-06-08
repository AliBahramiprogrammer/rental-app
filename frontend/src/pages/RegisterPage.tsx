import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as apiClent from "../api-client";
import "../styles/Register.scss";
import toast from "react-hot-toast";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    profileImage: FileList 
};

const RegisterPage = () => {
    const navigate = useNavigate();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const {mutateAsync} = useMutation({
        mutationFn: apiClent.register,
        onSuccess: () => {
            navigate("/login");
        }, onError: (error: Error) => {
            console.log(error)
        }
    });
    const onSubmit = handleSubmit((data: RegisterFormData) => {
        const formData = new FormData();

        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("password", data.password);

        Array.from(data.profileImage).forEach((profile) => {
            formData.append(`profileImage`, profile);
        })
        toast.promise(
            mutateAsync(formData),
             {
               loading: 'Saving...',
               success: <b>Register Successfully.</b>,
               error: <b>Register failed</b>,
             }
           );
    });

    return (
        <div className="register">
            <div className="register_content">
                <form className="register_content_form" onSubmit={onSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="First Name"
                            {...register("firstName", {
                                required: "Please enter first name",
                            })}
                        />
                        
                        {errors.firstName && (
                            <span>{errors.firstName.message}</span>
                        )}
                        
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            {...register("lastName", {
                                required: "Please enter last name",
                            })}
                        />
                        {errors.lastName && (
                            <span>{errors.lastName.message}</span>
                        )}
                    </label>
                    <label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Please enter email",
                            })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </label>
                    <label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Please enter password",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <span>{errors.password.message}</span>
                        )}
                    </label>
                    <label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", {
                                validate: (val) => {
                                    if (!val) {
                                        return "This field is required";
                                    } else if (watch("password") !== val) {
                                        return "Your Passwords do not match";
                                    }
                                },
                            })}
                        />
                        {errors.confirmPassword && (
                            <span>{errors.confirmPassword.message}</span>
                        )}
                    </label>
                    <label>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            type="file"
                            {...register("profileImage", {
                                validate: (profileImage) => {
                                    const totalLength = profileImage?.length || 0;
                                    if (totalLength === 0) {
                                        return "The image should be added";
                                    }
                                }
                            })}
                        />
                        <img
                            src="/assets/addImage.png"
                            alt="add profile photo"
                        />
                        <p>Upload Your Photo</p>
                        {errors.profileImage && (
                            <span>{errors.profileImage.message}</span>
                        )}
                    </label>
                    {watch("profileImage") && watch("profileImage")!?.length &&  (
                        <img
                            src={URL.createObjectURL(watch("profileImage")![0])}
                            alt="profile photo"
                            style={{ maxWidth: "80px" }}
                        />
                    )}
                    <button type="submit">REGISTER</button>
                </form>
                <Link to="/login">Already have an account? Log In Here</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
