
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Home page component with introduction and main navigation options
 */
export default function HomePage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl py-8 md:py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
          Welcome to Savannah
        </h1>
        <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">
          A beautiful, responsive web application with modern design patterns
          and a savanna-inspired color palette.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/dashboard">Explore Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">Modern Stack</h3>
            <p className="text-muted-foreground">
              Built with React, TypeScript, and Vite for lightning-fast development.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">Beautiful UI</h3>
            <p className="text-muted-foreground">
              Tailwind CSS with custom savanna-inspired theme and dark mode support.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">Fully Responsive</h3>
            <p className="text-muted-foreground">
              Designed to work beautifully on all devices, from mobile to desktop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
