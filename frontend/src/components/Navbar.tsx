import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = parseJwt(token || '');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className=" shadow p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold ">🔒 Mini-DRM</h3>
            <div className="space-x-4 flex items-center">
                {token ? (
                    <>
                        <span className="text-gray-600 text-sm">
                            Logged in as <strong>{user?.email}</strong> ({user?.role})
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

// Utility function to decode JWT (same as in AdminRoute)
function parseJwt(token: string): any {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}