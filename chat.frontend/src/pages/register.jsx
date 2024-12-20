
import RegisterForm from "../components/registerForm"


export default function Register() {
    return <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
        {/* Container  */}
        <div className="flex w-[1000px] mx-auto h-full">
            {/* Register Form  */}

            <RegisterForm />
         </div>
    </div>
}   