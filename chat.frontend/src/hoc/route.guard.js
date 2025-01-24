import { useSelector } from "react-redux";

const RouteGuard = ({ children }) => {
  // Implement Authentication.
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      {user?.email && user?.name ? (
        <div>{children}</div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="font-extrabold text-red-600" style={{fontSize: "8rem"}}>404</h1>
          <p className="mt-4 text-2xl text-gray-700">Oops! Page not found.</p>
          <p className="mt-2 text-lg text-gray-500">The page you're looking for doesn't exist or has been moved.</p>

        </div>
      </div>
      )}
    </div>
  );
};

export default RouteGuard;
