import express from 'express';
import Holiday from '../models/Holiday.js';

const router = express.Router();

const DEFAULT_HOLIDAYS = [
  // April 2026 (Month 3)
  {
    name: 'Dr. B.R. Ambedkar Jayanti / Bengali New Year',
    date: 14,
    dateDisplay: '14',
    month: 3,
    monthName: 'April',
    year: 2026,
    dayOfWeek: 'Tuesday',
    type: 'state',
    category: 'State Holiday',
    description: 'Celebrating Dr. B.R. Ambedkar Jayanti & Poila Boishakh (Bengali New Year)',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Garia Puja',
    date: 21,
    dateDisplay: '21',
    month: 3,
    monthName: 'April',
    year: 2026,
    dayOfWeek: 'Tuesday',
    type: 'state',
    category: 'State Holiday',
    description: 'Traditional ethnic harvest festival of Tripura',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // May 2026 (Month 4)
  {
    name: 'May Day / International Workers’ Day',
    date: 1,
    dateDisplay: '01',
    month: 4,
    monthName: 'May',
    year: 2026,
    dayOfWeek: 'Friday',
    type: 'state',
    category: 'State Holiday',
    description: 'International Workers’ Day observance',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Rabindra Jayanti',
    date: 9,
    dateDisplay: '09',
    month: 4,
    monthName: 'May',
    year: 2026,
    dayOfWeek: 'Saturday',
    type: 'state',
    category: 'State Holiday',
    description: 'Birth anniversary celebration of Rabindranath Tagore',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Summer Vacation',
    date: 18,
    endDate: 31,
    dateDisplay: '18 – 31',
    month: 4,
    monthName: 'May',
    year: 2026,
    dayOfWeek: 'Monday (2 Weeks)',
    type: 'school',
    category: 'School Vacation',
    description: 'Annual summer break for students and teaching staff',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // June 2026 (Month 5)
  {
    name: 'World Environment Day',
    date: 5,
    dateDisplay: '05',
    month: 5,
    monthName: 'June',
    year: 2026,
    dayOfWeek: 'Friday',
    type: 'special',
    category: 'Special Observance',
    description: 'Campus tree plantation drive and eco-club awareness activities',
    isClosed: false,
    academicYear: '2026-2027'
  },
  {
    name: 'Eid-ul-Adha (Bakrid)',
    date: 17,
    dateDisplay: '17',
    month: 5,
    monthName: 'June',
    year: 2026,
    dayOfWeek: 'Wednesday',
    type: 'state',
    category: 'State Holiday',
    description: 'Gazetted holiday for Eid-ul-Adha',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'International Yoga Day',
    date: 21,
    dateDisplay: '21',
    month: 5,
    monthName: 'June',
    year: 2026,
    dayOfWeek: 'Sunday',
    type: 'special',
    category: 'Special Observance',
    description: 'Morning yoga demonstration and wellness session on school grounds',
    isClosed: false,
    academicYear: '2026-2027'
  },

  // July 2026 (Month 6)
  {
    name: 'Muharram',
    date: 17,
    dateDisplay: '17',
    month: 6,
    monthName: 'July',
    year: 2026,
    dayOfWeek: 'Friday',
    type: 'state',
    category: 'State Holiday',
    description: 'Gazetted holiday for Muharram',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Kharchi Puja',
    date: 25,
    dateDisplay: '25',
    month: 6,
    monthName: 'July',
    year: 2026,
    dayOfWeek: 'Saturday',
    type: 'state',
    category: 'State Holiday',
    description: 'Famous fourteen gods festival of Tripura celebrated with great reverence',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // August 2026 (Month 7)
  {
    name: 'Ker Puja',
    date: 8,
    dateDisplay: '08',
    month: 7,
    monthName: 'August',
    year: 2026,
    dayOfWeek: 'Saturday',
    type: 'state',
    category: 'State Holiday',
    description: 'Traditional ritual and sacred ceremonial festival of Tripura',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Independence Day',
    date: 15,
    dateDisplay: '15',
    month: 7,
    monthName: 'August',
    year: 2026,
    dayOfWeek: 'Saturday',
    type: 'national',
    category: 'National Holiday',
    description: 'Flag hoisting ceremony at 08:30 AM, national anthem & patriotic programs',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Raksha Bandhan',
    date: 28,
    dateDisplay: '28',
    month: 7,
    monthName: 'August',
    year: 2026,
    dayOfWeek: 'Friday',
    type: 'school',
    category: 'School Holiday',
    description: 'Festival celebration of brotherly and sisterly bonds',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // September 2026 (Month 8)
  {
    name: 'Janmashtami',
    date: 4,
    dateDisplay: '04',
    month: 8,
    monthName: 'September',
    year: 2026,
    dayOfWeek: 'Friday',
    type: 'state',
    category: 'State Holiday',
    description: 'Celebration of Lord Krishna’s birth anniversary',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Teachers’ Day',
    date: 5,
    dateDisplay: '05',
    month: 8,
    monthName: 'September',
    year: 2026,
    dayOfWeek: 'Saturday',
    type: 'special',
    category: 'Special Observance',
    description: 'Dr. Sarvepalli Radhakrishnan birth anniversary & student-led felicitation',
    isClosed: false,
    academicYear: '2026-2027'
  },
  {
    name: 'Milad-un-Nabi (Id-e-Milad)',
    date: 16,
    dateDisplay: '16',
    month: 8,
    monthName: 'September',
    year: 2026,
    dayOfWeek: 'Wednesday',
    type: 'state',
    category: 'State Holiday',
    description: 'Observance of Prophet Muhammad’s birthday',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // October 2026 (Month 9)
  {
    name: 'Mahatma Gandhi Jayanti',
    date: 2,
    dateDisplay: '02',
    month: 9,
    monthName: 'October',
    year: 2026,
    dayOfWeek: 'Friday',
    type: 'national',
    category: 'National Holiday',
    description: 'National holiday in honor of the Father of the Nation',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Durga Puja & Dussehra Holidays',
    date: 18,
    endDate: 28,
    dateDisplay: '18 – 28',
    month: 9,
    monthName: 'October',
    year: 2026,
    dayOfWeek: 'Sunday (10 Days)',
    type: 'school',
    category: 'School Vacation',
    description: 'Autumn festival break for Durga Puja, Vijaya Dashami, and Dussehra',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Lakshmi Puja',
    date: 29,
    dateDisplay: '29',
    month: 9,
    monthName: 'October',
    year: 2026,
    dayOfWeek: 'Thursday',
    type: 'state',
    category: 'State Holiday',
    description: 'Traditional Kojagari Lakshmi Puja observed across Tripura and Bengal',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // November 2026 (Month 10)
  {
    name: 'Diwali / Kali Puja',
    date: 8,
    dateDisplay: '08',
    month: 10,
    monthName: 'November',
    year: 2026,
    dayOfWeek: 'Sunday',
    type: 'national',
    category: 'National Holiday',
    description: 'Festival of Lights and sacred Kali Puja celebrations',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Bhai Dooj / Bhatridwitiya',
    date: 10,
    dateDisplay: '10',
    month: 10,
    monthName: 'November',
    year: 2026,
    dayOfWeek: 'Tuesday',
    type: 'school',
    category: 'School Holiday',
    description: 'Festive sibling holiday following Diwali',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Children’s Day',
    date: 14,
    dateDisplay: '14',
    month: 10,
    monthName: 'November',
    year: 2026,
    dayOfWeek: 'Saturday',
    type: 'special',
    category: 'Special Observance',
    description: 'Pt. Jawaharlal Nehru birthday celebration, sports games & joyful assemblies',
    isClosed: false,
    academicYear: '2026-2027'
  },
  {
    name: 'Guru Nanak Jayanti',
    date: 24,
    dateDisplay: '24',
    month: 10,
    monthName: 'November',
    year: 2026,
    dayOfWeek: 'Tuesday',
    type: 'state',
    category: 'State Holiday',
    description: 'Prakash Utsav marking Guru Nanak Dev Ji’s birth',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // December 2026 (Month 11)
  {
    name: 'Winter Break & Christmas Holidays',
    date: 25,
    endDate: 31,
    dateDisplay: '25 – 31',
    month: 11,
    monthName: 'December',
    year: 2026,
    dayOfWeek: 'Friday (7 Days)',
    type: 'school',
    category: 'School Vacation',
    description: 'Year-end winter recess and Christmas celebrations',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // January 2027 (Month 0)
  {
    name: 'New Year’s Day',
    date: 1,
    dateDisplay: '01',
    month: 0,
    monthName: 'January',
    year: 2027,
    dayOfWeek: 'Friday',
    type: 'school',
    category: 'School Holiday',
    description: 'Welcoming the New Calendar Year 2027',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Kokborok Day',
    date: 19,
    dateDisplay: '19',
    month: 0,
    monthName: 'January',
    year: 2027,
    dayOfWeek: 'Tuesday',
    type: 'special',
    category: 'Special Observance',
    description: 'Celebration and promotion of the indigenous Kokborok language in Tripura',
    isClosed: false,
    academicYear: '2026-2027'
  },
  {
    name: 'Netaji Subhash Chandra Bose Jayanti',
    date: 23,
    dateDisplay: '23',
    month: 0,
    monthName: 'January',
    year: 2027,
    dayOfWeek: 'Saturday',
    type: 'state',
    category: 'State Holiday',
    description: 'Parakram Diwas honoring Netaji’s supreme valor and patriotism',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Republic Day',
    date: 26,
    dateDisplay: '26',
    month: 0,
    monthName: 'January',
    year: 2027,
    dayOfWeek: 'Tuesday',
    type: 'national',
    category: 'National Holiday',
    description: '78th Republic Day of India — Ceremonial flag hoisting and parade',
    isClosed: true,
    academicYear: '2026-2027'
  },

  // February 2027 (Month 1)
  {
    name: 'Saraswati Puja (Vasant Panchami)',
    date: 11,
    dateDisplay: '11',
    month: 1,
    monthName: 'February',
    year: 2027,
    dayOfWeek: 'Thursday',
    type: 'school',
    category: 'School Holiday',
    description: 'Goddess of Learning worship, school rituals and floral pushpanjali',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'National Science Day',
    date: 28,
    dateDisplay: '28',
    month: 1,
    monthName: 'February',
    year: 2027,
    dayOfWeek: 'Sunday',
    type: 'special',
    category: 'Special Observance',
    description: 'Raman Effect commemoration, student science models and quizzes',
    isClosed: false,
    academicYear: '2026-2027'
  },

  // March 2027 (Month 2)
  {
    name: 'Maha Shivratri',
    date: 8,
    dateDisplay: '08',
    month: 2,
    monthName: 'March',
    year: 2027,
    dayOfWeek: 'Monday',
    type: 'state',
    category: 'State Holiday',
    description: 'Maha Shivratri festival observance',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Holi / Doljatra',
    date: 22,
    dateDisplay: '22',
    month: 2,
    monthName: 'March',
    year: 2027,
    dayOfWeek: 'Monday',
    type: 'national',
    category: 'National Holiday',
    description: 'Festival of colors and spring joy',
    isClosed: true,
    academicYear: '2026-2027'
  },
  {
    name: 'Good Friday',
    date: 26,
    dateDisplay: '26',
    month: 2,
    monthName: 'March',
    year: 2027,
    dayOfWeek: 'Friday',
    type: 'state',
    category: 'State Holiday',
    description: 'Gazetted Christian holiday for Good Friday',
    isClosed: true,
    academicYear: '2026-2027'
  }
];

// Helper: seed defaults if database is empty
const ensureDefaultsSeeded = async () => {
  const count = await Holiday.countDocuments();
  if (count === 0) {
    await Holiday.insertMany(DEFAULT_HOLIDAYS);
    console.log(` Seeded ${DEFAULT_HOLIDAYS.length} default academic calendar holidays into MongoDB.`);
  }
};

// GET /api/holidays - List holidays (filter by month, year, type, or academicYear)
router.get('/', async (req, res) => {
  try {
    await ensureDefaultsSeeded();

    const { month, year, academicYear, type } = req.query;
    const filter = {};

    if (month !== undefined && month !== '') {
      filter.month = Number(month);
    }
    if (year !== undefined && year !== '') {
      filter.year = Number(year);
    }
    if (academicYear) {
      filter.academicYear = academicYear;
    }
    if (type && type !== 'all') {
      filter.type = type;
    }

    const holidays = await Holiday.find(filter).sort({ month: 1, date: 1, createdAt: 1 });
    res.json(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ message: 'Error retrieving holidays', error: error.message });
  }
});

// GET /api/holidays/:id - Get single holiday
router.get('/:id', async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching holiday', error: error.message });
  }
});

// POST /api/holidays - Add a new holiday
router.post('/', async (req, res) => {
  try {
    const {
      name,
      date,
      endDate,
      dateDisplay,
      month,
      monthName,
      year,
      dayOfWeek,
      type,
      category,
      description,
      isClosed,
      academicYear
    } = req.body;

    if (!name || date === undefined || month === undefined) {
      return res.status(400).json({ message: 'Name, date, and month are required' });
    }

    // Auto-compute dateDisplay if not supplied
    let computedDisplay = dateDisplay;
    if (!computedDisplay) {
      computedDisplay = endDate ? `${date} – ${endDate}` : (Number(date) < 10 ? `0${Number(date)}` : `${date}`);
    }

    const newHoliday = new Holiday({
      name: name.trim(),
      date: Number(date),
      endDate: endDate ? Number(endDate) : null,
      dateDisplay: computedDisplay,
      month: Number(month),
      monthName: monthName || '',
      year: year ? Number(year) : (Number(month) <= 2 ? 2027 : 2026),
      dayOfWeek: dayOfWeek || '',
      type: type || 'school',
      category: category || (type === 'national' ? 'National Holiday' : type === 'state' ? 'State Holiday' : type === 'special' ? 'Special Observance' : 'School Holiday'),
      description: description ? description.trim() : '',
      isClosed: isClosed !== undefined ? Boolean(isClosed) : true,
      academicYear: academicYear || '2026-2027'
    });

    const saved = await newHoliday.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating holiday:', error);
    res.status(400).json({ message: 'Error creating holiday', error: error.message });
  }
});

// PUT /api/holidays/:id - Update an existing holiday
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      date,
      endDate,
      dateDisplay,
      month,
      monthName,
      year,
      dayOfWeek,
      type,
      category,
      description,
      isClosed,
      academicYear
    } = req.body;

    let computedDisplay = dateDisplay;
    if (date !== undefined && !computedDisplay) {
      computedDisplay = endDate ? `${date} – ${endDate}` : (Number(date) < 10 ? `0${Number(date)}` : `${date}`);
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (date !== undefined) updateData.date = Number(date);
    if (endDate !== undefined) updateData.endDate = endDate ? Number(endDate) : null;
    if (computedDisplay !== undefined) updateData.dateDisplay = computedDisplay;
    if (month !== undefined) updateData.month = Number(month);
    if (monthName !== undefined) updateData.monthName = monthName;
    if (year !== undefined) updateData.year = Number(year);
    if (dayOfWeek !== undefined) updateData.dayOfWeek = dayOfWeek;
    if (type !== undefined) {
      updateData.type = type;
      if (!category) {
        updateData.category = type === 'national' ? 'National Holiday' : type === 'state' ? 'State Holiday' : type === 'special' ? 'Special Observance' : 'School Holiday';
      }
    }
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description.trim();
    if (isClosed !== undefined) updateData.isClosed = Boolean(isClosed);
    if (academicYear !== undefined) updateData.academicYear = academicYear;

    const updated = await Holiday.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating holiday:', error);
    res.status(400).json({ message: 'Error updating holiday', error: error.message });
  }
});

// DELETE /api/holidays/:id - Delete a holiday
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Holiday.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    res.json({ message: 'Holiday removed successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting holiday:', error);
    res.status(500).json({ message: 'Error deleting holiday', error: error.message });
  }
});

// POST /api/holidays/reset - Reset to default holidays
router.post('/reset', async (req, res) => {
  try {
    await Holiday.deleteMany({});
    const inserted = await Holiday.insertMany(DEFAULT_HOLIDAYS);
    res.json({ message: 'Holidays reset to default academic calendar', count: inserted.length });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting holidays', error: error.message });
  }
});

export default router;
