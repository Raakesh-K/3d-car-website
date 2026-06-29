export interface Car {
  id: string;
  name: string;
  subtitle: string;
  themeColor: string;
  folderPath: string;
  specs: {
    topSpeed: string;
    horsepower: string;
    zeroToHundred: string;
    engineType: string;
    transmission: string;
  };
  price: string;
  description: string;
  features: string[];
  galleryImages: string[];
}

export const cars: Car[] = [
  {
    id: 'inferno-gt',
    name: 'Inferno GT',
    subtitle: 'Born From Fire',
    themeColor: '#FF4500',
    folderPath: '/images/inferno-gt',
    specs: {
      topSpeed: '350 km/h',
      horsepower: '850 hp',
      zeroToHundred: '2.4s',
      engineType: 'Hybrid V8 Twin-Turbo',
      transmission: '8-Speed Dual-Clutch',
    },
    price: '$1,250,000',
    description: 'The Inferno GT embodies raw power and aggressive styling, forged for those who demand the absolute pinnacle of automotive performance.',
    features: [
      'Carbon Fiber Engineering',
      'Aerodynamic Design',
      'AI Driving System',
      'Adaptive Suspension',
      'Performance Exhaust'
    ],
    galleryImages: [
      '/images/sequence/ezgif-frame-001.jpg',
      '/images/sequence/ezgif-frame-010.jpg',
      '/images/sequence/ezgif-frame-020.jpg',
      '/images/sequence/ezgif-frame-030.jpg',
    ]
  },
  {
    id: 'phantom-x',
    name: 'Phantom X',
    subtitle: 'Speed Beyond Reality',
    themeColor: '#E53935',
    folderPath: '/images/phantom-x',
    specs: {
      topSpeed: '380 km/h',
      horsepower: '1050 hp',
      zeroToHundred: '2.1s',
      engineType: 'Quad-Motor Electric',
      transmission: 'Single-Speed Direct Drive',
    },
    price: '$1,850,000',
    description: 'Ghost-like silence meets physics-defying acceleration. The Phantom X represents the electric future of the hypercar segment.',
    features: [
      'Carbon Fiber Engineering',
      'Aerodynamic Design',
      'AI Driving System',
      'Adaptive Suspension',
      'Performance Exhaust'
    ],
    galleryImages: [
      '/images/sequence/ezgif-frame-005.jpg',
      '/images/sequence/ezgif-frame-015.jpg',
      '/images/sequence/ezgif-frame-025.jpg',
      '/images/sequence/ezgif-frame-035.jpg',
    ]
  },
  {
    id: 'apex-r',
    name: 'Apex R',
    subtitle: 'Pure Aerodynamic Power',
    themeColor: '#FF6F00',
    folderPath: '/images/apex-r',
    specs: {
      topSpeed: '340 km/h',
      horsepower: '780 hp',
      zeroToHundred: '2.6s',
      engineType: 'Naturally Aspirated V12',
      transmission: '7-Speed Sequential',
    },
    price: '$950,000',
    description: 'Track-focused dynamics meet road-legal compliance. The Apex R is a driver\'s car in the purest sense.',
    features: [
      'Carbon Fiber Engineering',
      'Aerodynamic Design',
      'AI Driving System',
      'Adaptive Suspension',
      'Performance Exhaust'
    ],
    galleryImages: [
      '/images/sequence/ezgif-frame-040.jpg',
      '/images/sequence/ezgif-frame-045.jpg',
      '/images/sequence/ezgif-frame-048.jpg',
      '/images/sequence/ezgif-frame-050.jpg',
    ]
  }
];
