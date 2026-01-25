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
  const [formType, setFormType] = useState<"contact" | "volunteer" | "donate">("contact");

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
              Queremos escucharte. Ya sea que quieras ser voluntario, hacer una 
              donación o simplemente saludarnos, estamos aquí para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Form Tabs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant={formType === "contact" ? "default" : "outline"}
                size="lg"
                onClick={() => setFormType("contact")}
                className="gap-2"
              >
                <Mail className="h-5 w-5" />
                Contacto
              </Button>
              <Button
                variant={formType === "volunteer" ? "default" : "outline"}
                size="lg"
                onClick={() => setFormType("volunteer")}
                className="gap-2"
              >
                <Users className="h-5 w-5" />
                Ser Voluntario
              </Button>
              <Button
                variant={formType === "donate" ? "default" : "outline"}
                size="lg"
                onClick={() => setFormType("donate")}
                className="gap-2"
              >
                <Heart className="h-5 w-5" />
                Donar
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-card rounded-2xl border p-8">
                  {formType === "contact" && (
                    <>
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
                    </>
                  )}

                  {formType === "volunteer" && (
                    <>
                      <h2 className="text-2xl font-bold mb-2">Sé Voluntario</h2>
                      <p className="text-muted-foreground mb-6">
                        Únete a nuestro equipo y ayuda a construir el cambio que el Perú necesita.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="vol-name">Nombre completo</Label>
                            <Input id="vol-name" placeholder="Tu nombre" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vol-email">Correo electrónico</Label>
                            <Input id="vol-email" type="email" placeholder="tu@email.com" required />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="vol-phone">Teléfono</Label>
                            <Input id="vol-phone" placeholder="+51 999 999 999" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vol-region">Región</Label>
                            <Input id="vol-region" placeholder="Tu región" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vol-skills">¿Cómo puedes ayudar?</Label>
                          <Textarea 
                            id="vol-skills" 
                            placeholder="Cuéntanos tus habilidades e intereses..." 
                            rows={4}
                            required 
                          />
                        </div>
                        <Button type="submit" variant="hero" size="lg" className="w-full">
                          Quiero ser Voluntario
                          <Users className="h-5 w-5" />
                        </Button>
                      </form>
                    </>
                  )}

                  {formType === "donate" && (
                    <>
                      <h2 className="text-2xl font-bold mb-2">Apoya la Campaña</h2>
                      <p className="text-muted-foreground mb-6">
                        Tu donación nos ayuda a llevar nuestro mensaje a todos los rincones del Perú.
                      </p>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[20, 50, 100].map((amount) => (
                          <Button 
                            key={amount}
                            variant="outline" 
                            className="h-16 text-xl font-bold hover:bg-primary hover:text-primary-foreground"
                          >
                            S/{amount}
                          </Button>
                        ))}
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="don-amount">Otro monto (S/)</Label>
                          <Input id="don-amount" type="number" placeholder="Ingresa un monto" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="don-name">Nombre completo</Label>
                            <Input id="don-name" placeholder="Tu nombre" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="don-email">Correo electrónico</Label>
                            <Input id="don-email" type="email" placeholder="tu@email.com" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="don-dni">DNI</Label>
                          <Input id="don-dni" placeholder="Tu DNI" required />
                        </div>
                        <Button type="submit" variant="hero" size="lg" className="w-full">
                          Donar Ahora
                          <Heart className="h-5 w-5" />
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          Todas las donaciones son transparentes y reportadas a la ONPE.
                        </p>
                      </form>
                    </>
                  )}
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
                          Av. Alfonso Ugarte 1012, Lima, Perú
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
                          contacto@apra.pe
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

                {/* Map placeholder */}
                <div className="bg-muted rounded-2xl h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Mapa de ubicación
                    </p>
                  </div>
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
