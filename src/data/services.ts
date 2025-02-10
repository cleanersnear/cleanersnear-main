export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  isPopular: boolean;
  longDescription?: string;
  features?: string[];
  includes?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export const services: Service[] = [
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    description: 'Professional carpet cleaning service using advanced steam cleaning technology.',
    price: '$35-55/room',
    image: '/images/carpet-cleaning.png',
    isPopular: true,
    features: [
      'Deep steam cleaning',
      'Stain removal treatment',
      'Deodorizing treatment',
      'Pet stain and odor removal',
      'Quick drying process',
      'Eco-friendly cleaning solutions',
      'Pre-treatment of heavy stains',
      'Protection treatment available'
    ],
    includes: [
      'Professional grade equipment',
      'Eco-friendly cleaning solutions',
      'Experienced technicians',
      'Spot treatment included',
      'Free deodorizing'
    ],
    faqs: [
      {
        question: 'How long does carpet cleaning take to dry?',
        answer: 'Typically 4-6 hours, depending on carpet thickness and humidity levels.'
      },
      {
        question: 'Do you move furniture?',
        answer: 'Yes, we move light furniture. Heavy items need to be moved before service.'
      }
    ]
  },
  {
    id: 'after-renovation-cleaning',
    title: 'After Renovation Cleaning',
    description: 'Comprehensive post-renovation cleaning service to remove construction dust and debris.',
    price: 'From $45/hr',
    image: '/images/after-renovation-cleaning.jpg',
    isPopular: false,
    features: [
      'Dust and debris removal',
      'Paint spot cleaning',
      'Window and frame cleaning',
      'Floor deep cleaning',
      'Air vent cleaning',
      'Light fixture cleaning',
      'Cabinet interior cleaning',
      'Hardware cleaning and polishing'
    ],
    includes: [
      'Specialized cleaning equipment',
      'Heavy-duty vacuum cleaners',
      'Professional cleaning agents',
      'Experienced cleaning team',
      'Complete site cleanup'
    ],
    faqs: [
      {
        question: 'How soon after renovation can you clean?',
        answer: 'We can start cleaning as soon as all construction work is completed and materials are removed.'
      }
    ]
  },
  {
    id: 'general-house-cleaning',
    title: 'General House Cleaning',
    description: 'Professional home cleaning service tailored to your needs. We handle everything from regular maintenance to deep cleaning.',
    price: 'From $35/hr',
    image: '/images/general-cleaning.jpg',
    isPopular: true,
    features: [
      'Dusting and wiping all surfaces',
      'Vacuuming and mopping floors',
      'Bathroom and kitchen cleaning',
      'Window sill cleaning',
      'Cobweb removal',
      'Garbage removal',
      'Making beds (upon request)',
      'Interior window cleaning'
    ],
    includes: [
      'Professional cleaning staff',
      'All cleaning supplies and equipment',
      'Eco-friendly cleaning products',
      'Insurance coverage',
      'Satisfaction guarantee'
    ],
    faqs: [
      {
        question: 'How often should I schedule cleaning?',
        answer: 'We recommend weekly or fortnightly service for optimal results, but we can customize to your needs.'
      },
      {
        question: 'What products do you use?',
        answer: 'We use eco-friendly, non-toxic cleaning products that are safe for children and pets.'
      }
    ]
  },
  {
    id: 'end-of-lease',
    title: 'End of Lease Cleaning',
    description: 'Comprehensive end of lease cleaning service to ensure you get your bond back. Includes carpet cleaning and full property detailing.',
    price: 'From $359',
    image: '/images/end-of-lease-cleaning.jpg',
    isPopular: true
  },
  {
    id: 'ndis-cleaning',
    title: 'NDIS Cleaning',
    description: 'Specialized cleaning services for NDIS participants. Our trained staff ensure your home remains clean and hygienic.',
    price: '$35-50/hr',
    image: '/images/ndis-cleaning.jpg',
    isPopular: false
  },
  {
    id: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    description: 'Professional cleaning solutions for offices, retail spaces, and commercial properties. Customized to your business needs.',
    price: 'Custom Quote',
    image: '/images/commercial-cleaning.jpg',
    isPopular: false
  },
  {
    id: 'move-in-move-out',
    title: 'Move In/Move Out Cleaning',
    description: 'Thorough cleaning service for moving transitions. We ensure your new space is ready or your old space is spotless.',
    price: 'From $275',
    image: '/images/Movein.png',
    isPopular: false
  },
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    description: 'Professional window cleaning service for crystal clear views. We handle both residential and commercial properties.',
    price: 'From $5-10 per window',
    image: '/images/windows-cleaning.png',
    isPopular: false,
    features: [
      'Interior and exterior cleaning',
      'Track and sill cleaning',
      'Screen cleaning',
      'Frame wiping',
      'Streak-free finish',
      'High-rise capability',
      'Hard water stain removal',
      'Solar panel cleaning'
    ],
    includes: [
      'Professional equipment',
      'Safety gear',
      'Eco-friendly solutions',
      'Experienced technicians',
      'Insurance coverage'
    ],
    faqs: [
      {
        question: 'How often should windows be cleaned?',
        answer: 'We recommend professional cleaning every 3-6 months for optimal results.'
      }
    ]
  },
  {
    id: 'office-cleaning',
    title: 'Office Cleaning',
    description: 'Professional office cleaning services to maintain a clean and productive workspace.',
    price: 'Custom Quote',
    image: '/images/office-cleaning.jpg',
    isPopular: false,
    features: [
      'Workstation and desk cleaning',
      'Floor maintenance',
      'Kitchen and break room cleaning',
      'Bathroom sanitization',
      'Window cleaning',
      'Waste management',
      'Evening/after-hours service',
      'Common area maintenance'
    ],
    includes: [
      'Trained cleaning staff',
      'Commercial-grade equipment',
      'Flexible scheduling',
      'Regular quality checks',
      'Insurance coverage'
    ],
    faqs: [
      {
        question: 'How often is office cleaning recommended?',
        answer: 'Daily or weekly cleaning is recommended for most offices, depending on size and usage.'
      },
      {
        question: 'Do you work after hours?',
        answer: 'Yes, we offer flexible scheduling including after-hours and weekend cleaning.'
      }
    ]
  },
  {
    id: 'oven-cleaning',
    title: 'Oven Cleaning',
    description: 'Specialized oven cleaning service to remove grease and grime, restoring your oven to like-new condition.',
    price: 'From $80',
    image: '/images/oven-cleaning.jpg',
    isPopular: false,
    features: [
      'Complete interior cleaning',
      'Door and glass cleaning',
      'Rack and tray cleaning',
      'Stovetop cleaning',
      'Range hood cleaning',
      'Eco-friendly products',
      'Same-day service',
      'Deodorizing treatment'
    ],
    includes: [
      'Specialized cleaning solutions',
      'Professional equipment',
      'Experienced technicians',
      'Satisfaction guarantee',
      'Safety compliance'
    ],
    faqs: [
      {
        question: 'How long does oven cleaning take?',
        answer: 'A standard oven cleaning typically takes 1-2 hours.'
      }
    ]
  },
  {
    id: 'tile-and-floor-cleaning',
    title: 'Tile and Floor Cleaning',
    description: 'Professional floor cleaning for all types of surfaces including tile, hardwood, and natural stone.',
    price: '$40-55/hr',
    image: '/images/floor-cleaning.png',
    isPopular: false,
    features: [
      'Deep tile cleaning',
      'Grout cleaning and sealing',
      'Natural stone restoration',
      'Hardwood floor cleaning',
      'Vinyl floor maintenance',
      'Marble floor polishing',
      'Anti-slip treatment',
      'Stain removal'
    ],
    includes: [
      'Professional equipment',
      'Specialized solutions',
      'Expert technicians',
      'Floor assessment',
      'Sealing services'
    ],
    faqs: [
      {
        question: 'How often should floors be professionally cleaned?',
        answer: 'We recommend every 12-18 months for residential and 6-12 months for commercial floors.'
      }
    ]
  },
  {
    id: 'upholstery-cleaning',
    title: 'Upholstery Cleaning',
    description: 'Professional cleaning service for all types of upholstered furniture and fabrics.',
    price: 'From $60/seat',
    image: '/images/upholstery-cleaning.png',
    isPopular: false,
    features: [
      'Deep fabric cleaning',
      'Stain removal',
      'Odor elimination',
      'Fabric protection',
      'Pet hair removal',
      'Dust mite treatment',
      'Leather cleaning',
      'Fabric refreshing'
    ],
    includes: [
      'Pre-inspection',
      'Spot testing',
      'Professional equipment',
      'Eco-friendly products',
      'Deodorizing'
    ],
    faqs: [
      {
        question: 'How long until furniture is dry?',
        answer: 'Most upholstery dries within 4-6 hours.'
      }
    ]
  }
] 