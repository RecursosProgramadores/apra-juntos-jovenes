import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const categories = ["General", "Educación", "Campaña", "Propuestas", "Eventos", "Medio Ambiente", "Economía"];

interface NoticiaForm {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  publish_date: string;
  image_url: string;
  video_url: string;
  is_published: boolean;
}

const initialForm: NoticiaForm = {
  title: "",
  content: "",
  excerpt: "",
  category: "General",
  publish_date: new Date().toISOString().split("T")[0],
  image_url: "",
  video_url: "",
  is_published: false,
};

const AdminNoticiaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<NoticiaForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      fetchNoticia(id);
    }
  }, [id, isEditing]);

  const fetchNoticia = async (noticiaId: string) => {
    try {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .eq("id", noticiaId)
        .single();

      if (error) throw error;
      if (data) {
        setForm({
          title: data.title || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          category: data.category || "General",
          publish_date: data.publish_date || new Date().toISOString().split("T")[0],
          image_url: data.image_url || "",
          video_url: data.video_url || "",
          is_published: data.is_published || false,
        });
      }
    } catch (error) {
      console.error("Error fetching noticia:", error);
      toast.error("Error al cargar la noticia");
      navigate("/admin/noticias");
    } finally {
      setIsFetching(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `noticia-${Date.now()}.${fileExt}`;
      const filePath = `noticias/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("campaign-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("campaign-images")
        .getPublicUrl(filePath);

      setForm((prev) => ({ ...prev, image_url: urlData.publicUrl }));
      toast.success("Imagen subida correctamente");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    setIsLoading(true);
    try {
      const noticiaData = {
        title: form.title.trim(),
        content: form.content || null,
        excerpt: form.excerpt || null,
        category: form.category,
        publish_date: form.publish_date || null,
        image_url: form.image_url || null,
        video_url: form.video_url || null,
        is_published: form.is_published,
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from("noticias")
          .update(noticiaData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Noticia actualizada correctamente");
      } else {
        const { error } = await supabase.from("noticias").insert([noticiaData]);
        if (error) throw error;
        toast.success("Noticia creada correctamente");
      }

      navigate("/admin/noticias");
    } catch (error) {
      console.error("Error saving noticia:", error);
      toast.error("Error al guardar la noticia");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/noticias")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {isEditing ? "Editar Noticia" : "Nueva Noticia"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Modifica los detalles de la noticia" : "Crea un nuevo artículo de noticias"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Título de la noticia"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publish_date">Fecha de Publicación</Label>
                  <Input
                    id="publish_date"
                    type="date"
                    value={form.publish_date}
                    onChange={(e) => setForm((prev) => ({ ...prev, publish_date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumen</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Breve resumen de la noticia..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenido</Label>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Contenido completo de la noticia..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card>
            <CardHeader>
              <CardTitle>Multimedia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Imagen Principal</Label>
                {form.image_url ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setForm((prev) => ({ ...prev, image_url: "" }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center justify-center py-6">
                      {isUploading ? (
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
                      ) : (
                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                      )}
                      <p className="text-sm text-muted-foreground">
                        {isUploading ? "Subiendo..." : "Haz clic para subir una imagen"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG hasta 5MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_url">URL de Video (YouTube/Vimeo)</Label>
                <Input
                  id="video_url"
                  value={form.video_url}
                  onChange={(e) => setForm((prev) => ({ ...prev, video_url: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Publicar</Label>
                  <p className="text-sm text-muted-foreground">
                    Hacer visible esta noticia en el sitio público
                  </p>
                </div>
                <Switch
                  checked={form.is_published}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, is_published: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/noticias")}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Actualizar" : "Crear"} Noticia
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminNoticiaForm;
