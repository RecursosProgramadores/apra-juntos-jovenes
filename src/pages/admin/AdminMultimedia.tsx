import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Upload, Loader2, Trash2, Copy, Check, Image as ImageIcon, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
  size: number;
}

const AdminMultimedia = () => {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      // Fetch images
      const { data: imageData, error: imageError } = await supabase.storage
        .from("campaign-images")
        .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

      if (imageError) throw imageError;

      const imageFiles: MediaFile[] = (imageData || [])
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => {
          const { data } = supabase.storage.from("campaign-images").getPublicUrl(file.name);
          return {
            name: file.name,
            url: data.publicUrl,
            created_at: file.created_at || "",
            size: file.metadata?.size || 0,
          };
        });

      // Also fetch from subfolders
      const folders = ["eventos", "noticias"];
      for (const folder of folders) {
        const { data: folderData } = await supabase.storage
          .from("campaign-images")
          .list(folder, { limit: 100, sortBy: { column: "created_at", order: "desc" } });

        if (folderData) {
          for (const file of folderData) {
            if (file.name !== ".emptyFolderPlaceholder") {
              const { data } = supabase.storage
                .from("campaign-images")
                .getPublicUrl(`${folder}/${file.name}`);
              imageFiles.push({
                name: `${folder}/${file.name}`,
                url: data.publicUrl,
                created_at: file.created_at || "",
                size: file.metadata?.size || 0,
              });
            }
          }
        }
      }

      setImages(imageFiles);

      // Fetch videos
      const { data: videoData, error: videoError } = await supabase.storage
        .from("campaign-videos")
        .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

      if (videoError) throw videoError;

      const videoFiles: MediaFile[] = (videoData || [])
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => {
          const { data } = supabase.storage.from("campaign-videos").getPublicUrl(file.name);
          return {
            name: file.name,
            url: data.publicUrl,
            created_at: file.created_at || "",
            size: file.metadata?.size || 0,
          };
        });

      setVideos(videoFiles);
    } catch (error) {
      console.error("Error fetching media:", error);
      toast.error("Error al cargar los archivos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = type === "image" ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`El archivo no debe superar los ${type === "image" ? "5MB" : "50MB"}`);
      return;
    }

    setIsUploading(true);
    try {
      const bucket = type === "image" ? "campaign-images" : "campaign-videos";
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage.from(bucket).upload(fileName, file);

      if (error) throw error;

      toast.success("Archivo subido correctamente");
      fetchMedia();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error al subir el archivo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (name: string, type: "image" | "video") => {
    try {
      const bucket = type === "image" ? "campaign-images" : "campaign-videos";
      const { error } = await supabase.storage.from(bucket).remove([name]);

      if (error) throw error;

      toast.success("Archivo eliminado correctamente");
      fetchMedia();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Error al eliminar el archivo");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("URL copiada al portapapeles");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-foreground">Multimedia</h1>
          <p className="text-muted-foreground">
            Gestiona las imágenes y videos de la campaña
          </p>
        </div>

        {/* Upload Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Subir Imagen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                {isUploading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
                <span className="mt-2 text-sm text-muted-foreground">
                  PNG, JPG hasta 5MB
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, "image")}
                  disabled={isUploading}
                />
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Subir Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                {isUploading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
                <span className="mt-2 text-sm text-muted-foreground">
                  MP4, MOV hasta 50MB
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={(e) => handleUpload(e, "video")}
                  disabled={isUploading}
                />
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Images Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Imágenes ({images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : images.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay imágenes subidas aún
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((image) => (
                  <div
                    key={image.name}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => copyToClipboard(image.url)}
                      >
                        {copiedUrl === image.url ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(image.name, "image")}
                              className="bg-destructive text-destructive-foreground"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Videos Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Videos ({videos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : videos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay videos subidos aún
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <div
                    key={video.name}
                    className="relative aspect-video rounded-lg overflow-hidden bg-muted"
                  >
                    <video
                      src={video.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => copyToClipboard(video.url)}
                      >
                        {copiedUrl === video.url ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar video?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(video.name, "video")}
                              className="bg-destructive text-destructive-foreground"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMultimedia;
