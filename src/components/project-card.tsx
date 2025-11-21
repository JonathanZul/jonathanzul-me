import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Globe } from "lucide-react"

// We define an interface for the props to ensure type safety
interface ProjectCardProps {
  project: {
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
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
         {/* 
            Ideally, use Next.js <Image /> here. 
            For now, we use a simple img tag or div. 
            If the image fails to load, the bg-muted acts as a fallback.
         */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
            src={project.imageUrl} 
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <CardHeader>
        <CardTitle className="font-serif text-2xl">{project.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.map((t) => (
            <Badge key={t.technology.name} variant="secondary" className="text-xs">
              {t.technology.name}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">
          {project.description}
        </p>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-2">
        {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Github className="w-4 h-4" /> Code
            </Button>
          </Link>
        )}
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" className="flex-1">
            <Button className="w-full gap-2">
              <Globe className="w-4 h-4" /> Live
            </Button>
          </Link>
        )}
        {/* Fallback if only one link exists to keep button layout nice, 
            or link to internal details page */}
        {!project.liveUrl && (
             <Link href={`/projects`} className="flex-1">
             <Button variant="ghost" className="w-full gap-2 group-hover:translate-x-1 transition-transform">
               Details <ArrowRight className="w-4 h-4" />
             </Button>
           </Link>
        )}
      </CardFooter>
    </Card>
  )
}