const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const projects = [
  {
    title: "High-End Custom Residence",
    titleEs: "Residencia de Lujo Personalizada",
    slug: "high-end-custom-residence-miami",
    description: "Structural engineering design was provided for this high-end custom residence located in Miami. The scope of work included the development of the primary structural system, detailed framing design, and coordination with the architectural layout to achieve open spaces and modern aesthetics. Emphasis was placed on structural integrity, constructability, and long-term performance, in full compliance with the Florida Building Code and local jurisdiction requirements.",
    descriptionEs: "Se proporcionó el diseño de ingeniería estructural para esta residencia personalizada de lujo ubicada en Miami. El alcance del trabajo incluyó el desarrollo del sistema estructural primario, diseño detallado de entramados y coordinación con la disposición arquitectónica para lograr espacios abiertos y una estética moderna. Se hizo hincapié en la integridad estructural, la constructibilidad y el rendimiento a largo plazo, en total cumplimiento con el Código de Construcción de Florida y los requisitos locales.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Miami, FL",
    locationEs: "Miami, FL",
    coverImage: "/portfolio/luxury-residence.jpg",
    gallery: "[]",
    order: 1
  },
  {
    title: "Custom Single-Family Residence",
    titleEs: "Residencia Unifamiliar Personalizada",
    slug: "custom-single-family-residence-mep",
    description: "Our firm provided full structural and MEP engineering services for this custom single-family residence. The scope of work included structural system design, load analysis, and detailing, as well as the design and coordination of mechanical, electrical, and plumbing systems. Special attention was given to system integration, constructability, and compliance with the Florida Building Code and local jurisdiction requirements, ensuring a cohesive and efficient design solution aligned with the architectural intent.",
    descriptionEs: "Nuestra firma proporcionó servicios completos de ingeniería estructural y MEP para esta residencia unifamiliar personalizada. El alcance del trabajo incluyó el diseño del sistema estructural, análisis de cargas y detallado, así como el diseño y coordinación de los sistemas mecánicos, eléctricos y de plomería. Se prestó especial atención a la integración de sistemas, constructibilidad y cumplimiento con el Código de Construcción de Florida.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Florida",
    locationEs: "Florida",
    coverImage: "/portfolio/single-family-residence-1.jpg",
    gallery: JSON.stringify([{ url: "/portfolio/single-family-residence-2.jpg", alt: "Gallery Image" }]),
    order: 2
  },
  {
    title: "Aponte Residence",
    titleEs: "Residencia Aponte",
    slug: "aponte-residence",
    description: "Provided structural engineering and MEP design services for a new custom residence. The work included development of the structural system, preparation of construction documents, and coordination of mechanical, electrical, and plumbing systems to support the overall architectural design and ensure code compliance.",
    descriptionEs: "Se proporcionaron servicios de ingeniería estructural y diseño MEP para una nueva residencia personalizada. El trabajo incluyó el desarrollo del sistema estructural, preparación de documentos de construcción y coordinación de sistemas mecánicos, eléctricos y de plomería.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Miami, FL",
    locationEs: "Miami, FL",
    coverImage: "/portfolio/aponte-residence.jpg",
    gallery: "[]",
    order: 3
  },
  {
    title: "Elevated Single-Family Residence",
    titleEs: "Residencia Unifamiliar Elevada",
    slug: "elevated-single-family-islamorada",
    description: "Structural engineering services were provided for this elevated single-family residence located in Islamorada, Florida Keys. The scope of work included the design of the elevated structural system, foundation and pile-supported structure, and load analysis considering coastal wind and flood conditions. The design was developed to ensure resilience, durability, and full compliance with the Florida Building Code, with special attention to coastal exposure and flood zone requirements.",
    descriptionEs: "Se proporcionaron servicios de ingeniería estructural para esta residencia unifamiliar elevada ubicada en Islamorada, Cayos de Florida. El alcance incluyó el diseño del sistema estructural elevado, cimentación y estructura apoyada en pilotes, y análisis de carga considerando condiciones costeras de viento e inundación.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Islamorada, FL",
    locationEs: "Islamorada, FL",
    coverImage: "/portfolio/miami-single-family-1.jpg", 
    gallery: JSON.stringify([{ url: "/portfolio/miami-single-family-2.jpg", alt: "Gallery" }]),
    order: 4
  },
  {
    title: "Two-Story Luxury Residence",
    titleEs: "Residencia de Lujo de Dos Plantas",
    slug: "two-story-luxury-residence",
    description: "Structural design services for a new two-story luxury residence. The scope includes the development of the primary structural system and overall building framework, in compliance with the Florida Building Code. The project also incorporates structural solutions for outdoor features such as balconies, terraces, and the pool area, ensuring seamless integration with the architectural design and overall performance of the residence.",
    descriptionEs: "Servicios de diseño estructural para una nueva residencia de lujo de dos plantas. El alcance incluye el desarrollo del sistema estructural primario y el marco general del edificio, en cumplimiento con el Código de Construcción de Florida.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Florida",
    locationEs: "Florida",
    coverImage: "/portfolio/two-story-residence-1.jpg",
    gallery: JSON.stringify([{ url: "/portfolio/two-story-residence-2.jpg", alt: "Gallery" }, { url: "/portfolio/two-story-residence-3.jpg", alt: "Gallery" }]),
    order: 5
  },
  {
    title: "Fernandez Residence",
    titleEs: "Residencia Fernandez",
    slug: "fernandez-residence",
    description: "Structural and MEP engineering services were provided for a residential addition and renovation project. The scope includes the design and analysis of a new pool house structure, as well as modifications to the existing residence, including enhancements at the main entry area and other interior and exterior improvements. All systems were designed in accordance with applicable codes and project requirements.",
    descriptionEs: "Se proporcionaron servicios de ingeniería estructural y MEP para un proyecto de adición y renovación residencial. El alcance incluye el diseño y análisis de una nueva estructura de casa de piscina, así como modificaciones a la residencia existente.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Pinecrest, FL",
    locationEs: "Pinecrest, FL",
    coverImage: "/portfolio/fernandez-residence.jpg",
    gallery: "[]",
    order: 6
  },
  {
    title: "Waterfront Custom Residence",
    titleEs: "Residencia Personalizada Frente al Mar",
    slug: "waterfront-custom-residence-miami",
    description: "Structural engineering services were provided for this waterfront custom residence located in Biscayne Bay, Miami. The scope included the design of the structural system, foundation solutions, and load analysis considering coastal wind and exposure conditions. Special attention was given to durability, structural performance, and integration with the architectural layout, ensuring full compliance with the Florida Building Code and local requirements.",
    descriptionEs: "Servicios de ingeniería estructural para esta residencia personalizada frente al mar en Biscayne Bay, Miami. El alcance incluyó el diseño del sistema estructural, soluciones de cimentación y análisis de carga considerando vientos costeros.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Miami, FL",
    locationEs: "Miami, FL",
    coverImage: "/portfolio/waterfront-residence-1.jpg",
    gallery: JSON.stringify([{ url: "/portfolio/waterfront-residence-2.png", alt: "Gallery" }]),
    order: 7
  },
  {
    title: "Two-Story Custom Residence",
    titleEs: "Residencia Personalizada de Dos Plantas",
    slug: "two-story-custom-residence",
    description: "Structural engineering services were provided for a new two-story custom residence. The scope included the design and analysis of the primary structural system, preparation of structural construction documents, and coordination with the architectural design to ensure stability, performance, and compliance with applicable building codes.",
    descriptionEs: "Servicios de ingeniería estructural para una nueva residencia personalizada de dos plantas. El alcance incluyó el diseño y análisis del sistema estructural primario y preparación de documentos de construcción.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Florida",
    locationEs: "Florida",
    coverImage: "/portfolio/miami-residence.jpg",
    gallery: "[]",
    order: 8
  },
  {
    title: "City of Miami Custom Residence",
    titleEs: "Residencia Personalizada en la Ciudad de Miami",
    slug: "city-of-miami-custom-residence",
    description: "Structural engineering design services were provided for this custom single-family residence located in the City of Miami. Our scope included the complete structural analysis and design, developed in compliance with the Florida Building Code and local regulations. The project was designed to ensure structural efficiency, safety, and seamless integration with the architectural vision.",
    descriptionEs: "Servicios de diseño de ingeniería estructural para esta residencia unifamiliar personalizada en la Ciudad de Miami. El alcance incluyó el análisis y diseño estructural completo en cumplimiento con el Código de Florida.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Miami, FL",
    locationEs: "Miami, FL",
    coverImage: null, 
    gallery: "[]",
    order: 9
  },
  {
    title: "Multi-Family Residential Development",
    titleEs: "Desarrollo Residencial Multifamiliar",
    slug: "multi-family-residential-development",
    description: "Structural and MEP engineering design services were provided for this multi-family residential development. Our scope included the complete structural analysis and design, as well as the coordination and integration of mechanical, electrical, and plumbing (MEP) systems to ensure full compliance with applicable codes and project requirements. The design was developed to achieve efficiency, functionality, and seamless coordination with the architectural vision.",
    descriptionEs: "Servicios de diseño de ingeniería estructural y MEP para este desarrollo residencial multifamiliar. El alcance incluyó el análisis estructural completo y la integración de sistemas mecánicos, eléctricos y de plomería.",
    projectType: "commercial",
    projectTypeEs: "comercial",
    location: "Florida",
    locationEs: "Florida",
    coverImage: "/portfolio/multi-family-development.jpg",
    gallery: "[]",
    order: 10
  },
  {
    title: "Covered Outdoor Living Area",
    titleEs: "Área de Estar Exterior Cubierta",
    slug: "covered-outdoor-living-area-miami",
    description: "Structural engineering services were provided for this covered outdoor living area in Miami. The scope included the design of the roof structure, supporting framing system, and connection details to the existing structure. The design was developed to withstand local wind conditions while ensuring durability, constructability, and full compliance with the Florida Building Code.",
    descriptionEs: "Servicios de ingeniería estructural para esta área de estar exterior cubierta en Miami. El alcance incluyó el diseño de la estructura del techo, sistema de entramado y detalles de conexión.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Miami, FL",
    locationEs: "Miami, FL",
    coverImage: "/portfolio/covered-outdoor-living.jpg",
    gallery: "[]",
    order: 11
  },
  {
    title: "Modern Multi-Family Development",
    titleEs: "Desarrollo Multifamiliar Moderno",
    slug: "modern-multi-family-development",
    description: "Engineering services were provided for this modern multi-family residential development, including full Structural design and MEP coordination. The project was carefully developed to optimize efficiency, functionality, and constructability, while maintaining alignment with the architectural vision and meeting all applicable Florida Building Code requirements.",
    descriptionEs: "Servicios de ingeniería para este desarrollo residencial multifamiliar moderno, incluyendo diseño estructural completo y coordinación MEP.",
    projectType: "commercial",
    projectTypeEs: "comercial",
    location: "Florida",
    locationEs: "Florida",
    coverImage: "/portfolio/modern-multi-family-1.jpg",
    gallery: JSON.stringify([{ url: "/portfolio/modern-multi-family-2.png", alt: "Gallery" }]),
    order: 12
  },
  {
    title: "Custom Aluminum Pergola",
    titleEs: "Pérgola de Aluminio Personalizada",
    slug: "custom-aluminum-pergola",
    description: "Structural engineering services were provided for this custom aluminum pergola structure. The scope included the design of the supporting frame, connection detailing, and load analysis for wind and environmental conditions. The structure was engineered to ensure stability, durability, and compliance with the Florida Building Code, while maintaining a clean and modern architectural appearance.",
    descriptionEs: "Servicios de ingeniería estructural para esta estructura de pérgola de aluminio personalizada. El alcance incluyó el diseño del marco de soporte, detalles de conexión y análisis de carga.",
    projectType: "residential",
    projectTypeEs: "residencial",
    location: "Florida",
    locationEs: "Florida",
    coverImage: "/portfolio/aluminum-pergola.jpg",
    gallery: "[]",
    order: 13
  },
  {
    title: "Mid-Rise Residential Building",
    titleEs: "Edificio Residencial de Mediana Altura",
    slug: "mid-rise-residential-building",
    description: "Structural engineering services were provided for this mid-rise residential building, including the design of the primary structural system, load path analysis, and detailed framing solutions. The scope focused on developing a safe, efficient, and constructible structural system that supports the architectural layout while complying with the Florida Building Code and local jurisdiction requirements.",
    descriptionEs: "Servicios de ingeniería estructural para este edificio residencial de mediana altura, incluyendo el diseño del sistema estructural primario.",
    projectType: "commercial",
    projectTypeEs: "comercial",
    location: "Florida",
    locationEs: "Florida",
    coverImage: "/portfolio/mid-rise-residential.jpg",
    gallery: JSON.stringify([{ url: "/portfolio/mid-rise-residential-2.jpg", alt: "Gallery" }]),
    order: 14
  }
];

async function main() {
  console.log("Seeding portfolio projects with Spanish translations...");
  await prisma.project.deleteMany({});
  console.log("Cleared existing projects");

  for (const proj of projects) {
    if (!proj.coverImage) {
      proj.coverImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format"; // fallback
    }
    await prisma.project.create({
      data: proj
    });
    console.log(`Added ${proj.title}`);
  }
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
