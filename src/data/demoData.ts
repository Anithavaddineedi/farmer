export const images = {
  hero: 'https://images.pexels.com/photos/13061059/pexels-photo-13061059.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600',
  heroAlt: 'https://images.pexels.com/photos/38885471/pexels-photo-38885471.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600',
  harvest: 'https://images.pexels.com/photos/11688197/pexels-photo-11688197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  womenHarvest: 'https://images.pexels.com/photos/11070641/pexels-photo-11070641.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  oxenPlow: 'https://images.pexels.com/photos/37013053/pexels-photo-37013053.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  wheatField: 'https://images.pexels.com/photos/9298428/pexels-photo-9298428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  wheatClose: 'https://images.pexels.com/photos/7891849/pexels-photo-7891849.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ricePaddy: 'https://images.pexels.com/photos/39602572/pexels-photo-39602572/free-photo-of-lush-green-rice-paddy-field-at-daytime.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tomatoes: 'https://images.pexels.com/photos/29479888/pexels-photo-29479888/free-photo-of-fresh-red-tomatoes-bounty-in-coimbatore-market.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cotton: 'https://images.pexels.com/photos/40204772/pexels-photo-40204772/free-photo-of-close-up-of-cotton-plant-in-bahawalpur.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mustard: 'https://images.pexels.com/photos/38277321/pexels-photo-38277321/free-photo-of-golden-mustard-field-at-sunset-with-farmers.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  onions: 'https://images.pexels.com/photos/28830895/pexels-photo-28830895/free-photo-of-fresh-onions-piled-in-market-basket.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  chickpeas: 'https://images.pexels.com/photos/28110905/pexels-photo-28110905/free-photo-of-chickpeas.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sugarcane: 'https://images.pexels.com/photos/11942833/pexels-photo-11942833.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  bananas: 'https://images.pexels.com/photos/36204961/pexels-photo-36204961/free-photo-of-fresh-bananas-hanging-at-a-market-in-malaysia.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  market: 'https://images.pexels.com/photos/37321079/pexels-photo-37321079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  marketVeg: 'https://images.pexels.com/photos/5807481/pexels-photo-5807481.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  onionsTomatoes: 'https://images.pexels.com/photos/31834230/pexels-photo-31834230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  smartphone: 'https://images.pexels.com/photos/16678079/pexels-photo-16678079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  yellowField: 'https://images.pexels.com/photos/6465/man-field-smartphone-yellow.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
  community: 'https://images.pexels.com/photos/37495850/pexels-photo-37495850.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  expert: 'https://images.pexels.com/photos/4975384/pexels-photo-4975384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  greenhouse: 'https://images.pexels.com/photos/6508543/pexels-photo-6508543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  expertWoman: 'https://images.pexels.com/photos/5622490/pexels-photo-5622490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  vegDisplay: 'https://images.pexels.com/photos/9705830/pexels-photo-9705830.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export type Crop = {
  id: number;
  name: string;
  category: 'Cereal' | 'Vegetable' | 'Fruit' | 'Pulse' | 'Oilseed' | 'Cash Crop';
  season: 'Rabi' | 'Kharif' | 'Zaid' | 'All Season';
  duration: string;
  yield: string;
  water: 'Low' | 'Medium' | 'High';
  image: string;
  description: string;
  soil: string;
  temperature: string;
};

