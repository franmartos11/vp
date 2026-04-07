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
    title: "STRUCTURAL ENGINEERING", 
    slug: { current: "structural-engineering" }, 
    shortDescription: "We provide comprehensive structural engineering services for residential and commercial projects, including single- and multi-family developments, as well as low- and mid-rise buildings.",
    coverImageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format",
    keyDeliverables: ["Structural System Design", "Shop Drawings Preparation", "Code-Compliant Solutions", "Constructability Optimization"]
  },
  { 
    _id: "s2", 
    id: "s2",
    title: "BUILDING RECERTIFICATIONS", 
    slug: { current: "building-recertifications" }, 
    shortDescription: "Building recertifications are required to ensure that existing structures remain safe for continued occupancy and comply with current regulations.",
    coverImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format",
    keyDeliverables: ["Structural & Electrical Inspections", "Photometric & Thermographic Studies", "Drone Facade/Roof Inspections", "Code-Compliant Reporting"]
  },
  { 
    _id: "s3", 
    id: "s3",
    title: "STRUCTURAL INSPECTIONS", 
    slug: { current: "structural-inspections" }, 
    shortDescription: "We provide structural inspection services throughout the construction process to verify that the work is performed in accordance with approved plans and applicable codes.",
    coverImageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format",
    keyDeliverables: ["Construction Phase Inspections", "Special Inspector Duties", "Threshold Building Inspections", "Certification Letters & Reports"]
  },
  { 
    _id: "s4", 
    id: "s4",
    title: "MEP ENGINEERING", 
    slug: { current: "mep-engineering" }, 
    shortDescription: "Comprehensive MEP engineering services for residential and commercial projects, including the design and coordination of mechanical, electrical, and plumbing systems.",
    coverImageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format",
    keyDeliverables: ["Mechanical & Electrical Design", "Plumbing Systems Coordination", "Fire Sprinkler & Alarm Design", "Subcontractor Management"]
  },
];

export const FALLBACK_TEAM = [
  { _id: '1', name: 'James Vertex', role: 'Principal Architect', bio: 'With over 20 years of experience designing luxury spaces, James leads the firm\'s creative vision.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { _id: '2', name: 'Sarah Miller', role: 'Director of Construction', bio: 'Sarah ensures every line on the blueprint translates perfectly into reality with uncompromising quality.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { _id: '3', name: 'David Chen', role: 'Lead Interior Designer', bio: 'David brings spaces to life with curated materials, bespoke furniture, and an eye for light.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
];
