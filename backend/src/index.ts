import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: ["https://unifinder-xi.vercel.app", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

// 1. College Listing + Search + Filters
app.get('/api/colleges', async (req: Request, res: Response) => {
  const { search, location, minFees, maxFees, page = '1', limit = '10' } = req.query;

  const where: any = {};
  if (search) {
    where.name = { contains: String(search) };
  }
  if (location) {
    where.location = { contains: String(location) };
  }
  if (minFees || maxFees) {
    where.fees = {};
    if (minFees) where.fees.gte = Number(minFees);
    if (maxFees) where.fees.lte = Number(maxFees);
  }

  const skip = (Number(page) - 1) * Number(limit);

  try {
    const colleges = await prisma.college.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        courses: true
      }
    });
    
    const total = await prisma.college.count({ where });

    res.json({
      data: colleges,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// 2. College Detail Page
app.get('/api/colleges/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const college = await prisma.college.findUnique({
      where: { id: Number(id) },
      include: {
        courses: true,
        reviews: true
      }
    });
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch college details' });
  }
});

// 3. Compare Colleges
app.get('/api/compare', async (req: Request, res: Response) => {
  const { ids } = req.query; // Expecting comma separated IDs like "1,2,3"
  if (!ids) {
    return res.status(400).json({ error: 'Please provide college ids to compare' });
  }

  const idArray = String(ids).split(',').map(Number).filter(id => !isNaN(id));
  
  if (idArray.length < 2 || idArray.length > 4) {
    return res.status(400).json({ error: 'Please provide between 2 and 4 valid college ids' });
  }

  try {
    const colleges = await prisma.college.findMany({
      where: {
        id: { in: idArray }
      },
      include: {
        courses: true
      }
    });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch colleges for comparison' });
  }
});

// 4. Simple Predictor Tool
app.get('/api/predictor', async (req: Request, res: Response) => {
  const { rank } = req.query;
  if (!rank) {
    return res.status(400).json({ error: 'Please provide your rank' });
  }

  const numericRank = Number(rank);

  try {
    // Logic: College cutoff rank must be >= user rank (higher rank number means lower score, usually. But let's assume cutoff 5000 means ranks 1-5000 are accepted. So cutoff >= user rank).
    const eligibleColleges = await prisma.college.findMany({
      where: {
        mockCutoffRank: {
          gte: numericRank
        }
      },
      orderBy: {
        mockCutoffRank: 'asc' // Sort by cutoff rank ascending (hardest to get in first)
      },
      take: 10,
      include: {
        courses: true
      }
    });
    
    res.json(eligibleColleges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to predict colleges' });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