export const crops: Crop[] = [
  {
    id: 1, name: 'Rice (Paddy)', category: 'Cereal', season: 'Kharif', duration: '110-130 days',
    yield: '2.5-3.5 ton/acre', water: 'High', image: images.ricePaddy,
    description: 'Rice is the staple food for over half of India. Grown predominantly in the Kharif season under flooded conditions, it thrives in clay and loamy soils.',
    soil: 'Clay, Loamy', temperature: '22-32°C',
  },
  {
    id: 2, name: 'Wheat', category: 'Cereal', season: 'Rabi', duration: '110-120 days',
    yield: '2.0-2.8 ton/acre', water: 'Medium', image: images.wheatField,
    description: 'Wheat is the second most important cereal crop in India. It is a Rabi crop sown in November and harvested in March-April, requiring cool climate and well-drained fertile soil.',
    soil: 'Loamy, Alluvial', temperature: '10-25°C',
  },
  {
    id: 3, name: 'Tomato', category: 'Vegetable', season: 'Zaid', duration: '70-85 days',
    yield: '8-12 ton/acre', water: 'Medium', image: images.tomatoes,
    description: 'Tomato is one of the most profitable vegetable crops. It requires a warm climate and well-drained soil. Can be grown in all three seasons with proper irrigation.',
    soil: 'Well-drained loamy', temperature: '20-28°C',
  },
  {
    id: 4, name: 'Cotton', category: 'Cash Crop', season: 'Kharif', duration: '150-180 days',
    yield: '1.5-2.0 ton/acre', water: 'Medium', image: images.cotton,
    description: 'Cotton is a major cash crop known as "White Gold". It requires a long growing season, plenty of sunshine, and a frost-free period. Grown mainly in Maharashtra, Gujarat, and Telangana.',
    soil: 'Black, Alluvial', temperature: '25-35°C',
  },
  {
    id: 5, name: 'Mustard', category: 'Oilseed', season: 'Rabi', duration: '90-110 days',
    yield: '0.8-1.2 ton/acre', water: 'Low', image: images.mustard,
    description: 'Mustard is an important Rabi oilseed crop. It is drought-tolerant and grows well in light soils. India is one of the largest producers of mustard in the world.',
    soil: 'Light loamy', temperature: '15-25°C',
  },
  {
    id: 6, name: 'Onion', category: 'Vegetable', season: 'Rabi', duration: '100-120 days',
    yield: '10-15 ton/acre', water: 'Medium', image: images.onions,
    description: 'Onion is a key vegetable crop grown across India. Maharashtra is the largest producer. It requires well-drained soil and moderate rainfall during the growing period.',
    soil: 'Sandy loam', temperature: '15-27°C',
  },
  {
    id: 7, name: 'Gram (Chickpea)', category: 'Pulse', season: 'Rabi', duration: '90-110 days',
    yield: '0.6-0.9 ton/acre', water: 'Low', image: images.chickpeas,
    description: 'Gram is the most important Rabi pulse crop in India. It is drought-resistant and fixes nitrogen in the soil, making it excellent for crop rotation.',
    soil: 'Sandy loam to medium black', temperature: '15-25°C',
  },
  {
    id: 8, name: 'Sugarcane', category: 'Cash Crop', season: 'All Season', duration: '10-12 months',
    yield: '30-40 ton/acre', water: 'High', image: images.sugarcane,
    description: 'Sugarcane is a long-duration cash crop that requires abundant water and warm climate. India is the second-largest producer of sugarcane in the world after Brazil.',
    soil: 'Deep, well-drained loamy', temperature: '20-35°C',
  },
  {
    id: 9, name: 'Banana', category: 'Fruit', season: 'All Season', duration: '300-365 days',
    yield: '25-30 ton/acre', water: 'High', image: images.bananas,
    description: 'Banana is a high-value fruit crop grown throughout the year in tropical regions. It requires warm, humid climate and rich, well-drained soil with good irrigation.',
    soil: 'Rich, well-drained', temperature: '25-30°C',
  },
];

export type MarketPrice = {
  id: number;
  crop: string;
  market: string;
  state: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  date: string;
};

