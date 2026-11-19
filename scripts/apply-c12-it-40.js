import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const rawData = `
Ankita Das	XII	Female	29-Jun-2008	416377729606	Raj Kumar Das
Ankita Sarkar	XII	Female	29-Mar-2009	611614492502	Khokan Sakar
Anupa Ghosh	XII	Female	18-Aug-2008	960560733995	Banchit Ghosh
Anupriya Debnath	XII	Female	04-Jun-2009	509120458826	Shridam Debnath
Arpita Debnath	XII	Female	06-23-2009	479196994197	Nishi Kumar Debnath
Bidyasree Das	XII	Female	28-May-2008	903152786215	Bikash Das
Bijoy Malakar	XII	Male	15-Apr-2009	444626794926	Bimal Malakar
Bristi Barman	XII	Female	16-Feb-2009	886494380251	Basudeb Barman
Priya Nandi	XII	Female	19-Sep-2008	574194101514	Sujit Nandi
Himani Debnath	XII	Female	28-May-2009	635363958636	Lt Rajmohan Debnath
Hritika Das	XII	Female	14-Jun-2005	562038463326	Premjit Das
Jwel Sarkar	XII	Female	16-May-2009	564106010183	Chitta Ranjan Sarkar
Kishan Das	XII	Male	15-Nov-2008	869689307222	Bidhan Chandra Das
Krish Kumar Nama	XII	Male	15-May-2009	606035823861	Kamal Kumar Nama
Mandhira Debnath	XII	Female	24-Jan-2009	485452936717	Gopal Debnath
Nayan Nandi	XII	Male	19-Oct-2008	794672134805	Sujit Nandi
Nayan Sarkar	XII	Male	16-Oct-2005	849387634319	Nirdhan Sarkar
Niloy Debnath	XII	Male	26-Dec-2008	898579590976	Pranesh Debnath
Papiya Datta	XII	Female	08-May-2007	757733055675	Biswajit Datta
Papiya Sarkar	XII	Female	11-Oct-2008	853348631648	Biswajit Sarkar
Payel Nama Das	XII	Female	05-Sep-2008	608398223546	Nitai Nama Das
Pritam Sarkar	XII	Male	1-Dec-2008	580109061338	Naruttam Sarkar
Priti Das	XII	Female	14-Jan-2009	575090599182	Jiban Das
Puja Paul	XII	Female	11-28-2008	225377717686	Tapan Paul
Puja Rani Paul	XII	Female	02-Mar-2009	835627725392	Babul Paul
Sagarika Biswas	XII	Female	12-Jan-2009	594960399038	Chitta Ranjan Biswas
Samarjit Chowdhury	XII	Male	27-Oct-2008	321154703048	Samir Chowdhury
Sani Nandi	XII	Female	02-Sep-2009	218357467611	Subal Nandi
Sumit Biswas	XII	Male	03-27-2009	583872774643	Amarjit Biswas
Sayan Shil	XII	Male	04-Jan-2009	992553331555	Manipada Shil
Sourabi Mandal	XII	Female	6-27-2008	538305668136	Nirmal Mandal
Subhajit Shil	XII	Male	14-Dec-2008	531116101285	Narayan Shil
Subham Das	XII	Male	31-Jul-2008	458817481941	Sankar Das
Subham Das	XII	Male	01-Jan-2009	934857773847	Ananta Das
Sudipta Das	XII	Male	10-Jul-2008	757149580310	Sajal Das
Sukhla Barman	XII	Female	10-Jun-2009	681800490692	Jageshwar Barman
Susmita Das	XII	Female	03-Nov-2008	652874880301	Goutam Lal Das
Swastika Das	XII	Female	24-Jul-2008	228186429583	Indrajit Das
Tapas Biswas	XII	Male	26-Oct-2008	460162475109	Dohal Biswas
Tina Sarkar	XII	Female	25-Sep-2009	664988228875	Bivision Sarkar
`;

