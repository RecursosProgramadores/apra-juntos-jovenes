import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import japLogo from "@/assets/JAPlogo.png";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/partido", label: "El Partido" },
  { href: "/candidato", label: "Candidato" },
  { href: "/propuestas", label: "Propuestas" },
  { href: "/noticias", label: "Noticias" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contacto", label: "Contacto" },
];

const JAPLogo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <img
      src={japLogo}
      alt="JAP Logo"
      className="h-12 w-auto md:h-14 lg:h-16 transition-transform hover:scale-105 duration-300"
    />
  </div>
);

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2 border-border"
          : "bg-background py-4 border-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="relative z-10">
            <JAPLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors nav-link-underline",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/90 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="hero" size="sm" asChild>
              <Link to="/contacto">Únete</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 bg-background/98 backdrop-blur-lg transition-all duration-300 pt-20",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-2 stagger-children">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-4 text-lg font-bold rounded-lg transition-colors",
                    location.pathname === link.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/contacto">Únete a la Campaña</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
