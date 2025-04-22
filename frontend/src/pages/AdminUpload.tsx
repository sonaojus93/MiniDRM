import { useState, FormEvent } from 'react';

export default function AdminUpload() {
    const [title, setTitle] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!title || !videoFile) {
            setError('Both title and video file are required');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('video', videoFile);

        try {
            const token = localStorage.getItem('token');

            const res = await fetch('http://localhost:5050/api/admin/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const contentType = res.headers.get('Content-Type');

            let responseBody: any = null;

            if (contentType?.includes('application/json')) {
                responseBody = await res.json();
            } else {
                const rawText = await res.text();
                throw new Error(`Expected JSON but got:\n${rawText.slice(0, 300)}...`);
            }

            if (!res.ok) {
                throw new Error(responseBody.message || 'Upload failed');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">🔐 Admin Upload & Encrypt</h2>
            <form onSubmit={handleUpload} className="space-y-4">
                <input
                    type="text"
                    placeholder="Video Title"
                    className="w-full border px-3 py-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type="file"
                    accept="video/mp4"
                    className="w-full"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Upload & Encrypt
                </button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
}