import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clean up existing data
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  const colleges = [
    {
      name: 'Indian Institute of Technology Bombay (IITB)',
      location: 'Mumbai, Maharashtra',
      fees: 250000,
      rating: 4.9,
      placementPercentage: 98.5,
      description: 'IIT Bombay is a public technical and research university located in Powai, Mumbai. It is globally recognized for its engineering and technology programs.',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop',
      mockCutoffRank: 1000, // Very difficult
      courses: {
        create: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 250000 },
          { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: 250000 }
        ]
      },
      reviews: {
        create: [
          { userName: 'Aarav Kumar', rating: 5.0, comment: 'Amazing campus and brilliant peer group.' },
          { userName: 'Neha Singh', rating: 4.5, comment: 'Highly competitive but totally worth it for the exposure.' }
        ]
      }
    },
    {
      name: 'Delhi Technological University (DTU)',
      location: 'New Delhi, Delhi',
      fees: 166000,
      rating: 4.3,
      placementPercentage: 92.0,
      description: 'DTU, formerly Delhi College of Engineering, is a premier state university offering excellent engineering programs and great placements.',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop',
      mockCutoffRank: 8000,
      courses: {
        create: [
          { name: 'B.Tech Software Engineering', duration: '4 Years', fees: 166000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 166000 }
        ]
      },
      reviews: {
        create: [
          { userName: 'Rahul Verma', rating: 4.0, comment: 'Great placements, but infrastructure can be improved.' }
        ]
      }
    },
    {
      name: 'Vellore Institute of Technology (VIT)',
      location: 'Vellore, Tamil Nadu',
      fees: 198000,
      rating: 4.2,
      placementPercentage: 95.0,
      description: 'VIT is a private research deemed university known for its extensive campus and high placement numbers.',
      imageUrl: 'https://images.unsplash.com/photo-1592289659020-098555e09f52?q=80&w=1000&auto=format&fit=crop',
      mockCutoffRank: 20000,
      courses: {
        create: [
          { name: 'B.Tech Information Technology', duration: '4 Years', fees: 198000 },
          { name: 'B.Tech Electronics', duration: '4 Years', fees: 198000 }
        ]
      },
      reviews: {
        create: [
          { userName: 'Sneha Patel', rating: 4.5, comment: 'Good curriculum, strict rules, but placements are guaranteed if you study well.' }
        ]
      }
    },
    {
      name: 'National Institute of Technology (NIT) Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      fees: 175000,
      rating: 4.7,
      placementPercentage: 96.0,
      description: 'NIT Trichy is one of the oldest and most prestigious NITs in India, offering excellent academic and extracurricular balance.',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
      mockCutoffRank: 3000,
      courses: {
        create: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 175000 },
          { name: 'B.Arch Architecture', duration: '5 Years', fees: 180000 }
        ]
      },
      reviews: {
        create: [
          { userName: 'Karthik R', rating: 4.8, comment: 'Best NIT in India. Period.' }
        ]
      }
    },
    {
      name: 'Birla Institute of Technology and Science (BITS)',
      location: 'Pilani, Rajasthan',
      fees: 450000,
      rating: 4.8,
      placementPercentage: 97.5,
      description: 'BITS Pilani is a highly reputed private institute known for its zero attendance policy and strong alumni network.',
      imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1000&auto=format&fit=crop',
      mockCutoffRank: 2000,
      courses: {
        create: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 450000 },
          { name: 'B.Pharm Pharmacy', duration: '4 Years', fees: 400000 }
        ]
      },
      reviews: {
        create: [
          { userName: 'Priya Sharma', rating: 5.0, comment: 'The freedom and exposure you get here is unmatched.' }
        ]
      }
    }
  ];

  for (const college of colleges) {
    await prisma.college.create({
      data: college
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
