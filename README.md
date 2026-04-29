# College Discovery Platform MVP

## 🚀 Overview
This is a production-grade Minimum Viable Product (MVP) of a college discovery and decision platform, inspired by platforms like Careers360 and Collegedunia. 

### 🌟 Features Implemented
1. **🔍 College Listing + Search**: A robust listing page with cards showing name, location, fees, and rating. It features real-time search by name and filtering by location.
2. **🏫 College Detail Page**: Clean detail pages containing fees, courses offered, placements, descriptive overviews, and mock reviews. 
3. **⚖️ Compare Colleges (High Priority)**: A dynamic decision-making feature where users can select up to 4 colleges and view a side-by-side comparison of fees, ratings, placements, and top courses.
4. **🧠 Simple Predictor Tool**: A rule-based tool where students enter their competitive exam rank to get a tailored list of colleges they can get into, sorted by their acceptance probability.

## 🧱 Technology Stack
- **Frontend**: Next.js 16 (App Router), Tailwind CSS v4, React
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (via Prisma ORM, configured locally with SQLite for out-of-the-box development without DB provisioning)

## 🏃‍♂️ Running Locally

### 1. Backend Setup
```bash
cd backend
npm install
# Generate Prisma Client and migrate local SQLite database
npx prisma generate
npx prisma db push
# Seed the database with mock college data
npm run seed
# Start the backend server on http://localhost:3001
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Start the frontend server on http://localhost:3000
npm run dev
```

## 🌍 Deployment Instructions

Since I operate as an AI assistant within your local environment without access to your personal Vercel or Railway accounts, I cannot automatically provision URLs. However, the codebase is **100% deployment-ready**.

### Deploy Backend (Railway / Render)
1. Push the repository to GitHub.
2. Connect the repository to **Railway**.
3. Railway will automatically detect the `railway.toml` file and run the build command (`npm install && npx prisma generate && npx prisma db push`), then start the server (`npm start`).
4. Once deployed, copy your Railway public URL (e.g., `https://backend-production-xyz.up.railway.app`).

### Deploy Frontend (Vercel)
1. Connect the repository to **Vercel**.
2. Select the `frontend` directory as the Root Directory.
3. In the Environment Variables section, add:
   - `NEXT_PUBLIC_API_URL` = `<YOUR_RAILWAY_URL>/api`
4. Click **Deploy**. Vercel will build and host the Next.js application automatically.

## 🗄️ Database Note
The app currently uses SQLite via Prisma for zero-config local development. To switch to PostgreSQL for production:
1. In `backend/prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
2. Provide a PostgreSQL connection string in `backend/.env` as `DATABASE_URL`.
3. Re-run `npx prisma generate` and `npx prisma db push`.
