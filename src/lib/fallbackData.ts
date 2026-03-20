export const FALLBACK_PROJECTS = [
  { 
    _id: '1', 
    title: 'Mountain View Residence', 
    slug: { current: 'mountain-view' }, 
    projectType: 'residential', 
    completionYear: 2024, 
    location: 'Asheville, NC', 
    coverImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format',
    seoDescription: 'A stunning modern residential project nestled in the mountains.',
    description: null, // we can skip portable text for fallback or render simple strings
    gallery: []
  },
  { 
    _id: '2', 
    title: 'The Brickell Tower', 
    slug: { current: 'brickell-tower' }, 
    projectType: 'commercial', 
    completionYear: 2023, 
    location: 'Miami, FL', 
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format',
    seoDescription: 'A defining commercial architecture project in the Miami skyline.',
    gallery: []
  },
  { 
    _id: '3', 
    title: 'Villa Blanca', 
    slug: { current: 'villa-blanca' }, 
    projectType: 'renovation', 
    completionYear: 2025, 
    location: 'Palm Beach, FL', 
    coverImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format',
    seoDescription: 'High-end surgical renovation of a classic Palm Beach property.',
    gallery: []
  },
  { 
    _id: '4', 
    title: 'Silicon Hub', 
    slug: { current: 'silicon-hub' }, 
    projectType: 'commercial', 
    completionYear: 2024, 
    location: 'Austin, TX', 
    coverImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format' 
  },
  { 
    _id: '5', 
    title: 'Oceanfront Penthouse', 
    slug: { current: 'oceanfront' }, 
    projectType: 'interior', 
    completionYear: 2024, 
    location: 'Miami, FL', 
    coverImageUrl: 'https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=900&auto=format' 
  },
];

export const FALLBACK_TEAM = [
  { _id: '1', name: 'James Vertex', role: 'Principal Architect', bio: 'With over 20 years of experience designing luxury spaces, James leads the firm\'s creative vision.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { _id: '2', name: 'Sarah Miller', role: 'Director of Construction', bio: 'Sarah ensures every line on the blueprint translates perfectly into reality with uncompromising quality.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { _id: '3', name: 'David Chen', role: 'Lead Interior Designer', bio: 'David brings spaces to life with curated materials, bespoke furniture, and an eye for light.', linkedIn: 'https://linkedin.com', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
];
