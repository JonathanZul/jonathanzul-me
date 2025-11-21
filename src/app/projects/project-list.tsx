// src/app/projects/project-list.tsx
"use client"

import { useState, useMemo } from "react"
import { ProjectCard } from "@/components/project-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define the specific shape of data we need
interface Project {
  id: string
  slug: string
  title: string
  description: string
  imageUrl: string
  githubUrl: string | null
  liveUrl: string | null
  technologies: {
    technology: {
      name: string
    }
  }[]
}

interface ProjectListProps {
  initialProjects: Project[]
}

export function ProjectList({ initialProjects }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  // 1. Extract all unique technologies from the project list
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>()
    initialProjects.forEach((p) => {
      p.technologies.forEach((t) => techs.add(t.technology.name))
    })
    return Array.from(techs).sort()
  }, [initialProjects])

  // 2. Filter projects based on search AND selected tech
  const filteredProjects = initialProjects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTech = selectedTech 
      ? project.technologies.some((t) => t.technology.name === selectedTech)
      : true

    return matchesSearch && matchesTech
  })

  return (
    <div className="space-y-12">
      {/* SEARCH & FILTER SECTION */}
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10 h-10 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Scrollable Badge List */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedTech === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTech(null)}
            className="rounded-full"
          >
            All
          </Button>
          {allTechnologies.map((tech) => (
            <Button
              key={tech}
              variant={selectedTech === tech ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
              className="rounded-full"
            >
              {tech}
            </Button>
          ))}
        </div>
      </div>

      {/* RESULTS GRID */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 space-y-4">
          <div className="bg-muted h-16 w-16 rounded-full flex items-center justify-center mx-auto">
             <X className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </p>
          <Button 
            variant="link" 
            onClick={() => {
                setSearchQuery("")
                setSelectedTech(null)
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}