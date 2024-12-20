import LoginForm from "../components/loginForm"


export default function Login() {
    return <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
    <div className="flex w-[1000px] mx-auto h-full">
        <LoginForm />
    </div>
</div>
}