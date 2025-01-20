import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="fixed top-0 left-0 w-full dark:bg-dark_bg_1 dark:text-dark_text_1 border-b bg-[#ffffff30] text-white border-gray-200 p-4 z-50">
            <Link to="/" className="flex items-center">
                <img src="/logo.svg" alt="icon" style={{ height: "40px", width: "150px" }} />
            </Link>
        </div>
    );
}
