export const FALLBACK_PROJECTS = [
  {
    _id: "p1",
    id: "p1",
    title: "The Glass Pavilion",
    slug: { current: "glass-pavilion" },
    projectType: "residential",
    completionYear: 2025,
    location: "Miami, Florida",
    featured: true,
    coverImageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format",
    description: "A cantilevered modernist home overlooking Biscayne Bay, featuring floor-to-ceiling smart glass.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    technicalSheet: "Lot Size: 1.2 Acres\nTotal Built: 12,500 sqft\nFloors: 3",
    materials: ["Architectural Concrete", "Low-E Glass", "Brazilian Teak"],
    testimonial: { quote: "Vertex delivered a masterpiece.", author: "Private Client", role: "Owner" },
    gallery: [
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format", alt: "Living Room" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format", alt: "Exterior" }
    ]
  },
  {
    _id: "p2",
    id: "p2",
    title: "100 Brickell Tower",
    slug: { current: "100-brickell" },
    projectType: "commercial",
    completionYear: 2024,
    location: "Miami, Florida",
    featured: true,
    coverImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format",
    description: "A 40-story Class A commercial tower redefining the Miami skyline.",
    gallery: []
  },
  {
    _id: "p3",
    id: "p3",
    title: "Aspen Retreat",
    slug: { current: "aspen-retreat" },
    projectType: "residential",
    completionYear: 2023,
    location: "Aspen, Colorado",
    featured: false,
    coverImageUrl: "https://images.unsplash.com/photo-1542314831-c6a4d14effb2?w=1600&auto=format",
    description: "A luxury alpine retreat.",
    gallery: []
  }
];

export const FALLBACK_SERVICES = [
  { 
    _id: "s1", 
    id: "s1",
    title: "Custom Architecture", 
    slug: { current: "custom-architecture" }, 
    shortDescription: "Complete architectural design from concept through construction documents, tailored to your vision and site.",
    coverImageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format",
    keyDeliverables: ["Site Analysis & Zoning", "Schematic Design", "Design Development", "Construction Documents", "Bidding & Negotiation"]
  },
  { 
    _id: "s2", 
    id: "s2",
    title: "Construction Management", 
    slug: { current: "construction-management" }, 
    shortDescription: "Full-service luxury execution — new builds and major structural developments with uncompromising quality.",
    coverImageUrl: "https://images.unsplash.com/photo-1541888081198-bc4a7e9da1ca?w=1600&auto=format",
    keyDeliverables: ["Pre-Construction Cost Estimating", "Critical Path Scheduling", "Subcontractor Selection", "On-Site Supervision", "Project Closeout"]
  },
  { 
    _id: "s3", 
    id: "s3",
    title: "High-End Renovation", 
    slug: { current: "high-end-renovation" }, 
    shortDescription: "Surgical renovations that preserve foundational architecture while elevating function, finish, and livability.",
    coverImageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&auto=format",
    keyDeliverables: ["Structural Feasibility", "Demolition Planning", "Historical Preservation", "MEP Updates", "Finish Enhancements"]
  },
  { 
    _id: "s4", 
    id: "s4",
    title: "Interior Design", 
    slug: { current: "interior-design" }, 
    shortDescription: "Space planning, finish specification, furniture procurement, and art curation for the full interior experience.",
    coverImageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&auto=format",
    keyDeliverables: ["Space Planning", "Material & Finish Sourcing", "Custom Millwork Design", "Furniture Procurement", "Art Selection & Styling"]
  },
];

export const FALLBACK_TEAM = [
  { _id: '1', name: 'James Vertex', role: 'Principal Architect', bio: 'With over 20 years of experience designing luxury spaces, James leads the firm\'s creative vision.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { _id: '2', name: 'Sarah Miller', role: 'Director of Construction', bio: 'Sarah ensures every line on the blueprint translates perfectly into reality with uncompromising quality.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { _id: '3', name: 'David Chen', role: 'Lead Interior Designer', bio: 'David brings spaces to life with curated materials, bespoke furniture, and an eye for light.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
];
