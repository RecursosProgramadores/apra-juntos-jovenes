import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Star, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Star className="h-24 w-24 text-primary fill-primary animate-pulse-glow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-black text-primary-foreground">404</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-foreground mb-4">
          Página no encontrada
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          La página que buscas no existe o ha sido movida. 
          Pero no te preocupes, ¡aún puedes unirte al cambio!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              <Home className="h-5 w-5" />
              Ir al Inicio
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
            Volver Atrás
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