export const marketPrices: MarketPrice[] = [
  { id: 1, crop: 'Rice (Common)', market: 'Navi Mumbai APMC', state: 'Maharashtra', price: 2850, unit: 'per quintal', trend: 'up', change: 3.2, date: '02 Sep 2026' },
  { id: 2, crop: 'Wheat', market: 'Khanna Mandi', state: 'Punjab', price: 2120, unit: 'per quintal', trend: 'stable', change: 0.5, date: '02 Sep 2026' },
  { id: 3, crop: 'Onion', market: 'Lasalgaon Mandi', state: 'Maharashtra', price: 1850, unit: 'per quintal', trend: 'down', change: -2.8, date: '01 Sep 2026' },
  { id: 4, crop: 'Tomato', market: 'Kolar Mandi', state: 'Karnataka', price: 2200, unit: 'per quintal', trend: 'up', change: 8.5, date: '02 Sep 2026' },
  { id: 5, crop: 'Cotton', market: 'Yavatmal Mandi', state: 'Maharashtra', price: 6800, unit: 'per quintal', trend: 'up', change: 1.8, date: '01 Sep 2026' },
  { id: 6, crop: 'Sugarcane', market: 'Meerut Mandi', state: 'Uttar Pradesh', price: 340, unit: 'per quintal', trend: 'stable', change: 0.0, date: '02 Sep 2026' },
  { id: 7, crop: 'Soybean', market: 'Indore Mandi', state: 'Madhya Pradesh', price: 4500, unit: 'per quintal', trend: 'up', change: 4.2, date: '01 Sep 2026' },
  { id: 8, crop: 'Gram (Chickpea)', market: 'Bikaner Mandi', state: 'Rajasthan', price: 5200, unit: 'per quintal', trend: 'down', change: -1.2, date: '02 Sep 2026' },
  { id: 9, crop: 'Mustard', market: 'Bharatpur Mandi', state: 'Rajasthan', price: 5650, unit: 'per quintal', trend: 'up', change: 2.1, date: '01 Sep 2026' },
  { id: 10, crop: 'Potato', market: 'Agra Mandi', state: 'Uttar Pradesh', price: 1200, unit: 'per quintal', trend: 'down', change: -5.4, date: '02 Sep 2026' },
  { id: 11, crop: 'Maize', market: 'Nizamabad Mandi', state: 'Telangana', price: 1980, unit: 'per quintal', trend: 'stable', change: 0.3, date: '01 Sep 2026' },
  { id: 12, crop: 'Banana', market: 'Jalgaon Mandi', state: 'Maharashtra', price: 1800, unit: 'per quintal', trend: 'up', change: 6.0, date: '02 Sep 2026' },
];

export type Scheme = {
  id: number;
  name: string;
  ministry: string;
  description: string;
  benefits: string;
  eligibility: string;
  category: 'Subsidy' | 'Insurance' | 'Loan' | 'Income Support' | 'Infrastructure';
};

export const schemes: Scheme[] = [
  {
    id: 1, name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)', ministry: 'Ministry of Agriculture',
    description: 'A central sector scheme providing income support to small and marginal farmer families holding cultivable land.',
    benefits: 'Rs. 6,000 per year in three equal instalments directly to bank accounts.',
    eligibility: 'All landholding farmer families with cultivable landholding up to 2 hectares.',
    category: 'Income Support',
  },
  {
    id: 2, name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', ministry: 'Ministry of Agriculture',
    description: 'A crop insurance scheme that provides financial support to farmers suffering crop loss or damage due to natural calamities, pests, and diseases.',
    benefits: 'Coverage up to full sum insured. Farmer premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops.',
    eligibility: 'All farmers growing notified crops in notified areas, including loanee and non-loanee farmers.',
    category: 'Insurance',
  },
  {
    id: 3, name: 'Kisan Credit Card (KCC)', ministry: 'Ministry of Finance',
    description: 'A scheme providing short-term formal credit to farmers for their cultivation needs, equipment, and post-harvest expenses.',
    benefits: 'Credit up to Rs. 3 lakh at 4% interest rate with subvention. Covers cultivation, equipment, and ancillary activities.',
    eligibility: 'All farmers, individual or joint borrowers, who own or cultivate land. Tenant farmers and oral lessees also eligible.',
    category: 'Loan',
  },
  {
    id: 4, name: 'Soil Health Card Scheme', ministry: 'Ministry of Agriculture',
    description: 'A scheme to provide soil health cards to farmers every two years, containing nutrient status and recommendations for appropriate dosage of fertilizers.',
    benefits: 'Free soil testing and customized fertilizer recommendations to improve soil fertility and reduce input costs.',
    eligibility: 'All farmers across India holding cultivable land.',
    category: 'Subsidy',
  },
  {
    id: 5, name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)', ministry: 'Ministry of Agriculture',
    description: 'An umbrella scheme aimed at providing irrigation facilities to every farm ("Har Khet Ko Pani") and improving water use efficiency ("Per Drop More Crop").',
    benefits: 'Subsidies up to 55% on micro-irrigation systems like drip and sprinkler irrigation. Free site surveys and technical support.',
    eligibility: 'All farmers. Special priority to small and marginal farmers, women farmers, and SC/ST farmers.',
    category: 'Infrastructure',
  },
  {
    id: 6, name: 'National Agriculture Market (eNAM)', ministry: 'Ministry of Agriculture',
    description: 'A pan-India electronic trading portal that networks existing APMC mandis to create a unified national market for agricultural commodities.',
    benefits: 'Online trading with transparent pricing, wider market access, and reduced transaction costs. Payment directly to farmer bank accounts.',
    eligibility: 'All farmers registered in eNAM-linked APMC mandis across participating states.',
    category: 'Infrastructure',
  },
];

