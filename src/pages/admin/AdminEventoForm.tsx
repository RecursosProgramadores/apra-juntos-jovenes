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
import { ArrowLeft, Save, Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const eventTypes = ["Mitin", "Webinar", "Caravana", "Debate", "Otro"];

interface EventoForm {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  image_url: string;
  video_url: string;
  is_featured: boolean;
  is_published: boolean;
}

const initialForm: EventoForm = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  type: "Mitin",
  image_url: "",
  video_url: "",
  is_featured: false,
  is_published: false,
};

const AdminEventoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<EventoForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      fetchEvento(id);
    }
  }, [id, isEditing]);

  const fetchEvento = async (eventoId: string) => {
    try {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", eventoId)
        .single();

      if (error) throw error;
      if (data) {
        setForm({
          title: data.title || "",
          date: data.date || "",
          time: data.time || "",
          location: data.location || "",
          description: data.description || "",
          type: data.type || "Mitin",
          image_url: data.image_url || "",
          video_url: data.video_url || "",
          is_featured: data.is_featured || false,
          is_published: data.is_published || false,
        });
      }
    } catch (error) {
      console.error("Error fetching evento:", error);
      toast.error("Error al cargar el evento");
      navigate("/admin/eventos");
    } finally {
      setIsFetching(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `evento-${Date.now()}.${fileExt}`;
      const filePath = `eventos/${fileName}`;

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
    if (!form.date) {
      toast.error("La fecha es obligatoria");
      return;
    }

    setIsLoading(true);
    try {
      const eventoData = {
        title: form.title.trim(),
        date: form.date,
        time: form.time || null,
        location: form.location || null,
        description: form.description || null,
        type: form.type,
        image_url: form.image_url || null,
        video_url: form.video_url || null,
        is_featured: form.is_featured,
        is_published: form.is_published,
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from("eventos")
          .update(eventoData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Evento actualizado correctamente");
      } else {
        const { error } = await supabase.from("eventos").insert([eventoData]);
        if (error) throw error;
        toast.success("Evento creado correctamente");
      }

      navigate("/admin/eventos");
    } catch (error) {
      console.error("Error saving evento:", error);
      toast.error("Error al guardar el evento");
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
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/eventos")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {isEditing ? "Editar Evento" : "Nuevo Evento"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Modifica los detalles del evento" : "Crea un nuevo evento de campaña"}
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
                  placeholder="Nombre del evento"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    value={form.time}
                    onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                    placeholder="Ej: 5:00 PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={form.type}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Ej: Plaza de Armas, Lima"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe el evento..."
                  rows={4}
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
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Evento Destacado</Label>
                  <p className="text-sm text-muted-foreground">
                    Mostrar este evento en la sección principal
                  </p>
                </div>
                <Switch
                  checked={form.is_featured}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, is_featured: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Publicar</Label>
                  <p className="text-sm text-muted-foreground">
                    Hacer visible este evento en el sitio público
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
              onClick={() => navigate("/admin/eventos")}
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
                  {isEditing ? "Actualizar" : "Crear"} Evento
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEventoForm;
