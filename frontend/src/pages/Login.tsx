import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    email: string;
    role: 'user' | 'admin';
}

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch('http://localhost:5050/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Login failed');
            }

            const data: { token: string; user: User } = await res.json();
            localStorage.setItem('token', data.token);

            // ⤴️ Redirect based on role
            if (data.user.role === 'admin') {
                navigate('/admin/upload');
            } else {
                navigate('/dashboard');
            }

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded shadow ">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    required
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    required
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>

            {error && (
                <p className="mt-4 text-red-600 font-medium">{error}</p>
            )}
        </div>
    );
}