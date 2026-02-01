import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send, Heart, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [formType, setFormType] = useState<"contact" | "volunteer">("contact");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Mensaje enviado!",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              ÚNETE AL MOVIMIENTO
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              <span className="text-primary">Contáctanos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Queremos escucharte. Ya sea que quieras ser voluntario
              o simplemente saludarnos, estamos aquí para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-card rounded-2xl border p-8">
                  <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" placeholder="Tu nombre" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto</Label>
                      <Input id="subject" placeholder="¿Sobre qué quieres hablar?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        placeholder="Escribe tu mensaje aquí..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Enviar Mensaje
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Dirección</p>
                        <p className="text-sm text-muted-foreground">
                          jr. 28 de julio Nº 1068 - frente del banco de la nación
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-sm text-muted-foreground">
                          +51 1 426-7770
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          contacto@jorgealvarado-diputado.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-2">¿Preguntas?</h3>
                  <p className="text-primary-foreground/80 mb-4">
                    Nuestro equipo está disponible para responder todas tus
                    consultas de lunes a viernes de 9am a 6pm.
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => window.open('https://wa.me/5114267770', '_blank')}
                  >
                    Escríbenos por WhatsApp
                  </Button>
                </div>

                <div className="bg-card rounded-2xl border overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!3m2!1ses!2spe!4v1769969382529!5m2!1ses!2spe!6m8!1m7!1svPvA87tK1UWkg5Q058Mq3Q!2m2!1d-9.928791398874294!2d-76.2385972194766!3f115.40989987872548!4f-5.79908001133613!5f0.7820865974627469"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de ubicación"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
