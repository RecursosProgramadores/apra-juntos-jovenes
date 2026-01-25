import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "Mitin Juvenil - Lima Norte",
    date: "15 Feb 2025",
    time: "5:00 PM",
    location: "Plaza Cívica, Los Olivos",
    type: "Mitin",
  },
  {
    id: 2,
    title: "Webinar: Propuestas para la Juventud",
    date: "20 Feb 2025",
    time: "7:00 PM",
    location: "Virtual - Zoom",
    type: "Virtual",
  },
  {
    id: 3,
    title: "Caravana de la Victoria - Arequipa",
    date: "28 Feb 2025",
    time: "10:00 AM",
    location: "Plaza de Armas, Arequipa",
    type: "Caravana",
  },
];

const socialLinks = [
  {
    name: "X (Twitter)",
    handle: "@ApraJheremy",
    followers: "125K",
    color: "bg-foreground",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@aprajheremy",
    followers: "89K",
    color: "bg-foreground",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@jheremy_apra",
    followers: "210K",
    color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

export const SocialSection = () => {
  return (
    <section className="py-24 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Social Media */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6">
              SÍGUENOS
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Únete a la <span className="text-primary">Conversación</span>
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Mantente conectado con las últimas noticias, eventos y propuestas 
              a través de nuestras redes sociales.
            </p>

            <div className="space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="flex items-center gap-4 p-4 rounded-xl bg-background/5 hover:bg-background/10 transition-colors group"
                >
                  <div className={`w-14 h-14 rounded-xl ${social.color} flex items-center justify-center text-background`}>
                    {social.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-background">{social.name}</h4>
                    <p className="text-sm text-background/60">{social.handle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-primary">{social.followers}</span>
                    <p className="text-xs text-background/50">seguidores</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-background/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6">
              PRÓXIMOS EVENTOS
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Agenda de <span className="text-primary">Campaña</span>
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Participa en nuestros eventos y sé parte del movimiento 
              que transformará el Perú.
            </p>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-5 rounded-xl bg-background/5 border border-background/10 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-2">
                        {event.type}
                      </span>
                      <h4 className="font-bold text-lg text-background">{event.title}</h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-background/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="mt-8 w-full" asChild>
              <Link to="/eventos">
                Ver Todos los Eventos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
