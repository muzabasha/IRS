# Information Retrieval Systems - Interactive Courseware

A comprehensive Next.js-based learning platform for Information Retrieval Systems (B22EQ0601) at REVA University.

## Features

### 📚 Course Content
- 4 comprehensive units covering IR fundamentals, query languages, user interfaces, and multimedia IR
- 28 interactive topics with detailed explanations
- Mathematical formulas with step-by-step calculations
- Python code demonstrations with syntax highlighting
- Visual diagrams and illustrations

### 🎥 Video Integration
- Course overview video embedded on homepage
- Custom video player with controls (play/pause, mute, fullscreen, progress bar)
- Responsive video display

### 👨‍🏫 Instructor Profile
- Professional side-by-side layout with photo and detailed bio
- Research portfolio (65+ Scopus publications, 25+ textbooks)
- Awards and achievements
- Direct links to research profiles (Google Scholar, ORCID, Scopus, ResearchGate, etc.)
- Contact information

### 🎯 Interactive Features
- Unit assessments with multiple-choice questions
- Progress tracking across units
- Mark topics as read
- Hierarchical sub-topics navigation
- Responsive sidebar with course structure

### 🎨 Modern UI/UX
- Premium design with Tailwind CSS
- Dark mode support
- Smooth animations and transitions
- Mobile-responsive layout
- Accessible components using Radix UI

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── instructor/        # Instructor profile page
│   ├── analytics/         # Analytics dashboard
│   ├── projects/          # Projects page
│   └── unit/              # Unit and topic pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── video-player.tsx  # Custom video player
│   ├── instructor-profile.tsx
│   └── topic-viewer.tsx
├── data/                  # Course content
│   ├── content/          # Topic JSON files
│   ├── assessment/       # Quiz data
│   └── syllabus.json     # Course structure
└── lib/                   # Utility functions
```

## Key Pages

- **Dashboard** (`/`) - Course overview with video, stats, and learning path
- **Instructor** (`/instructor`) - Detailed instructor profile with research portfolio
- **Projects** (`/projects`) - Course projects and assignments
- **Analytics** (`/analytics`) - Learning analytics and progress tracking
- **Units & Topics** (`/unit/[unitId]/topic/[topicId]`) - Interactive course content
- **Assessments** (`/unit/[unitId]/assessment`) - Unit quizzes

## Technologies Used

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## Course Information

**Course Code**: B22EQ0601  
**Course Title**: Information Retrieval Systems  
**Semester**: VI  
**Institution**: REVA University, Bangalore

**Instructor**: Dr. Syed Muzamil Basha  
Professor, School of Computer Science & Engineering

## Build for Production

```bash
npm run build
npm start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
