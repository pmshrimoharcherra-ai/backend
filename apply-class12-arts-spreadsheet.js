import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const rawData = `1	Tapas Biswas	Dohai Biswas	Sumitra Biswas	26-10-2008	14-06-2025	26	4601 6247 5109	Kamalnagar	SC	9863011710	31202508123/2023	Bengali, English, Political Science, Education, History, IT	2025
2	Mandira Das	Ratan Kumar Das	Anjali Das	30-08-2008	14-06-2025	28	8295 9610 3627	Kamalnagar	SC	6009329577	32202508102/2023	Bengali, English, Political Science, Education, History	2025
3	Ankita Das	Raj Kumar Das	Riva Das	29-06-2008	16-06-2025	32	4163 7772 9606	Moharchera	SC	7630838617	32202508084/2023	Bengali, English, Political Science, Education, Philosophy, IT	2025
4	Kishan Das	Bidhan Chandra Das	Ratna Das	15-11-2008	16-06-2025	37	8696 8930 7222	Moharchera	SC	9612415118	31202508131/2023	Bengali, English, Political Science, History, Philosophy, IT	2025
5	Priti Das	Jiban Das	Pratima Das	14-01-2009	13-06-2025	7	5750 9059 9182	Moharchera	SC	6009916264	32202508125/2023	Bengali, English, Political Science, Education, History, IT	2025
6	Nandita Sarkar	Mahesh Sarkar	Suma Paul Sarkar	10-04-2009	30-06-2025	102	2566 8797 7489	M.T. Para, TLM	OBC	6009395606	32202507912/2023	Bengali, English, Political Science, Education, History	2025
7	Susmita Das	Goutam Lal Das	Sabita Das	03-11-2008	13-06-2025	6	6528 7488 0301	Moharchera	SC	6009621536	32202508120/2023	Bengali, English, Political Science, Education, History, IT	2025
8	Hritika Das	Premjit Das	Jamuna Das	14-06-2008	13-06-2025	13	5620 3846 3326	Moharchera	SC	8131841549	32202508150/2023	Bengali, English, Political Science, History, Philosophy, IT	2025
9	Trisha Sarkar	Kshitish Sarkar	Chandana Sarkar	25-11-2009	26-06-2025	85	6146 4534 7831	Ghilatali Bazar, KLP	SC		32202507966/2023	Bengali, English, Political Science, Education, History	2025
10	Jwel Sarkar	Chitta Ranjan Sarkar	Shipra Rani Sarkar	16-05-2009	13-06-2025	22	5641 0601 0183	Uttar Kamalnagar	SC	9366726497	32202508159/2023	Bengali, English, Political Science, Education, History, IT	2025
11	Gopal Gope	Pintu Gope	Rama Gope	10-01-2009	12-06-2025	1	8173 4125 0630	Kamalnagar, TLM	OBC	8792806437	31202508122/2023	Bengali, English, Political Science, Education, History	2025
12	Krishnandu Sarkar	Krishnadhan Sarkar	Sabita Sarkar	10-02-2009	12-06-2025	2	2990 7083 1367	Kamalnagar	SC	6009840959	31202508142/2023	Bengali, English, Political Science, Education, History	2025
13	Susmita Biswas	Uttam Biswas	Pushpa Biswas	25-05-2008	13-06-2025	3	5550 0245 0647	Kamalnagar	SC	9366457914	32202508099/2023	Bengali, English, Political Science, Education, History	2025
14	Sunali das	Bishu Das	Jhuma Das	20-01-2009	13-06-2025	4	6117 1472 8631	Kamalnagar	SC	9863346840	32202508090/2023	Bengali, English, Political Science, Education, History	2025
15	Bidyasree Das	Bikash Das	Titu Rani Das	28-05-2008	13-06-2025	5	9031 5278 6215	Moharchera	SC	8974646788	32202508093/2023	Bengali, English, Political Science, Education, History, IT	2025
16	Abhijit Biswas	Sajal Biswas	Archana Biswas	11-11-2008	13-06-2025	8	8379 9073 0370	Moharchera, Kamalnagar	SC		31202508101/2023	Bengali, English, Political Science, History, Philosophy	2025
17	Subham Das	Sankar Das	Kalpana Das	31-07-2008	13-06-2025	9	4588 1748 1941	Moharchera	SC	9362676382	31202508121/2023	Bengali, English, Political Science, History, Philosophy, IT	2025
18	Joydip Dhar	Dilip Dhar	Pranati Datta Dhar	10-11-2009	13-06-2025	10	3084 2019 7240	Kamalnagar	General		31202508214/2023	Bengali, English, Political Science, Education, History	2025
19	Subham Das	Ananta Das	Champa Sarkar Das	01-01-2009	13-06-2025	11	9348 5777 3847	Kamalnagar	SC	9863171438	31202508087/2023	Bengali, English, Political Science, Education, History, IT	2025
20	Sumit Biswas	Amarjit Biswas	Radha Biswas	27-03-2009	13-06-2025	12	5838 7277 4663	Moharchera	SC	9077608631	31202508095/2023	Bengali, English, Political Science, Education, History, IT	2025
21	Swastika Das	Indrajit Das	Shilpi Rani Das	24-07-2008	13-06-2025	14	2281 8642 9583	Moharchera	SC	8837253806	32202508111/2023	Bengali, English, Political Science, History, Philosophy, IT	2025
22	Anamika Biswas	Satyaraj Biswas	Mamata Biswas	01-09-2008	13-06-2025	15	6432 2271 4786	Kamalnagar	SC	6009182317	32202508152/2023	Bengali, English, Political Science, Education, History	2025
23	Puja Nama	Ninu Nama	Namita Nama	17-08-2008	13-06-2025	16	9907 0330 4367	Uttar Kamalnagar	SC	9863662267	32202508127/2023	Bengali, English, Political Science, Education, History	2025
24	Niloy Debnath	Pranesh Debnath	Rita Debnath	26-12-2008	13-06-2025	17	8985 7959 0976	Moharchera	OBC	6009273948	31202508108/2023	Bengali, English, Political Science, Philosophy, History, IT	2025
25	Sourabi Mandal	Nirmal Mandal	Sephali Das Mandal	27-06-2008	13-06-2025	18	5383 0566 8136	Moharchera	SC	8415841167	32202508146/2023	Bengali, English, Political Science, Education, History, IT	2025
26	Samarjit Chowdhury	Samir Chowdhury	Sukla Chowdhury	27-10-2008	13-06-2025	19	3211 5470 3048	Moharchera	General	9862387416	31202508148/2023	Bengali, English, Political Science, Education, History, IT	2025
27	Joyeta Debnath	Nanto Debnath	Sandhya Debnath	27-06-2009	13-06-2025	20	5714 6263 0619	Uttar Kamalnagar	OBC	7085528699	32202508106/2023	Bengali, English, Political Science, Education, History	2025
28	Suparna Debnath	Manoranjan Debnath	Swapna Debnath	17-11-2009	13-06-2025	21	4579 9642 3910	Uttar Kamalnagar	OBC	9612104020	32202508109/2023	Bengali, English, Political Science, Education, History	2025
29	Anupriya Debnath	Shridam Debnath	Jashoda Debnath	04-06-2009	13-06-2025	23	5091 2045 8826	Uttar Kamalnagar	OBC	9863376514	32202508135/2023	Bengali, English, Political Science, Education, History, IT	2025
30	Sagarika Biswas	Chitta Ranjan Biswas	Mani Bala Biswas	12-01-2009	14-06-2025	24	5949 6039 9031	Moharchera	SC	8974627764	32202508112/2023	Bengali, English, Political Science, Education, History, IT	2025
31	Krish Kumar Nama	Kamal Kumar Nama	Kakali Bhowmik Nama	15-05-2009	14-06-2025	25	6060 3582 3861	Moharchera	SC	7005534775	31202508085/2023	Bengali, English, Political Science, Education, History, IT	2025
32	Sudipta Das	Sajal Das	Drupadi Das	10-07-2008	14-06-2025	27	7571 4958 0310	Kamalnagar	SC	6009247264	31202508113/2023	Bengali, English, Political Science, Education, History, IT	2025
33	Subhrajit Das	Shital Das	Saraswati Das	04-01-2009	14-06-2025	29	5814 2232 4405	Uttar Krishnapur	SC	9863762539	31202508097/2023	Bengali, English, Political Science, Education, History	2025
34	Barsha Das	Sukumal Das	Bishakha Rani Sarkar Das	22-04-2009	14-06-2025	30	7411 8973 4326	Kamalnagar	SC	9612414514	32202508089/2023	Bengali, English, Political Science, Education, History	2025
35	Jayasree Debnath	Shyamal Debnath	Sabita Debnath	03-05-2009	14-06-2025	31	9788 6780 1069	Kamalnagar	OBC	9365333303	32202508190/2023	Bengali, English, Political Science, Education, History	2025
36	Priya Nandi	Sujit Nandi	Pinki Nandi	19-09-2008	16-06-2025	33	5741 9410 1514	Moharchera	SC	6009598469	32202508247/2023	Bengali, English, Political Science, Education, History, IT	2025
37	Supriya Das	Pradip Das	Swapna Das	01-05-2008	16-06-2025	34	7667 6182 1290	Moharchera	SC	9366353006	32202508136/2023	Bengali, English, Political Science, History, Philosophy	2025
38	Mandhira Das	Bidhan Das	Sabita Das	07-10-2008	16-06-2025	35	3085 9957 4480	Uttar Kamalnagar, KLP	SC	6000676704	32202508119/2023	Bengali, English, Political Science, Education, History	2025
39	Dipa Biswas	Dilip Biswas	Reba Rani Das Biswas	28-03-2009	16-06-2025	36	2717 8058 2365	Moharchera	SC	7085694829	32202508091/2023	Bengali, English, Political Science, Education, History	2025
40	Najan Nandi	Sujit Nandi	Pinki Nandi	19-09-2008	16-06-2025	38	7946 7213 4805	Moharchera	SC	6009598469	31202508094/2023	Bengali, English, Political Science, History, Philosophy, IT	2025
41	Pranjit Das	Parimal Das	Sumitra Das	11-12-2008	16-06-2025	39	2409 4199 6200	Moharchera	SC	8730934257	31202508140/2023	Bengali, English, Political Science, History, Philosophy	2025
42	Rupesh Sarkar	Jadab Sarkar	Soma Das Sarkar	23-10-2008	16-06-2025	40	5365 1487 4043	Moharchera	SC	7005020200	31202508133/2023	Bengali, English, Political Science, Education, History	2025
43	Ruma Rani Das	Bir Chandra Das	Purna Laxmi Das	20-09-2008	17-06-2025	41	2580 2968 3797	Moharchera	SC	8415890233	32202508143/2023	Bengali, English, Political Science, Education, History	2025
44	Alpana Das	Dilip Das	Anjana Das	01-01-2009	17-06-2025	42	6776 4836 5614	Moharchera	SC	7085852448	32202508217/2023	Bengali, English, Political Science, Education, History	2025
45	Mandhira Debnath	Gopal Debnath	Pratima Debnath	24-01-2009	17-06-2025	43	4854 5293 6717	Moharchera	OBC	9863592545	32202508110/2023	Bengali, English, Political Science, Education, Philosophy, IT	2025
46	Riya Nama	Ratan Nama	Srimati Biswas Nama	06-09-2008	17-06-2025	44	9453 0923 8743	Moharchera	SC	7005462798	32202508129/2023	Bengali, English, Political Science, Education, History	2025
47	Jayashree Gope	Indrajit Gope	Jharna Gope	23-11-2008	19-06-2025	45	4830 0339 7666	Moharchera	OBC	9366342701	32202508092/2023	Bengali, English, Political Science, Education, History	2025
48	Anusmita Sharma	Pradip Sharma	Manika Debnath Sharma	15-03-2009	20-06-2025	46	6579 7524 9357	Moharchera	OBC	6009535193	32202508083/2023	Bengali, English, Political Science, Education, History	2025
49	Pritam Sarkar	Naruttam Sarkar	Malina Das Sarkar	01-12-2008	20-06-2025	47	5801 0906 1338	Uttar Kamalnagar, KLP	SC	9612496235	31202508116/2023	Bengali, English, Political Science, Education, History, IT	2025
50	Sukla Barma	Jageshwar Barma	Jharna Barma	10-06-2009	21-06-2025	48	6818 0049 0692	Kalyanpur, KLP	SC	9233540715	32202500434/2023	Bengali, English, Political Science, Education, History, IT	2025
51	Nayan Sarkar	Nirdhan Sarkar	Anima Sarkar	16-10-2008	21-06-2025	49	8403 8763 4319	Nayanpur	SC	8974970088	31202500429/2023	Bengali, English, Political Science, Education, History, IT	2025
52	Sagarika Das	Animesh Das	Uma Sarkar Das	22-09-2008	24-06-2025	50	5227 4896 2630	Kamalnagar, KLP	SC	6009319126	32202508144/2023	Bengali, English, Political Science, Education, History	2025
53	Bristi Barman	Basudeb Barman	Shilpi Barman	16-02-2009	24-06-2025	51	8864 9438 0251	Totabari, KLP	OBC	9863535278	32202500435/2023	Bengali, English, Political Science, Education, History, IT	2025
54	Puja Rani Paul	Babul Paul	Lalita Barman Paul	02-03-2009	24-06-2025	52	8356 2772 5392	Aman Colony, KLP	General	9774189608	32202500433/2023	Bengali, English, Political Science, Education, History, IT	2025
55	Chiranjit Barma	Sushanta Barma	Fulmati Barma	04-06-2008	24-06-2025	53	3860 8630 4567	Aman Colony, KLP	SC	9774325250	31202500562/2023	Bengali, English, Political Science, Education, History	2025
56	Subhajit Shil	Narayan Shil	Malina Shil	14-12-2008	24-06-2025	54	5311 1610 1285	Moharchera	OBC	8413897176	31202500430/2023	Bengali, English, Political Science, Education, History, IT	2025
57	Subhajit Das	Nirmal Das	Sumitra Das	23-07-2008	25-06-2025	55	5111 1044 9431	Moharchera	SC	9148415081	31202533918/2023	Bengali, English, Political Science, Education, History	2025
58	Payel Nama Das	Nitai Nama Das	Malati Sarkar Nama Das	05-09-2008	25-06-2025	56	6083 9822 3546	Uttar Krishnapur, TLM	SC	6000275765	32202507265/2023	Bengali, English, Political Science, Education, Philosophy, IT	2025
59	Papiya Datta	Biswajit Datta	Junu Datta	05-08-2007	25-06-2025	57	7577 3305 5675	Uttar Krishnapur, TLM	OBC	6009109023	32202507277/2023	Bengali, English, Political Science, Education, Philosophy, IT	2025
60	Sandipa Das	Pradip Kumar Das	Soma Rani Das	20-12-2008	25-06-2025	58	6739 0535 9280	Totabari, KLP	SC	8257821607	32202507320/2023	Bengali, English, Political Science, Education, History	2025
61	Papiya Sarkar	Biswajit Sarkar	Ninu Bala Sarkar	10-11-2008	25-06-2025	59	8533 4863 1648	M.T. Para, TLM	SC	6033133041	32202507282/2023	Bengali, English, Political Science, Education, History, IT	2025
62	Sayan Shil	Manipada Shil	Saraswati Shil	04-01-2009	25-06-2025	60	9925 5333 1555	Moharchera	OBC	8974556718	31202514221/2023	Bengali, English, Political Science, Education, History, IT	2025
63	Abhijit Das	Amaresh Das	Rina Das	01-06-2010	25-06-2025	61	4847 4947 6812	Ghilatali Bazar, KLP	SC	8837206642	31202507984/2023	Bengali, English, Political Science, Education, History	2025
64	Krishnadhar Biswas	Santi Biswas	Dipali Biswas	23-04-2009	25-06-2025	62	9464 8072 2142	Ghilatali Bazar, KLP	SC	8837451156	31202507982/2023	Bengali, English, Political Science, Education, History	2025
65	Sani Nandi	Subal Nandi	Malina Nandi	02-09-2009	26-06-2025	63	2138 5746 7611	Moharchera	SC	6909787264	32202533917/2023	Bengali, English, Political Science, Education, History, IT	2025
66	Swarapa Das	Kamal Das	Ranjana Das	08-12-2009	26-06-2025	64	5227 0561 7258	Ghilatali Bazar, KLP	SC	6009597968	32202507989/2023	Bengali, English, Political Science, Education, History	2025
67	Sriparna Paul	Sujit Paul	Basanti Sarkar Paul	27-05-2009	26-06-2025	65	3188 5351 3329	Aman Colony, KLP	General	9863541593	32202500564/2023	Bengali, English, Political Science, Education, History	2025
68	Shilpi Das	Kali Charan Das	Arati Debnath	24-08-2009	26-06-2025	66	3577 7721 8886	Moharchera	SC	6909227122	32202533912/2023	Bengali, English, Political Science, Education, History	2025
69	Papriya Das	Sanjit Das	Rupashi Das	15-04-2009	26-06-2025	67	9367 5837 2285	Moharchera	SC	9362966903	32202533925/2023	Bengali, English, Political Science, Education, History	2025
70	Sunali Biswas	Brajendra Biswas	Sabita Biswas	29-12-2008	26-06-2025	68	8737 1560 7820	Totabari, KLP	SC	7005274725	32202507315/2023	Bengali, English, Political Science, Education, History	2025
71	Diya Biswas	Sankar Biswas	Ujala Sarkar Biswas	02-06-2009	26-06-2025	69	9274 6955 0630	Ghilatali Bazar, KLP	SC	7005903600	32202507072/2023	Bengali, English, Political Science, Education, History	2025
72	Sagar das	Sajal Das	Sukla Mandal Das	28-11-2008	26-06-2025	70	8445 3536 9497	Uttar Kamalnagar, TLM	SC	8787889473	31202507312/2023	Bengali, English, Political Science, Education, History	2025
73	Rahul Biswas	Gopal Biswas	Karuna Biswas	26-08-2008	26-06-2025	71	9243 4055 2169	Kamalnagar, TLM	SC	8837078379	31202507319/2023	Bengali, English, Political Science, Education, History	2025
74	Nayan Sannasi	Ranjit Sannyasi	Minati Sannyasi	27-05-2009	26-06-2025	72	2436 1888 3529	Totabari, KLP	OBC	8732872101	31202507330/2023	Bengali, English, Political Science, Education, History	2025
75	Joy Das	Sanjoy Das	Dipali Das	06-04-2009	26-06-2025	73	4297 8023 4644	Totabari, KLP	SC	9233666467	31202507321/2023	Bengali, English, Political Science, Education, History	2025
76	Riya Das	Ranjan Das	Nayan Rani Das	11-02-2009	26-06-2025	74	4341 2278 3534	Ghilatali Bazar, KLP	SC		32202507980/2023	Bengali, English, Political Science, Education, History	2025
77	Sabuj Sarkar	Sujit Sarkar	Supriya Biswas Sarkar	17-05-2008	26-06-2025	75	2113 9880 3586	Totabari, KLP	SC	8798349376	31202507334/2023	Bengali, English, Political Science, Education, History	2025
78	Rahul Biswas	Raimohan Biswas	Rakhi Chowdhury Biswas	07-12-2008	26-06-2025	76	8962 9979 7531	Totabari, KLP	SC	9863383066	31202507816/2023	Bengali, English, Political Science, Education, History	2025
79	Dip Saha	Benu Saha	Namita Rudrapaul Saha	21-11-2009	26-06-2025	77	3600 4794 4192	Totabari, KLP	General	9366549550	31202507324/2023	Bengali, English, Political Science, Education, History	2025
80	Juyal Biswas	Chandan Biswas	Sefali Namadas Biswas	30-01-2009	26-06-2025	78	8714 1341 9797	Totabari, KLP	SC	8416084470	32202507335/2023	Bengali, English, Political Science, Education, History	2025
81	Tina Sarkar	Bivision Sarkar	Mina Sarkar	25-09-2009	26-06-2025	79	6649 8822 8875	Totabari, KLP	SC	6000013865	32202507389/2023	Bengali, English, Political Science, Education, History, IT	2025
82	Uday Biswas	Changopal Biswas	Malati Biswas	28-06-2008	26-06-2025	80	7020 6498 7959	Totabari, KLP	SC	8257896011	31202507325/2023	Bengali, English, Political Science, Education, History	2025
83	Tushar Biswas	Tulsi Biswas	Kamala Biswas	23-04-2009	26-06-2025	81	8565 8331 5597	Ghilatali Bazar, KLP	SC	8132836561	31202507968/2023	Bengali, English, Political Science, Education, History	2025
84	Ashim Das	Haralal Das	Jayanti Das	22-11-2008	26-06-2025	82	8683 5632 0874	Ghilatali Bazar, KLP	SC	8730914133	31202507970/2023	Bengali, English, Political Science, Education, History	2025
85	Sayan Biswas	Mithan Biswas	Manika Sarkar Biswas	20-08-2009	26-06-2025	84	4499 4194 4272	Kamalnagar, KLP	SC	6009040863	31202507967/2023	Bengali, English, Political Science, Education, History	2025
86	Rahul Sarkar	Ratish Sarkar	Sabari Sarkar	06-01-2009	26-06-2025	86	8444 6146 0061	Ghilatali Bazar, KLP	SC		31202507992/2023	Bengali, English, Political Science, Education, History	2025
87	Sonia Das	Sanjoy Das	Mithika Das	27-01-2009	26-06-2025	87	5539 4454 9346	Ghilatali Bazar, KLP	SC	8837315638	32202507987/2023	Bengali, English, Political Science, Education, History	2025
88	Minati Das	Sarajit Das	Mira Das	11-04-2008	26-06-2025	88	8003 5918 6660	Ghilatali Bazar, KLP	SC	7630987379	32202507974/2023	Bengali, English, Political Science, Education, History	2025
89	Priyanka Das	Hara Kumar Das	Arati Das	09-03-2009	26-06-2025	89	8787 4188 7389	Ghilatali Bazar, KLP	SC	9863299621	32202507975/2023	Bengali, English, Political Science, Education, History	2025
90	Gourav Das	Bijoy Das	Renuka Bala Das	25-11-2008	26-06-2025	90	8190 3489 2400	Totabari, KLP	SC	6009632544	31202500431/2023	Bengali, English, Political Science, Education, History	2025
91	Deeya Biswas	Shanti Biswas	Mira Sarkar Biswas	13-06-2009	26-06-2025	91	8472 8410 0627	Ghilatali Bazar, KLP	SC	9366528506	32202507979/2023	Bengali, English, Political Science, Education, History	2025
92	Prianka Biswas	Biswajit Biswas	Parbati Nama Biswas	03-09-2008	26-06-2025	92	6022 0675 0815	M.T. Para, TLM	SC	8416056511	32202507889/2023	Bengali, English, Political Science, Education, Philosophy	2025
93	Jual Das	Jantosh Das	Sabita Das	02-09-2009	28-06-2025	93	8208 0980 8613	Totabari, KLP	SC	9615133564	32202507317/2023	Bengali, English, Political Science, Education, History	2025
94	Antara Sarkar	Bikash Sarkar	Rinku Sarkar	11-10-2008	28-06-2025	94	4688 4051 3955	Totabari, KLP	SC	7005988206	32202507322/2023	Bengali, English, Political Science, Education, History	2025
95	Anupriya Das	Swapan Das	Namita Das	17-03-2009	28-06-2025	95	9694 7235 7905	Totabari, KLP	SC	8798111840	32202507828/2023	Bengali, English, Political Science, Education, History	2025
96	Sarajit Das	Abinash Das	Rinku Das	20-01-2009	28-06-2025	96	7180 6300 1847	M.T. Para, TLM	SC	6009798725	31202507906/2023	Bengali, English, Political Science, Education, History	2025
97	Ananta Biswas	Ashish Bhowmik	Rita Sarkar Bhowmik	25-07-2008	28-06-2025	97	8179 7518 5694	M.T. Para, TLM	OBC	9366878789	31202507900/2023	Bengali, English, Political Science, Education, History	2025
98	Rahul Das	Rakhal Chandra Das	Mallika Das	17-06-2009	28-06-2025	98	6712 3844 5749	Moharchera	SC	9863468241	31202533924/2023	Bengali, English, Political Science, Education, History	2025
99	Himani Debnath	Late Rajmohan Debnath	Late Prabhati Debnath	28-05-2009	30-06-2025	100	6353 6395 8636	Moharchera, TLM	OBC	6033239483	32202508098/2023	Bengali, English, Political Science, Education, History, IT	2025
100	Bijoy Malakar	Bimal Malakar	Milan Malakar Das	15-04-2009	01-07-2025	103	4446 2670 4026	Champlai	SC	8730934143	31202507896/2023	Bengali, English, Political Science, Education, History, IT	2025
101	Akash Das	Nityananda Das	Suchitrabala Biswas Das	01-06-2009	01-07-2025	104	9044 4749 0783	Pakpribari, TLM	SC	7005786842	31202507919/2023	Bengali, English, Political Science, Education, History	2025
102	Purnima Das	Jiban Das	Mayarani Das	18-12-2008	01-07-2025	105	6803 2107 7094	Nayanpur	SC	9612933745	32202507839/2023	Bengali, English, Political Science, Education, History	2025
103	Sandipa Das	Adhir Das	Shilpi Das	22-06-2009	01-07-2025	106	3171 8744 6985	Totabari	SC	6009516851	32202507326/2023	Bengali, English, Political Science, Education, History	2025
104	Bina Das	Late Swapan Chandra Das	Ganga Das	12-06-2009	01-07-2025	107	6278 0329 8397	Kamalnagar	SC	7005144281	32202507905/2023	Bengali, English, Political Science, Education, History	2025
105	Minakshi Biswas	Indrajit Nama	Archana Sarkar Nama	18-11-2008	01-07-2025	108	9899 7360 7433	Champlai	SC	8837076246	32202507995/2023	Bengali, English, Political Science, Education, History	2025
106	Manchi Biswas	Pradip Biswas	Manika Biswas	05-12-2009	01-07-2025	109	7473 1386 3008	Kamalnagar	SC	8258816228	32202507301/2023	Bengali, English, Political Science, Education, History	2025
107	Nikita Biswas	Chandan Biswas	Soma Biswas	28-10-2008	01-07-2025	110	7635 7624 4598	Kamalnagar	SC	9366238027	32202507310/2023	Bengali, English, Political Science, Education, History	2025
108	Anup Biswas	Adhir Biswas	Shipra Biswas	19-07-2008	01-07-2025	111	5310 6774 8819	Uttar Kamalnagar, Totabari	SC	6909269688	31202507308/2023	Bengali, English, Political Science, Education, History	2025
109	Nikita Das	Rakhal Chandra Das	Late Aruna Das	15-04-2009	01-07-2025	112	5200 0315 3679	Kamalnagar	SC	9366597315	32202507314/2023	Bengali, English, Political Science, Education, History	2025
110	Munai Sarkar	Niranjan Sarkar	Shikha Biswas Sarkar	16-11-2009	01-07-2025	113	9574 3715 5436	Uttar Kamalnagar, Totabari	SC	8258907332	32202507311/2023	Bengali, English, Political Science, Education, History	2025
111	Pipasha Biswas	Thakurchan Biswas	Sefali Biswas	13-11-2008	01-07-2025	114	4870 9863 6824	Uttar Kamalnagar, Totabari	SC	9863672877	32202507308/2023	Bengali, English, Political Science, Education, History	2025
112	Jhuma Sarkar	Rajkumar Sarkar	Namita Sarkar	17-04-2008	01-07-2025	115	3055 9783 3182	Kamalnagar	SC	9863973475	32202507866/2023	Bengali, English, Political Science, Education, History	2025
113	Arjita Malakar	Late Subhash Malakar	Tarumala Biswas Malakar	24-03-2009	01-07-2025	116	 5556 2136 6904	Champlai	SC	8731010361	32202507893/2023	Bengali, English, Political Science, Education, History	2025
114	Alok Sarkar	Subhash Sarkar	Parbati Sarkar	29-10-2008	02-07-2025	117	7877 5058 3275	M.T. Para, TLM	SC	8729911621	31202502043/2023	Bengali, English, Political Science, Education, History	2025
115	Diya Sarkar	Matilal Sarkar	Jharna Sarkar	19-11-2008	02-07-2025	118	4474 0648 8664	M.T. Para, TLM	SC	9366692285	32202507915/2023	Bengali, English, Political Science, Education, History	2025
116	Ankita Sarkar	Khokan Sarkar	Kabita Majumder Sarkar	29-03-2009	02-07-2025	119	6116 1449 2602	Maigangon, TLM	SC	8787497087	32202507916/2023	Bengali, English, Political Science, Education, History, IT	2025
117	Sritika Sarkar	Haradhan Sukla Das	Jhulan Rani Das	14-09-2008	07-07-2025	122	2776 6311 3010	M.T. Para, TLM	SC	8787724871	32202515571/2023	Bengali, English, Political Science, Education, History	2025
118	Joy Biswas	Nirapad Biswas	Bandana Biswas	31-05-2008	28-07-2025	123	6246 0112 3429	Moharchera	SC	8787407613	31202508105/2023	Bengali, English, Political Science, Education, History	2025
119	Suhel Das	Indrajit Das	Chaya Das	11-10-2007	28-07-2025	124	2087 8977 0046	Kamalnagar, Moharchera	SC	9366950169	31202418779/2023	Bengali, English, Political Science, Education, History	2025
120	Rikesh Das	Ajit Das	Ranibala Das	29-12-2008	28-07-2025	125	2237 7603 0287	Moharchera	SC	6000833371	31202508104/2023	Bengali, English, Political Science, Education, History	2025
121	Ripan Biswas	Ajit Biswas	Mamata Namasudra Biswas	28-11-2008	28-07-2025	126	7982 2298 8362	Moharchera	SC	8118958561	31202508124/2023	Bengali, English, Political Science, Education, History	2025
122	Bibek Acharjee	Bijan Acharjee	Gitasri Mallik Acharjee	29-09-2008	28-07-2025	127	6513 0322 4500	Moharchera	General	9366362637	31202508088/2023	Bengali, English, Political Science, Education, History	2025
123	Prashanta	Swapan Biswas	Bina Biswas	01-01-2007	28-07-2025	128	5306 4091 4335	Moharchera	SC	6009562810	31202532102/2023	Bengali, English, Political Science, Education, History	2025
124	Ajit Sarkar	Madan Sarkar	Bina Sarkar	19-11-2008	28-07-2025	129	6367 5838 7105	Uttar Kamalnagar	SC	9366862396	31202508096/2023	Bengali, English, Political Science, Education, History	2025
125	Sayam Roy	Swapan Kumar Roy	Bulti Deb Roy	17-10-2008	28-07-2025	130	5827 2674 5533	Moharchera	SC	9362773622	31202508192/2023	Bengali, English, Political Science, Education, History	2025
126	Mintu Biswas	Hara Krishna Biswas	Rupali Sarkar Biswas	01-06-2008	28-07-2025	131	8425 4501 8668	Moharchera	SC	8787670517	31202508141/2023	Bengali, English, Political Science, Education, History	2025
127	Sayan Deb	Dwip Narayan Deb	Laxmi Deb	24-12-2008	28-07-2025	132	3699 7585 5638	Moharchera	General	6009492216	31202508134/2023	Bengali, English, Political Science, Education, History	2025
128	Joydip Mandal	Mahadeb Mandal	Samhita Sutradhar Mandal	16-10-2007	28-07-2025	133	4086 9965 1669	Moharchera	SC	9293711081	31202416743/2023	Bengali, English, Political Science, Education, History	2025
129	Angkita Barma	Narendra Barma	Niru Bala Barma	06-09-2008	28-07-2025	134	7986 6559 8391	Champlai	SC	8798554884	32202507888/2023	Bengali, English, Political Science, Education, History	2025
130	Manisha Sarkar	Pradip Sarkar	Anjana Das Sarkar	15-12-2008	28-07-2025	135	9575 7012 1519	Nayabari	SC	6009568217	32202507598/2023	Bengali, English, Political Science, Education, History	2025
131	Nandita Debnath	Sudhanshu Debnath	Suvashini Debnath	26-12-2008	29-07-2025	136	6919 7909 9872	Moharchera	OBC	8787449033	32202508100/2023	Bengali, English, Political Science, Education, History	2025
132	Bhabatosh Biswas	Tarun Biswas	Supriya Biswas	29-03-2008	31-07-2025	137	2131 0103 7588	Totabari	SC	6900983349	31202418940/2023	Bengali, English, Political Science, History, Education	2025
133	Rupak Biswas	Gourchan Biswas	Ruma Biswas	07-10-2009	31-07-2025	138	3274 7679 0927	Totabari	SC	9862759891	31202507309/2023	Bengali, English, Political Science, Education, History	2025
134	Sukrita Debnath	Benu Debnath	Anjana Debbarma Debnath	04-06-2008	08-08-2025	139	9792 4849 4694	Uttar Kamalnagar, Moharchera, TLM	OBC	8974385853	32202508108/2023	Bengali, English, Political Science, Education, History	2025
135	Ripan Deb	Goutam Deb	Barna Deb	09-09-2008	20-08-2025	140	4097 3825 6198	Ghilatali Bazar, KLP	OBC	7085405245	31202500563/2023	Bengali, English, Political Science, Education, History	2025`;

