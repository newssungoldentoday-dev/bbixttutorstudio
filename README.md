# BlueBixt Academy Tutor STUDIO

BlueBixt Academy Tutor STUDIO is a tool for creating lessons and lesson plans for schools. It organizes lesson planning within a simple navigation flow so educators can design, store, and manage instructional materials.

Purpose
- Provide a lightweight interface for making lessons and lesson plans.
- Organize lessons under School > Education Media > Lesson.
- Provide a Plan area where school-wide and classroom plans are composed.

Key navigation
- Plan > School Plan > Lessons > Lesson Plan
- Lesson path: School > Education Media > Lesson

Features (overview)
- Create and edit lessons with metadata (title, grade, subject, duration).
- Compose lesson plans with objectives, materials, activities, and assessments.
- Organize lessons within School Plans for curriculum alignment.

Getting started (developer)
1. Clone the repository:
   git clone https://github.com/newssungoldentoday-dev/bbixttutorstudio.git
2. Install dependencies (if applicable) — see project docs or package files.
3. Run the app locally (follow instructions in project-specific docs once available).

How to use (user-facing)
- To create a lesson:
  1. Navigate to School > Education Media > Lesson.
  2. Click "New Lesson" and fill in title, grade, subject, and content.

- To create a lesson plan:
  1. Go to Plan > School Plan > Lessons > Lesson Plan.
  2. Select the lesson to plan for, add objectives, list materials, outline activities, and add assessments.
  3. Save the Lesson Plan and assign to classrooms or schedules as needed.

Data model (high level)
- School: top-level container for lessons and plans.
- Lesson: content item with metadata and media.
- Lesson Plan: structured plan linked to a Lesson, contains objectives, activities, and assessments.

Contributing
- Contributions welcome. Please open issues or pull requests with clear descriptions of changes.

License
- This repository's default license is Apache-2.0 (per repository settings). If you'd like a different license, tell me which one and I will add a LICENSE file.
