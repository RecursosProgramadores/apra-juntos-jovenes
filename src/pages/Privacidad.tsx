import Layout from "@/components/layout/Layout";

const Privacidad = () => {
    return (
        <Layout>
            <section className="pt-32 pb-20 bg-background min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-black mb-8 text-foreground border-l-4 border-primary pl-6">
                            Política de <span className="text-primary">Privacidad</span>
                        </h1>

                        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                            <p>
                                En la campaña de <strong>Jorge Alvarado Lino</strong>, valoramos y respetamos su privacidad. Esta política describe cómo manejamos la información cuando visita nuestro sitio web.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">1. Recopilación de Información</h2>
                            <p>
                                Solo recopilamos información personal que usted nos proporciona voluntariamente a través de nuestros formularios de contacto o registro, como su nombre, correo electrónico y número de teléfono.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">2. Uso de los Datos</h2>
                            <p>
                                La información recopilada se utiliza exclusivamente para:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Responder a sus consultas y mensajes.</li>
                                <li>Enviar actualizaciones relevantes sobre la campaña y propuestas.</li>
                                <li>Coordinar actividades de participación ciudadana.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground">3. Protección de Datos</h2>
                            <p>
                                Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, alteración o divulgación. No compartimos ni vendemos su información a terceros.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">4. Sus Derechos</h2>
                            <p>
                                Usted tiene derecho a acceder, rectificar o solicitar la eliminación de sus datos en cualquier momento enviando un correo a contacto@jorgealvarado-diputado.com.
                            </p>

                            <p className="pt-8 border-t text-sm">
                                Última actualización: Febrero 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Privacidad;
