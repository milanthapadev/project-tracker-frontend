# Project Tracker Frontend

A modern project and task management application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Project Management**
  - Create, update, and delete projects
  - Project status tracking (Open, Completed, Archived)
  - Project description and details
  - Task count per project

- **Task Management**
  - Create, update, and delete tasks within projects
  - Task status tracking (Todo, In Progress, Done)
  - Task description and details
  - Quick status updates with visual indicators

- **User Interface**
  - Modern and minimal design
  - Responsive layout
  - Real-time updates
  - Loading states and skeletons
  - Search functionality for projects
  - Status badges with color coding

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **API Integration**: Fetch API
- **Icons**: Lucide Icons

## Setup Steps

1. **Prerequisites**
   - Node.js (v18 or later)
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd frontend

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Development**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── projects/          # Project-related pages
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── projects/         # Project-related components
│   ├── tasks/           # Task-related components
│   └── ui/              # UI components
├── lib/                  # Utility functions
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## API Integration

The frontend communicates with the backend API for:
- Project CRUD operations
- Task CRUD operations
- Status updates
- Data fetching

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 