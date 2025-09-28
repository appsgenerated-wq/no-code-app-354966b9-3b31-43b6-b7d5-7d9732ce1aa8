# Moon Chicken Tracker

Welcome to Moon Chicken Tracker, a full-stack React application powered by Manifest.

This application allows users to log and view sightings of chickens, correlating them with the current phase of the moon. It's a demonstration of a complete, production-ready application built entirely with the Manifest backend platform and SDK.

## Features

- **User Authentication**: Secure user sign-up and login.
- **Sighting Management**: Create, Read, Update, and Delete (CRUD) chicken sightings.
- **Ownership**: Users can only edit or delete their own sightings.
- **File Uploads**: Attach a photo to each sighting (manageable via the Admin Panel).
- **Role-Based Access**: Public read access for sightings, but only authenticated users can create them.
- **Automatic Admin Panel**: A complete admin interface for managing users and sightings is available at `/admin`.

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance.

### Running the Frontend

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Create a `.env.local` file in the root directory and add your Manifest backend URL and App ID:
    ```
    VITE_BACKEND_URL=your_manifest_backend_url
    VITE_APP_ID=your_manifest_app_id
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

### Default Credentials

- **Demo User**: `user@manifest.build` / `password`
- **Admin Panel**: `admin@manifest.build` / `admin` (Access at `${BACKEND_URL}/admin`)