export type Expert = {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  location: string;
  rating: number;
  queries: number;
  image: string;
};

export const experts: Expert[] = [
  { id: 1, name: 'Dr. Rajesh Verma', specialization: 'Agronomy & Soil Science', experience: '18 years', location: 'ICAR, New Delhi', rating: 4.9, queries: 1240, image: images.expert },
  { id: 2, name: 'Dr. Sunita Patil', specialization: 'Plant Pathology & Disease Control', experience: '12 years', location: 'UAS, Dharwad', rating: 4.8, queries: 890, image: images.expertWoman },
  { id: 3, name: 'Dr. Arjun Singh', specialization: 'Horticulture & Vegetable Crops', experience: '15 years', location: 'IIHR, Bengaluru', rating: 4.7, queries: 1050, image: images.expert },
  { id: 4, name: 'Dr. Meena Kumari', specialization: 'Entomology & Pest Management', experience: '10 years', location: 'IARI, New Delhi', rating: 4.8, queries: 720, image: images.expertWoman },
];

export type CommunityPost = {
  id: number;
  author: string;
  avatar: string;
  location: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  tags: string[];
};

export const communityPosts: CommunityPost[] = [
  {
    id: 1, author: 'Ramesh Patil', avatar: 'RP', location: 'Nashik, Maharashtra',
    category: 'Pest Control', title: 'How to deal with aphids on tomato plants?',
    content: 'My tomato crop has been affected by aphids for the past week. I tried neem oil spray but the infestation is still spreading. Has anyone used biological control methods successfully? Looking for organic solutions only.',
    likes: 24, comments: 8, time: '2 hours ago', tags: ['tomato', 'aphids', 'organic'],
  },
  {
    id: 2, author: 'Lakshmi Devi', avatar: 'LD', location: 'Warangal, Telangana',
    category: 'Market Trends', title: 'Cotton prices expected to rise this season',
    content: 'Based on the current demand in international markets and reduced acreage this year, cotton prices in Yavatmal mandi are likely to go above Rs. 7,000 per quintal by October. Fellow cotton farmers, hold your produce if you can afford to.',
    likes: 56, comments: 15, time: '5 hours ago', tags: ['cotton', 'prices', 'market'],
  },
  {
    id: 3, author: 'Harpreet Singh', avatar: 'HS', location: 'Ludhiana, Punjab',
    category: 'Machinery', title: 'Best drip irrigation system for 5 acres?',
    content: 'I am planning to install drip irrigation for my 5-acre vegetable farm under PMKSY subsidy. Which brand offers the best quality and after-sales service in Punjab? Looking for recommendations from those who have already installed systems.',
    likes: 31, comments: 12, time: '1 day ago', tags: ['irrigation', 'subsidy', 'machinery'],
  },
  {
    id: 4, author: 'Kavita Reddy', avatar: 'KR', location: 'Kolar, Karnataka',
    category: 'Crop Disease', title: 'Blight in rice nursery - urgent help needed',
    content: 'My rice nursery has developed brown spots on leaves, which I suspect is bacterial blight. The weather has been very humid. Should I uproot the nursery and start fresh, or can it be treated? Please advise urgently as sowing season is here.',
    likes: 18, comments: 22, time: '1 day ago', tags: ['rice', 'blight', 'disease'],
  },
  {
    id: 5, author: 'Mohammed Iqbal', avatar: 'MI', location: 'Malappuram, Kerala',
    category: 'Success Story', title: 'Doubled my income with mixed farming',
    content: 'Last year I switched from mono-cropping to mixed farming - coconut with intercrops of ginger, turmeric, and banana. My annual income went from Rs. 2.8 lakh to Rs. 5.5 lakh. The key was proper spacing and organic composting. Happy to share details!',
    likes: 89, comments: 27, time: '2 days ago', tags: ['success', 'mixed-farming', 'income'],
  },
];

