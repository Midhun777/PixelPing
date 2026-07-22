export interface CountryData {
  id: string;
  iso2: string;
  name: string;
  altNames?: string[];
  flag: string;
  flagUrl?: string;
  capital: string;
  continent: 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania' | 'Antarctica';
  subregion: string;
  population: number; // in millions/exact
  areaSqKm: number;
  famousCities?: string[];
  landmark?: string;
  mountain?: string;
  river?: string;
}

export interface GeographyGameMeta {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Countries' | 'Flags' | 'Capitals' | 'Cities' | 'Continents' | 'Regions' | 'Population' | 'Landmarks' | 'Rivers' | 'Mountains' | 'Mixed';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  estimatedTime: string;
  gradient: string;
}

export const GEOGRAPHY_GAMES: GeographyGameMeta[] = [
  {
    id: 'country_flag',
    title: 'Country Guess (Flags)',
    description: 'Identify the country from its national flag.',
    icon: '🚩',
    category: 'Flags',
    difficulty: 'Easy',
    estimatedTime: '60 Sec',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'flag_country',
    title: 'Flag Guess (Names)',
    description: 'Select the correct national flag for the given country name.',
    icon: '🏳️‍🌈',
    category: 'Flags',
    difficulty: 'Easy',
    estimatedTime: '60 Sec',
    gradient: 'from-[#5B7FFF] to-indigo-600',
  },
  {
    id: 'capital_guess',
    title: 'Capital Sprint',
    description: 'Name the official capital city of the displayed country.',
    icon: '🏛️',
    category: 'Capitals',
    difficulty: 'Medium',
    estimatedTime: '90 Sec',
    gradient: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'country_capital',
    title: 'Country from Capital',
    description: 'Given a capital city, identify which country it belongs to.',
    icon: '📍',
    category: 'Capitals',
    difficulty: 'Medium',
    estimatedTime: '90 Sec',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'city_country',
    title: 'City → Country Match',
    description: 'Match world-famous metropolis cities to their home country.',
    icon: '🏙️',
    category: 'Cities',
    difficulty: 'Medium',
    estimatedTime: '60 Sec',
    gradient: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'country_continent',
    title: 'Continent Classifier',
    description: 'Determine which continent a country is located on.',
    icon: '🌍',
    category: 'Continents',
    difficulty: 'Easy',
    estimatedTime: '45 Sec',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    id: 'population_challenge',
    title: 'Population Showdown',
    description: 'Compare two countries and pick which one has a larger population.',
    icon: '👥',
    category: 'Population',
    difficulty: 'Hard',
    estimatedTime: '60 Sec',
    gradient: 'from-rose-500 to-red-600',
  },
  {
    id: 'area_challenge',
    title: 'Land Area Duel',
    description: 'Determine which country has the larger total land area.',
    icon: '📐',
    category: 'Countries',
    difficulty: 'Hard',
    estimatedTime: '60 Sec',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'landmark_guess',
    title: 'Landmark Explorer',
    description: 'Identify the country where famous world wonders & landmarks stand.',
    icon: '🗿',
    category: 'Landmarks',
    difficulty: 'Medium',
    estimatedTime: '60 Sec',
    gradient: 'from-purple-600 to-indigo-800',
  },
  {
    id: 'mountain_challenge',
    title: 'Peak & Mountain Quest',
    description: 'Match iconic mountain peaks and ranges to their home nations.',
    icon: '🏔️',
    category: 'Mountains',
    difficulty: 'Hard',
    estimatedTime: '60 Sec',
    gradient: 'from-blue-500 to-indigo-700',
  },
  {
    id: 'river_challenge',
    title: 'River & Waterway Master',
    description: 'Identify the countries through which major global rivers flow.',
    icon: '🌊',
    category: 'Rivers',
    difficulty: 'Hard',
    estimatedTime: '60 Sec',
    gradient: 'from-teal-400 to-cyan-700',
  },
  {
    id: 'mixed_geography',
    title: 'Mixed Geography Ultimate',
    description: 'Randomly combines every category into an intense ultimate quiz!',
    icon: '⚡',
    category: 'Mixed',
    difficulty: 'Expert',
    estimatedTime: '2 Mins',
    gradient: 'from-gradient-to-r from-[#5B7FFF] via-[#27D980] to-[#FFD84D]',
  },
];

