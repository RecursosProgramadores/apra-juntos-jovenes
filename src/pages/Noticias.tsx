import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import NoticiaModal from "@/components/noticias/NoticiaModal";

interface Noticia {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  image_url: string | null;
  video_url: string | null;
  publish_date: string | null;
  gallery_images: unknown;
}

const categories = ["Todos", "Educación", "Campaña", "Propuestas", "Eventos", "Medio Ambiente", "General"];

const Noticias = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchNoticias();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('noticias-public')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'noticias' },
        () => {
          fetchNoticias();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNoticias = async () => {
    const { data, error } = await supabase
      .from('noticias')
      .select('*')
      .eq('is_published', true)
      .order('publish_date', { ascending: false });

    if (!error && data) {
      setNoticias(data);
    }
    setIsLoading(false);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return format(new Date(dateStr), "d MMM yyyy", { locale: es });
  };

  const handleReadMore = (noticia: Noticia) => {
    setSelectedNoticia(noticia);
    setModalOpen(true);
  };

  const filteredNoticias = selectedCategory === "Todos"
    ? noticias
    : noticias.filter(n => n.category === selectedCategory);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              ACTUALIDAD
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              Noticias de la <span className="text-primary">Campaña</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mantente informado sobre las últimas novedades de nuestra campaña,
              eventos y propuestas.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {filteredNoticias.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No hay noticias disponibles en esta categoría.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNoticias.map((article) => (
                <article
                  key={article.id}
                  className="group bg-card rounded-2xl overflow-hidden border hover:border-primary transition-all card-hover"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {article.category || "General"}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publish_date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt || article.content?.slice(0, 150)}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary"
                      onClick={() => handleReadMore(article)}
                    >
                      Leer más
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Síguenos en <span className="text-primary">Redes Sociales</span>
          </h2>
          <SocialLinks />
        </div>
      </section>

      {/* Noticia Modal */}
      <NoticiaModal
        noticia={selectedNoticia}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </Layout>
  );
};

// Component for dynamic social links
const SocialLinks = () => {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (data) setLinks(data);
    };
    fetchLinks();

    const channel = supabase
      .channel('social-links-public')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'social_links' }, fetchLinks)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const getIconSvg = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'x':
      case 'twitter':
        return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
      case 'instagram':
        return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
      case 'tiktok':
        return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>;
      case 'facebook':
        return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
      case 'youtube':
        return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
      default:
        return null;
    }
  };

  const getLinkStyle = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white";
      case 'facebook':
        return "bg-blue-600 text-white";
      case 'youtube':
        return "bg-red-600 text-white";
      default:
        return "bg-foreground text-background";
    }
  };

  if (links.length === 0) {
    // Fallback to static links
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <a href="https://twitter.com/JorgeAlvaradoLino" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          @JorgeAlvaradoLino
        </a>
        <a href="https://instagram.com/jorge_alvarado_lino" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full font-bold hover:opacity-90 transition-opacity">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          @jorge_alvarado_lino
        </a>
        <a href="https://tiktok.com/@jorgealvaradolino" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
          @jorgealvaradolino
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity ${getLinkStyle(link.platform)}`}
        >
          {getIconSvg(link.platform)}
          {link.username}
          {link.followers_count && (
            <span className="text-xs opacity-75">({link.followers_count})</span>
          )}
        </a>
      ))}
    </div>
  );
};

export default Noticias;
