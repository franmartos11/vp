
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    {
      id: "cmovn6zxe00004r0x4wk4suwv",
      titleEs: "Escalera Metálica Personalizada",
      descriptionEs: "Se desarrollaron planos de taller para una escalera de acero personalizada en un proyecto residencial privado. El alcance incluyó planos detallados de fabricación, detalles de conexión, especificaciones de anclaje y coordinación con acabados arquitectónicos. El diseño se desarrolló para garantizar la integridad estructural, la constructibilidad y la instalación precisa en el campo, manteniendo la alineación con la intención arquitectónica y las especificaciones del proyecto.",
      projectTypeEs: "Planos de taller",
      locationEs: "Palm Beach, Florida"
    },
    {
      id: "cmovnjrxl00044r0xw0cj6s0e",
      titleEs: "Residencias Modernas de Mediana Altura",
      descriptionEs: "Se proporcionaron servicios de ingeniería estructural para este edificio residencial de mediana altura, incluyendo el diseño del sistema estructural principal, análisis de trayectoria de cargas y soluciones detalladas de enmarcado. El alcance se centró en desarrollar un sistema estructural seguro, eficiente y construible que soporte la disposición arquitectónica cumpliendo con el Código de Edificación de Florida y los requisitos de la jurisdicción local.",
      projectTypeEs: "Mediana altura",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmovniee900034r0x93jaqwhe",
      titleEs: "Residencias Meridian Park",
      descriptionEs: "Diseño estructural de un edificio residencial de mediana altura, centrado en ofrecer un sistema estructural seguro, eficiente y conforme al código. El proyecto incluye el desarrollo del sistema de carga principal, diseño de losas, estabilidad lateral y diseño detallado de conexiones. La coordinación con las disciplinas de arquitectura y MEP aseguró una disposición estructural optimizada manteniendo la constructibilidad y eficiencia de costos.",
      projectTypeEs: "Mediana altura",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmovn8v8z00014r0xn4zieiww",
      titleEs: "Sistema de Enmarcado Metálico Exterior",
      descriptionEs: "Se prepararon planos de taller para el sistema de enmarcado metálico exterior que soporta la fachada de un edificio comercial. El alcance incluyó planos de disposición detallados, dimensionamiento de miembros, detalles de conexión y anclaje a la estructura principal. El sistema fue diseñado para soportar elementos de revestimiento asegurando el cumplimiento con los códigos aplicables, requisitos de carga de viento y coordinación con otros sistemas del edificio.",
      projectTypeEs: "Planos de taller",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmovny4n900084r0xmx6724nq",
      titleEs: "Restaurante Urban Bites",
      descriptionEs: "Se proporcionaron servicios de diseño de ingeniería estructural y MEP para esta instalación de restaurante. El alcance incluyó el diseño estructural y la coordinación de los sistemas MEP, incluyendo extracción de cocina, plomería y sistemas eléctricos. El diseño fue desarrollado para soportar operaciones de cocina de alto rendimiento, comodidad del cliente y cumplimiento con todas las regulaciones de salud y seguridad aplicables.",
      projectTypeEs: "Comercial",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmovn9wxx00024r0xkp19n2nv",
      titleEs: "Escalera Interior y Baranda de Vidrio",
      descriptionEs: "Sistema estructural de escalera interior con una moderna baranda de vidrio, diseñado para garantizar seguridad, estabilidad y cumplimiento con el código. Este plano de taller se centra en el diseño estructural de la escalera, incluyendo enmarcado, soportes y detalles de conexión, coordinando con el sistema de baranda de vidrio para lograr un acabado limpio y contemporáneo que mejora la apertura y la luz natural.",
      projectTypeEs: "Planos de taller",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmnjsvmqq0001vj5kp2mx14bg",
      titleEs: "Residencia Anderson",
      descriptionEs: "Nuestra firma proporcionó servicios integrales de ingeniería estructural y MEP para esta residencia unifamiliar personalizada. El alcance del trabajo incluyó el diseño del sistema estructural, análisis de cargas y detallado, así como el diseño y coordinación de los sistemas mecánicos, eléctricos y de plomería. Se prestó especial atención a la integración del sistema, la constructibilidad y el cumplimiento con el Código de Edificación de Florida y los requisitos de la jurisdicción local, asegurando una solución de diseño cohesiva y eficiente alineada con la intención arquitectónica.",
      projectTypeEs: "Residencial",
      locationEs: "Ocala, Florida"
    },
    {
      id: "cmnjsvndw0002vj5kei5hcbog",
      titleEs: "Residencia Aponte",
      descriptionEs: "Se proporcionaron servicios de ingeniería estructural y diseño MEP para una nueva residencia personalizada. El trabajo incluyó el desarrollo del sistema estructural, preparación de documentos de construcción y coordinación de sistemas mecánicos, eléctricos y de plomería para soportar el diseño arquitectónico general y asegurar el cumplimiento del código. Diseño Arquitectónico por Pacheco Architecture, LLC.",
      projectTypeEs: "Residencial",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmnjsvrvg0009vj5k3i7zrcjf",
      titleEs: "One Bay",
      descriptionEs: "Se proporcionaron servicios de diseño de ingeniería estructural y MEP para este desarrollo residencial multifamiliar. Nuestro alcance incluyó el análisis y diseño estructural completo, así como la coordinación e integración de los sistemas mecánicos, eléctricos y de plomería (MEP) para asegurar el cumplimiento total con los códigos aplicables y los requisitos del proyecto. El diseño fue desarrollado para lograr eficiencia, funcionalidad y una coordinación perfecta con la visión arquitectónica.",
      projectTypeEs: "Residencial",
      locationEs: "Miami Beach, Florida"
    },
    {
      id: "cmovnr5xk00054r0xj9j4effo",
      titleEs: "Nuevo Lavadero de Autos",
      descriptionEs: "Se están proporcionando servicios de diseño de ingeniería estructural y MEP para esta instalación de lavadero de autos. Nuestro alcance incluye el análisis y diseño estructural completo, junto con la coordinación e integración de los sistemas mecánicos, eléctricos y de plomería (MEP), asegurando el cumplimiento total con los códigos aplicables y los requisitos operativos específicos para instalaciones de lavadero de autos. El diseño de ingeniería se ha desarrollado para alinearse con los requisitos funcionales del proyecto, brindando eficiencia, durabilidad y una coordinación perfecta entre todas las disciplinas.",
      projectTypeEs: "Comercial",
      locationEs: "Sunrise, Florida"
    },
    {
      id: "cmovnuwsl00064r0xow0tzta0",
      titleEs: "Lavadero de Autos Primecore",
      descriptionEs: "Se están proporcionando servicios de diseño estructural, MEP y arquitectónico para esta instalación de lavadero de autos. Nuestro alcance incluye el análisis y diseño estructural completo, junto con la coordinación e integración de los sistemas mecánicos, eléctricos y de plomería (MEP), asegurando el cumplimiento total con los códigos aplicables y los requisitos operativos específicos para instalaciones de lavadero de autos. Además, el diseño arquitectónico se está desarrollando para alinearse con las necesidades funcionales del proyecto, brindando una disposición eficiente, circulación óptima y un concepto general cohesivo. El proyecto se está diseñando para lograr eficiencia, durabilidad y una coordinación perfecta entre todas las disciplinas.",
      projectTypeEs: "Comercial",
      locationEs: "Hollywood, Florida"
    },
    {
      id: "cmovnwm2200074r0xf8g4lgw9",
      titleEs: "Almacén Logístico Summit",
      descriptionEs: "Se proporcionaron servicios de diseño de ingeniería estructural y MEP para esta instalación de almacén industrial. El alcance incluyó el diseño de enmarcado estructural y la coordinación de sistemas MEP para soportar las operaciones de almacenamiento y la adaptabilidad futura. El diseño fue desarrollado para acomodar espacios de gran altura, eficiencia operativa y cumplimiento con los códigos aplicables, incluyendo requisitos de protección contra incendios y seguridad de vida.",
      projectTypeEs: "Comercial",
      locationEs: "Hialeah, Florida"
    },
    {
      id: "cmnjsvr8c0008vj5kc3r6qucy",
      titleEs: "Residencia Miller",
      descriptionEs: "Se proporcionaron servicios de diseño de ingeniería estructural para esta residencia unifamiliar personalizada ubicada en la ciudad de Miami. Nuestro alcance incluyó el análisis y diseño estructural completo, desarrollado en cumplimiento con el Código de Edificación de Florida y las regulaciones locales. El proyecto fue diseñado para garantizar la eficiencia estructural, la seguridad y la integración perfecta con la visión arquitectónica.",
      projectTypeEs: "Residencial",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmnjsvpb20005vj5k02susz3v",
      titleEs: "Residencia Collins",
      descriptionEs: "Servicios de diseño estructural para una nueva residencia de lujo de dos pisos. El alcance incluye el desarrollo del sistema estructural principal y el marco general del edificio, en cumplimiento con el Código de Edificación de Florida. El proyecto también incorpora soluciones estructurales para características exteriores como balcones, terrazas y el área de la piscina, asegurando una integración perfecta con el diseño arquitectónico y el rendimiento general de la residencia.",
      projectTypeEs: "Residencial",
      locationEs: "Pinecrest, Florida"
    },
    {
      id: "cmnjsvqla0007vj5kgzkf2chc",
      titleEs: "Residencia Alvarez",
      descriptionEs: "Se proporcionó el diseño de ingeniería estructural para esta residencia personalizada de alta gama ubicada en Miami. El alcance del trabajo incluyó el desarrollo del sistema estructural principal, diseño detallado de enmarcado y coordinación con la disposición arquitectónica para lograr espacios abiertos y una estética moderna. Se hizo hincapié en la integridad estructural, la constructibilidad y el rendimiento a largo plazo, en pleno cumplimiento con el Código de Edificación de Florida y los requisitos de la jurisdicción local.",
      projectTypeEs: "Residencial",
      locationEs: "Florida"
    },
    {
      id: "cmnjsvpy70006vj5kt8d0q2s9",
      titleEs: "Residencia Fernandez",
      descriptionEs: "Se proporcionaron servicios de ingeniería estructural y MEP para un proyecto de adición y renovación residencial. El alcance incluye el diseño y análisis de una nueva estructura de casa de piscina, así como modificaciones a la residencia existente, incluyendo mejoras en el área de entrada principal y otras mejoras interiores y exteriores. Todos los sistemas fueron diseñados de acuerdo con los códigos aplicables y los requisitos del proyecto. Diseño Arquitectónico por Pacheco Architecture, LLC.",
      projectTypeEs: "Residencial",
      locationEs: "Pinecrest, Florida"
    },
    {
      id: "cmnjsvm3a0000vj5k74uven7r",
      titleEs: "Residencia Bennet Waterfront",
      descriptionEs: "Se proporcionaron servicios de ingeniería estructural para esta elevada residencia unifamiliar ubicada en Islamorada, Cayos de Florida. El alcance del trabajo incluyó el diseño del sistema estructural elevado, cimentación y estructura soportada por pilotes, y análisis de cargas considerando las condiciones de viento y marea costeras. El diseño fue desarrollado para garantizar la resiliencia, durabilidad y el cumplimiento total con el Código de Edificación de Florida, con especial atención a la exposición costera y los requisitos de zona de inundación.",
      projectTypeEs: "Residencial",
      locationEs: "Islamorada, Florida"
    },
    {
      id: "cmnjsvufu000dvj5kprg4b2qj",
      titleEs: "Residencia Mitchell Tropical Modern",
      descriptionEs: "Se proporcionaron servicios de diseño de ingeniería estructural para esta residencia unifamiliar personalizada ubicada en la ciudad de Miami. Nuestro alcance incluyó el análisis y diseño estructural completo, desarrollado en cumplimiento con el Código de Edificación de Florida y las regulaciones locales. El proyecto fue diseñado para garantizar la eficiencia estructural, la seguridad y la integración perfecta con la visión arquitectónica.",
      projectTypeEs: "Residencial",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmnjsvtss000cvj5kift6bfe8",
      titleEs: "Pérgola Moderna",
      descriptionEs: "Se proporcionaron servicios de ingeniería estructural para esta estructura de pérgola de aluminio personalizada. El alcance incluyó el diseño del marco de soporte, detallado de conexiones y análisis de cargas para condiciones de viento y ambientales. La estructura fue diseñada para garantizar estabilidad, durabilidad y cumplimiento con el Código de Edificación de Florida, manteniendo una apariencia arquitectónica limpia y moderna.",
      projectTypeEs: "Planos de taller",
      locationEs: "North Lauderdale, Florida"
    },
    {
      id: "cmnjsvonx0004vj5kibc8scf3",
      titleEs: "Residencia Morgan",
      descriptionEs: "Se proporcionaron servicios de ingeniería estructural para una nueva residencia personalizada de dos pisos. El alcance incluyó el diseño y análisis del sistema estructural principal, preparación de documentos de construcción estructural y coordinación con el diseño arquitectónico para garantizar la estabilidad, el rendimiento y el cumplimiento de los códigos de edificación aplicables.",
      projectTypeEs: "Residencial",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmnjsvsil000avj5kp3u95c55",
      titleEs: "Pabellón de Vida al Aire Libre",
      descriptionEs: "Se proporcionaron servicios de ingeniería estructural para esta área de estar cubierta al aire libre en Miami. El alcance incluyó el diseño de la estructura del techo, el sistema de enmarcado de soporte y los detalles de conexión a la estructura existente. El diseño fue desarrollado para soportar las condiciones locales de viento, garantizando durabilidad, constructibilidad y cumplimiento total con el Código de Edificación de Florida.",
      projectTypeEs: "Planos de taller",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmnjsvt5r000bvj5kcejs91vy",
      titleEs: "Edificio Residencial Moderno de Mediana Altura",
      descriptionEs: "Se proporcionaron servicios de ingeniería estructural para este edificio residencial de mediana altura, incluyendo el diseño del sistema estructural principal, análisis de trayectoria de cargas y soluciones detalladas de enmarcado. El alcance se centró en desarrollar un sistema estructural seguro, eficiente y construible que soporte la disposición arquitectónica cumpliendo con el Código de Edificación de Florida y los requisitos de la jurisdicción local.",
      projectTypeEs: "Mediana altura",
      locationEs: "Miami, Florida"
    },
    {
      id: "cmoakuhqa00014rfff847pxkv",
      titleEs: "Parkside Townhomes",
      descriptionEs: "Se proporcionaron servicios de ingeniería para este moderno desarrollo residencial multifamiliar, incluyendo el diseño estructural completo y la coordinación MEP. El proyecto fue cuidadosamente desarrollado para optimizar la eficiencia, funcionalidad y constructibilidad, manteniendo la alineación con la visión arquitectónica y cumpliendo con todos los requisitos aplicables del Código de Edificación de Florida.",
      projectTypeEs: "Mediana altura",
      locationEs: "Miami, Florida"
    }
  ];

  for (const update of updates) {
    await prisma.project.update({
      where: { id: update.id },
      data: {
        titleEs: update.titleEs,
        descriptionEs: update.descriptionEs,
        projectTypeEs: update.projectTypeEs,
        locationEs: update.locationEs
      }
    });
    console.log(`Updated project: ${update.titleEs}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
