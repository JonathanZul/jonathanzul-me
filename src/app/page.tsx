import Link from "next/link"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { ArrowRight, Download } from "lucide-react"

// This function fetches data directly on the server
async function getFeaturedProjects() {
  const projects = await db.project.findMany({
    take: 3, // Only fetch the top 3
    orderBy: {
      createdAt: 'desc', // Newest first
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

export default async function Home() {
  const projects = await getFeaturedProjects()

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-serif text-foreground">
                  Hi, I&apos;m Jonathan. <br />
                  <span className="text-muted-foreground">Full-Stack Engineer.</span>
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                  I build accessible, scalable digital solutions with a focus on 
                  machine learning and environmental impact. Currently bridging the gap 
                  between complex data and human-centric experiences.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    View My Work <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Me
                  </Button>
                </Link>
                {/* Optional Resume Button */}
                <Link href="/resume.pdf" target="_blank"> 
                    <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2">
                         Download CV <Download className="w-4 h-4" />
                    </Button>
                </Link>
              </div>
            </div>
            
            {/* Visual / Image Area */}
            <div className="mx-auto lg:ml-auto flex justify-center items-center">
               {/* 
                  This is a stylistic placeholder. 
                  In a real deployment, replace '/profile.jpg' with your actual photo.
                  I've added a 'blob' shape effect using border-radius.
               */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-blue-100 rounded-[2rem] rotate-6 opacity-60 blur-2xl dark:from-green-900 dark:to-blue-900" />
                <div className="relative w-full h-full overflow-hidden rounded-[2rem] border-2 border-border bg-muted shadow-xl rotate-3 transition-transform hover:rotate-0 duration-500">
                   {/* 
                      Replace this src with your actual image URL. 
                      Currently using a placeholder that looks professional.
                   */}
                  <img 
                    alt="Jonathan Zul Luna"
                    src="https://ui.shadcn.com/placeholder.svg" // Replace with your actual photo path
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight font-serif">Featured Projects</h2>
              <p className="text-muted-foreground">
                A selection of my recent work in Full-Stack and AI.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="gap-1">
                View All Projects <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}