# Juan Bosch Hospital - UI

Frontend web application for the **Juan Bosch Hospital** management system. It provides the user interface for managing patients, doctors, appointments, medical records, insurance (ARS), addresses, and users.

This is a [Next.js](https://nextjs.org/) project built with React, TypeScript, and Material UI.

## Backend Repository

The API consumed by this UI is located at:

[https://github.com/Starmustang/JuanBosch.App.git](https://github.com/Starmustang/JuanBosch.App.git)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 15 (App Router)
- **Language:** TypeScript
- **UI Library:** Material UI (MUI) 6 + MUI X Date Pickers
- **State Management:** Zustand
- **Authentication:** NextAuth.js
- **HTTP Client:** Axios
- **Forms & Validation:** React Hook Form + Yup
- **Charts:** ApexCharts
- **Tables:** TanStack React Table
- **Icons:** Tabler Icons, Iconify, MUI Icons
- **Deployment:** Netlify / Vercel ready

## Project Structure

```text
JuanBoschHospital.UI/
├── src/
│   ├── app/
│   │   ├── (DashboardLayout)/   # Authenticated dashboard pages
│   │   │   ├── address/         # Address management
│   │   │   ├── ars/             # Insurance (ARS) management
│   │   │   ├── blood/           # Blood type catalog
│   │   │   ├── dates/           # Appointments management
│   │   │   ├── doctor/          # Doctors management
│   │   │   ├── medic/           # Medical records / medics
│   │   │   ├── patient/         # Patients management
│   │   │   └── users/           # Users management
│   │   ├── api/                 # Next.js API routes (e.g., NextAuth)
│   │   ├── auth/                # Authentication pages (login)
│   │   ├── components/          # Shared UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API service layer
│   │   ├── store/               # Zustand stores
│   │   └── utils/               # Utility functions
│   └── middleware.ts            # Route protection middleware
├── public/                      # Static assets
├── .env.development             # Development environment variables
├── .env.production              # Production environment variables
├── next.config.mjs              # Next.js configuration
└── package.json                 # Dependencies and scripts
```

## Key Modules

- **Dashboard:** Main landing page after login with an overview of the system.
- **Patients:** Register, list, and manage patient records.
- **Doctors:** Register and manage doctor information.
- **Appointments:** Schedule and manage medical appointments.
- **Medical Records:** Manage medical consultations and records.
- **Insurance (ARS):** Manage health insurance providers.
- **Addresses:** Manage geographic/address data.
- **Users:** Manage system users and roles.

## Environment Variables

Create an `.env.local` file (or use the existing `.env.development` / `.env.production` files) and configure the following variables:

|Variable|Description|Example|
|----------|-------------|---------|
|`NEXT_PUBLIC_API_BASE_URL`|Base URL of the backend API|`http://localhost:5028/api/`|
|`NEXTAUTH_URL`|Full public URL of the frontend (production)|`https://juan-bosch-hospital-ui.vercel.app/`|
|`NEXTAUTH_SECRET`|Random string used to sign cookies and tokens. Generate with: `openssl rand -base64 32`|-|

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
```

1. Configure environment variables (see section above).

1. Run the development server:

```bash
npm run dev
# or
yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The `app/page.tsx` file is the dashboard entry point; it auto-updates as you edit the source files.

## Available Scripts

|Script|Description|
|--------|-------------|
|`npm run dev`|Start the development server|
|`npm run build`|Build the application for production|
|`npm run start`|Start the production server|
|`npm run lint`|Run ESLint|

## Build & Deploy

Build the production bundle:

```bash
npm run build
```

The project is ready to be deployed on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure the production environment variables are set in your hosting dashboard before deploying.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js/) - feedback and contributions are welcome.
