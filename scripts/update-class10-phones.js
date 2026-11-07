import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from '../models/Student.js';

dotenv.config();

const rawData = `Abhijit Singha Roy	X	Male	12-Oct-2011		Biswajit Singha Roy	Dulan Deb Singha Roy	Gen	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	
Achintya Das	X	Male	29-Oct-2010	254921395154	Hiralal Das	Rinku Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7085580289
Aditya Biswas	X	Male	23-Sep-2010	246752545084	Amarchan Biswas	Namita Sarkar Biuswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8132080629
Ahili Das	X	Female	05-May-2011	638466880755	Sonamohan Das	Sunita Das	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9863629659
Anishka Biswas	X	Female	09-Sep-2010	291922154142	Uttam Biswas	Shefali Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9089746204
Anujit Das	X	Male	21-Apr-2010	391053603827	Krishnadhan Das	Ujjala Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9863396321
Aritra Das	X	Male	15-Dec-2010	654986193797	Ashok Das	Rama Rani Das	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9366039665
Ashish Debnath	X	Male	08-May-2011	285876730867	Amrit Debnath	Radha Rani Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7005994993
Barsha Das	X	Female	29-Mar-2011	303527436776	Ajit Das	Aparna Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8413073740
Dipa Biswas	X	Female	20-Mar-2010	437428609335	Khokan Biswas	Nanda Rani Sarkar Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9862393685
Dipa Roy	X	Female	10-Nov-2010	202486737257	Kalicharan Roy	Sabita Sarkar Roy	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6009636774
Dipali Sarkar	X	Female	01-Jan-2009	962391582482	Sushanta Sarkar	Shanti Sarkar	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8730875919
Jayanta Sarkar	X	Male	11-Apr-2010	536704533383	Krishnadhan Sarkar	Champa Sarkar	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9615792087
Joy Debnath	X	Male	24-Aug-2011	772177202546	Uttam Debnath	Jhuma Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9862815721
Joydip Das	X	Male	10-Sep-2010	994529589956	Satya Ranjan Das	Sucha Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7085318960
Mallika Das	X	Female	20-May-2009		Nantu Das	Dipali Bala Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9233699048
Manisa Das	X	Female	18-Feb-2011	433962408950	Pintu Das	Anima Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9863831547
Niha Nama	X	Female	12-Jun-2010	311202317462	Hirendra Nama	Sabitri Nama	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8798361523
Papiya Nama	X	Female	26-Oct-2010	451549500741	Sadhan Nama	Sumitra Sarkar Nama	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7085261872
Puja Das	X	Female	25-May-2011	858827602303	Dilip Das	Dipali Das	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7005652908
Rahul Biswas	X	Male	10-Jun-2011	497650540001	Dulal Biswas	Armati Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7629005494
Rakhi Ghosh	X	Female	13-Aug-2011	474016434735	Chandra Sekhar Ghosh	Ratna Bala Giri	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9366534781
Rima Debnath	X	Female	30-Sep-2010	343454340285	Parimal Debnath	Rina Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8787492352
Ripa Das	X	Female	23-Sep-2010	350074873058	Shanta Kumar Das	Rinki Das	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7005170663
Ritesh Biswas	X	Male	08-Sep-2010	985529069524	Ranjit Biswas	Supriti Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9089030566
Rohit Das	X	Male	02-Nov-2010	333950555737	Sanjit Das	Rekha Das	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8730904099
Rupali Sarkar	X	Female	18-Jan-2011	497213323782	Tarani Sarkar	Bakul Sarkar	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9366916979
Sarajit Sarkar	X	Male	24-Oct-2010	805301276112	Suna Rani Sarkar	Sujit Sarkar	SC	No	AAY	IT-ITeS (TBSE)	Domestic Data Entry Operator	9089770060
Shrabanti Nama	X	Female	24-May-2011	374427209034	Ratan Nama	Malati Biswas Nama	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9362676368
Subhajit Debnath	X	Male	10-Apr-2011	591897380665	Litan Debnath	Rekha Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8119064674
Subhrajit Das	X	Male	14-Dec-2010	702722337593	Paritosh Das	Somu Biswas Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7630093190
Sudipa Das	X	Female	01-Jan-2010	499517645658	Kajal Das	Tapasi Das	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6909273857
Sudipta Das	X	Male	16-Apr-2010	983801685010	Litan Das	Soma Sarkar Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9366891206
Sukla Biswas	X	Female	26-Feb-2011	755472737327	Uttam Biswas	Pushpa Rani Das Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9366457911
Susmita Debnath	X	Female	14-Sep-2011	278188575970	Arjun Debnath	Pranati Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9362970874
Tania Biswas	X	Female	14-Feb-2011	932110800484	Shrinibash Biswas	Rinku Sarkar Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9862260083
Taniya Sarkar	X	Female	25-May-2011	766618116951	Manoranjan Sarkar	Mistu Sarkar	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9366026749
Trisanjit Das	X	Male	26-Aug-2010	533862355757	Indrajit Das	Shilpi Rani Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9436525374
Udai Biswas	X	Male	03-Jun-2011	979527789353	Amit Biswas	Jhulan Sarkar Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9863221944
===SECTOR2===
Agrajit Ghosh	X	Male	03-Nov-2010	584616958075	Sukhamoy Ghosh	Manju Ghosh	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6009420335
Ajay Biswas	X	Male	22-Sep-2010	278718120929	Arun Biswas	Sabitri Biswas	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7628025676
Anima Das	X	Female	01-Jan-2010	926872306397	Adhir Lal Das	Pritama Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9378058161
Ankur Deb	X	Male	14-Aug-2010	419409426491	Manik Deb	Rita Deb	Gen	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9233043451
Aparna Das	X	Female	14-Oct-2010	948949173862	Sankar Das	Laxmi Rani Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8414854959
Apurba Das	X	Male	26-Feb-2011	409916557594	Abhijit Das	Alpana Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7085574099
Arup Biswas	X	Male	19-Apr-2011	650098953945	Ajit Biswas	Soma Rani Shil Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9861247891
Ayush Das	X	Male	25-Feb-2011	714488838750	Sukhen Das	Rina Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9612104233
Bishal Das	X	Male	25-May-2010	704386794934	Bikash Chandra Das	Rupali Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7005626862
Deepsikha Das	X	Female	18-Sep-2010	814281625356	Bijoy Das	Rubi Rani Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8131076937
Dipesh Modak	X	Male	20-Nov-2010	442654960704	Dipak Modak	Shilpi Rani Deb Modak	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8131935285
Dipika Nandi	X	Female	26-Dec-2010	206144681811	Dipak Nandi	Banti Deb Nandi	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9366456683
Diya Das	X	Female	9/28/2010	388381269642	Dayananda Das	Srimati Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7005469276
Genelia Debbarma	X	Female	24-Sep-2011	235903858660	Arjun Debbarma	Prijina Debbarma	ST	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6909069829
Goutam Debnath	X	Female	22-Jun-2011	484333391896	Upendra Debnath	Nirmala Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8974110498
Hriday Debnath	X	Male	25-Dec-2010	772064524659	Pradip Debnath	Jhuma Debnath	OBC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6909496897
Jayashree Biswas	X	Female	31-Jan-2011	226587438766	Lt Laxman Biswas	Putul Rani Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9436490592
Kartik Das	X	Male	28-Oct-2010	424831998439	Sanjoy Das	Arpita Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7005857042
Mandira Debnath	X	Female	11-Jan-2011	911670107302	Subodh Debnath	Manika Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9863784835
Mitu Das	X	Male	18-Dec-2010	883990069913	Dilip Das	Anjana Rani Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7085852448
Moutushi Debnath	X	Female	17-Nov-2010	524030267703	Mintu Debnath	Anita Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8837468315
Mukta Rani Sarkar	X	Female	10-Jun-2009	468107421447	Biswajit Sarkar	Dipali Sarkar	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7085519210
Papiya Modak	X	Female	07-Jul-2011	897198763431	Rajan Modak	Mukta Modak	OBC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7005351208
Parmita Das	X	Female	27-Jun-2011	930615669547	Parimal Das	Laxmi Bala Bhowmik Das	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8787520212
Piu Deb	X	Female	29-Oct-2010	895318171125	Pijush Deb	Soma Deb	Gen	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8413926087
Prakash Das	X	Male	03-Mar-2011	720043750632	Paplu Das	Renu Bala Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9863196516
Prasanta Das	X	Male	27-Oct-2010	596045353330	Dulal Das	Shipra Rani Das	SC	No	AAY	IT-ITeS (TBSE)	Domestic Data Entry Operator	8787525480
Pritam Debnath	X	Male	19-Jan-2011	938193792893	Partha Debnath	Mamata Mayee Debnath	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9089671806
Puja Sarkar	X	Female	23-Oct-2010	858827602303	Goutam Sarkar	Kalpana Sarkar	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8730999141
Purnima Ghosh	X	Female	18-Feb-2011	931247306404	Debashis Ghosh	Anjali Deb Ghosh	OBC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8974505125
Rima Biswas	X	Female	04-Apr-2011	449937597281	Rabindra Biswas	Ruma Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8131074694
Ripan Halder	X	Male	05-Jan-2011	312844323931	Ratan Halder	Malati Halder	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	7629965163
Shantanu Das	X	Male	12-May-2011	798615139480	Ganesh Das	Mintu Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6009555620
Sonali Sarkar	X	Female	27-Apr-2011	642127439566	Tapan Sarkar	Sujata Nama Sarkar	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9366492110
Subhajit Das	X	Male	19-Nov-2010	642358720042	Biswajit Das	Pinky Majumdar	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	9233626821
Subhajit Das	X	Male	05-Feb-2011	208375082660	Premjit Das	Jamuna Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8131841549
Subrata Das	X	Male	09-Dec-2010	503827788125	Babul Das	Shikha Rani Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6909573539
Sukamal Das	X	Male	12-Nov-2009	755224308020	Subhash Das	Anjana Das	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6009855422
Suman Biswas	X	Male	28-Jan-2011	652056612064	Sunil Biswas	Shika Sarkar Biswas	SC	No	APL	IT-ITeS (TBSE)	Domestic Data Entry Operator	6009263718
Trisha Nama	X	Female	24-Sep-2010	581318993024	Biswajit Nama	Lalita Nama	SC	No	BPL	IT-ITeS (TBSE)	Domestic Data Entry Operator	8787660544`;

