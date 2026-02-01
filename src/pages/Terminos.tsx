import Layout from "@/components/layout/Layout";

const Terminos = () => {
    return (
        <Layout>
            <section className="pt-32 pb-20 bg-background min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-black mb-8 text-foreground border-l-4 border-primary pl-6">
                            Términos de <span className="text-primary">Uso</span>
                        </h1>

                        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                            <p>
                                Al acceder y utilizar este sitio web, usted acepta cumplir con los siguientes términos y condiciones de uso.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">1. Uso del Sitio</h2>
                            <p>
                                Este sitio tiene como fin informar sobre la campaña política de <strong>Jorge Alvarado Lino</strong>. Está prohibido el uso de este sitio para fines ilícitos o que puedan dañar la imagen de la campaña o el partido.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">2. Propiedad Intelectual</h2>
                            <p>
                                Todo el contenido, incluyendo textos, imágenes y logotipos, son propiedad de la campaña o tienen autorización para su uso. Se permite compartir el contenido con fines informativos citando la fuente.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">3. Enlaces a Terceros</h2>
                            <p>
                                Nuestro sitio puede contener enlaces a sitios externos (como redes sociales). No somos responsables del contenido o las prácticas de privacidad de dichos sitios.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">4. Limitación de Responsabilidad</h2>
                            <p>
                                Trabajamos para mantener la información actualizada, pero no garantizamos la ausencia de errores tipográficos o técnicos. La campaña se reserva el derecho de modificar el contenido del sitio en cualquier momento.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">5. Consultas</h2>
                            <p>
                                Para cualquier duda sobre estos términos, puede contactarnos a través de nuestro formulario oficial o correo electrónico.
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

export default Terminos;
