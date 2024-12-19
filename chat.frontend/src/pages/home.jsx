import { logout } from "../app/features/userSlice"
import { useDispatch } from "react-redux"



export default function Home() {

    const dispatch = useDispatch();

    return <div>
        Home

        <button
            onClick={() => dispatch(logout())}
        >
            Logout
        </button>   
    </div>
}