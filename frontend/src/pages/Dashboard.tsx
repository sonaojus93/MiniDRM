import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Video {
    id: number;
    title: string;
}

export default function Dashboard() {
    const [videos, setVideos] = useState<Video[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5050/api/videos/my', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setVideos(data.videos);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📂 Your Videos</h2>
            {videos.length === 0 ? (
                <p className="text-gray-600">No licensed videos yet.</p>
            ) : (
                <div className="grid grid-cols-5 gap-5">
                    {videos.map(video => (
                        <div className='bg-black text-white p-4 rounded shadow text-center' key={video.id}>
                            <div>{video.title}</div>
                            <br />
                            <button
                                onClick={() => navigate(`/watch/${video.id}`)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Watch Now
                            </button>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}