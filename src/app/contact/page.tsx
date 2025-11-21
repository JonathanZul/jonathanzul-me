// src/app/contact/page.tsx
import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin } from "lucide-react"

export const metadata = {
    title: "Contact | Jonathan Zul Luna",
    description: "Get in touch with me for opportunities or collaborations."
}

export default function ContactPage() {
  return (
    <div className="container py-20">
      <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Left Column: Text & Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold font-serif tracking-tight lg:text-5xl">
              Let&apos;s Connect
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m currently open to new opportunities in Full-Stack Development and Machine Learning. 
              Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <a href="mailto:jonathanzulluna.work@outlook.com" className="hover:text-primary transition-colors">
                jonathanzulluna.work@outlook.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
               {/* Update this based on where you actually are/want to work */}
              <MapPin className="h-5 w-5" />
              <span>Canada / Remote</span>
            </div>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="bg-card border rounded-xl p-6 shadow-sm md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}