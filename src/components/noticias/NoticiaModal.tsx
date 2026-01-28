import { Calendar, X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface NoticiaModalProps {
  noticia: Noticia | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NoticiaModal = ({ noticia, open, onOpenChange }: NoticiaModalProps) => {
  if (!noticia) return null;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return format(new Date(dateStr), "d 'de' MMMM, yyyy", { locale: es });
  };

  const galleryImages = Array.isArray(noticia.gallery_images) 
    ? noticia.gallery_images 
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          {/* Header Image */}
          {noticia.image_url && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={noticia.image_url}
                alt={noticia.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <DialogHeader className="text-left mb-4">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {noticia.category || "General"}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(noticia.publish_date)}
                </span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-black leading-tight">
                {noticia.title}
              </DialogTitle>
            </DialogHeader>

            {/* Video */}
            {noticia.video_url && (
              <div className="aspect-video mb-6 rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={noticia.video_url.replace('watch?v=', 'embed/')}
                  title={noticia.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-6">
              {noticia.content ? (
                <div 
                  className="text-muted-foreground leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: noticia.content }}
                />
              ) : (
                <p className="text-muted-foreground">{noticia.excerpt}</p>
              )}
            </div>

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="mt-6">
                <h4 className="font-bold mb-4">Galería de Imágenes</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={typeof image === 'string' ? image : image.url}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="mt-6 pt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NoticiaModal;
