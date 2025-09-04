# CodeHarbor

CodeHarbor is a visually stunning, high-fidelity clone of the GitHub interface, designed with a focus on exceptional UI/UX and visual excellence. It provides a modern, clean, and intuitive platform for browsing software repositories, managing issues, and viewing user profiles. Built on Cloudflare's serverless infrastructure, CodeHarbor offers a lightning-fast and seamless user experience. The application features a minimalist design with a sophisticated dark mode, pixel-perfect layouts, and delightful micro-interactions. Core functionalities include a repository dashboard, a detailed repository view with a file browser and README rendering, an issue tracker, and comprehensive user profile pages. All data is managed through a single, efficient Cloudflare Durable Object, ensuring data persistence and a scalable foundation.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/AshishKumar4/github-clone-not-working)

## ✨ Key Features

-   **Modern Dashboard**: A central hub displaying a user's repositories and recent activity.
-   **Detailed Repository View**: A tabbed interface for browsing code, issues, and pull requests, complete with a file browser and Markdown README rendering.
-   **Comprehensive User Profiles**: Public profiles showcasing user details and their most popular projects.
-   **Interactive Issue Tracker**: Functionality to list, view, filter, and create new issues within a repository.
-   **Visually Stunning UI**: A minimalist, dark-mode-first design built with Tailwind CSS and shadcn/ui for a polished, professional aesthetic.
-   **Serverless Architecture**: Powered by Cloudflare Workers and a single Durable Object for fast, scalable, and persistent state management.

## 🚀 Technology Stack

-   **Frontend**: React, Vite, React Router, TypeScript
-   **Backend**: Hono on Cloudflare Workers
-   **State Management**: Cloudflare Durable Objects, TanStack Query, Zustand
-   **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
-   **Tooling**: Bun, ESLint, TypeScript

## 🛠️ Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/codeharbor.git
    cd codeharbor
    ```

2.  **Install dependencies:**
    This project uses Bun as the package manager.
    ```sh
    bun install
    ```

## 💻 Development

To start the local development server, which includes both the Vite frontend and the Wrangler server for the backend worker, run:

```sh
bun dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will automatically proxy API requests to the local worker instance.

### Project Structure

-   `src/`: Contains the React frontend application code.
    -   `pages/`: Top-level page components.
    -   `components/`: Reusable UI components.
    -   `lib/`: Utility functions.
-   `worker/`: Contains the Cloudflare Worker backend code (Hono API and Durable Object).
-   `shared/`: Contains TypeScript types and mock data shared between the frontend and backend.

## ☁️ Deployment

This project is designed for seamless deployment to Cloudflare's global network.

1.  **Build the application:**
    This command bundles both the frontend and the worker for production.
    ```sh
    bun build
    ```

2.  **Deploy to Cloudflare:**
    Run the deploy command using Wrangler. This will publish your application.
    ```sh
    bun deploy
    ```

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/AshishKumar4/github-clone-not-working)