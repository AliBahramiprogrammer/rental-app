import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as apiClent from "../api-client";
import { userActions } from "../redux/state";
import "../styles/Login.scss";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export type LoginFormData = {
    email: string;
    password: string;
};
const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const mutate = useMutation({
        mutationFn: apiClent.login,
        onSuccess: (data) => {
            dispatch(userActions.login({
                user: data.user,
                token: data.token,
            }));
            navigate("/");
        },
        onError: (error: Error) => {
            console.log(error);
        },
    });

    const onSubmit = handleSubmit((data) => {

        toast.promise(
            mutate.mutateAsync(data),
             {
               loading: 'Saving...',
               success: <b>Register Successfully.</b>,
               error: <b>Register failed</b>,
             }
           );

    });

    return (
        <div className="login">
            <div className="login_content">
                <form className="login_content_form" onSubmit={onSubmit}>
                    <label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Please enter your email",
                            })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </label>
                    <label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Please enter your password",
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
                    <button type="submit">LOGIN</button>
                </form>
                <Link to="/register">Don't have an account? Sign In Here</Link>
            </div>
        </div>
    );
};

export default LoginPage;
