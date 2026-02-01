import Layout from "@/components/layout/Layout";
import { CheckCircle2, FileText, BarChart3, Users } from "lucide-react";

const Transparencia = () => {
    return (
        <Layout>
            <section className="pt-32 pb-20 bg-background min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-black mb-6 text-foreground border-l-4 border-primary pl-6">
                            Compromiso de <span className="text-primary">Transparencia</span>
                        </h1>

                        <p className="text-xl text-muted-foreground mb-12">
                            Creemos en una gestión abierta y auditable. Aquí presentamos los pilares de nuestro compromiso ético para la campaña y el futuro gobierno regional.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            <div className="bg-secondary/30 p-8 rounded-2xl border border-primary/10">
                                <FileText className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-3">Rendición de Cuentas</h3>
                                <p className="text-muted-foreground">
                                    Publicación periódica de los gastos de campaña y orígenes del financiamiento, cumpliendo estrictamente con la normativa electoral.
                                </p>
                            </div>

                            <div className="bg-secondary/30 p-8 rounded-2xl border border-primary/10">
                                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-3">Gestión de Datos</h3>
                                <p className="text-muted-foreground">
                                    Uso de tecnologías abiertas para que la ciudadanía pueda consultar el avance de las propuestas y proyectos regionales.
                                </p>
                            </div>

                            <div className="bg-secondary/30 p-8 rounded-2xl border border-primary/10">
                                <Users className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-3">Participación Ciudadana</h3>
                                <p className="text-muted-foreground">
                                    Mesas de diálogo abiertas y canales digitales para que su voz sea escuchada en cada etapa de la toma de decisiones.
                                </p>
                            </div>

                            <div className="bg-secondary/30 p-8 rounded-2xl border border-primary/10">
                                <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-3">Ética y Probidad</h3>
                                <p className="text-muted-foreground">
                                    Tolerancia cero a la corrupción. Implementación de protocolos de control interno rigurosos en toda la gestión del equipo.
                                </p>
                            </div>
                        </div>

                        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 text-center">
                            <h2 className="text-2xl font-bold mb-4">Nuestro Lema</h2>
                            <p className="text-2xl italic font-serif text-primary">
                                "Gestión honesta para un futuro próspero"
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Transparencia;
