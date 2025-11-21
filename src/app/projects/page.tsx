// src/app/projects/page.tsx
import { db } from "@/lib/db"
import { ProjectList } from "./project-list"

// Fetch all projects (no limit)
async function getProjects() {
  const projects = await db.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      technologies: {
        include: {
          technology: true,
        },
      },
    },
  })
  return projects
}

export const metadata = {
    title: "Projects | Jonathan Zul Luna",
    description: "A comprehensive list of my software engineering projects, featuring Full-Stack and AI applications."
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container py-20">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold font-serif tracking-tight lg:text-5xl">
          My Work
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A collection of projects exploring Machine Learning, Full-Stack Web Development, 
          and environmental solutions.
        </p>
      </div>

      {/* Client Component for Interactivity */}
      <ProjectList initialProjects={projects} />
    </div>
  )
}