export const COUNTRIES: CountryData[] = [
  // EUROPE
  { id: 'fra', iso2: 'fr', name: 'France', flag: '🇫🇷', capital: 'Paris', continent: 'Europe', subregion: 'Western Europe', population: 68.0, areaSqKm: 551695, famousCities: ['Paris', 'Marseille', 'Lyon', 'Nice'], landmark: 'Eiffel Tower', mountain: 'Mont Blanc', river: 'Seine' },
  { id: 'deu', iso2: 'de', name: 'Germany', flag: '🇩🇪', capital: 'Berlin', continent: 'Europe', subregion: 'Western Europe', population: 84.3, areaSqKm: 357022, famousCities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'], landmark: 'Brandenburg Gate', river: 'Rhine' },
  { id: 'ita', iso2: 'it', name: 'Italy', flag: '🇮🇹', capital: 'Rome', continent: 'Europe', subregion: 'Southern Europe', population: 58.8, areaSqKm: 301340, famousCities: ['Rome', 'Milan', 'Venice', 'Florence'], landmark: 'Colosseum', mountain: 'Dolomites', river: 'Po' },
  { id: 'esp', iso2: 'es', name: 'Spain', flag: '🇪🇸', capital: 'Madrid', continent: 'Europe', subregion: 'Southern Europe', population: 47.5, areaSqKm: 505990, famousCities: ['Madrid', 'Barcelona', 'Seville', 'Valencia'], landmark: 'Sagrada Família', river: 'Ebro' },
  { id: 'gbr', iso2: 'gb', name: 'United Kingdom', altNames: ['UK', 'Britain', 'Great Britain'], flag: '🇬🇧', capital: 'London', continent: 'Europe', subregion: 'Northern Europe', population: 67.3, areaSqKm: 242495, famousCities: ['London', 'Manchester', 'Edinburgh', 'Liverpool'], landmark: 'Big Ben', mountain: 'Ben Nevis', river: 'Thames' },
  { id: 'nld', iso2: 'nl', name: 'Netherlands', altNames: ['Holland'], flag: '🇳🇱', capital: 'Amsterdam', continent: 'Europe', subregion: 'Western Europe', population: 17.7, areaSqKm: 41543, famousCities: ['Amsterdam', 'Rotterdam', 'The Hague'], landmark: 'Kinderdijk Windmills', river: 'Rhine' },
  { id: 'bel', iso2: 'be', name: 'Belgium', flag: '🇧🇪', capital: 'Brussels', continent: 'Europe', subregion: 'Western Europe', population: 11.6, areaSqKm: 30528, famousCities: ['Brussels', 'Antwerp', 'Ghent', 'Bruges'], landmark: 'Atomium' },
  { id: 'che', iso2: 'ch', name: 'Switzerland', flag: '🇨🇭', capital: 'Bern', continent: 'Europe', subregion: 'Western Europe', population: 8.7, areaSqKm: 41285, famousCities: ['Zurich', 'Geneva', 'Bern'], landmark: 'Matterhorn', mountain: 'Matterhorn', river: 'Rhine' },
  { id: 'aut', iso2: 'at', name: 'Austria', flag: '🇦🇹', capital: 'Vienna', continent: 'Europe', subregion: 'Western Europe', population: 9.1, areaSqKm: 83871, famousCities: ['Vienna', 'Salzburg', 'Innsbruck'], landmark: 'Schönbrunn Palace', mountain: 'Alps', river: 'Danube' },
  { id: 'prt', iso2: 'pt', name: 'Portugal', flag: '🇵🇹', capital: 'Lisbon', continent: 'Europe', subregion: 'Southern Europe', population: 10.3, areaSqKm: 92090, famousCities: ['Lisbon', 'Porto', 'Faro'], landmark: 'Belém Tower', river: 'Tagus' },
  { id: 'grc', iso2: 'gr', name: 'Greece', flag: '🇬🇷', capital: 'Athens', continent: 'Europe', subregion: 'Southern Europe', population: 10.4, areaSqKm: 131957, famousCities: ['Athens', 'Thessaloniki', 'Santorini'], landmark: 'Acropolis of Athens', mountain: 'Mount Olympus' },
  { id: 'swe', iso2: 'se', name: 'Sweden', flag: '🇸🇪', capital: 'Stockholm', continent: 'Europe', subregion: 'Northern Europe', population: 10.5, areaSqKm: 450295, famousCities: ['Stockholm', 'Gothenburg', 'Malmö'], landmark: 'Vasa Museum' },
  { id: 'nor', iso2: 'no', name: 'Norway', flag: '🇳🇴', capital: 'Oslo', continent: 'Europe', subregion: 'Northern Europe', population: 5.4, areaSqKm: 385207, famousCities: ['Oslo', 'Bergen', 'Tromsø'], landmark: 'Geirangerfjord', mountain: 'Galdhøpiggen' },
  { id: 'dnk', iso2: 'dk', name: 'Denmark', flag: '🇩🇰', capital: 'Copenhagen', continent: 'Europe', subregion: 'Northern Europe', population: 5.9, areaSqKm: 42933, famousCities: ['Copenhagen', 'Aarhus'], landmark: 'The Little Mermaid' },
  { id: 'fin', iso2: 'fi', name: 'Finland', flag: '🇫🇮', capital: 'Helsinki', continent: 'Europe', subregion: 'Northern Europe', population: 5.5, areaSqKm: 338424, famousCities: ['Helsinki', 'Tampere', 'Rovaniemi'], landmark: 'Suomenlinna Fortress' },
  { id: 'pol', iso2: 'pl', name: 'Poland', flag: '🇵🇱', capital: 'Warsaw', continent: 'Europe', subregion: 'Eastern Europe', population: 36.8, areaSqKm: 312696, famousCities: ['Warsaw', 'Kraków', 'Gdańsk'], landmark: 'Wawel Royal Castle', river: 'Vistula' },
  { id: 'cze', iso2: 'cz', name: 'Czech Republic', altNames: ['Czechia'], flag: '🇨🇿', capital: 'Prague', continent: 'Europe', subregion: 'Eastern Europe', population: 10.5, areaSqKm: 78867, famousCities: ['Prague', 'Brno'], landmark: 'Charles Bridge', river: 'Vltava' },
  { id: 'hun', iso2: 'hu', name: 'Hungary', flag: '🇭🇺', capital: 'Budapest', continent: 'Europe', subregion: 'Eastern Europe', population: 9.6, areaSqKm: 93028, famousCities: ['Budapest', 'Debrecen'], landmark: 'Hungarian Parliament Building', river: 'Danube' },
  { id: 'irl', iso2: 'ie', name: 'Ireland', flag: '🇮🇪', capital: 'Dublin', continent: 'Europe', subregion: 'Northern Europe', population: 5.1, areaSqKm: 70273, famousCities: ['Dublin', 'Cork', 'Galway'], landmark: 'Cliffs of Moher' },
  { id: 'isvl', iso2: 'is', name: 'Iceland', flag: '🇮🇸', capital: 'Reykjavik', continent: 'Europe', subregion: 'Northern Europe', population: 0.38, areaSqKm: 103000, famousCities: ['Reykjavik', 'Akureyri'], landmark: 'Blue Lagoon' },

  // ASIA
  { id: 'jpn', iso2: 'jp', name: 'Japan', flag: '🇯🇵', capital: 'Tokyo', continent: 'Asia', subregion: 'East Asia', population: 125.1, areaSqKm: 377975, famousCities: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'], landmark: 'Mount Fuji', mountain: 'Mount Fuji' },
  { id: 'chn', iso2: 'cn', name: 'China', flag: '🇨🇳', capital: 'Beijing', continent: 'Asia', subregion: 'East Asia', population: 1411.8, areaSqKm: 9596961, famousCities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'], landmark: 'Great Wall of China', river: 'Yangtze' },
  { id: 'ind', iso2: 'in', name: 'India', flag: '🇮🇳', capital: 'New Delhi', continent: 'Asia', subregion: 'South Asia', population: 1428.6, areaSqKm: 3287263, famousCities: ['New Delhi', 'Mumbai', 'Bengaluru', 'Kolkata'], landmark: 'Taj Mahal', mountain: 'Himalayas', river: 'Ganges' },
  { id: 'kor', iso2: 'kr', name: 'South Korea', altNames: ['Korea'], flag: '🇰🇷', capital: 'Seoul', continent: 'Asia', subregion: 'East Asia', population: 51.7, areaSqKm: 100210, famousCities: ['Seoul', 'Busan', 'Incheon'], landmark: 'Gyeongbokgung Palace' },
  { id: 'idn', iso2: 'id', name: 'Indonesia', flag: '🇮🇩', capital: 'Jakarta', continent: 'Asia', subregion: 'Southeast Asia', population: 275.5, areaSqKm: 1904569, famousCities: ['Jakarta', 'Bali', 'Surabaya'], landmark: 'Borobudur Temple' },
  { id: 'tha', iso2: 'th', name: 'Thailand', flag: '🇹🇭', capital: 'Bangkok', continent: 'Asia', subregion: 'Southeast Asia', population: 71.6, areaSqKm: 513120, famousCities: ['Bangkok', 'Chiang Mai', 'Phuket'], landmark: 'Grand Palace Bangkok', river: 'Mekong' },
  { id: 'vnm', iso2: 'vn', name: 'Vietnam', flag: '🇻🇳', capital: 'Hanoi', continent: 'Asia', subregion: 'Southeast Asia', population: 98.2, areaSqKm: 331212, famousCities: ['Hanoi', 'Ho Chi Minh City', 'Da Nang'], landmark: 'Ha Long Bay', river: 'Mekong' },
  { id: 'sgp', iso2: 'sg', name: 'Singapore', flag: '🇸🇬', capital: 'Singapore', continent: 'Asia', subregion: 'Southeast Asia', population: 5.6, areaSqKm: 728, famousCities: ['Singapore'], landmark: 'Marina Bay Sands' },
  { id: 'mys', iso2: 'my', name: 'Malaysia', flag: '🇲🇾', capital: 'Kuala Lumpur', continent: 'Asia', subregion: 'Southeast Asia', population: 33.9, areaSqKm: 330803, famousCities: ['Kuala Lumpur', 'Penang'], landmark: 'Petronas Twin Towers' },
  { id: 'phl', iso2: 'ph', name: 'Philippines', flag: '🇵🇭', capital: 'Manila', continent: 'Asia', subregion: 'Southeast Asia', population: 115.6, areaSqKm: 300000, famousCities: ['Manila', 'Cebu', 'Davao'], landmark: 'Chocolate Hills' },
  { id: 'pak', iso2: 'pk', name: 'Pakistan', flag: '🇵🇰', capital: 'Islamabad', continent: 'Asia', subregion: 'South Asia', population: 240.5, areaSqKm: 881912, famousCities: ['Islamabad', 'Karachi', 'Lahore'], landmark: 'Faisal Mosque', mountain: 'K2', river: 'Indus' },
  { id: 'bgd', iso2: 'bd', name: 'Bangladesh', flag: '🇧🇩', capital: 'Dhaka', continent: 'Asia', subregion: 'South Asia', population: 171.2, areaSqKm: 147570, famousCities: ['Dhaka', 'Chittagong'], landmark: 'Sundarbans', river: 'Padma' },
  { id: 'lka', iso2: 'lk', name: 'Sri Lanka', flag: '🇱🇰', capital: 'Sri Jayawardenepura Kotte', altNames: ['Colombo'], continent: 'Asia', subregion: 'South Asia', population: 22.2, areaSqKm: 65610, famousCities: ['Colombo', 'Kandy'], landmark: 'Sigiriya Rock Fortress' },
  { id: 'npl', iso2: 'np', name: 'Nepal', flag: '🇳🇵', capital: 'Kathmandu', continent: 'Asia', subregion: 'South Asia', population: 30.5, areaSqKm: 147181, famousCities: ['Kathmandu', 'Pokhara'], landmark: 'Mount Everest', mountain: 'Mount Everest' },
  { id: 'are', iso2: 'ae', name: 'United Arab Emirates', altNames: ['UAE', 'Dubai'], flag: '🇦🇪', capital: 'Abu Dhabi', continent: 'Asia', subregion: 'Middle East', population: 9.4, areaSqKm: 83600, famousCities: ['Dubai', 'Abu Dhabi', 'Sharjah'], landmark: 'Burj Khalifa' },
  { id: 'sau', iso2: 'sa', name: 'Saudi Arabia', flag: '🇸🇦', capital: 'Riyadh', continent: 'Asia', subregion: 'Middle East', population: 36.4, areaSqKm: 2149690, famousCities: ['Riyadh', 'Jeddah', 'Mecca'], landmark: 'Kaaba Mecca' },
  { id: 'tur', iso2: 'tr', name: 'Turkey', altNames: ['Türkiye'], flag: '🇹🇷', capital: 'Ankara', continent: 'Asia', subregion: 'Middle East', population: 85.3, areaSqKm: 783562, famousCities: ['Istanbul', 'Ankara', 'Antalya'], landmark: 'Hagia Sophia' },
  { id: 'isr', iso2: 'il', name: 'Israel', flag: '🇮🇱', capital: 'Jerusalem', continent: 'Asia', subregion: 'Middle East', population: 9.7, areaSqKm: 22072, famousCities: ['Jerusalem', 'Tel Aviv'], landmark: 'Western Wall' },

  // NORTH AMERICA
  { id: 'usa', iso2: 'us', name: 'United States', altNames: ['USA', 'US', 'America'], flag: '🇺🇸', capital: 'Washington, D.C.', continent: 'North America', subregion: 'North America', population: 333.3, areaSqKm: 9833517, famousCities: ['New York', 'Los Angeles', 'Chicago', 'Miami'], landmark: 'Statue of Liberty', mountain: 'Denali', river: 'Mississippi' },
  { id: 'can', iso2: 'ca', name: 'Canada', flag: '🇨🇦', capital: 'Ottawa', continent: 'North America', subregion: 'North America', population: 38.9, areaSqKm: 9984670, famousCities: ['Toronto', 'Vancouver', 'Montreal'], landmark: 'CN Tower', mountain: 'Rocky Mountains', river: 'St. Lawrence' },
  { id: 'mex', iso2: 'mx', name: 'Mexico', flag: '🇲🇽', capital: 'Mexico City', continent: 'North America', subregion: 'Central America', population: 127.5, areaSqKm: 1964375, famousCities: ['Mexico City', 'Cancún', 'Guadalajara'], landmark: 'Chichen Itza' },
  { id: 'cub', iso2: 'cu', name: 'Cuba', flag: '🇨🇺', capital: 'Havana', continent: 'North America', subregion: 'Caribbean', population: 11.2, areaSqKm: 109884, famousCities: ['Havana', 'Varadero'], landmark: 'El Capitolio Havana' },
  { id: 'jam', iso2: 'jm', name: 'Jamaica', flag: '🇯🇲', capital: 'Kingston', continent: 'North America', subregion: 'Caribbean', population: 2.8, areaSqKm: 10991, famousCities: ['Kingston', 'Montego Bay'], landmark: 'Dunn\'s River Falls' },
  { id: 'cri', iso2: 'cr', name: 'Costa Rica', flag: '🇨🇷', capital: 'San José', continent: 'North America', subregion: 'Central America', population: 5.2, areaSqKm: 51100, famousCities: ['San José'], landmark: 'Arenal Volcano' },

  // SOUTH AMERICA
  { id: 'bra', iso2: 'br', name: 'Brazil', flag: '🇧🇷', capital: 'Brasília', continent: 'South America', subregion: 'South America', population: 215.3, areaSqKm: 8515767, famousCities: ['Rio de Janeiro', 'São Paulo', 'Brasília'], landmark: 'Christ the Redeemer', river: 'Amazon' },
  { id: 'arg', iso2: 'ar', name: 'Argentina', flag: '🇦🇷', capital: 'Buenos Aires', continent: 'South America', subregion: 'South America', population: 46.0, areaSqKm: 2780400, famousCities: ['Buenos Aires', 'Mendoza'], landmark: 'Iguazu Falls', mountain: 'Aconcagua' },
  { id: 'col', iso2: 'co', name: 'Colombia', flag: '🇨🇴', capital: 'Bogotá', continent: 'South America', subregion: 'South America', population: 51.9, areaSqKm: 1141748, famousCities: ['Bogotá', 'Medellín', 'Cartagena'], landmark: 'Ciudad Perdida' },
  { id: 'per', iso2: 'pe', name: 'Peru', flag: '🇵🇪', capital: 'Lima', continent: 'South America', subregion: 'South America', population: 33.7, areaSqKm: 1285216, famousCities: ['Lima', 'Cusco'], landmark: 'Machu Picchu', mountain: 'Andes' },
  { id: 'chl', iso2: 'cl', name: 'Chile', flag: '🇨🇱', capital: 'Santiago', continent: 'South America', subregion: 'South America', population: 19.6, areaSqKm: 756102, famousCities: ['Santiago', 'Valparaíso'], landmark: 'Easter Island Moai', mountain: 'Andes' },

  // AFRICA
  { id: 'egy', iso2: 'eg', name: 'Egypt', flag: '🇪🇬', capital: 'Cairo', continent: 'Africa', subregion: 'Northern Africa', population: 109.3, areaSqKm: 1002450, famousCities: ['Cairo', 'Alexandria', 'Luxor'], landmark: 'Great Pyramids of Giza', river: 'Nile' },
  { id: 'zaf', iso2: 'za', name: 'South Africa', flag: '🇿🇦', capital: 'Pretoria', altNames: ['Cape Town'], continent: 'Africa', subregion: 'Southern Africa', population: 59.9, areaSqKm: 1221037, famousCities: ['Johannesburg', 'Cape Town', 'Durban'], landmark: 'Table Mountain', mountain: 'Table Mountain' },
  { id: 'nga', iso2: 'ng', name: 'Nigeria', flag: '🇳🇬', capital: 'Abuja', continent: 'Africa', subregion: 'Western Africa', population: 218.5, areaSqKm: 923768, famousCities: ['Lagos', 'Abuja', 'Kano'], landmark: 'Zuma Rock', river: 'Niger' },
  { id: 'ken', iso2: 'ke', name: 'Kenya', flag: '🇰🇪', capital: 'Nairobi', continent: 'Africa', subregion: 'Eastern Africa', population: 54.0, areaSqKm: 580367, famousCities: ['Nairobi', 'Mombasa'], landmark: 'Maasai Mara', mountain: 'Mount Kenya' },
  { id: 'mar', iso2: 'ma', name: 'Morocco', flag: '🇲🇦', capital: 'Rabat', continent: 'Africa', subregion: 'Northern Africa', population: 37.5, areaSqKm: 446550, famousCities: ['Marrakech', 'Casablanca', 'Rabat'], landmark: 'Hassan II Mosque' },
  { id: 'eth', iso2: 'et', name: 'Ethiopia', flag: '🇪🇹', capital: 'Addis Ababa', continent: 'Africa', subregion: 'Eastern Africa', population: 123.4, areaSqKm: 1104300, famousCities: ['Addis Ababa'], landmark: 'Rock-Hewn Churches of Lalibela' },
  { id: 'tza', iso2: 'tz', name: 'Tanzania', flag: '🇹🇿', capital: 'Dodoma', altNames: ['Dar es Salaam'], continent: 'Africa', subregion: 'Eastern Africa', population: 65.5, areaSqKm: 945087, famousCities: ['Dar es Salaam', 'Zanzibar'], landmark: 'Mount Kilimanjaro', mountain: 'Mount Kilimanjaro' },

  // OCEANIA
  { id: 'aus', iso2: 'au', name: 'Australia', flag: '🇦🇺', capital: 'Canberra', continent: 'Oceania', subregion: 'Oceania', population: 26.0, areaSqKm: 7692024, famousCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'], landmark: 'Sydney Opera House', river: 'Murray' },
  { id: 'nzl', iso2: 'nz', name: 'New Zealand', flag: '🇳🇿', capital: 'Wellington', continent: 'Oceania', subregion: 'Oceania', population: 5.1, areaSqKm: 268021, famousCities: ['Auckland', 'Wellington', 'Christchurch'], landmark: 'Milford Sound', mountain: 'Aoraki / Mount Cook' },
  { id: 'fji', iso2: 'fj', name: 'Fiji', flag: '🇫🇯', capital: 'Suva', continent: 'Oceania', subregion: 'Oceania', population: 0.9, areaSqKm: 18274, famousCities: ['Suva', 'Nadi'], landmark: 'Mamanuca Islands' },
];

/**
 * Smart Believable Distractor Generator
 * Pulls wrong choices from the same continent/region so options are believable
 */
export function getSmartDistractors<T>(
  targetItem: CountryData,
  dataset: CountryData[],
  extractor: (item: CountryData) => T,
  count: number = 3
): T[] {
  const targetValue = extractor(targetItem);

  // 1. Same continent distractors
  const sameContinentPool = dataset.filter(
    (c) => c.continent === targetItem.continent && extractor(c) !== targetValue
  );

  // 2. Fallback pool (world)
  const worldPool = dataset.filter((c) => extractor(c) !== targetValue);

  const selectedDistractors: T[] = [];
  const usedValues = new Set<T>([targetValue]);

  // Shuffle array helper
  const shuffle = <Y>(arr: Y[]) => [...arr].sort(() => 0.5 - Math.random());

  const candidates = shuffle([...sameContinentPool, ...worldPool]);

  for (const candidate of candidates) {
    const val = extractor(candidate);
    if (!usedValues.has(val) && val !== null && val !== undefined && val !== '') {
      usedValues.add(val);
      selectedDistractors.push(val);
      if (selectedDistractors.length >= count) break;
    }
  }

  return selectedDistractors;
}

/**
 * Levenshtein Distance Fuzzy String Matcher
 * Accepts minor typos in type-in mode
 */
export function fuzzyMatch(userAnswer: string, targetAnswer: string, altNames?: string[]): boolean {
  const clean = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  const targetClean = clean(targetAnswer);
  const userClean = clean(userAnswer);

  if (userClean === targetClean) return true;

  if (altNames) {
    for (const alt of altNames) {
      if (clean(alt) === userClean) return true;
    }
  }

  // Levenshtein distance for 1-2 character typos
  const levenshtein = (a: string, b: string): number => {
    const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  };

  const dist = levenshtein(userClean, targetClean);
  const allowedMaxDistance = targetClean.length > 5 ? 2 : 1;
  return dist <= allowedMaxDistance;
}