async function applyClass12ArtsSpreadsheet() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: "${mongoose.connection.name}"`);

    const lines = rawData.trim().split('\n');
    console.log(`Processing ${lines.length} Class XII (Arts) rows...`);

    let updatedCount = 0;

    for (const line of lines) {
      const parts = line.split('\t');
      const rollNum = parseInt(parts[0], 10);
      const rollStr = String(rollNum).padStart(2, '0');
      const name = parts[1]?.trim();
      const father = parts[2]?.trim() || '';
      const mother = parts[3]?.trim() || '';
      const dob = parts[4]?.trim() || '';
      const admissionDate = parts[5]?.trim() || '';
      const admissionNo = parts[6]?.trim() || '';
      const aadhaar = parts[7]?.trim() || '';
      const address = parts[8]?.trim() || '';
      const caste = parts[9]?.trim() || '';
      const phone = parts[10]?.trim() || '';
      const regRaw = parts[11]?.trim() || '';
      const subjectsRaw = parts[12]?.trim() || '';
      const yearRaw = parts[13]?.trim() || '2025';

      // Parse registration number and registration year from regRaw (e.g. "31202508123/2023")
      const regParts = regRaw.split('/');
      const cleanEnrollmentNo = regParts[0] ? regParts[0].trim() : '';
      const registrationYear = regParts[1] ? regParts[1].trim() : '2023';

      // Parse subjects array (mapping IT to standard IT/ITeS)
      const subjects = subjectsRaw.split(',')
        .map(s => {
          const t = s.trim();
          if (t === 'IT' || t === 'Information Technology') return 'IT/ITeS';
          return t;
        })
        .filter(Boolean);

      // Determine gender: TBSE reg number starting with 31 is Boy, 32 is Girl
      const gender = cleanEnrollmentNo.startsWith('32') ? 'Girl' : 'Boy';

      const studentId = `PMS-24-12A-${rollStr}`;

      const updateData = {
        studentId,
        roll: rollStr,
        rollNumber: rollNum,
        name,
        classId: 'class-12-arts',
        className: 'Class XII (Arts)',
        gender,
        father,
        mother,
        guardian: father,
        dob,
        admissionDate,
        admissionNo,
        aadhaar,
        address,
        caste,
        phone,
        enrollmentNo: cleanEnrollmentNo,
        enrollmentYear: yearRaw,
        registrationYear,
        subjects,
        academicYear: '2026-2027',
        status: 'Enrolled',
        attendance: '95%'
      };

      const res = await Student.findOneAndUpdate(
        { classId: 'class-12-arts', rollNumber: rollNum },
        { $set: updateData },
        { upsert: true, new: true }
      );

      updatedCount++;
    }

    console.log(`Successfully updated/upserted ${updatedCount} Class XII (Arts) records in MongoDB!`);

    // Verify stats
    const artsList = await Student.find({ classId: 'class-12-arts' }).sort({ rollNumber: 1 });
    console.log(`Verification: Total Class XII Arts in DB = ${artsList.length}`);
    const sc = artsList.filter(s => s.caste === 'SC').length;
    const obc = artsList.filter(s => s.caste === 'OBC').length;
    const gen = artsList.filter(s => s.caste === 'General' || s.caste === 'UR').length;
    const boys = artsList.filter(s => s.gender === 'Boy').length;
    const girls = artsList.filter(s => s.gender === 'Girl').length;
    console.log(`Caste breakdown: SC=${sc}, OBC=${obc}, General/UR=${gen}`);
    console.log(`Gender breakdown: Boys=${boys}, Girls=${girls}`);
    console.log('Sample Roll 01:', {
      roll: artsList[0].roll,
      name: artsList[0].name,
      dob: artsList[0].dob,
      enrNo: artsList[0].enrollmentNo,
      enrYear: artsList[0].enrollmentYear,
      regYear: artsList[0].registrationYear,
      subjects: artsList[0].subjects
    });

    await mongoose.connection.close();
    console.log('Database connection closed cleanly.');
  } catch (err) {
    console.error('Error applying Class 12 Arts spreadsheet:', err);
    process.exit(1);
  }
}

applyClass12ArtsSpreadsheet();