export const weatherForecast = [
  { day: 'Today', date: '02 Sep', temp: 31, low: 24, condition: 'Partly Cloudy', humidity: 68, wind: 12, rain: 20, icon: 'cloud-sun' },
  { day: 'Wednesday', date: '03 Sep', temp: 29, low: 23, condition: 'Light Rain', humidity: 82, wind: 18, rain: 65, icon: 'cloud-rain' },
  { day: 'Thursday', date: '04 Sep', temp: 28, low: 22, condition: 'Heavy Rain', humidity: 90, wind: 25, rain: 85, icon: 'cloud-rain' },
  { day: 'Friday', date: '05 Sep', temp: 30, low: 23, condition: 'Thunderstorm', humidity: 85, wind: 22, rain: 75, icon: 'cloud-lightning' },
  { day: 'Saturday', date: '06 Sep', temp: 32, low: 25, condition: 'Sunny', humidity: 60, wind: 10, rain: 5, icon: 'sun' },
  { day: 'Sunday', date: '07 Sep', temp: 33, low: 25, condition: 'Sunny', humidity: 55, wind: 8, rain: 0, icon: 'sun' },
];

export const dashboardStats = [
  { label: 'Active Crops', value: '4', sub: 'Currently growing', icon: 'sprout', color: 'agri' },
  { label: 'Total Land', value: '6.5', sub: 'Acres under cultivation', icon: 'map-pin', color: 'sky' },
  { label: 'Market Value', value: 'Rs. 4.2L', sub: 'Estimated harvest value', icon: 'trending-up', color: 'earth' },
  { label: 'Pending Tasks', value: '3', sub: 'This week', icon: 'list-checks', color: 'amber' },
];

export const dashboardCrops = [
  { name: 'Rice (Paddy)', area: '2.5 acres', stage: 'Tillering', planted: '15 Jul 2026', harvest: 'Nov 2026', health: 85, icon: 'wheat' },
  { name: 'Tomato', area: '1.0 acres', stage: 'Flowering', planted: '10 Aug 2026', harvest: 'Oct 2026', health: 92, icon: 'cherry' },
  { name: 'Cotton', area: '2.0 acres', stage: 'Boll Formation', planted: '01 Jun 2026', harvest: 'Dec 2026', health: 78, icon: 'flower' },
  { name: 'Gram', area: '1.0 acres', stage: 'Sown', planted: '28 Aug 2026', harvest: 'Dec 2026', health: 95, icon: 'sprout' },
];

export const dashboardTasks = [
  { task: 'Apply urea to rice field', due: 'Today', priority: 'High', done: false },
  { task: 'Inspect tomato for pests', due: 'Today', priority: 'Medium', done: false },
  { task: 'Check cotton bollworm traps', due: 'Tomorrow', priority: 'High', done: false },
  { task: 'Soil test for gram plot', due: '05 Sep', priority: 'Low', done: true },
  { task: 'Water tomato nursery', due: '04 Sep', priority: 'Medium', done: true },
];
