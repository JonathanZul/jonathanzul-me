import Link from "next/link"
import { Github, Linkedin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Jonathan Zul Luna. Built with Next.js & Tailwind.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
            <Link href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                </Button>
            </Link>
            <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                </Button>
            </Link>
             {/* Placeholder for CV Link */}
             <Link href="/resume.pdf" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">CV</span>
                </Button>
            </Link>
        </div>
      </div>
    </footer>
  )
}