Secure Video Streaming Platform (Mini-DRM System)

Tech Stack: React + Video.js, Node.js, AES Encryption, PostgreSQL, Docker, Vercel/Firebase (Frontend), Railway/Render (Backend)

✨ Features:
	•	Frontend: A sleek React UI using TailwindCSS and Video.js for custom video playback.
	•	Auth System: JWT-based login/signup with roles (user/admin).
	•	DRM-ish Flow: Encrypted videos with AES-256, playable only after license validation.
	•	License Server: A Node.js server issues short-lived license tokens after validating payment/auth.
	•	DevOps: Dockerized backend, PostgreSQL with Prisma ORM, deployed on Railway or Render.

📐 Project Overview:

Goal: Create a platform where users can log in, access protected video content, and only view it if they have the right license/token. Videos are AES-encrypted and decrypted on the client after license validation.

⸻

🔧 Architecture Blueprint:

1. Frontend (React + Video.js + TailwindCSS)
	•	Login/Signup Pages
	•	Dashboard for video listing
	•	Player Page using Video.js
	•	Fetch license token from backend before playing video
	•	Decrypt video (or fetch pre-decrypted URL via short-lived access)

2. Backend (Node.js + Express + PostgreSQL)
	•	User Auth (JWT)
	•	Video Metadata API
	•	License API: Checks user access, issues signed short-lived token
	•	License Token Verifier (middleware)
	•	Video Serving API: Delivers encrypted stream only if license is valid

3. Encryption Flow
	•	Encrypt video files manually using openssl or Node.js AES
	•	Store encrypted videos on local server or S3
	•	Video URLs are protected, decrypted only when license is granted

4. DevOps (Docker + Railway/Render/Vercel)
	•	Dockerized backend
	•	GitHub Actions CI/CD
	•	PostgreSQL via Railway or Supabase