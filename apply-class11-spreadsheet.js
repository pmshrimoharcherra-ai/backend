import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const rawClass11Data = `Roll No	Student Name	Category	Father's Name	Mother's Name	Date of Birth	Admission Date	Admission No	Address	Aadhaar No	Phone No
1	Deb Biswas	SC	Karu Biswas	Annapurna Biswas	15/04/2010	15/06/2026	01	Uttar Kamalnagar	4143 1561 2000	9863335210
2	Pritush Das	SC	Samaresh Das	Bhanumati Das	26/09/2009	15/06/2026	02	Moharchera	8679 1980 2863	9863646633
3	Jwel Deb	UR	Sukanta Deb	Namita Mandal Deb	14/09/2009	15/06/2026	03	Moharchera	2715 2616 8901	6009536620
4	Rupa Acharjee	UR	Goutam Acharjee	Rina Acharjee	19/08/2009	15/06/2026	04	Moharchera	7424 6471 5966	8974640562
5	Ishmit Biswas	SC	Uttam Kumar Biswas	Kata Sarkar Biswas	10/02/2010	15/06/2026	05	Moharchera	5797 4016 6515	8974384412
6	Kaushik Debnath	OBC	Khokan Debnath	Kakali Debnath	03/09/2009	15/06/2026	06	Moharchera	5408 0566 1976	9233111775
7	Ruhan Das	SC	Surjit Das	Mamata Das	03/03/2010	15/06/2026	07	Moharchera	7798 9305 3475	9612828991
8	Rajib Sarkar	SC	Mahadeb Sarkar	Pramila Sarkar	23/01/2010	15/06/2026	08	Moharchera	7870 9223 7884	6009596539
9	Dhiman Das	UR	Dhananjoy Das	Swapna Sarkar Das	29/06/2009	15/06/2026	09	Moharchera	5494 5145 7106	9863195529
10	Tanip Nama	SC	Tapas Nama	Sobha Das Nama	23/03/2010	15/06/2026	10	Moharchera	4590 6634 4347	9366608870
11	Trishana Biswas	SC	Suresh Biswas	Jagat Rani Chowdhury Biswas		15/06/2026	11	Moharchera	5562 1117 5060	9366057167
12	Mouchit Das	SC	Narottam Das	Shilpi Das	25/03/2010	15/06/2026	12	Moharchera	8159 1151 1181	9233666304
13	Sujan Modak	OBC	Sanjoy Modak	Sima Debnath Modak	03/12/2009	15/06/2026	13	Kamalnagar, KLP	5165 5939 4113	9436029790
14	Subrajit Das	SC	Late Surjit Das	Sanju Saha Das	24/03/2010	15/06/2026	14	Moharchera	7034 3798 6349	7005560682
15	Ankita Das	SC	Ashish Das	Soma Das	22/07/2010	15/06/2026	15	Moharchera	5659 7621 5366	8119063909
16	Lipi Biswas	SC	Sukla Biswas	Niyati Biswas	09/09/2009	15/06/2026	16	Moharchera	8635 3839 0235	9485108315
17	Riktika Sarkar	SC	Ramu Sarkar	Shanti Sarkar	15/09/2010	15/06/2026	17	Uttar Kamalnagar	9344 9573 4833	9863053897
18	Adipta Das	SC	Harendra Das	Anita Das	11/06/2009	15/06/2026	18	Moharchera	7601 2199 3703	9863544600
19	Dipanjan Debnath	OBC	Niranjan Debnath	Bina Rani Debnath	18/01/2010	15/06/2026	19	Uttar Kamalnagar	9925 6552 3255	9366621697
20	Sandip Debnath	OBC	Shyamal Debnath	Srimati Debnath	02/06/2010	15/06/2026	20	Kamalnagar	8400 0163 4573	8415043203
21	Shovanjit Sarkar	SC	Jhantu Sarkar	Jharna Sarkar	03/02/2010	15/06/2026	21	Kamalnagar	9692 2001 6667	9863183074
22	Bipul Debnath	OBC	Bimal Debnath	Gita Debnath	26/09/2009	15/06/2026	22	Uttar Kamalnagar	4170 7681 7402	8787465775
23	Anamika Biswas	SC	Chitta Ranjan Biswas	Mani Bala Biswas	16/09/2010	15/06/2026	23	Moharchera	6810 8603 9453	8974627764
24	Reshmi Das	SC	Dilip Das	Rakhi Das	15/01/2010	15/06/2026	24	Kamalnagar	9595 9088 5252	9366981533
25	Jaya Das	UR	Sujit Das	Indu Das	13/04/2010	15/06/2026	25	Kamalnagar	4211 2680 5869	8259858030
26	Riya Sarkar	SC	Chandan Sarkar	Sarathi Sarkar	05/03/2010	15/06/2026	26	Uttar Kamalnagar	6880 6268 4036	8787463390
27	Ankita Das	SC	Bapi Ranjan Das	Saraswati Das	23/09/2009	15/06/2026	27	Kamalnagar	8475 6282 4887	8974385324
28	Jhuthika Nama	SC	Ajit Nama	Rekha Biswas Nama	10/01/2010	15/06/2026	28	Moharchera	5082 6261 8004	8415085864
29	Puja Debnath	OBC	Gopal Debnath	Pratima Debnath	20/02/2010	15/06/2026	29	Uttar Kamalnagar	9313 1154 0163	
30	Tripti Das	SC	Sanjit Das	Mallika Bala Das	12/09/2009	15/06/2026	30	Moharchera	3309 1384 4645	9366324358
31	Papiya Das	SC	Dipak Das	Bhagyasree Das	09/01/2010	15/06/2026	31	Moharchera	9068 2251 3613	7629941154
32	Bipash Das	SC	Bimal Das	Shipra Das	08/12/2009	15/06/2026	32	Moharchera	7259 1238 6256	7628025661
33	Rajesh Das	SC	Rakhal Das	Anima Das	22/01/2010	15/06/2026	33	Moharchera	9520 5640 6916	9612264877
34	Rajdeep Das	SC	Late Saranjit Das	Manika Das	05/11/2009	15/06/2026	34	Moharchera	6605 5438 8515	9612825486
35	Arghadeep Halder	SC	Rakesh Halder	Supriti Halder	06/10/2009	15/06/2026	35	Moharchera	2477 1456 4712	
36	Boishli Das	SC	Biswajit Das	Shefali Dhar Das	08/10/2010	15/06/2026	36	Kamalnagar	9562 6470 3201	8837385013
37	Debasmita Gope	UR	Surjit Kumar Gope	Khela Gope	01/10/2010	15/06/2026	37	Moharchera	8457 1828 8305	8974258685
38	Aparajita Das	SC	Sukanta Das	Shipra Das	12/10/2009	15/06/2026	38	Kamalnagar	5169 3419 0876	7005852678
39	Prasanjit Das	SC	Bishwanath Das	Rita Rani Das	30/12/2009	15/06/2026	39	Moharchera	8124 6208 4311	6009849651
40	Susmita Debnath	OBC	Niranjan Debnath	Bina Rani Debnath	18/01/2010	15/06/2026	40	Uttar Kamalnagar	6258 7630 0762	9366621697
42	Sandip Chandra Das	SC	Keshab Chandra Das	Bishu Bala Nama Das	21/09/2010	16/06/2026	42	Kamalnagar	2003 7646 5778	7005153733
43	Anamika Das	SC	Samir Das	Pati Das	18/08/2009	16/06/2026	43	Kamalnagar	5582 6539 6070	8730914218
44	Abhijit Das	SC	Lal Kamal Das	Shibu Rani Das	26/04/2010	16/06/2026	44	Moharchera	5848 5148 7537	8415891714
45	Sandip Biswas	SC	Goutam Biswas	Laxmi Das Biswas	12/12/2009	16/06/2026	45	Moharchera	8630 7602 5697	8414846792
46	Pritam Sarkar	SC	Uttam Sarkar	Putul Sarkar	02/11/2009	16/06/2026	46	Moharchera	0901 6233 9734	6009090457
47	Sukanta Das	SC	Sushil Das	Rina Bala Das	23/07/2009	16/06/2026	47	Moharchera	3117 3243 0092	8732823151
48	Biswajit Das	SC	Late Sudip Das	Rubi Rani Das	17/09/2009	16/06/2026	48	Kamalnagar	7009 8645 3353	7005443633
49	Akhil Sarkar	SC	Manoranjan Sarkar	Sarathi Sarkar	07/11/2008	16/06/2026	49	Kamalnagar	8745 7924 1446	8974866525
50	Tanmoy Sarkar	SC	Tapan Sarkar	Kabita Sarkar	16/03/2010	16/06/2026	50	Kamalnagar, KLP	4512 1871 6188	8974384684
51	Nayan Das	SC	Rupchan Das	Shipra Das	28/03/2010	16/06/2026	51	Moharchera	8360 9054 1428	8787833403
52	Nandini Das	SC	Mantu Das	Kajali Das	01/05/2009	16/06/2026	52	Moharchera	2902 8850 3121	9362773578
53	Arpita Mandal	SC	Abhijit Mandal	Adhari Mandal	10/01/2010	16/06/2026	53	Moharchera	5666 4583 6267	6009794441
54	Laxmi Rani Debnath	OBC	Marindra Debnath	Bharati Debnath	24/02/2010	16/06/2026	54	Trishabari	6930 9290 7003	8798524602
55	Sumen Das	SC	Sajal Das	Swapna Das	09/05/2010	16/06/2026	55	Moharchera	4880 4840 9416	8974760014
56	Shyantika Paul	UR	Biplab Paul	Rinku Paul	02/04/2010	16/06/2026	56	Totabari, KLP	2849 3524 6601	9233693030
57	Ashikha Sutradhar	OBC	Arun Sutradhar	Maya Rani Sutradhar	23/03/2010	16/06/2026	57	Purba Kalyanpur	9410 2566 4299	7005425226
58	Sangita Ghosh	UR	Jugal Ghosh	Namita Ghosh	13/06/2009	16/06/2026	58	Moharchera	5834 9471 4587	8414006297
59	Anamika Das	SC	Amalesh Das	Shila Rani Das	08/05/2010	16/06/2026		Moharchera	7473 7596 4416	8787354346
60	Supriya Sarkar	SC	Shyamal Sarkar	Shipra Sarkar	06/04/2010	16/06/2026	60	Kamalnagar	4474 1759 9880	6009358180
61	Kishan Sarkar	SC	Ratan Sarkar	Parash Mani Sarkar	31/08/2009	16/06/2026	61	Moharchera	9568 1914 3490	9366833840
62	Joy Sarkar	SC	Bhaskar Sarkar	Nipa Sarkar	08/09/2009	16/06/2026	62	Nayanpur, TLM	2661 4737 0706	7005345107
63	Anindita Das	SC	Shubha Lal Das	Parul Das	02/06/2009	17/06/2026	63	Moharchera	4621 0449 1149	8257080517
64	Sanjoy Mallik	SC	Nandalal Mallik	Anju Biswas Mallik	15/02/2009	17/06/2026		Rambabu Para, TLM	3303 8231 7692	7005138775
65	Ruma Das	SC	Dulal Das	Srijala Das	02/05/2010	17/06/2026	65	Kamalnagar	5095 5355 4563	7005884927
66	Joydipa Ghosh	OBC	Sribash Ghosh	Sanju Ghosh	14/08/2009	17/06/2026	66	Moharchera	8180 6610 3349	8132021108
67	Papiya Nama Sudra	SC	Mitan Nama Sudra	Dipali Nama Sudra	03/08/2010	17/06/2026	67	Moharchera	7477 2380 1811	
68	Susmita Saha	UR	Probir Saha	Tuni Roy Saha	12/05/2010	17/06/2026	68	Uttar Krishnapur, TLM	9669 8724 1370	9863850918
69	Sagar Das	SC	Sushil Das	Rina Das	28/09/2009	17/06/2026	69	Moharchera	4740 1545 5503	9366748288
70	Rima Debnath	OBC	Gour Debnath	Jhuma Debnath	22/11/2009	17/06/2026	70	Moharchera	2036 8730 3297	8787459779
71	Jiwel Debnath	OBC	Indrajit Debnath	Kalyani Biswas Debnath	14/03/2010	17/06/2026	71	North Kamalnagar, KLP	9126 1022 7276	9366743614
72	Anisha Sarkar	OBC	Ashish Sarkar	Sevika Sarkar	07/10/2009	17/06/2026	72	Chalitabari, TLM	6436 2515 3387	8787393381
73	Surajit Das	SC	Ranjit Das	Minu Sarkar Das	05/08/2009	17/06/2026	73	Krishnapur, TLM	7368 7275 4532	6033392489
74	Purnima Das	SC	Nripendra Das	Late Laxmi Rani Das	12/08/2009	18/06/2026	74	Kamalnagar, KLP	8759 1150 2488	9366857547
75	Himani Debnath	OBC	Ajit Debnath	Sipra Debnath	12/10/2009	18/06/2026	75	Uttar Kamalnagar	3147 4658 0991	7628035353
76	Asmita Das	SC	Subrata Das	Mampi Das	22/11/2009	18/06/2026	76	Kamalnagar, KLP	6461 0045 9681	8787637462
77	Manika Biswas	SC	Maran Biswas	Sathi Dey Biswas	21/01/2010	18/06/2026	77	Moharchera	7114 0157 4427	9863609966
78	Prasenjit Sarkar	SC	Ranjit Sarkar	Juma Rani Das Sarkar	01/08/2010	18/06/2026	78	South Ghilatali, KLP	8139 9519 5178	6009638694
79	Priyanka Majumder	UR	Nantu Majumder	Sumitra Kapali Majumder	16/06/2010	18/06/2026	79	Champhai, TLM	6711 8536 1403	8798524692
80	Chirashri Mallik	SC	Gurucharan Mallik	Rekha Mallik	20/07/2009	19/06/2026	80	Kamalnagar, Moharchera	5234 7042 3550	
81	Abai Sarkar	UR	Ajit Sarkar	Subhadra Sarkar	19/11/2008	19/06/2026	81	Kamalnagar, KLP	2261 9337 1165	
82	Subankar Sarkar	SC	Dilip Sarkar	Nandini Sarkar	13/04/2010	19/06/2026	82	Moharchera	3049 5752 9986	9863232065
83	Sebika Das	SC	Shyamal Chandra Das	Shipra Giri Das	29/07/2009	19/06/2026	83	Uttar Kamalnagar	3594 0938 6287	6009826528
84	Shakil Biswas	SC	Subash Biswas	Bulti Biswas	12/04/2009	19/06/2026	84	Ghilatali Bazar, KLP	9159 5639 8648	9366378074
85	Nayan Sarkar	SC	Nepal Sarkar	Rakhi Sarkar	17/11/2009	19/06/2026	85	Ghilatali Bazar, KLP	8681 3461 7642	8794402256
86	Manika Rani Saha	UR	Sushil Saha	Tapasi Rudra Paul Saha	23/03/2010	19/06/2026	86	Totabari, KLP	3517 6970 8775	9863661096
87	Jhumur Biswas	SC	Kajal Biswas	Saraswati Biswas	02/11/2009	19/06/2026	87	Totabari, KLP	2093 3429 0170	7085763004
88	Surabhi Biswas	SC	Nandu Biswas	Santi Das Biswas	17/08/2010	19/06/2026	88	Totabari, KLP	7214 5249 1767	6009487802
89	Trishna Sarkar	SC	Subash Sarkar	Mani Sarkar	28/06/2010	19/06/2026	89	Kamalnagar, KLP	3163 0004 9131	8414846714
90	Milan Biswas	UR	Haridhan Biswas	Soma Biswas	06/02/2008	19/06/2026	90	KLP	9279 9159 9610	8837464340
91	Ankita Sutradhar	OBC	Arjun Sutradhar	Dipali Sutradhar	25/11/2010	19/06/2026	91	Totabari, KLP	7210 1741 3453	9863865491
92	Arpita Biswas	SC	Sishu Biswas	Archana Biswas Das	05/08/2009	19/06/2026	92	Kalyanpur	6218 5584 3664	8415062408
93	Anamika Shil	OBC	Ashutosh Shil	Pinki Shil	28/09/2010	20/06/2026	93	Totabari, KLP	4060 6245 6637	6009892465
94	Susmita Biswas	SC	Sanjit Biswas	Anju Biswas	30/05/2010	20/06/2026	94	M.T. Para, TLM	3046 0122 2324	6009225119
95	Jyoti Biswas	SC	Kebal Biswas	Kutti Biswas	24/02/2010	20/06/2026	95	M.T. Para, TLM	0192 4080 3933	9089262326
96	Jayashree Barman	SC	Gopal Barman	Minati Barman	12/02/2010	20/06/2026	96	M.T. Para, TLM	9692 0349 0209	7005895620
97	Sumana Barman	SC	Renu Barman	Draupadi Barman	11/05/2009	20/06/2026	97	M.T. Para, TLM	7675 3077 6937	8798710104
98	Puja Debnath	OBC	Uttam Kumar Debnath	Sabita Debnath	08/09/2010	20/06/2026	98	Kalyanpur	3879 1661 2977	
99	Arpita Das	SC	Uttam Das	Sumitra Das	06/08/2010	20/06/2026	99	Uttar Kamalnagar	8927 7447 5629	8414812818
100	Rakhi Biswas	SC	Joydhan Biswas	Pranati Biswas	15/12/2009	20/06/2026	100	Kamalnagar	2437 3330 2149	
101	Jutan Sarkar	SC	Ratan Sarkar	Pinki Sarkar	07/08/2009	20/06/2026	101	Uttar Krishnapur, TLM	3273 7510 1798	8787700491
102	Hritika Debnath	OBC	Nantu Debnath	Saraswati Debnath	29/05/2010	20/06/2026	102	Uttar Kamalnagar, TLM	8337 4047 9581	7005572732
103	Moumita Biswas	SC	Santosh Biswas	Suchitra Biswas	05/06/2010	20/06/2026	103	M.T. Para, TLM	4320 8967 9529	9862229541
104	Chiranjit Biswas	SC	Pradip Biswas	Swapna Biswas	09/03/2010	20/06/2026	104	Krishnapur, TLM	9144 7181 4126	8974626047
105	Sabuj Sarkar	SC	Parimal Sarkar	Namita Sarkar	28/09/2010	22/06/2026	105	South Ghilatali, KLP	2449 7649 6113	9089508902
106	Rahul Nama Das	SC	Nirmal Nama Das	Monika Biswas Nama Das	04/01/2010	22/06/2026	106	South Ghilatali, KLP	8776 5770 4376	6009601008
107	Dipika Biswas	SC	Goutam Biswas	Mamata Biswas	16/01/2010	22/06/2026		Krishnapur, TLM	3253 9701 2410	8787647578
108	Susmita Biswas	SC	Shital Biswas	Kanika Biswas	23/10/2009	22/06/2026	108	M.T. Para, TLM	4636 7053 3847	8731809054
109	Rajdip Das	SC	Sanjit Das	Nipu Rani Das	02/04/2010	22/06/2026	109	M.T. Para, TLM	5432 8730 9443	
110	Ripan Das	SC	Bapan Das	Gita Rani Das	06/03/2010	22/06/2026	110	M.T. Para, TLM	4287 1037 9425	9366569063
111	Dipayan Debnath	OBC	Rupen Debnath	Shilpi Debnath	07/06/2010	22/06/2026	111	Moharchera	5548 3063 9864	7630888767
112	Santanu Das	SC	Kripa Charan Das	Anita Das	18/06/2010	22/06/2026	112	M.T. Para	2300 0404 6446	9366628393
113	Barsa Giri	OBC	Manoranjan Giri	Laxmi Giri	10/06/2010	22/06/2026	113	Kamalnagar, KLP	3388 4261 5848	7630939301
114	Subhajit Das	SC	Tapash Das	Jhuru Das	05/05/2010	22/06/2026	114	Kamalnagar, KLP	2321 8914 0509	7005098928
115	Rupak Biswas	SC	Sanjit Biswas	Sampa Das Biswas	04/03/2010	22/06/2026		South Ghilatali, KLP	5635 3287 4413	
116	Vijala Barma	SC	Jagadish Barma	Nayantara Barma	16/02/2010	22/06/2026		Amar Colony, KLP	3760 6106 0648	
117	Rinki Shil	UR	Manindra Shil	Prabhati Biswas Shil	16/04/2009	22/06/2026		Kalyanpur	2670 6853 2362	8798145961
118	Susmita Das	SC	Srijit Kumar Das	Pratima Das	14/03/2010	22/06/2026	118	Kamalnagar, KLP	2860 8026 8203	8787605133
119	Sunati Sarkar	SC	Khokan Sarkar	Niyati Sarkar	06/10/2010	22/06/2026	119	Kamalnagar, KLP	9927 8648 2136	7005394851
120	Niharika Biswas	SC	Mithan Biswas	Sabita Das Biswas	27/02/2010	22/06/2026	120	Uttar Kamalnagar, KLP	9528 0260 3735	9089148830
121	Piyash Debnath	OBC	Ganesh Debnath	Arati Debnath	21/12/2009	22/06/2026	121	M.T. Para, TLM	9415 7707 1046	9233612233
122	Hriday Das	SC	Shyamal Das	Rakhi Das	27/03/2010	22/06/2026	122	M.T. Para, TLM	7318 1899 6226	7627959578
123	Titash Majumder	UR	Chandan Majumder	Sefali Das Majumder	23/06/2010	22/06/2026	123	M.T. Para, TLM	3820 1238 9180	6009570551
124	Pritam Baishya	OBC	Indrajit Baishya	Annabarshi Sarkar Baishya	13/08/2009	22/06/2026	124	M.T. Para, TLM	8749 6874 5131	9362240110
125	Sahadeb Sarkar	SC	Haripada Sarkar	Kalpana Biswas Sarkar	14/12/2008	22/06/2026	125	Krishnapur, TLM	4384 0377 3658	6009227132
126	Sayen Das	SC	Nitai Das	Ratna Das	24/08/2009	22/06/2026	126	Nayanpur, TLM	8031 7226 1058	9233043443
127	Roman Biswas	SC	Dulal Biswas	Mani Biswas	13/02/2010	22/06/2026	127	Krishnapur, TLM	9733 6215 4948	9863043314
128	Harsit Das	SC	Jitendra Das	Srimati Das	30/01/2010	22/06/2026	128	M.T. Para, TLM	7135 1906 6803	7629983293
129	Prasanta Das	SC	Nantu Das	Anima Das	10/04/2010	22/06/2026	129	Kamalnagar, KLP	0008 7159 0764	9612578655
130	Anupriya Das	SC	Raj Kumar Das	Sumita Das	17/06/2010	22/06/2026	130	M.T. Para, TLM	5254 5772 3835	9089578105
131	Joy Das	SC	Subhash Chandra Das	Parbati Das	04/02/2010	22/06/2026	131	Kamalnagar, KLP	6811 1763 1023	8258063159
132	Tuhin Biswas	SC	Bidhan Biswas	Mithu Biswas	20/03/2010	22/06/2026	132	Uttar Kamalnagar, KLP	3858 8068 5555	9366435767
133	Sourav Das	SC	Sajal Das	Sukla Mandal Das	06/02/2010	22/06/2026	133	Uttar Kamalnagar, KLP	5401 4087 2751	8787889473
134	Rupan Sarkar	SC	Paritosh Sarkar	Anjana Sarkar	10/11/2009	23/06/2026	134	Nayanpur, TLM	3893 4335 9648	
135	Prashanta Paul	UR	Pritesh Paul	Mina Paul	06/01/2010	23/06/2026	135	Totabari, KLP	5784 8930 1229	
136	Anupam Biswas	SC	Amrit Biswas	Soma Biswas	15/05/2010	23/06/2026	136	Totabari, KLP	4430 9903 6531	6009497400
137	Durjoy Biswas	OBC	Tutan Biswas	Milan Biswas	15/04/2009	23/06/2026	137	Totabari, KLP	7692 8747 0414	7085403467
138	Amiel Rudra Paul	OBC	Goutam Rudra Paul	Draupadi Rudra Paul	17/05/2009	23/06/2026	138	Totabari, KLP	7159 3600 8350	7005185914
139	Nitesh Paul	UR	Nibash Paul	Suma Paul	11/01/2010	23/06/2026	139	Totabari, KLP	7592 3240 8339	6009437375
140	Abhijit Debnath	OBC	Arjun Debnath	Gita Rani Debnath	12/12/2009	23/06/2026	140	Totabari, KLP	4870 7197 7019	9612989175
141	Ausmita Sarkar	SC	Nirmal Sarkar	Pranati Sarkar	01/03/2010	23/06/2026	141	Nayanpur, TLM	7999 2271 0290	8974946652
142	Arpan Sarkar	UR	Mithon Sarkar	Sabitri Sarkar	01/01/2010	24/06/2026	142	Totabari, KLP	5878 6063 1894	7005572604
143	Hriday Biswas	SC	Shanti Biswas	Mira Biswas	10/08/2005	24/06/2026	143	Ghilatali, KLP	7086 1700 0156	9366528506
144	Hriday Das	SC	Subhajit Das	Rina Das	10/04/2009	24/06/2026	144	Kamalnagar, KLP	8514 0178 7460	9863055969
145	Bishal Sarkar	UR	Bikash Sarkar	Archana Choudhury Sarkar	05/02/2010	24/06/2026	145	Kamalnagar, KLP	3479 2693 2990	9362024039
146	Nilay Das	SC	Biswajit Das	Ahladi Nama Das	28/12/2009	24/06/2026	146	Kamalnagar, KLP	5189 7230 6244	9863536600
147	Abhijit Paul	UR	Haripada Paul	Ripan Paul	07/07/2010	24/06/2026	147	Aman Colony, KLP	4933 8987 1266	9089406021
148	Hrithik Modak	OBC	Nepal Chandra Modak	Lipika R. Paul Modak	31/03/2010	24/06/2026	148	Aman Colony, KLP	7347 5122 7974	9436183920
149	Bikram Paul	UR	Ganesh Paul	Mani Rani Paul	12/05/2010	25/06/2026	149	Aman Colony, KLP	5705 7927 0440	9366968551
150	Birkumar Barman	OBC	Binod Barman	Gunamani Barman	16/04/2010	25/06/2026	150	Aman Colony, KLP	4745 6014 2292	8798710947
151	Anup Barman	OBC	Akshay Barman	Taru Bala Barman	18/03/2010	25/06/2026	151	Aman Colony, KLP	3201 6802 0618	9863226803
152	Supriya Debnath	OBC	Uttam Kumar Debnath	Shilpi Debnath	02/07/2010	25/06/2026	152	Moharchera	3092 3185 8625	
153	Abhay Biswas	SC	Ananda Biswas	Swapna Biswas	17/01/2010	27/06/2026	153	M.T. Para, TLM	6474 1995 9443	8837024899
154	Soma Roy	OBC	Samir Roy	Sushmita Roy	02/09/2009	27/06/2026	154	M.T. Para	5417 4175 8800	9089359391
155	Akash Sarkar	SC	Pradip Sarkar	Arpita Sarkar	18/12/2007	20/06/2026	155	Madhya Krishnapur, TLM	4165 8378 2056	8787350375
156	Eshan Biswas	SC	Sajal Biswas	Swapna Biswas	14/10/2009	30/06/2026	156	Totabari, KLP	2285 4792 7404	6033552212
157	Sushankar Saha	UR	Subin Saha	Swapna Modak Saha	01/07/2009	30/06/2026	157	M.T. Para, TLM	6559 9512 5658	8787701969
158	Jiban Biswas	SC	Dilip Biswas	Anita Sarkar Biswas	25/01/2009	30/06/2026	158	M.T. Para, TLM	9170 7644 9377	6009721574
159	Tamal Das	SC	Tarani Das	Saraswati Dhowmik Das	05/08/2010	30/06/2026	159	M.T. Para, TLM	2167 4851 3224	9366460410
160	Amrit Biswas	SC	Ramani Biswas	Jyotsna Biswas	15/03/2009	30/06/2026	160	M.T. Para, TLM	4626 5100 9809	9366126662
161	Rahul Haldar	SC	Sachindra Haldar	Anjana Haldar	28/11/2008	30/06/2026	161	M.T. Para, TLM	4475 1179 2858	6009964806
162	Nayan Chowdhury	UR	Nikhil Chowdhury	Baby Chowdhury	02/06/2008	30/06/2026	162	M.T. Para, TLM	9861 4264 9065	9774363352
163	Ankita Biswas	UR	Sunil Biswas	Kanchan Biswas	26/06/2009	14/07/2026	163	M.T. Para	4512 8057 3870	9863935027
164	Shantanu Debnath	OBC	Sudhir Debnath	Soma Debnath	03/07/2010	05/08/2026	164	Moharchera	5598 5056 5863	6009306049
165	Chandini Das	SC	Bhagan Das	Kandirong Reang Das	06/11/2008	06/08/2026	165	Totabari, KLP	7457 3986 2352	9436563812`;

