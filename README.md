# My Professional Portfolio - v2

Welcome to the repository for my personal portfolio, accessible at [www.jonathanzul.me](https://www.jonathanzul.me/).

This project is a full-stack application built from the ground up to showcase my skills. It's designed, developed, and maintained by me.

## Tech Stack & Architectural Choices

This portfolio is built with a stack that reflects current industry best practices for performance, scalability, and developer experience.

- **Framework:** **Next.js 15 (App Router)** for its hybrid static and dynamic rendering capabilities.
- **Language:** **TypeScript** for robust type-safety and maintainability.
- **Database:** **PostgreSQL** (hosted on Vercel) with **Prisma ORM** for type-safe database access.
- **Styling:** **Tailwind CSS** for a utility-first styling workflow.
- **UI Components:** **Shadcn/UI** for its collection of accessible and unstyled base components.
- **Deployment:** **Vercel** for seamless CI/CD, hosting, and serverless functions.
- **Email:** **React Email & Resend** for the contact form's back-end mailer service.
- **CMS:** **Sanity.io** for headless content management for the blog section.

## Running This Project Locally

To run this project in a local development environment, please follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JonathanZul/jonathanzul-me.git
   cd jonathanzul-me
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add the necessary variables. You can use `.env.example` as a template.

   ```bash
   cp .env.example .env.local
   ```

4. **Push the database schema:**
   This will sync your Prisma schema with your database.

   ```bash
   npx prisma db push
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

The application should now be running on [http://localhost:3000](http://localhost:3000).
