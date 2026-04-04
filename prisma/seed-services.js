const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up old services...");
  await prisma.service.deleteMany();

  console.log("Seeding new services...");

  const services = [
    {
      title: "STRUCTURAL ENGINEERING",
      titleEs: "INGENIERÍA ESTRUCTURAL",
      slug: "structural-engineering",
      shortDescription: "We provide comprehensive structural engineering services for residential and commercial projects, including single- and multi-family developments, as well as low- and mid-rise buildings.",
      shortDescriptionEs: "Proveemos servicios integrales de ingeniería estructural para proyectos residenciales y comerciales, incluyendo desarrollos unifamiliares y multifamiliares, así como edificios de baja y mediana altura.",
      fullDescription: "We provide comprehensive structural engineering services for residential and commercial projects, including single- and multi-family developments, as well as low- and mid-rise buildings. Our scope encompasses the design and detailing of structural systems, along with the preparation of high-quality shop drawings for elements such as stairs, railings, terraces, pergolas, trellis, fences, canopies, and other structural components.\n\nOur team is committed to delivering precise, code-compliant solutions that prioritize constructability, efficiency, and long-term performance, ensuring seamless coordination throughout the design and construction process.",
      fullDescriptionEs: "Proveemos servicios integrales de ingeniería estructural para proyectos residenciales y comerciales, incluyendo desarrollos unifamiliares y multifamiliares, así como edificios de baja y mediana altura. Nuestro alcance abarca el diseño y detallado de sistemas estructurales, junto con la preparación de planos de taller de alta calidad para elementos como escaleras, barandillas, terrazas, pérgolas, enrejados, cercas, marquesinas y otros componentes estructurales.\n\nNuestro equipo está comprometido a entregar soluciones precisas y que cumplan con los códigos, priorizando la constructabilidad, la eficiencia y el rendimiento a largo plazo, asegurando una coordinación perfecta durante todo el proceso de diseño y construcción.",
      coverImage: "https://images.unsplash.com/photo-1541888081198-bc4a7e9da1ca?w=1600&auto=format",
      keyDeliverables: JSON.stringify([
        "Structural System Design",
        "Shop Drawings Preparation",
        "Code-Compliant Solutions",
        "Constructability Optimization"
      ]),
      keyDeliverablesEs: JSON.stringify([
        "Diseño de Sistemas Estructurales",
        "Preparación de Planos de Taller",
        "Soluciones que Cumplen con los Códigos",
        "Optimización de la Constructabilidad"
      ]),
      order: 1
    },
    {
      title: "BUILDING RECERTIFICATIONS",
      titleEs: "RECERTIFICACIONES DE EDIFICIOS",
      slug: "building-recertifications",
      shortDescription: "Building recertifications are required to ensure that existing structures remain safe for continued occupancy and comply with current regulations.",
      shortDescriptionEs: "Las recertificaciones de edificios son requeridas para asegurar que las estructuras existentes permanezcan seguras para su ocupación continua y cumplan con las regulaciones actuales.",
      fullDescription: "Building recertifications are required to ensure that existing structures remain safe for continued occupancy and comply with current regulations. These inspections are typically mandated at specific milestones such as 25, 30, 40 years, and every 10 years thereafter, depending on the building’s location and occupancy classification.\n\nOur firm provides comprehensive structural and electrical recertification services for a wide range of properties, including low- and mid-rise residential and commercial buildings. We perform detailed evaluations to identify any conditions that may affect safety and performance, including structural and electrical inspections, as well as advanced methods such as photometric and thermographic studies. We also utilize drone technology to efficiently inspect hard-to-access areas such as roofs, façades, and elevated building components.\n\nOur goal is to provide accurate, clear, and code-compliant reports, helping property owners, associations, and developers navigate the recertification process efficiently while ensuring the long-term safety and reliability of their buildings.",
      fullDescriptionEs: "Las recertificaciones de edificios son requeridas para asegurar que las estructuras existentes permanezcan seguras para su ocupación continua y cumplan con las regulaciones actuales. Estas inspecciones suelen ser exigidas en hitos específicos como a los 25, 30, 40 años, y cada 10 años en adelante, dependiendo de la ubicación del edificio y la clasificación de ocupación.\n\nNuestra firma provee servicios integrales de recertificación estructural y eléctrica para una amplia gama de propiedades, incluyendo edificios residenciales y comerciales de baja y mediana altura. Realizamos evaluaciones detalladas para identificar condiciones que puedan afectar la seguridad y el desempeño, incluyendo inspecciones estructurales y eléctricas, así como métodos avanzados como estudios fotométricos y termográficos. También utilizamos tecnología de drones para inspeccionar de manera eficiente áreas de difícil acceso como techos, fachadas y componentes elevados de edificios.\n\nNuestro objetivo es proporcionar informes precisos, claros y que cumplan con los códigos, ayudando a propietarios, asociaciones y desarrolladores a navegar el proceso de recertificación de manera eficiente, garantizando la seguridad y confiabilidad a largo plazo de sus edificios.",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format",
      keyDeliverables: JSON.stringify([
        "Structural & Electrical Inspections",
        "Photometric & Thermographic Studies",
        "Drone Facade/Roof Inspections",
        "Code-Compliant Reporting"
      ]),
      keyDeliverablesEs: JSON.stringify([
        "Inspecciones Estructurales y Eléctricas",
        "Estudios Fotométricos y Termográficos",
        "Inspecciones de Fachada/Techo con Drones",
        "Informes que Cumplen con los Códigos"
      ]),
      order: 2
    },
    {
      title: "STRUCTURAL INSPECTIONS",
      titleEs: "INSPECCIONES ESTRUCTURALES",
      slug: "structural-inspections",
      shortDescription: "We provide structural inspection services throughout the construction process to verify that the work is performed in accordance with approved plans and applicable codes.",
      shortDescriptionEs: "Proveemos servicios de inspección estructural durante todo el proceso de construcción para verificar que el trabajo se realice de acuerdo con los planos aprobados y los códigos aplicables.",
      fullDescription: "We provide structural inspection services throughout the construction process for projects designed by our firm or others. Our inspections verify that the work is performed in accordance with approved plans, design intent, and applicable codes, ensuring proper execution and compliance at each stage of construction.\n\nOur services may include Special Inspector duties and Threshold Building inspections, in accordance with Florida Building Code requirements. We prepare clear, detailed inspection reports and certification letters ready for submission to the corresponding authorities, supporting a smooth and efficient permitting and approval process.",
      fullDescriptionEs: "Proveemos servicios de inspección estructural durante todo el proceso de construcción para proyectos diseñados por nuestra firma o terceros. Nuestras inspecciones verifican que el trabajo se realice de acuerdo con los planos aprobados, la intención del diseño y los códigos aplicables, asegurando una ejecución adecuada y el cumplimiento en cada etapa de la construcción.\n\nNuestros servicios pueden incluir labores de Inspector Especial e inspecciones de Edificios de Umbral (Threshold Building), de acuerdo con los requisitos del Código de Construcción de Florida. Preparamos informes de inspección claros y detallados, así como cartas de certificación listas para ser presentadas a las autoridades correspondientes, apoyando un proceso de permisos y aprobaciones fluido y eficiente.",
      coverImage: "https://images.unsplash.com/photo-1502444330042-d1a1ddf971b1?w=1600&auto=format",
      keyDeliverables: JSON.stringify([
        "Construction Phase Inspections",
        "Special Inspector Duties",
        "Threshold Building Inspections",
        "Certification Letters & Reports"
      ]),
      keyDeliverablesEs: JSON.stringify([
        "Inspecciones en Fase de Construcción",
        "Deberes de Inspector Especial",
        "Inspecciones de Edificios de Umbral (Threshold)",
        "Cartas de Certificación e Informes"
      ]),
      order: 3
    },
    {
      title: "MEP ENGINEERING",
      titleEs: "INGENIERÍA MEP",
      slug: "mep-engineering",
      shortDescription: "Comprehensive MEP engineering services for residential and commercial projects, including the design and coordination of mechanical, electrical, and plumbing systems.",
      shortDescriptionEs: "Servicios integrales de ingeniería MEP para proyectos residenciales y comerciales, incluyendo el diseño y coordinación de sistemas mecánicos, eléctricos y de plomería.",
      fullDescription: "We provide comprehensive MEP engineering services for residential and commercial projects, including the design and coordination of mechanical, electrical, and plumbing systems. Our approach focuses on delivering efficient, code-compliant solutions that integrate seamlessly with the architectural and structural design.\n\nOur scope also includes fire protection systems, such as fire sprinkler and fire alarm design, ensuring full compliance with applicable codes and life safety requirements. For services outside our direct scope, our firm coordinates and manages specialized subcontractors, ensuring a seamless and fully integrated project delivery.",
      fullDescriptionEs: "Proveemos servicios integrales de ingeniería MEP para proyectos residenciales y comerciales, incluyendo el diseño y coordinación de sistemas mecánicos, eléctricos y de plomería. Nuestro enfoque se centra en ofrecer soluciones eficientes, que cumplan con los códigos y que se integren perfectamente con el diseño arquitectónico y estructural.\n\nNuestro alcance también incluye sistemas de protección contra incendios, tales como diseño de rociadores y alarmas contra incendio, asegurando el pleno cumplimiento de los códigos aplicables y requisitos de seguridad de vida. Para servicios fuera de nuestro alcance directo, nuestra firma coordina y gestiona subcontratistas especializados, asegurando una entrega de proyecto fluida y totalmente integrada.",
      coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format",
      keyDeliverables: JSON.stringify([
        "Mechanical & Electrical Design",
        "Plumbing Systems Coordination",
        "Fire Sprinkler & Alarm Design",
        "Subcontractor Management"
      ]),
      keyDeliverablesEs: JSON.stringify([
        "Diseño Mecánico y Eléctrico",
        "Coordinación de Sistemas de Plomería",
        "Diseño de Rociadores y Alarmas de Incendio",
        "Gestión de Subcontratistas"
      ]),
      order: 4
    }
  ];

  for (const service of services) {
    await prisma.service.create({
      data: service
    });
    console.log(`Created service: ${service.title}`);
  }

  console.log("Services seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