// Specific gender overrides for students without 321/322 registration prefix
const genderOverrides = {
  15: 'Girl', // Ankita Das
  20: 'Boy',  // Sandip Debnath
  27: 'Girl', // Ankita Das
  29: 'Girl', // Puja Debnath
  43: 'Girl', // Anamika Das
  59: 'Girl', // Anamika Das
  70: 'Girl', // Rima Debnath
  94: 'Girl', // Susmita Biswas
  98: 'Girl', // Puja Debnath
  108: 'Girl', // Susmita Biswas
  114: 'Boy', // Subhajit Das
  122: 'Boy', // Hriday Das
  144: 'Boy', // Hriday Das
  155: 'Boy', // Akash Sarkar
  157: 'Boy'  // Sushankar Saha
};

async function applyClass11Updates() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    const lines = rawClass11Data.trim().split('\n');
    console.log(`Processing ${lines.length - 1} spreadsheet records for Class XI...`);

    let updatedCount = 0;
    let createdCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      const cols = line.split('\t');

      const rollNum = parseInt(cols[0].trim(), 10);
      const name = (cols[1] || '').trim();
      const caste = (cols[2] || '').trim();
      const father = (cols[3] || '').trim();
      const mother = (cols[4] || '').trim();
      const dob = (cols[5] || '').trim();
      const admissionDate = (cols[6] || '').trim();
      const admissionNo = (cols[7] || '').trim();
      const address = (cols[8] || '').trim();
      const aadhaar = (cols[9] || '').trim();
      const phone = (cols[10] || '').trim();

      const rollStr = String(rollNum).padStart(2, '0');
      const studentId = `PMS-24-11A-${rollStr}`;

      let student = await Student.findOne({ classId: 'class-11-arts', rollNumber: rollNum });
      if (!student) {
        student = await Student.findOne({ classId: 'class-11-arts', roll: rollStr });
      }
      if (!student) {
        student = await Student.findOne({ studentId });
      }

      let isNew = false;
      if (!student) {
        isNew = true;
        student = new Student({
          studentId,
          roll: rollStr,
          rollNumber: rollNum,
          name,
          classId: 'class-11-arts',
          className: 'Class XI (Arts)',
          academicYear: '2026-2027',
          enrollmentYear: '2024',
          status: 'Enrolled'
        });
      }

      // Update fields
      if (name) student.name = name;
      if (caste) student.caste = caste;
      if (father) student.father = father;
      if (mother) student.mother = mother;
      student.guardian = father || mother || student.guardian || '';
      if (dob) {
        student.dob = dob;
      }
      if (admissionDate) student.admissionDate = admissionDate;
      if (admissionNo !== undefined) student.admissionNo = admissionNo;
      if (address) student.address = address;
      if (aadhaar) student.aadhaar = aadhaar;
      if (phone) {
        student.phone = phone;
      }

      // Determine gender accurately:
      if (genderOverrides[rollNum]) {
        student.gender = genderOverrides[rollNum];
      } else if (student.enrollmentNo && student.enrollmentNo.startsWith('321')) {
        student.gender = 'Boy';
      } else if (student.enrollmentNo && student.enrollmentNo.startsWith('322')) {
        student.gender = 'Girl';
      } else if (!student.gender) {
        student.gender = 'Boy';
      }

      student.status = 'Enrolled';

      await student.save();

      if (isNew) {
        createdCount++;
        console.log(`[CREATED] Roll ${rollStr}: ${student.name.padEnd(20, ' ')} | Adm: ${(student.admissionNo || '-').padEnd(4, ' ')} | Caste: ${(student.caste || '-').padEnd(4, ' ')} | Aadhaar: ${student.aadhaar || '-'}`);
      } else {
        updatedCount++;
        console.log(`[UPDATED] Roll ${rollStr}: ${student.name.padEnd(20, ' ')} | Adm: ${(student.admissionNo || '-').padEnd(4, ' ')} | Caste: ${(student.caste || '-').padEnd(4, ' ')} | Aadhaar: ${(student.aadhaar || '-').padEnd(14, ' ')} | Ph: ${(student.phone || '-').padEnd(10, ' ')} | Gender: ${student.gender}`);
      }
    }

    console.log(`\n================ Summary ================`);
    console.log(`Class XI (Arts) updated: ${updatedCount}`);
    console.log(`Class XI (Arts) created: ${createdCount}`);
    console.log(`Total processed: ${updatedCount + createdCount}`);

    // Check overall gender counts in DB
    const finalArts = await Student.find({ classId: 'class-11-arts' }).lean();
    const boysCount = finalArts.filter(s => s.gender === 'Boy').length;
    const girlsCount = finalArts.filter(s => s.gender === 'Girl').length;
    console.log(`Class XI (Arts) Gender Distribution: ${boysCount} Boys, ${girlsCount} Girls (Total: ${finalArts.length})`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error applying Class 11 updates:', err);
    process.exit(1);
  }
}

applyClass11Updates();
