import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signinSchema } from "../utils/validation";
import AuthInput from "./authInput";
import { PropagateLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../app/features/userSlice';
import { useEffect } from "react";

export default function LoginForm() {
  const { status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  })

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
  }, [status, navigate]);
  // Only runs when `status` changes

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  }

  return (
    <div className="h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Container  */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 bg-gray-100 rounded-xl">
        {/* Heading  */}
        <div className="text-center dark:text-dark_text_1">
          <img src="/fav.ico" alt="logo" className="w-10 h-10 mx-auto mb-1" />
          <h2 className="mt-1 mb-4 text-3xl font-bold">
            Login to Travomint
          </h2>
        </div>
        {/* Form */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <AuthInput
            name="email"
            type="text"
            placeholder="Enter your email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Enter your Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* Submit Button   */}
          <button type="submit" className="w-full mt-4 p-3 flex justify-center align-middle h-[50px] rounded-xl dark:bg-[#ca282c] border-radius-20 dark:text-dark_text_1 bg-[#ca282c] text-white">
            {status === "loading" ? <PropagateLoader color="#fff" size={18} /> : "Log In"}
          </button>
          {/* Submit Button  End */}
          <p className="mt-3 dark:text-dark_svg_1">
            Don&apos;t have an account? <Link to="/register" className="dark:text-dark_text_1 text-blue-800 underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
