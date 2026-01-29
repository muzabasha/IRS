# Design Plan for Information Retrieval Systems Academic App

## 1. UI Wireframes & Layout Strategy

### A. Global Layout (App Shell)
- **Sustainability/Header**: 
  - Logo (Academics/IR)
  - Navigation Menu (Home, Modules, Progress, Search)
  - User Profile / Admin Toggle
- **Sidebar (Collapsible)**:
  - Unit 1..4 (Accordion)
  - Topic List (Indicates completion status)
- **Main Content Area**: Dynamic content based on selection.

### B. Home Dashboard
- **Welcome & Stats**: "Welcome back, [Student]. You are on Unit 2."
- **Overall Progress Bar**: `[■■■□□□□□□] 30% Course Completed`
- **Continue Learning**: Card showing the last accessed topic.
- **Quick Links**: "Unit 1 MCQ", "Project Hub".

### C. Topic Page (The 20-Slide Views)
- **Top Bar**: Topic Title, Slide Counter (Slide X of 20).
- **Slide Content**:
  - Left/Right arrows for navigation.
  - Content area (Text, Diagrams, Code).
  - "Mark as Complete" button on Slide 20 (or auto-complete).
- **Bottom Bar**: Progress within the topic.

### D. Unit-End MCQ Module
- **Start Screen**: Rules, items count.
- **Question Screen**: 
  - Question text.
  - Options (Radio buttons).
  - "Submit" button (Immediate feedback mode or Test mode? User said "Feedback-based", implying immediate or post-submit analysis. Feedback requirement says "For EACH MCQ, result must display". We will likely do immediate feedback after answering each, or a summary view. Let's go with **Immediate Feedback** mode for learning).
- **Feedback Card**: Shows Correct/Incorrect, Explanation, remedial action.

### E. Analytics Dashboard (Faculty)
- **Heatmap**: Grid of students vs Topics.
- **Misconception Analysis**: "60% of students failed Q4 on Boolean Logic".

## 2. Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── Sidebar (Navigation)
│   └── Main
├── Pages
│   ├── Dashboard (Home)
│   │   ├── ProgressSummary
│   │   └── ResumeCard
│   ├── UnitView
│   │   ├── TopicList
│   │   └── UnitStats
│   ├── TopicView (Slug: /unit/[id]/topic/[id])
│   │   ├── SlideContainer
│   │   │   ├── SlideHeader
│   │   │   ├── SlideBody (Dynamic: Title, Content, Graphics)
│   │   │   └── SlideFooter (Navigation)
│   │   └── ProgressBar
│   ├── MCQModule (Slug: /unit/[id]/assessment)
│   │   ├── QuestionCard
│   │   ├── OptionList
│   │   └── FeedbackDisplay
│   ├── Analytics (Admin)
│   │   ├── ProgressTable
│   │   └── WeaknessToaster
│   └── ProjectHub
```

## 3. Navigation Logic

1.  **Home** -> Click **Unit 1** -> **Unit 1 Overview**.
2.  **Unit 1 Overview** -> Click **Topic 1** -> **Slide 1**.
3.  **Slide Navigation**: Next/Prev buttons.
4.  **End of Topic (Slide 20)** -> "Finish Topic" -> Updates Progress -> Redirect to **Unit Overview** or **Next Topic**.
5.  **End of Unit (All Topics Done)** -> Unlock **Unit-End MCQ**.
6.  **After MCQ**:
    *   If Grade < Threshold -> "Review suggested topics".
    *   If Grade >= Threshold -> Unlock **Unit 2**.

## 4. Progress & Analytics Logic

### Data Structure
```typescript
interface StudentProgress {
  userId: string;
  courseCompletion: number; // 0-100
  units: {
    [unitId: string]: {
      completed: boolean;
      topics: {
        [topicId: string]: {
          completed: boolean;
          lastSlide: number;
        }
      };
      assessment: {
        score: number;
        attempts: number;
        weakAreas: string[]; // Topic IDs
      }
    }
  }
}
```

### Calculation
- **Topic Progress**: boolean (Completed if Slide 20 reached).
- **Unit Progress**: (Completed Topics / Total Topics) * 100.
- **Course Progress**: Average of Unit Progresses.
- **Readiness**: Based on MCQ Score (e.g., > 70% is Ready).

## 5. MVP vs Phase-2

### MVP (Immediate Delivery)
- Hardcoded Syllabi Structure (JSON).
- Next.js App Router Shell.
- Slide Viewer Component (Standard Template).
- MCQ Engine (with JSON data).
- Local/Browser Storage for Progress (Mock Backend).

### Phase 2 (Future)
- Vercel Postgres/Supabase Integration.
- Faculty Admin Dashboard (Real data).
- Auth (NextAuth).
- Dynamic Content CMS (Strapi or similar) to edit slides.

## 6. Justification of Design Decisions

- **Tailwind + shadcn/ui**: Rapid development of "Premium" feel without writing custom CSS from scratch. Ensures consistency.
- **20-Slide Constraint**: Enforces pedagogical discipline. Predictable chunking for students.
- **Immediate Feedback MCQs**: Pedagogically superior for formative assessment compared to "black box" quizzes.
- **JSON for Content**: Separation of content and code allows easy updates later or migration to a DB.
