import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { 
    registerSchema 
} from '../utils/validation.js';

export default function RegisterForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });


    console.log("values", watch());
    console.log("errors", errors);

    const onSubmit = (data) => {
        // Send data to server
        console.log(data);
    };


  return (
    <div className="h-screen w-full flex justify-center items-center overflow-hidden">
        {/* Container  */}
        <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            {/* Heading  */}
            <div className="text-center dark:text-dark_text_1">
                <img src="/fav.ico" alt="logo" className="w-10 h-10 mx-auto mb-1" />
                <h2 className="mt-1 mb-4 text-3xl font-bold">
                    Welcome to Travomint
                </h2>
            </div>
            {/* Form  */}
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
              <input type="text" {...register("name")} /> 
              <button type="submit">
                Register
              </button> 
            </form>
        </div>
    </div>
  )
}




// p-1 --> 4px * 4px  --> 0.25rem