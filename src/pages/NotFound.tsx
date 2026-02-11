import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-muted-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;