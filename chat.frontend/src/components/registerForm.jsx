import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  registerSchema
} from '../utils/validation.js';
import AuthInput from './authInput';
import { PropagateLoader } from 'react-spinners';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../app/features/userSlice.js";


export default function RegisterForm() {
  const { status = "", error = "" } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });



  // Use useEffect to handle navigation after successful registration
  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
  }, [status, navigate]);
  // Only runs when `status` changes

  const onSubmit = (data) => {
    // Send data to server
    dispatch(registerUser(data));
  };
  return (
    <div className="h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Container  */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 bg-gray-100 rounded-xl">
        {/* Heading  */}
        <div className="text-center dark:text-dark_text_1">
          <img src="/fav.ico" alt="logo" className="w-10 h-10 mx-auto mb-1" />
          <h2 className="mt-1 mb-4 text-3xl font-bold">
            Welcome to Travomint
          </h2>
        </div>
        {/* Form  */}
        {/* Error Showcase Start*/}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        {/* Error Showcase End*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <AuthInput
            name="name"
            type="text"
            placeholder="Enter your name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="email"
            placeholder="Enter your Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Hey there! I am using travomint chat(Optional)"
            register={register}
            error={errors?.status?.message}
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
            {status === "loading" ? <PropagateLoader color="#fff" size={18} /> : "Register"}
          </button>
          {/* Submit Button  End */}

          <p className="mt-3 dark:text-dark_svg_1">
            Already have an account? <Link to="/login" className="dark:text-dark_text_1 text-blue-800 underline">
              Log in
            </Link>
          </p>
        </form>
        {/* Form End  */}
      </div>
      {/* Container End  */}
    </div>
  )
}


// p-1 --> 4px * 4px  --> 0.25rem