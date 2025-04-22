import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

export default function Watch() {
    const { id } = useParams<{ id: string }>();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<Player | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const videoElement = videoRef.current;

        if (!videoElement || playerRef.current) return;

        // Fetch the video as a blob to inject the token manually
        const fetchVideo = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`http://localhost:5050/api/license/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    if (res.status === 401) throw new Error('Unauthorized');
                    if (res.status === 403) throw new Error('License expired or invalid');
                    if (res.status === 404) throw new Error('Video not found');
                    throw new Error('Unknown error occurred');
                }

                const blob = await res.blob();
                console.log("🎥 Blob type:", blob.type, "Size:", blob.size);
                const blobUrl = URL.createObjectURL(blob);

                // ✅ Initialize player with blob URL
                playerRef.current = videojs(videoElement, {
                    controls: true,
                    autoplay: false,
                    preload: 'auto',
                    fluid: true,
                    sources: [
                        {
                            src: blobUrl,
                            type: 'video/mp4',
                        },
                    ],
                });

                setLoading(false);
            } catch (err: any) {
                console.error('❌ Video fetch error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVideo();

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [id]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">🎥 Secure Video Stream</h2>

            {loading && !error && (
                <p className="text-gray-500 animate-pulse">Loading video...</p>
            )}

            {error && (
                <div className="text-red-600 font-bold mt-2">{error}</div>
            )}

            <div data-vjs-player className="rounded overflow-hidden">
                <video ref={videoRef} className="video-js vjs-big-play-centered" />
            </div>
        </div>
    );
}