const nameAliasMap = {
  'subhrajit das': 'subrajit das',
  'sudipa das': 'sudip das',
  'tania biswas': 'taniya biswas',
  'deepsikha das': 'deepshikha das'
};

function parseData() {
  const lines = rawData.split('\n');
  let currentSector = 'Sector 1';
  const list = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (line.includes('===SECTOR2===')) {
      currentSector = 'Sector 2';
      continue;
    }
    const cols = line.split('\t').map(c => c.trim());
    const name = cols[0];
    const className = cols[1];
    const gender = cols[2];
    const dob = cols[3];
    const aadhaar = cols[4];
    const father = cols[5];
    const mother = cols[6];
    const caste = cols[7];
    const pwd = cols[8];
    const bplStatus = cols[9];
    const vocationalSubject = cols[10];
    const jobRole = cols[11];
    const phone = cols[12] || '';

    list.push({
      sector: currentSector,
      name,
      className,
      gender,
      dob,
      aadhaar,
      father,
      mother,
      caste,
      pwd,
      bplStatus,
      vocationalSubject,
      jobRole,
      phone
    });
  }
  return list;
}

async function runUpdate() {
  const parsed = parseData();
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  console.log('Connected to MongoDB.');

  const dbStudents = await Student.find({ classId: 'class-10' }).sort({ rollNumber: 1 }).lean();

  let updatedCount = 0;
  let alreadyMatchingCount = 0;
  const updateLogs = [];

  for (const item of parsed) {
    let lookupName = item.name.toLowerCase().trim();
    if (nameAliasMap[lookupName]) {
      lookupName = nameAliasMap[lookupName];
    }

    const candidates = dbStudents.filter(s => {
      const dbN = s.name.toLowerCase().trim();
      return dbN === lookupName;
    });

    let matchedDb = null;
    if (candidates.length === 1) {
      matchedDb = candidates[0];
    } else if (candidates.length > 1) {
      matchedDb = candidates.find(s => {
        const sFather = (s.father || s.guardian || '').toLowerCase();
        const iFather = item.father.toLowerCase();
        return sFather && iFather && (sFather.includes(iFather) || iFather.includes(sFather));
      }) || candidates[0];
    }

    if (!matchedDb) {
      console.error(`ERROR: Still unmatched: ${item.name}`);
      continue;
    }

    const currentPhone = (matchedDb.phone || '').trim();
    const newPhone = item.phone.trim();

    if (newPhone && currentPhone !== newPhone) {
      await Student.updateOne(
        { _id: matchedDb._id },
        { 
          $set: { 
            phone: newPhone,
            sector: item.sector,
            vocationalSector: item.sector
          } 
        }
      );
      updatedCount++;
      updateLogs.push({
        roll: matchedDb.roll,
        name: matchedDb.name,
        sector: item.sector,
        oldPhone: currentPhone,
        newPhone: newPhone,
        status: 'UPDATED'
      });
    } else {
      alreadyMatchingCount++;
      // ensure sector is set properly
      await Student.updateOne(
        { _id: matchedDb._id },
        { 
          $set: { 
            sector: item.sector,
            vocationalSector: item.sector
          } 
        }
      );
      updateLogs.push({
        roll: matchedDb.roll,
        name: matchedDb.name,
        sector: item.sector,
        oldPhone: currentPhone,
        newPhone: newPhone || currentPhone,
        status: 'VERIFIED'
      });
    }
  }

  console.log(`\n================ UPDATE SUMMARY ================`);
  console.log(`Total Class X IT Students: ${parsed.length}`);
  console.log(`Phone Numbers Updated in Database: ${updatedCount}`);
  console.log(`Phone Numbers Already Matching / Kept: ${alreadyMatchingCount}`);
  console.log(`=================================================\n`);

  console.log('Sample of updated records:');
  updateLogs.filter(u => u.status === 'UPDATED').slice(0, 10).forEach(u => {
    console.log(`[Roll #${u.roll}] ${u.name} (${u.sector}): ${u.oldPhone} -> ${u.newPhone}`);
  });

  await mongoose.disconnect();
  console.log('MongoDB disconnected cleanly.');
}

runUpdate().catch(err => {
  console.error('Update failed:', err);
  process.exit(1);
});
