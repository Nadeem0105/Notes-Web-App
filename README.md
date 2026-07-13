# Archival Catalog - Notes Web App

A full-stack, feature-rich note-taking application designed with a unique "Analog Soul" and tactile aesthetic. It simulates the physical experience of interacting with index cards and archival drawers while providing powerful digital organization tools.

## 🚀 Features

- **Tactile UI/UX**: High-quality CSS animations (slide-up, fade-in, scale-in) that make the interface feel physically responsive.
- **Robust Note Management**: Create, edit, read, and delete notes.
- **Color Coding**: Assign custom colors to notes for visual organization.
- **Tagging System**: Add multiple tags to notes for easy categorization.
- **Pin & Archive**: Pin important notes to the top or archive them to declutter your main workspace.
- **Soft Delete (Trash System)**: Notes are moved to a Trash bin instead of permanent deletion, allowing for easy restoration or permanent removal later.
- **Full-Text Search**: Optimized searching across note titles and content using MongoDB text indexes.
- **Mock Authentication**: Simple, linear login system for quick access.

## 🛠️ Technology Stack

### Frontend (Client-Side)
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: Lucide React / Google Material Symbols
- **HTTP Client**: Axios

### Backend (Server-Side)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Atlas)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Middleware**: CORS, dotenv

## 📂 Project Structure

The repository is organized into a mono-repo structure:

- `/frontend`: Contains the Next.js application, React components, CSS, and UI logic.
- `/backend`: Contains the Express server, MongoDB models, controllers, and API routes.

## 💻 Running Locally

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Nadeem0105/Notes-Web-App.git
cd Notes-Web-App
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
Start the backend server:
```bash
node server.js
```

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/notes
```
Start the development server:
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

## 🚢 Deployment
- **Frontend**: Designed to be easily deployed on [Vercel](https://vercel.com/).
- **Backend**: Can be deployed on platforms like [Render](https://render.com/) or Railway.
- **Database**: MongoDB Atlas recommended for production.
