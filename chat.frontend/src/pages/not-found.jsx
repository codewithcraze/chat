import { Link } from 'react-router-dom';
import Header from '../components/header.jsx';


export default function NotFound() {

    return <div>
        <Header />

        <div className='h-screen flex justify-center items-center'>
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-2xl text-gray-600">Oops! Page not found</p>
                <p className="mt-2 text-gray-500">
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-block px-6 py-2 text-white bg-[#ef6f43] hover:bg-[#f5a489] rounded-lg"
                    >
                        Go Back Home
                    </Link>
                </div>  
            </div>
        </div>

    </div>
}
