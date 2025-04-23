import { JSX } from "react";
import { Link } from "react-router-dom";

export default function LandingPage(): JSX.Element {
    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center px-4" >
            <div className="text-center space-y-6 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                    Upload and serve your video content
                </h1>
                <p className="text-xl md:text-2xl">
                    Mini-DRM is a simple and effective solution for managing your video content.
                </p>
                <div className="space-y-4">
                    <Link to="/register">
                        <button className="w-full text-lg py-3 bg-red-950 rounded-xl">
                            Register to start
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