function formatAadhaar(raw) {
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length === 12) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`;
  }
  return raw;
}

const nameAliases = {
  'Samarjit Chowdhury': 'Samarjit Choudhury',
  'Sukhla Barman': 'Sukla Barma'
};

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment or .env');
  }
  await mongoose.connect(uri);
  const Student = mongoose.connection.collection('students');
  const c12 = await Student.find({ classId: { $in: ['class-12-arts', 'class-12-sci'] } }).toArray();

  const inputRows = rawData.trim().split('\n').filter(Boolean).map(line => {
    const [name, cls, gender, dob, aadhaar, father] = line.split('\t').map(s => s.trim());
    return { name, cls, gender, dob, aadhaar, father };
  });

  console.log(`Processing ${inputRows.length} Class 12 IT Sector 1 students...`);

  const bulkOps = [];

  for (const row of inputRows) {
    const lookupName = nameAliases[row.name] || row.name;
    const match = c12.find(s => {
      if (s.name.toLowerCase().trim() !== lookupName.toLowerCase().trim()) return false;
      if (row.father && row.name === 'Subham Das') {
        const f1 = (s.father || '').toLowerCase();
        const f2 = row.father.toLowerCase();
        return f1.includes(f2.slice(0, 4)) || f2.includes(f1.slice(0, 4));
      }
      return true;
    });

    if (!match) {
      console.error(`[ERROR] Student not found: ${row.name}`);
      continue;
    }

    let subjects = Array.isArray(match.subjects) ? [...match.subjects] : [];
    if (!subjects.some(sub => sub.toLowerCase().includes('it'))) {
      subjects = subjects.filter(sub => !sub.toLowerCase().includes('philosophy'));
      subjects.push('IT/ITeS');
      console.log(`[ADD IT/ITeS] ${match.name} (Roll #${match.roll}) subjects updated to:`, subjects);
    }

    const formattedAadhaarVal = formatAadhaar(row.aadhaar);

    const updateFields = {
      sector: 'Sector 1',
      vocationalSector: 'Sector 1',
      subjects: subjects,
      aadhaar: formattedAadhaarVal,
      updatedAt: new Date()
    };

    if (row.dob && (!match.dob || match.dob === '—')) {
      updateFields.dob = row.dob;
    }

    bulkOps.push({
      updateOne: {
        filter: { _id: match._id },
        update: { $set: updateFields }
      }
    });
  }

  console.log(`Executing bulkWrite of ${bulkOps.length} updates...`);
  const res = await Student.bulkWrite(bulkOps);
  console.log('bulkWrite result:', {
    matchedCount: res.matchedCount,
    modifiedCount: res.modifiedCount
  });

  // Verify backend vocational query count for Class 12 now
  const vocRegex = /^(IT|ITeS|IT\/ITeS|IT & ITeS|Information Technology|Vocational.*)$/i;
  const vocConditions = [
    { sector: { $in: ['Sector 1', 'Sector 2'] } },
    { vocationalSector: { $in: ['Sector 1', 'Sector 2'] } },
    { subjects: { $elemMatch: { $regex: vocRegex } } },
    { optionalSubject: { $regex: vocRegex } },
    { vocationalSubject: { $regex: vocRegex } },
    { sixthSubject: { $regex: vocRegex } }
  ];

  const backendVoc = await Student.find({
    classId: { $in: ['class-12-arts', 'class-12-sci'] },
    $or: vocConditions
  }).toArray();

  console.log(`\nNew total Class 12 Vocational students in DB: ${backendVoc.length} (Expected: 40)`);
  const arts = backendVoc.filter(s => s.classId === 'class-12-arts');
  const sci = backendVoc.filter(s => s.classId === 'class-12-sci');
  const boys = backendVoc.filter(s => s.gender === 'Boy' || !s.gender);
  const girls = backendVoc.filter(s => s.gender === 'Girl');
  console.log(`Breakdown -> Arts: ${arts.length}, Sci: ${sci.length} | Boys: ${boys.length}, Girls: ${girls.length}`);

  await mongoose.disconnect();
  console.log('Done!');
}

run().catch(console.error);
