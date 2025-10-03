### **Strategic Roadmap: Portfolio v2**

#### **1. Tech Stack Rationale**

Our goal is to use a modern, professional stack that sends a strong positive signal to any hiring manager. It shows you're current with industry best practices.

- **Framework:** **Next.js (App Router)**. We're sticking with Next.js but specifically using the new App Router. This demonstrates you're up-to-date with the latest React features like Server Components, which is a big plus.
- **Language:** **TypeScript**. This is non-negotiable. Writing your portfolio in TypeScript shows a commitment to type safety, scalability, and maintainability—all critical skills for professional roles.
- **Styling:** **Tailwind CSS with Shadcn/UI**. You're already familiar with Tailwind. We'll pair it with [Shadcn/UI](https://ui.shadcn.com/). It's not a traditional component library; it gives us beautifully designed, accessible, and unstyled components that we can easily customize to fit your aesthetic. This will solve the "simple/weird" feel of your current cards and forms.
- **Database:** **PostgreSQL with Prisma**. We're replacing Supabase. PostgreSQL is a rock-solid, industry-standard database. We'll use **Prisma** as our ORM (Object-Relational Mapper). It's a modern, type-safe tool for talking to the database that developers and companies love. This combination is a massive upgrade.
- **CMS for Blog:** **Sanity.io**. You've used it before, and it's a great choice. A headless CMS for your blog shows you understand decoupled architectures.
- **Email:** **React Email & Resend**. Instead of a client-side solution like EmailJS, we'll build a Next.js API route that sends emails. We'll use [Resend](https://resend.com/) as the email provider and [React Email](https://react.email/) to build the email templates with React components. This is a much more professional, full-stack approach.
- **Deployment:** **Vercel**. It's the best platform for Next.js, with seamless CI/CD, image optimization, and database hosting (Vercel Postgres).

#### **2. High-Level Architecture**

We'll leverage the strengths of Next.js to build a fast, efficient application.

- **Static Pages (SSG):** The `Home`, `About`, and individual `Blog` pages will be statically generated at build time for maximum performance.
- **Dynamic Pages (SSR/Server Components):** The main `/projects` page will be dynamically rendered using Server Components, fetching the latest project list directly from your PostgreSQL database.
- **API Routes (Serverless Functions):** The contact form submission will be handled by a serverless API route (`/api/send-email`) that runs on the back-end.

#### **3. Database Schema**

We'll start with a simple, relational schema using Prisma. This structure is clean and allows for the filtering you wanted.

```typescript
// prisma/schema.prisma

model Project {
  id          String    @id @default(cuid())
  slug        String    @unique
  title       String
  description String    @db.Text
  imageUrl    String
  githubUrl   String?
  liveUrl     String?
  createdAt   DateTime  @default(now())

  technologies ProjectTechnology[]
}

model Technology {
  id    String @id @default(cuid())
  name  String @unique

  projects ProjectTechnology[]
}

// This is the join table for the many-to-many relationship
model ProjectTechnology {
  project      Project    @relation(fields: [projectId], references: [id])
  projectId    String
  technology   Technology @relation(fields: [technologyId], references: [id])
  technologyId String

  @@id([projectId, technologyId])
}
```

#### **4. Component Hierarchy**

This is a basic breakdown of our front-end structure.

```
/app
|-- /layout.tsx (Root layout with Navbar, Footer)
|
|-- /page.tsx (Home Page)
|   |-- <Hero />
|   |-- <FeaturedProjects />
|
|-- /about
|   |-- /page.tsx (About Page)
|
|-- /projects
|   |-- /page.tsx (Projects Grid Page)
|       |-- <ProjectFilter />
|       |-- <ProjectCard />
|
|-- /contact
|   |-- /page.tsx (Contact Page)
|       |-- <ContactForm />
|
|-- /blog
|   |-- /page.tsx (Blog Index)
|   |-- /[slug]
|       |-- /page.tsx (Individual Blog Post)

```

#### **5. Feature Prioritization**

We'll build this in logical steps.

**MVP (Minimum Viable Product):**

1.  **Project Setup:** Initialize a new Next.js project with TypeScript and Tailwind CSS.
2.  **Core UI:** Build the main `Layout` (Navbar, Footer) and the static `Home` and `About` pages.
3.  **Database & Projects:** Set up Vercel Postgres and Prisma. Seed the database with your three main projects. Build the `/projects` page to dynamically fetch and display them using `<ProjectCard>` components.
4.  **Contact Form:** Create the `/api/send-email` API route with Resend. Build the front-end `<ContactForm>` and wire it up.
5.  **Initial Deploy:** Deploy the MVP to Vercel.

**Post-MVP Enhancements:**

- Implement the tag-based filtering system on the `/projects` page.
- Integrate Sanity.io and build out the blog.
- Add subtle page transitions and micro-interactions with **Framer Motion**.
- Implement a simple view counter for projects to add another dynamic, full-stack element.

#### **6. Deployment Plan**

We'll deploy on **Vercel** from day one. We'll connect your GitHub repository for automatic deployments on every push to the `main` branch.

**Required Environment Variables:**

- `DATABASE_URL`: The connection string for your Vercel Postgres database.
- `RESEND_API_KEY`: Your API key from Resend for sending emails.
- `SANITY_PROJECT_ID`: (Post-MVP) For connecting to your blog content.
- `SANITY_DATASET`: (Post-MVP)
- `SANITY_API_TOKEN`: (Post-MVP)
