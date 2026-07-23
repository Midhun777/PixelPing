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
  population: number; // in millions
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
    id: 'pure_country_typing',
    title: 'Pure Country Typing Blitz',
    description: 'Guess world countries purely by typing — auto-validates instantly as you type without pressing Enter!',
    icon: '⌨️',
    category: 'Countries',
    difficulty: 'Hard',
    estimatedTime: '60 Sec',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
  },
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
    gradient: 'from-[#6366F1] to-indigo-600',
  },
  {
    id: 'capital_guess',
    title: 'Capital Sprint',
    description: 'Name the official capital city of the displayed country.',
    icon: '🏛️',
    category: 'Capitals',
    difficulty: 'Medium',
    estimatedTime: '90 Sec',
    gradient: 'from-[#10B981] to-teal-600',
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
    gradient: 'from-[#6366F1] via-[#10B981] to-[#F59E0B]',
  },
];

export const COUNTRIES: CountryData[] = [
  // EUROPE (45 Sovereign Nations)
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
  { id: 'rou', iso2: 'ro', name: 'Romania', flag: '🇷🇴', capital: 'Bucharest', continent: 'Europe', subregion: 'Eastern Europe', population: 19.0, areaSqKm: 238397, famousCities: ['Bucharest', 'Cluj-Napoca', 'Brașov'], landmark: 'Bran Castle (Dracula\'s Castle)' },
  { id: 'ukr', iso2: 'ua', name: 'Ukraine', flag: '🇺🇦', capital: 'Kyiv', continent: 'Europe', subregion: 'Eastern Europe', population: 38.0, areaSqKm: 603628, famousCities: ['Kyiv', 'Lviv', 'Odesa'], landmark: 'St. Sophia Cathedral' },
  { id: 'srb', iso2: 'rs', name: 'Serbia', flag: '🇷🇸', capital: 'Belgrade', continent: 'Europe', subregion: 'Southern Europe', population: 6.8, areaSqKm: 88361, famousCities: ['Belgrade', 'Novi Sad'], landmark: 'Belgrade Fortress', river: 'Danube' },
  { id: 'hrv', iso2: 'hr', name: 'Croatia', flag: '🇭🇷', capital: 'Zagreb', continent: 'Europe', subregion: 'Southern Europe', population: 3.9, areaSqKm: 56594, famousCities: ['Zagreb', 'Dubrovnik', 'Split'], landmark: 'Plitvice Lakes National Park' },
  { id: 'svk', iso2: 'sk', name: 'Slovakia', flag: '🇸🇰', capital: 'Bratislava', continent: 'Europe', subregion: 'Eastern Europe', population: 5.4, areaSqKm: 49035, famousCities: ['Bratislava', 'Košice'], landmark: 'Bratislava Castle' },
  { id: 'bgr', iso2: 'bg', name: 'Bulgaria', flag: '🇧🇬', capital: 'Sofia', continent: 'Europe', subregion: 'Eastern Europe', population: 6.4, areaSqKm: 110994, famousCities: ['Sofia', 'Plovdiv', 'Varna'], landmark: 'Rila Monastery' },
  { id: 'svn', iso2: 'si', name: 'Slovenia', flag: '🇸🇮', capital: 'Ljubljana', continent: 'Europe', subregion: 'Southern Europe', population: 2.1, areaSqKm: 20273, famousCities: ['Ljubljana', 'Bled'], landmark: 'Lake Bled' },
  { id: 'est', iso2: 'ee', name: 'Estonia', flag: '🇪🇪', capital: 'Tallinn', continent: 'Europe', subregion: 'Northern Europe', population: 1.3, areaSqKm: 45227, famousCities: ['Tallinn', 'Tartu'], landmark: 'Tallinn Old Town' },
  { id: 'lva', iso2: 'lv', name: 'Latvia', flag: '🇱🇻', capital: 'Riga', continent: 'Europe', subregion: 'Northern Europe', population: 1.8, areaSqKm: 64589, famousCities: ['Riga', 'Jūrmala'], landmark: 'House of the Blackheads' },
  { id: 'ltu', iso2: 'lt', name: 'Lithuania', flag: '🇱🇹', capital: 'Vilnius', continent: 'Europe', subregion: 'Northern Europe', population: 2.8, areaSqKm: 65300, famousCities: ['Vilnius', 'Kaunas'], landmark: 'Hill of Crosses' },
  { id: 'lux', iso2: 'lu', name: 'Luxembourg', flag: '🇱🇺', capital: 'Luxembourg', continent: 'Europe', subregion: 'Western Europe', population: 0.66, areaSqKm: 2586, famousCities: ['Luxembourg City'], landmark: 'Bock Casemates' },
  { id: 'mlt', iso2: 'mt', name: 'Malta', flag: '🇲🇹', capital: 'Valletta', continent: 'Europe', subregion: 'Southern Europe', population: 0.53, areaSqKm: 316, famousCities: ['Valletta', 'Mdina'], landmark: 'St. John\'s Co-Cathedral' },
  { id: 'cyp', iso2: 'cy', name: 'Cyprus', flag: '🇨🇾', capital: 'Nicosia', continent: 'Europe', subregion: 'Southern Europe', population: 1.2, areaSqKm: 9251, famousCities: ['Nicosia', 'Limassol'], landmark: 'Aphrodite\'s Rock' },
  { id: 'alb', iso2: 'al', name: 'Albania', flag: '🇦🇱', capital: 'Tirana', continent: 'Europe', subregion: 'Southern Europe', population: 2.7, areaSqKm: 28748, famousCities: ['Tirana', 'Durrës'], landmark: 'Rozafa Castle' },
  { id: 'mkd', iso2: 'mk', name: 'North Macedonia', flag: '🇲🇰', capital: 'Skopje', continent: 'Europe', subregion: 'Southern Europe', population: 1.8, areaSqKm: 25713, famousCities: ['Skopje', 'Ohrid'], landmark: 'Lake Ohrid' },
  { id: 'bih', iso2: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦', capital: 'Sarajevo', continent: 'Europe', subregion: 'Southern Europe', population: 3.2, areaSqKm: 51197, famousCities: ['Sarajevo', 'Mostar'], landmark: 'Stari Most' },
  { id: 'mne', iso2: 'me', name: 'Montenegro', flag: '🇲🇪', capital: 'Podgorica', continent: 'Europe', subregion: 'Southern Europe', population: 0.62, areaSqKm: 13812, famousCities: ['Podgorica', 'Kotor'], landmark: 'Bay of Kotor' },
  { id: 'mda', iso2: 'md', name: 'Moldova', flag: '🇲🇩', capital: 'Chisinau', continent: 'Europe', subregion: 'Eastern Europe', population: 2.5, areaSqKm: 33846, famousCities: ['Chisinau'], landmark: 'Cricova Winery' },
  { id: 'geo', iso2: 'ge', name: 'Georgia', flag: '🇬🇪', capital: 'Tbilisi', continent: 'Europe', subregion: 'Eastern Europe', population: 3.7, areaSqKm: 69700, famousCities: ['Tbilisi', 'Batumi'], landmark: 'Gergeti Trinity Church', mountain: 'Mount Kazbek' },
  { id: 'arm', iso2: 'am', name: 'Armenia', flag: '🇦🇲', capital: 'Yerevan', continent: 'Europe', subregion: 'Eastern Europe', population: 2.9, areaSqKm: 29743, famousCities: ['Yerevan'], landmark: 'Monastery of Khor Virap', mountain: 'Mount Ararat' },
  { id: 'and', iso2: 'ad', name: 'Andorra', flag: '🇦🇩', capital: 'Andorra la Vella', continent: 'Europe', subregion: 'Southern Europe', population: 0.08, areaSqKm: 468, famousCities: ['Andorra la Vella'], landmark: 'Casa de la Vall' },
  { id: 'mco', iso2: 'mc', name: 'Monaco', flag: '🇲🇨', capital: 'Monaco', continent: 'Europe', subregion: 'Western Europe', population: 0.039, areaSqKm: 2.02, famousCities: ['Monte Carlo'], landmark: 'Monte Carlo Casino' },
  { id: 'san', iso2: 'sm', name: 'San Marino', flag: '🇸🇲', capital: 'San Marino', continent: 'Europe', subregion: 'Southern Europe', population: 0.034, areaSqKm: 61, famousCities: ['San Marino'], landmark: 'Guaita Tower' },
  { id: 'vat', iso2: 'va', name: 'Vatican City', altNames: ['Vatican', 'Holy See'], flag: '🇻🇦', capital: 'Vatican City', continent: 'Europe', subregion: 'Southern Europe', population: 0.0008, areaSqKm: 0.49, famousCities: ['Vatican City'], landmark: 'St. Peter\'s Basilica' },
  { id: 'lie', iso2: 'li', name: 'Liechtenstein', flag: '🇱🇮', capital: 'Vaduz', continent: 'Europe', subregion: 'Western Europe', population: 0.039, areaSqKm: 160, famousCities: ['Vaduz'], landmark: 'Vaduz Castle' },

  // ASIA (49 Sovereign Nations)
  { id: 'jpn', iso2: 'jp', name: 'Japan', flag: '🇯🇵', capital: 'Tokyo', continent: 'Asia', subregion: 'East Asia', population: 125.1, areaSqKm: 377975, famousCities: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'], landmark: 'Mount Fuji', mountain: 'Mount Fuji' },
  { id: 'chn', iso2: 'cn', name: 'China', flag: '🇨🇳', capital: 'Beijing', continent: 'Asia', subregion: 'East Asia', population: 1411.8, areaSqKm: 9596961, famousCities: ['Beijing', 'Shanghai', 'Guangzhou'], landmark: 'Great Wall of China', river: 'Yangtze' },
  { id: 'ind', iso2: 'in', name: 'India', flag: '🇮🇳', capital: 'New Delhi', continent: 'Asia', subregion: 'South Asia', population: 1428.6, areaSqKm: 3287263, famousCities: ['New Delhi', 'Mumbai', 'Bengaluru', 'Kolkata'], landmark: 'Taj Mahal', mountain: 'Himalayas', river: 'Ganges' },
  { id: 'kor', iso2: 'kr', name: 'South Korea', altNames: ['Korea'], flag: '🇰🇷', capital: 'Seoul', continent: 'Asia', subregion: 'East Asia', population: 51.7, areaSqKm: 100210, famousCities: ['Seoul', 'Busan', 'Incheon'], landmark: 'Gyeongbokgung Palace' },
  { id: 'prk', iso2: 'kp', name: 'North Korea', flag: '🇰🇵', capital: 'Pyongyang', continent: 'Asia', subregion: 'East Asia', population: 26.0, areaSqKm: 120538, famousCities: ['Pyongyang'], landmark: 'Juche Tower' },
  { id: 'idn', iso2: 'id', name: 'Indonesia', flag: '🇮🇩', capital: 'Jakarta', continent: 'Asia', subregion: 'Southeast Asia', population: 275.5, areaSqKm: 1904569, famousCities: ['Jakarta', 'Bali', 'Surabaya'], landmark: 'Borobudur Temple' },
  { id: 'tha', iso2: 'th', name: 'Thailand', flag: '🇹🇭', capital: 'Bangkok', continent: 'Asia', subregion: 'Southeast Asia', population: 71.6, areaSqKm: 513120, famousCities: ['Bangkok', 'Chiang Mai', 'Phuket'], landmark: 'Grand Palace Bangkok', river: 'Mekong' },
  { id: 'vnm', iso2: 'vn', name: 'Vietnam', flag: '🇻🇳', capital: 'Hanoi', continent: 'Asia', subregion: 'Southeast Asia', population: 98.2, areaSqKm: 331212, famousCities: ['Hanoi', 'Ho Chi Minh City'], landmark: 'Ha Long Bay', river: 'Mekong' },
  { id: 'sgp', iso2: 'sg', name: 'Singapore', flag: '🇸🇬', capital: 'Singapore', continent: 'Asia', subregion: 'Southeast Asia', population: 5.6, areaSqKm: 728, famousCities: ['Singapore'], landmark: 'Marina Bay Sands' },
  { id: 'mys', iso2: 'my', name: 'Malaysia', flag: '🇲🇾', capital: 'Kuala Lumpur', continent: 'Asia', subregion: 'Southeast Asia', population: 33.9, areaSqKm: 330803, famousCities: ['Kuala Lumpur', 'Penang'], landmark: 'Petronas Twin Towers' },
  { id: 'phl', iso2: 'ph', name: 'Philippines', flag: '🇵🇭', capital: 'Manila', continent: 'Asia', subregion: 'Southeast Asia', population: 115.6, areaSqKm: 300000, famousCities: ['Manila', 'Cebu'], landmark: 'Chocolate Hills' },
  { id: 'pak', iso2: 'pk', name: 'Pakistan', flag: '🇵🇰', capital: 'Islamabad', continent: 'Asia', subregion: 'South Asia', population: 240.5, areaSqKm: 881912, famousCities: ['Islamabad', 'Karachi', 'Lahore'], landmark: 'Faisal Mosque', mountain: 'K2', river: 'Indus' },
  { id: 'bgd', iso2: 'bd', name: 'Bangladesh', flag: '🇧🇩', capital: 'Dhaka', continent: 'Asia', subregion: 'South Asia', population: 171.2, areaSqKm: 147570, famousCities: ['Dhaka', 'Chittagong'], landmark: 'Sundarbans', river: 'Padma' },
  { id: 'lka', iso2: 'lk', name: 'Sri Lanka', flag: '🇱🇰', capital: 'Sri Jayawardenepura Kotte', altNames: ['Colombo'], continent: 'Asia', subregion: 'South Asia', population: 22.2, areaSqKm: 65610, famousCities: ['Colombo', 'Kandy'], landmark: 'Sigiriya Rock Fortress' },
  { id: 'npl', iso2: 'np', name: 'Nepal', flag: '🇳🇵', capital: 'Kathmandu', continent: 'Asia', subregion: 'South Asia', population: 30.5, areaSqKm: 147181, famousCities: ['Kathmandu', 'Pokhara'], landmark: 'Mount Everest', mountain: 'Mount Everest' },
  { id: 'btn', iso2: 'bt', name: 'Bhutan', flag: '🇧🇹', capital: 'Thimphu', continent: 'Asia', subregion: 'South Asia', population: 0.78, areaSqKm: 38394, famousCities: ['Thimphu', 'Paro'], landmark: 'Tiger\'s Nest Monastery (Paro Taktsang)' },
  { id: 'are', iso2: 'ae', name: 'United Arab Emirates', altNames: ['UAE', 'Dubai'], flag: '🇦🇪', capital: 'Abu Dhabi', continent: 'Asia', subregion: 'Middle East', population: 9.4, areaSqKm: 83600, famousCities: ['Dubai', 'Abu Dhabi'], landmark: 'Burj Khalifa' },
  { id: 'sau', iso2: 'sa', name: 'Saudi Arabia', flag: '🇸🇦', capital: 'Riyadh', continent: 'Asia', subregion: 'Middle East', population: 36.4, areaSqKm: 2149690, famousCities: ['Riyadh', 'Jeddah', 'Mecca'], landmark: 'Kaaba Mecca' },
  { id: 'tur', iso2: 'tr', name: 'Turkey', altNames: ['Türkiye'], flag: '🇹🇷', capital: 'Ankara', continent: 'Asia', subregion: 'Middle East', population: 85.3, areaSqKm: 783562, famousCities: ['Istanbul', 'Ankara'], landmark: 'Hagia Sophia' },
  { id: 'isr', iso2: 'il', name: 'Israel', flag: '🇮🇱', capital: 'Jerusalem', continent: 'Asia', subregion: 'Middle East', population: 9.7, areaSqKm: 22072, famousCities: ['Jerusalem', 'Tel Aviv'], landmark: 'Western Wall' },
  { id: 'qat', iso2: 'qa', name: 'Qatar', flag: '🇶🇦', capital: 'Doha', continent: 'Asia', subregion: 'Middle East', population: 2.7, areaSqKm: 11586, famousCities: ['Doha'], landmark: 'Museum of Islamic Art' },
  { id: 'kwt', iso2: 'kw', name: 'Kuwait', flag: '🇰🇼', capital: 'Kuwait City', continent: 'Asia', subregion: 'Middle East', population: 4.3, areaSqKm: 17818, famousCities: ['Kuwait City'], landmark: 'Kuwait Towers' },
  { id: 'omn', iso2: 'om', name: 'Oman', flag: '🇴🇲', capital: 'Muscat', continent: 'Asia', subregion: 'Middle East', population: 4.5, areaSqKm: 309500, famousCities: ['Muscat', 'Salalah'], landmark: 'Sultan Qaboos Grand Mosque' },
  { id: 'jor', iso2: 'jo', name: 'Jordan', flag: '🇯🇴', capital: 'Amman', continent: 'Asia', subregion: 'Middle East', population: 11.3, areaSqKm: 89342, famousCities: ['Amman', 'Aqaba'], landmark: 'Petra Treasury' },
  { id: 'lbn', iso2: 'lb', name: 'Lebanon', flag: '🇱🇧', capital: 'Beirut', continent: 'Asia', subregion: 'Middle East', population: 5.3, areaSqKm: 10452, famousCities: ['Beirut'], landmark: 'Baalbek Roman Ruins' },
  { id: 'irn', iso2: 'ir', name: 'Iran', flag: '🇮🇷', capital: 'Tehran', continent: 'Asia', subregion: 'Middle East', population: 88.5, areaSqKm: 1648195, famousCities: ['Tehran', 'Isfahan'], landmark: 'Persepolis Ancient City' },
  { id: 'irq', iso2: 'iq', name: 'Iraq', flag: '🇮🇶', capital: 'Baghdad', continent: 'Asia', subregion: 'Middle East', population: 44.5, areaSqKm: 438317, famousCities: ['Baghdad', 'Erbil'], landmark: 'Ziggurat of Ur', river: 'Tigris' },
  { id: 'khm', iso2: 'kh', name: 'Cambodia', flag: '🇰🇭', capital: 'Phnom Penh', continent: 'Asia', subregion: 'Southeast Asia', population: 16.8, areaSqKm: 181035, famousCities: ['Phnom Penh', 'Siem Reap'], landmark: 'Angkor Wat' },
  { id: 'mmr', iso2: 'mm', name: 'Myanmar', altNames: ['Burma'], flag: '🇲🇲', capital: 'Naypyidaw', continent: 'Asia', subregion: 'Southeast Asia', population: 54.2, areaSqKm: 676578, famousCities: ['Yangon', 'Mandalay'], landmark: 'Shwedagon Pagoda' },
  { id: 'lao', iso2: 'la', name: 'Laos', flag: '🇱🇦', capital: 'Vientiane', continent: 'Asia', subregion: 'Southeast Asia', population: 7.5, areaSqKm: 236800, famousCities: ['Vientiane', 'Luang Prabang'], landmark: 'Pha That Luang' },
  { id: 'mng', iso2: 'mn', name: 'Mongolia', flag: '🇲🇳', capital: 'Ulaanbaatar', continent: 'Asia', subregion: 'East Asia', population: 3.4, areaSqKm: 1564116, famousCities: ['Ulaanbaatar'], landmark: 'Genghis Khan Statue Complex' },
  { id: 'kaz', iso2: 'kz', name: 'Kazakhstan', flag: '🇰🇿', capital: 'Astana', continent: 'Asia', subregion: 'Central Asia', population: 19.8, areaSqKm: 2724900, famousCities: ['Astana', 'Almaty'], landmark: 'Baiterek Tower' },
  { id: 'uzb', iso2: 'uz', name: 'Uzbekistan', flag: '🇺🇿', capital: 'Tashkent', continent: 'Asia', subregion: 'Central Asia', population: 36.0, areaSqKm: 447400, famousCities: ['Tashkent', 'Samarkand'], landmark: 'Registan Square Samarkand' },
  { id: 'tkm', iso2: 'tm', name: 'Turkmenistan', flag: '🇹🇲', capital: 'Ashgabat', continent: 'Asia', subregion: 'Central Asia', population: 6.4, areaSqKm: 488100, famousCities: ['Ashgabat'], landmark: 'Darvaza Gas Crater (Door to Hell)' },
  { id: 'kgz', iso2: 'kg', name: 'Kyrgyzstan', flag: '🇰🇬', capital: 'Bishkek', continent: 'Asia', subregion: 'Central Asia', population: 6.8, areaSqKm: 199951, famousCities: ['Bishkek', 'Osh'], landmark: 'Lake Issyk-Kul' },
  { id: 'tjk', iso2: 'tj', name: 'Tajikistan', flag: '🇹🇯', capital: 'Dushanbe', continent: 'Asia', subregion: 'Central Asia', population: 10.1, areaSqKm: 143100, famousCities: ['Dushanbe'], landmark: 'Pamir Highway', mountain: 'Pamir Mountains' },
  { id: 'afg', iso2: 'af', name: 'Afghanistan', flag: '🇦🇫', capital: 'Kabul', continent: 'Asia', subregion: 'South Asia', population: 41.1, areaSqKm: 652230, famousCities: ['Kabul'], landmark: 'Minaret of Jam' },
  { id: 'mdv', iso2: 'mv', name: 'Maldives', flag: '🇲🇻', capital: 'Malé', continent: 'Asia', subregion: 'South Asia', population: 0.52, areaSqKm: 300, famousCities: ['Malé'], landmark: 'Overwater Bungalows Maldives' },
  { id: 'brn', iso2: 'bn', name: 'Brunei', flag: '🇧🇳', capital: 'Bandar Seri Begawan', continent: 'Asia', subregion: 'Southeast Asia', population: 0.45, areaSqKm: 5765, famousCities: ['Bandar Seri Begawan'], landmark: 'Omar Ali Saifuddien Mosque' },
  { id: 'twn', iso2: 'tw', name: 'Taiwan', flag: '🇹🇼', capital: 'Taipei', continent: 'Asia', subregion: 'East Asia', population: 23.9, areaSqKm: 36197, famousCities: ['Taipei', 'Kaohsiung'], landmark: 'Taipei 101' },
  { id: 'yem', iso2: 'ye', name: 'Yemen', flag: '🇾🇪', capital: 'Sana\'a', continent: 'Asia', subregion: 'Middle East', population: 33.7, areaSqKm: 527968, famousCities: ['Sana\'a', 'Aden'], landmark: 'Old City of Sana\'a' },
  { id: 'syr', iso2: 'sy', name: 'Syria', flag: '🇸🇾', capital: 'Damascus', continent: 'Asia', subregion: 'Middle East', population: 22.1, areaSqKm: 185180, famousCities: ['Damascus', 'Aleppo'], landmark: 'Ancient City of Damascus' },
  { id: 'tls', iso2: 'tl', name: 'East Timor', altNames: ['Timor-Leste'], flag: '🇹🇱', capital: 'Dili', continent: 'Asia', subregion: 'Southeast Asia', population: 1.3, areaSqKm: 14874, famousCities: ['Dili'], landmark: 'Cristo Rei of Dili' },
  { id: 'pse', iso2: 'ps', name: 'Palestine', flag: '🇵🇸', capital: 'Ramallah', continent: 'Asia', subregion: 'Middle East', population: 5.2, areaSqKm: 6020, famousCities: ['Ramallah', 'Gaza'], landmark: 'Church of the Nativity' },
  { id: 'bhr', iso2: 'bh', name: 'Bahrain', flag: '🇧🇭', capital: 'Manama', continent: 'Asia', subregion: 'Middle East', population: 1.5, areaSqKm: 765, famousCities: ['Manama'], landmark: 'Tree of Life Bahrain' },
  { id: 'aze', iso2: 'az', name: 'Azerbaijan', flag: '🇦🇿', capital: 'Baku', continent: 'Asia', subregion: 'Western Asia', population: 10.1, areaSqKm: 86600, famousCities: ['Baku'], landmark: 'Flame Towers Baku' },

  // NORTH AMERICA (23 Sovereign Nations)
  { id: 'usa', iso2: 'us', name: 'United States', altNames: ['USA', 'US', 'America'], flag: '🇺🇸', capital: 'Washington, D.C.', continent: 'North America', subregion: 'North America', population: 333.3, areaSqKm: 9833517, famousCities: ['New York', 'Los Angeles', 'Chicago', 'Miami'], landmark: 'Statue of Liberty', mountain: 'Denali', river: 'Mississippi' },
  { id: 'can', iso2: 'ca', name: 'Canada', flag: '🇨🇦', capital: 'Ottawa', continent: 'North America', subregion: 'North America', population: 38.9, areaSqKm: 9984670, famousCities: ['Toronto', 'Vancouver', 'Montreal'], landmark: 'CN Tower', mountain: 'Rocky Mountains', river: 'St. Lawrence' },
  { id: 'mex', iso2: 'mx', name: 'Mexico', flag: '🇲🇽', capital: 'Mexico City', continent: 'North America', subregion: 'Central America', population: 127.5, areaSqKm: 1964375, famousCities: ['Mexico City', 'Cancún', 'Guadalajara'], landmark: 'Chichen Itza' },
  { id: 'cub', iso2: 'cu', name: 'Cuba', flag: '🇨🇺', capital: 'Havana', continent: 'North America', subregion: 'Caribbean', population: 11.2, areaSqKm: 109884, famousCities: ['Havana', 'Varadero'], landmark: 'El Capitolio Havana' },
  { id: 'jam', iso2: 'jm', name: 'Jamaica', flag: '🇯🇲', capital: 'Kingston', continent: 'North America', subregion: 'Caribbean', population: 2.8, areaSqKm: 10991, famousCities: ['Kingston', 'Montego Bay'], landmark: 'Dunn\'s River Falls' },
  { id: 'cri', iso2: 'cr', name: 'Costa Rica', flag: '🇨🇷', capital: 'San José', continent: 'North America', subregion: 'Central America', population: 5.2, areaSqKm: 51100, famousCities: ['San José'], landmark: 'Arenal Volcano' },
  { id: 'pan', iso2: 'pa', name: 'Panama', flag: '🇵🇦', capital: 'Panama City', continent: 'North America', subregion: 'Central America', population: 4.4, areaSqKm: 75417, famousCities: ['Panama City'], landmark: 'Panama Canal' },
  { id: 'gtm', iso2: 'gt', name: 'Guatemala', flag: '🇬🇹', capital: 'Guatemala City', continent: 'North America', subregion: 'Central America', population: 17.6, areaSqKm: 108889, famousCities: ['Guatemala City', 'Antigua'], landmark: 'Tikal Mayan Ruins' },
  { id: 'dom', iso2: 'do', name: 'Dominican Republic', flag: '🇩🇴', capital: 'Santo Domingo', continent: 'North America', subregion: 'Caribbean', population: 11.1, areaSqKm: 48671, famousCities: ['Santo Domingo', 'Punta Cana'], landmark: 'Zona Colonial Santo Domingo' },
  { id: 'htv', iso2: 'ht', name: 'Haiti', flag: '🇭🇹', capital: 'Port-au-Prince', continent: 'North America', subregion: 'Caribbean', population: 11.7, areaSqKm: 27750, famousCities: ['Port-au-Prince'], landmark: 'Citadelle Laferrière' },
  { id: 'bah', iso2: 'bs', name: 'Bahamas', flag: '🇧🇸', capital: 'Nassau', continent: 'North America', subregion: 'Caribbean', population: 0.41, areaSqKm: 13943, famousCities: ['Nassau'], landmark: 'Atlantis Paradise Island' },
  { id: 'slv', iso2: 'sv', name: 'El Salvador', flag: '🇸🇻', capital: 'San Salvador', continent: 'North America', subregion: 'Central America', population: 6.3, areaSqKm: 21041, famousCities: ['San Salvador'], landmark: 'Santa Ana Volcano' },
  { id: 'hnd', iso2: 'hn', name: 'Honduras', flag: '🇭🇳', capital: 'Tegucigalpa', continent: 'North America', subregion: 'Central America', population: 10.4, areaSqKm: 112492, famousCities: ['Tegucigalpa'], landmark: 'Copán Mayan Ruins' },
  { id: 'nic', iso2: 'ni', name: 'Nicaragua', flag: '🇳🇮', capital: 'Managua', continent: 'North America', subregion: 'Central America', population: 6.9, areaSqKm: 130373, famousCities: ['Managua', 'Granada'], landmark: 'Masaya Volcano' },
  { id: 'tto', iso2: 'tt', name: 'Trinidad and Tobago', flag: '🇹🇹', capital: 'Port of Spain', continent: 'North America', subregion: 'Caribbean', population: 1.5, areaSqKm: 5130, famousCities: ['Port of Spain'], landmark: 'Pitch Lake' },
  { id: 'brb', iso2: 'bb', name: 'Barbados', flag: '🇧🇧', capital: 'Bridgetown', continent: 'North America', subregion: 'Caribbean', population: 0.28, areaSqKm: 430, famousCities: ['Bridgetown'], landmark: 'Harrison\'s Cave' },
  { id: 'blz', iso2: 'bz', name: 'Belize', flag: '🇧🇿', capital: 'Belmopan', continent: 'North America', subregion: 'Central America', population: 0.4, areaSqKm: 22966, famousCities: ['Belmopan', 'Belize City'], landmark: 'Great Blue Hole' },
  { id: 'vct', iso2: 'vc', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', capital: 'Kingstown', continent: 'North America', subregion: 'Caribbean', population: 0.1, areaSqKm: 389, famousCities: ['Kingstown'], landmark: 'Bequia Island' },
  { id: 'lca', iso2: 'lc', name: 'Saint Lucia', flag: '🇱🇨', capital: 'Castries', continent: 'North America', subregion: 'Caribbean', population: 0.18, areaSqKm: 616, famousCities: ['Castries'], landmark: 'The Pitons Mountains', mountain: 'The Pitons' },
  { id: 'grd', iso2: 'gd', name: 'Grenada', flag: '🇬🇩', capital: 'St. George\'s', continent: 'North America', subregion: 'Caribbean', population: 0.12, areaSqKm: 344, famousCities: ['St. George\'s'], landmark: 'Grand Anse Beach' },
  { id: 'atg', iso2: 'ag', name: 'Antigua and Barbuda', flag: '🇦🇬', capital: 'St. John\'s', continent: 'North America', subregion: 'Caribbean', population: 0.09, areaSqKm: 442, famousCities: ['St. John\'s'], landmark: 'Nelson\'s Dockyard' },
  { id: 'dma', iso2: 'dm', name: 'Dominica', flag: '🇩🇲', capital: 'Roseau', continent: 'North America', subregion: 'Caribbean', population: 0.07, areaSqKm: 751, famousCities: ['Roseau'], landmark: 'Boiling Lake Dominica' },
  { id: 'kna', iso2: 'kn', name: 'Saint Kitts and Nevis', flag: '🇰🇳', capital: 'Basseterre', continent: 'North America', subregion: 'Caribbean', population: 0.05, areaSqKm: 261, famousCities: ['Basseterre'], landmark: 'Brimstone Hill Fortress' },

  // SOUTH AMERICA (12 Sovereign Nations)
  { id: 'bra', iso2: 'br', name: 'Brazil', flag: '🇧🇷', capital: 'Brasília', continent: 'South America', subregion: 'South America', population: 215.3, areaSqKm: 8515767, famousCities: ['Rio de Janeiro', 'São Paulo', 'Brasília'], landmark: 'Christ the Redeemer', river: 'Amazon' },
  { id: 'arg', iso2: 'ar', name: 'Argentina', flag: '🇦🇷', capital: 'Buenos Aires', continent: 'South America', subregion: 'South America', population: 46.0, areaSqKm: 2780400, famousCities: ['Buenos Aires', 'Mendoza'], landmark: 'Iguazu Falls', mountain: 'Aconcagua' },
  { id: 'col', iso2: 'co', name: 'Colombia', flag: '🇨🇴', capital: 'Bogotá', continent: 'South America', subregion: 'South America', population: 51.9, areaSqKm: 1141748, famousCities: ['Bogotá', 'Medellín', 'Cartagena'], landmark: 'Ciudad Perdida' },
  { id: 'per', iso2: 'pe', name: 'Peru', flag: '🇵🇪', capital: 'Lima', continent: 'South America', subregion: 'South America', population: 33.7, areaSqKm: 1285216, famousCities: ['Lima', 'Cusco'], landmark: 'Machu Picchu', mountain: 'Andes' },
  { id: 'chl', iso2: 'cl', name: 'Chile', flag: '🇨🇱', capital: 'Santiago', continent: 'South America', subregion: 'South America', population: 19.6, areaSqKm: 756102, famousCities: ['Santiago', 'Valparaíso'], landmark: 'Easter Island Moai', mountain: 'Andes' },
  { id: 'ven', iso2: 've', name: 'Venezuela', flag: '🇻🇪', capital: 'Caracas', continent: 'South America', subregion: 'South America', population: 28.3, areaSqKm: 916445, famousCities: ['Caracas', 'Maracaibo'], landmark: 'Angel Falls', river: 'Orinoco' },
  { id: 'ecu', iso2: 'ec', name: 'Ecuador', flag: '🇪🇨', capital: 'Quito', continent: 'South America', subregion: 'South America', population: 18.0, areaSqKm: 283561, famousCities: ['Quito', 'Guayaquil'], landmark: 'Galápagos Islands' },
  { id: 'bol', iso2: 'bo', name: 'Bolivia', flag: '🇧🇴', capital: 'Sucre', altNames: ['La Paz'], continent: 'South America', subregion: 'South America', population: 12.2, areaSqKm: 1098581, famousCities: ['La Paz', 'Sucre'], landmark: 'Salar de Uyuni Salt Flats' },
  { id: 'pry', iso2: 'py', name: 'Paraguay', flag: '🇵🇾', capital: 'Asunción', continent: 'South America', subregion: 'South America', population: 6.8, areaSqKm: 406752, famousCities: ['Asunción'], landmark: 'Itaipu Dam' },
  { id: 'ury', iso2: 'uy', name: 'Uruguay', flag: '🇺🇾', capital: 'Montevideo', continent: 'South America', subregion: 'South America', population: 3.4, areaSqKm: 176215, famousCities: ['Montevideo', 'Punta del Este'], landmark: 'Casapueblo' },
  { id: 'guy', iso2: 'gy', name: 'Guyana', flag: '🇬🇾', capital: 'Georgetown', continent: 'South America', subregion: 'South America', population: 0.8, areaSqKm: 214969, famousCities: ['Georgetown'], landmark: 'Kaieteur Falls' },
  { id: 'sur', iso2: 'sr', name: 'Suriname', flag: '🇸🇷', capital: 'Paramaribo', continent: 'South America', subregion: 'South America', population: 0.6, areaSqKm: 163820, famousCities: ['Paramaribo'], landmark: 'Central Suriname Nature Reserve' },

  // AFRICA (54 Sovereign Nations)
  { id: 'egy', iso2: 'eg', name: 'Egypt', flag: '🇪🇬', capital: 'Cairo', continent: 'Africa', subregion: 'Northern Africa', population: 109.3, areaSqKm: 1002450, famousCities: ['Cairo', 'Alexandria', 'Luxor'], landmark: 'Great Pyramids of Giza', river: 'Nile' },
  { id: 'zaf', iso2: 'za', name: 'South Africa', flag: '🇿🇦', capital: 'Pretoria', altNames: ['Cape Town'], continent: 'Africa', subregion: 'Southern Africa', population: 59.9, areaSqKm: 1221037, famousCities: ['Johannesburg', 'Cape Town', 'Durban'], landmark: 'Table Mountain', mountain: 'Table Mountain' },
  { id: 'nga', iso2: 'ng', name: 'Nigeria', flag: '🇳🇬', capital: 'Abuja', continent: 'Africa', subregion: 'Western Africa', population: 218.5, areaSqKm: 923768, famousCities: ['Lagos', 'Abuja', 'Kano'], landmark: 'Zuma Rock', river: 'Niger' },
  { id: 'ken', iso2: 'ke', name: 'Kenya', flag: '🇰🇪', capital: 'Nairobi', continent: 'Africa', subregion: 'Eastern Africa', population: 54.0, areaSqKm: 580367, famousCities: ['Nairobi', 'Mombasa'], landmark: 'Maasai Mara', mountain: 'Mount Kenya' },
  { id: 'mar', iso2: 'ma', name: 'Morocco', flag: '🇲🇦', capital: 'Rabat', continent: 'Africa', subregion: 'Northern Africa', population: 37.5, areaSqKm: 446550, famousCities: ['Marrakech', 'Casablanca'], landmark: 'Hassan II Mosque' },
  { id: 'eth', iso2: 'et', name: 'Ethiopia', flag: '🇪🇹', capital: 'Addis Ababa', continent: 'Africa', subregion: 'Eastern Africa', population: 123.4, areaSqKm: 1104300, famousCities: ['Addis Ababa'], landmark: 'Rock-Hewn Churches of Lalibela' },
  { id: 'tza', iso2: 'tz', name: 'Tanzania', flag: '🇹🇿', capital: 'Dodoma', altNames: ['Dar es Salaam'], continent: 'Africa', subregion: 'Eastern Africa', population: 65.5, areaSqKm: 945087, famousCities: ['Dar es Salaam', 'Zanzibar'], landmark: 'Mount Kilimanjaro', mountain: 'Mount Kilimanjaro' },
  { id: 'dza', iso2: 'dz', name: 'Algeria', flag: '🇩🇿', capital: 'Algiers', continent: 'Africa', subregion: 'Northern Africa', population: 44.9, areaSqKm: 2381741, famousCities: ['Algiers', 'Oran'], landmark: 'Notre Dame d\'Afrique' },
  { id: 'gha', iso2: 'gh', name: 'Ghana', flag: '🇬🇭', capital: 'Accra', continent: 'Africa', subregion: 'Western Africa', population: 33.5, areaSqKm: 238533, famousCities: ['Accra', 'Kumasi'], landmark: 'Cape Coast Castle' },
  { id: 'sen', iso2: 'sn', name: 'Senegal', flag: '🇸🇳', capital: 'Dakar', continent: 'Africa', subregion: 'Western Africa', population: 17.3, areaSqKm: 196722, famousCities: ['Dakar'], landmark: 'African Renaissance Monument' },
  { id: 'uga', iso2: 'ug', name: 'Uganda', flag: '🇺🇬', capital: 'Kampala', continent: 'Africa', subregion: 'Eastern Africa', population: 47.2, areaSqKm: 241550, famousCities: ['Kampala', 'Entebbe'], landmark: 'Murchison Falls', river: 'Nile' },
  { id: 'rwa', iso2: 'rw', name: 'Rwanda', flag: '🇷🇼', capital: 'Kigali', continent: 'Africa', subregion: 'Eastern Africa', population: 13.8, areaSqKm: 26338, famousCities: ['Kigali'], landmark: 'Volcanoes National Park' },
  { id: 'civ', iso2: 'ci', name: 'Ivory Coast', altNames: ['Côte d\'Ivoire'], flag: '🇨🇮', capital: 'Yamoussoukro', continent: 'Africa', subregion: 'Western Africa', population: 28.2, areaSqKm: 322463, famousCities: ['Abidjan', 'Yamoussoukro'], landmark: 'Basilica of Our Lady of Peace' },
  { id: 'cmr', iso2: 'cm', name: 'Cameroon', flag: '🇨🇲', capital: 'Yaoundé', continent: 'Africa', subregion: 'Central Africa', population: 27.9, areaSqKm: 475442, famousCities: ['Douala', 'Yaoundé'], landmark: 'Mount Cameroon', mountain: 'Mount Cameroon' },
  { id: 'tun', iso2: 'tn', name: 'Tunisia', flag: '🇹🇳', capital: 'Tunis', continent: 'Africa', subregion: 'Northern Africa', population: 12.4, areaSqKm: 163610, famousCities: ['Tunis', 'Sousse'], landmark: 'Amphitheatre of El Jem' },
  { id: 'sdn', iso2: 'sd', name: 'Sudan', flag: '🇸🇩', capital: 'Khartoum', continent: 'Africa', subregion: 'Northern Africa', population: 46.9, areaSqKm: 1886068, famousCities: ['Khartoum', 'Omdurman'], landmark: 'Meroë Pyramids', river: 'Nile' },
  { id: 'ssd', iso2: 'ss', name: 'South Sudan', flag: '🇸🇸', capital: 'Juba', continent: 'Africa', subregion: 'Eastern Africa', population: 11.5, areaSqKm: 619745, famousCities: ['Juba'], landmark: 'Boma National Park' },
  { id: 'zmb', iso2: 'zm', name: 'Zambia', flag: '🇿🇲', capital: 'Lusaka', continent: 'Africa', subregion: 'Southern Africa', population: 20.0, areaSqKm: 752618, famousCities: ['Lusaka', 'Livingstone'], landmark: 'Victoria Falls', river: 'Zambezi' },
  { id: 'zwe', iso2: 'zw', name: 'Zimbabwe', flag: '🇿🇼', capital: 'Harare', continent: 'Africa', subregion: 'Southern Africa', population: 16.3, areaSqKm: 390757, famousCities: ['Harare', 'Bulawayo'], landmark: 'Great Zimbabwe Ruins' },
  { id: 'nam', iso2: 'na', name: 'Namibia', flag: '🇳🇦', capital: 'Windhoek', continent: 'Africa', subregion: 'Southern Africa', population: 2.6, areaSqKm: 825615, famousCities: ['Windhoek'], landmark: 'Deadvlei Sand Dunes' },
  { id: 'bwa', iso2: 'bw', name: 'Botswana', flag: '🇧🇼', capital: 'Gaborone', continent: 'Africa', subregion: 'Southern Africa', population: 2.6, areaSqKm: 581730, famousCities: ['Gaborone'], landmark: 'Okavango Delta' },
  { id: 'mdg', iso2: 'mg', name: 'Madagascar', flag: '🇲🇬', capital: 'Antananarivo', continent: 'Africa', subregion: 'Eastern Africa', population: 29.6, areaSqKm: 587041, famousCities: ['Antananarivo'], landmark: 'Avenue of the Baobabs' },
  { id: 'ago', iso2: 'ao', name: 'Angola', flag: '🇦🇴', capital: 'Luanda', continent: 'Africa', subregion: 'Central Africa', population: 35.6, areaSqKm: 1246700, famousCities: ['Luanda'], landmark: 'Kalandula Falls' },
  { id: 'moz', iso2: 'mz', name: 'Mozambique', flag: '🇲🇿', capital: 'Maputo', continent: 'Africa', subregion: 'Southern Africa', population: 33.0, areaSqKm: 801590, famousCities: ['Maputo'], landmark: 'Bazaruto Archipelago' },
  { id: 'mus', iso2: 'mu', name: 'Mauritius', flag: '🇲🇺', capital: 'Port Louis', continent: 'Africa', subregion: 'Eastern Africa', population: 1.3, areaSqKm: 2040, famousCities: ['Port Louis'], landmark: 'Le Morne Brabant' },
  { id: 'syc', iso2: 'sc', name: 'Seychelles', flag: '🇸🇨', capital: 'Victoria', continent: 'Africa', subregion: 'Eastern Africa', population: 0.1, areaSqKm: 452, famousCities: ['Victoria'], landmark: 'Anse Source d\'Argent' },
  { id: 'cpv', iso2: 'cv', name: 'Cape Verde', flag: '🇨🇻', capital: 'Praia', continent: 'Africa', subregion: 'Western Africa', population: 0.59, areaSqKm: 4033, famousCities: ['Praia'], landmark: 'Pico do Fogo Volcano', mountain: 'Pico do Fogo' },
  { id: 'gab', iso2: 'ga', name: 'Gabon', flag: '🇬🇦', capital: 'Libreville', continent: 'Africa', subregion: 'Central Africa', population: 2.3, areaSqKm: 267668, famousCities: ['Libreville'], landmark: 'Loango National Park' },
  { id: 'cog', iso2: 'cg', name: 'Republic of the Congo', flag: '🇨🇬', capital: 'Brazzaville', continent: 'Africa', subregion: 'Central Africa', population: 5.9, areaSqKm: 342000, famousCities: ['Brazzaville'], landmark: 'Odzala-Kokoua National Park' },
  { id: 'cod', iso2: 'cd', name: 'DR Congo', altNames: ['Congo', 'Democratic Republic of the Congo'], flag: '🇨🇩', capital: 'Kinshasa', continent: 'Africa', subregion: 'Central Africa', population: 99.0, areaSqKm: 2344858, famousCities: ['Kinshasa'], landmark: 'Virunga National Park', river: 'Congo River' },
  { id: 'mrt', iso2: 'mr', name: 'Mauritania', flag: '🇲🇷', capital: 'Nouakchott', continent: 'Africa', subregion: 'Western Africa', population: 4.7, areaSqKm: 1030700, famousCities: ['Nouakchott'], landmark: 'Eye of the Sahara' },
  { id: 'mli', iso2: 'ml', name: 'Mali', flag: '🇲🇱', capital: 'Bamako', continent: 'Africa', subregion: 'Western Africa', population: 22.6, areaSqKm: 1240192, famousCities: ['Bamako', 'Timbuktu'], landmark: 'Great Mosque of Djenné' },
  { id: 'ner', iso2: 'ne', name: 'Niger', flag: '🇳🇪', capital: 'Niamey', continent: 'Africa', subregion: 'Western Africa', population: 26.2, areaSqKm: 1267000, famousCities: ['Niamey'], landmark: 'Agadez Mosque' },
  { id: 'tcd', iso2: 'td', name: 'Chad', flag: '🇹🇩', capital: 'N\'Djamena', continent: 'Africa', subregion: 'Central Africa', population: 17.7, areaSqKm: 1284000, famousCities: ['N\'Djamena'], landmark: 'Lakes of Unianga' },
  { id: 'som', iso2: 'so', name: 'Somalia', flag: '🇸🇴', capital: 'Mogadishu', continent: 'Africa', subregion: 'Eastern Africa', population: 17.6, areaSqKm: 637657, famousCities: ['Mogadishu'], landmark: 'Laas Geel Cave Paintings' },
  { id: 'eri', iso2: 'er', name: 'Eritrea', flag: '🇪🇷', capital: 'Asmara', continent: 'Africa', subregion: 'Eastern Africa', population: 3.6, areaSqKm: 117600, famousCities: ['Asmara'], landmark: 'Asmara Modernist Architecture' },
  { id: 'dji', iso2: 'dj', name: 'Djibouti', flag: '🇩🇯', capital: 'Djibouti', continent: 'Africa', subregion: 'Eastern Africa', population: 1.1, areaSqKm: 23200, famousCities: ['Djibouti'], landmark: 'Lake Assal' },
  { id: 'lby', iso2: 'ly', name: 'Libya', flag: '🇱🇾', capital: 'Tripoli', continent: 'Africa', subregion: 'Northern Africa', population: 6.8, areaSqKm: 1759540, famousCities: ['Tripoli', 'Benghazi'], landmark: 'Leptis Magna Ruins' },
  { id: 'mwi', iso2: 'mw', name: 'Malawi', flag: '🇲🇼', capital: 'Lilongwe', continent: 'Africa', subregion: 'Eastern Africa', population: 20.4, areaSqKm: 118484, famousCities: ['Lilongwe', 'Blantyre'], landmark: 'Lake Malawi National Park' },
  { id: 'ben', iso2: 'bj', name: 'Benin', flag: '🇧🇯', capital: 'Porto-Novo', altNames: ['Cotonou'], continent: 'Africa', subregion: 'Western Africa', population: 13.3, areaSqKm: 112622, famousCities: ['Cotonou', 'Porto-Novo'], landmark: 'Royal Palaces of Abomey' },
  { id: 'tgo', iso2: 'tg', name: 'Togo', flag: '🇹🇬', capital: 'Lomé', continent: 'Africa', subregion: 'Western Africa', population: 8.8, areaSqKm: 56785, famousCities: ['Lomé'], landmark: 'Koutammakou Land of the Batammariba' },
  { id: 'bfa', iso2: 'bf', name: 'Burkina Faso', flag: '🇧🇫', capital: 'Ouagadougou', continent: 'Africa', subregion: 'Western Africa', population: 22.7, areaSqKm: 274200, famousCities: ['Ouagadougou'], landmark: 'Sindou Peaks' },
  { id: 'gin', iso2: 'gn', name: 'Guinea', flag: '🇬🇳', capital: 'Conakry', continent: 'Africa', subregion: 'Western Africa', population: 13.9, areaSqKm: 245857, famousCities: ['Conakry'], landmark: 'Mount Nimba Strict Nature Reserve', mountain: 'Mount Nimba' },
  { id: 'sle', iso2: 'sl', name: 'Sierra Leone', flag: '🇸🇱', capital: 'Freetown', continent: 'Africa', subregion: 'Western Africa', population: 8.6, areaSqKm: 71740, famousCities: ['Freetown'], landmark: 'Tacugama Chimpanzee Sanctuary' },
  { id: 'lbr', iso2: 'lr', name: 'Liberia', flag: '🇱🇷', capital: 'Monrovia', continent: 'Africa', subregion: 'Western Africa', population: 5.3, areaSqKm: 111369, famousCities: ['Monrovia'], landmark: 'Sapo National Park' },
  { id: 'caf', iso2: 'cf', name: 'Central African Republic', flag: '🇨🇫', capital: 'Bangui', continent: 'Africa', subregion: 'Central Africa', population: 5.6, areaSqKm: 622984, famousCities: ['Bangui'], landmark: 'Dzanga-Sangha Special Reserve' },
  { id: 'gnq', iso2: 'gq', name: 'Equatorial Guinea', flag: '🇬🇶', capital: 'Malabo', continent: 'Africa', subregion: 'Central Africa', population: 1.7, areaSqKm: 28051, famousCities: ['Malabo', 'Bata'], landmark: 'Santa Isabel Cathedral Malabo' },
  { id: 'bdi', iso2: 'bi', name: 'Burundi', flag: '🇧🇮', capital: 'Gitega', altNames: ['Bujumbura'], continent: 'Africa', subregion: 'Eastern Africa', population: 12.9, areaSqKm: 27834, famousCities: ['Bujumbura', 'Gitega'], landmark: 'Source of the Nile Bururi' },
  { id: 'lso', iso2: 'ls', name: 'Lesotho', flag: '🇱🇸', capital: 'Maseru', continent: 'Africa', subregion: 'Southern Africa', population: 2.3, areaSqKm: 30355, famousCities: ['Maseru'], landmark: 'Maletsunyane Falls', mountain: 'Drakensberg' },
  { id: 'swz', iso2: 'sz', name: 'Eswatini', altNames: ['Swaziland'], flag: '🇸🇿', capital: 'Mbabane', continent: 'Africa', subregion: 'Southern Africa', population: 1.2, areaSqKm: 17364, famousCities: ['Mbabane'], landmark: 'Mlilwane Wildlife Sanctuary' },
  { id: 'com', iso2: 'km', name: 'Comoros', flag: '🇰🇲', capital: 'Moroni', continent: 'Africa', subregion: 'Eastern Africa', population: 0.85, areaSqKm: 2235, famousCities: ['Moroni'], landmark: 'Mount Karthala Volcano', mountain: 'Mount Karthala' },
  { id: 'stp', iso2: 'st', name: 'São Tomé and Príncipe', flag: '🇸🇹', capital: 'São Tomé', continent: 'Africa', subregion: 'Central Africa', population: 0.23, areaSqKm: 964, famousCities: ['São Tomé'], landmark: 'Pico Cão Grande' },
  { id: 'gmb', iso2: 'gm', name: 'Gambia', flag: '🇬🇲', capital: 'Banjul', continent: 'Africa', subregion: 'Western Africa', population: 2.7, areaSqKm: 10689, famousCities: ['Banjul'], landmark: 'Kunta Kinteh Island' },
  { id: 'gnb', iso2: 'gw', name: 'Guinea-Bissau', flag: '🇬🇼', capital: 'Bissau', continent: 'Africa', subregion: 'Western Africa', population: 2.1, areaSqKm: 36125, famousCities: ['Bissau'], landmark: 'Bijagós Archipelago' },

  // OCEANIA (14 Sovereign Nations)
  { id: 'aus', iso2: 'au', name: 'Australia', flag: '🇦🇺', capital: 'Canberra', continent: 'Oceania', subregion: 'Oceania', population: 26.0, areaSqKm: 7692024, famousCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'], landmark: 'Sydney Opera House', river: 'Murray' },
  { id: 'nzl', iso2: 'nz', name: 'New Zealand', flag: '🇳🇿', capital: 'Wellington', continent: 'Oceania', subregion: 'Oceania', population: 5.1, areaSqKm: 268021, famousCities: ['Auckland', 'Wellington', 'Christchurch'], landmark: 'Milford Sound', mountain: 'Aoraki / Mount Cook' },
  { id: 'fji', iso2: 'fj', name: 'Fiji', flag: '🇫🇯', capital: 'Suva', continent: 'Oceania', subregion: 'Oceania', population: 0.9, areaSqKm: 18274, famousCities: ['Suva', 'Nadi'], landmark: 'Mamanuca Islands' },
  { id: 'png', iso2: 'pg', name: 'Papua New Guinea', flag: '🇵🇬', capital: 'Port Moresby', continent: 'Oceania', subregion: 'Oceania', population: 10.1, areaSqKm: 462840, famousCities: ['Port Moresby'], landmark: 'Kokoda Track', mountain: 'Mount Wilhelm' },
  { id: 'wsam', iso2: 'ws', name: 'Samoa', flag: '🇼🇸', capital: 'Apia', continent: 'Oceania', subregion: 'Oceania', population: 0.22, areaSqKm: 2842, famousCities: ['Apia'], landmark: 'To Sua Ocean Trench' },
  { id: 'ton', iso2: 'to', name: 'Tonga', flag: '🇹🇴', capital: 'Nuku\'alofa', continent: 'Oceania', subregion: 'Oceania', population: 0.1, areaSqKm: 747, famousCities: ['Nuku\'alofa'], landmark: 'Ha\'amonga \'a Maui Trilithon' },
  { id: 'vut', iso2: 'vu', name: 'Vanuatu', flag: '🇻🇺', capital: 'Port Vila', continent: 'Oceania', subregion: 'Oceania', population: 0.32, areaSqKm: 12189, famousCities: ['Port Vila'], landmark: 'Mount Yasur Active Volcano' },
  { id: 'slb', iso2: 'sb', name: 'Solomon Islands', flag: '🇸🇧', capital: 'Honiara', continent: 'Oceania', subregion: 'Oceania', population: 0.72, areaSqKm: 28896, famousCities: ['Honiara'], landmark: 'Marovo Lagoon' },
  { id: 'plw', iso2: 'pw', name: 'Palau', flag: '🇵🇼', capital: 'Ngerulmud', continent: 'Oceania', subregion: 'Oceania', population: 0.018, areaSqKm: 459, famousCities: ['Koror'], landmark: 'Rock Islands Jellyfish Lake' },
  { id: 'fsm', iso2: 'fm', name: 'Micronesia', flag: '🇫🇲', capital: 'Palikir', continent: 'Oceania', subregion: 'Oceania', population: 0.11, areaSqKm: 702, famousCities: ['Palikir'], landmark: 'Nan Madol Ruins' },
  { id: 'mhl', iso2: 'mh', name: 'Marshall Islands', flag: '🇲🇭', capital: 'Majuro', continent: 'Oceania', subregion: 'Oceania', population: 0.06, areaSqKm: 181, famousCities: ['Majuro'], landmark: 'Majuro Atoll Lagoon' },
  { id: 'nru', iso2: 'nr', name: 'Nauru', flag: '🇳🇷', capital: 'Yaren', continent: 'Oceania', subregion: 'Oceania', population: 0.012, areaSqKm: 21, famousCities: ['Yaren'], landmark: 'Anibare Bay' },
  { id: 'kir', iso2: 'ki', name: 'Kiribati', flag: '🇰🇮', capital: 'South Tarawa', continent: 'Oceania', subregion: 'Oceania', population: 0.13, areaSqKm: 811, famousCities: ['Tarawa'], landmark: 'Kiritimati (Christmas Island)' },
  { id: 'tuv', iso2: 'tv', name: 'Tuvalu', flag: '🇹🇻', capital: 'Funafuti', continent: 'Oceania', subregion: 'Oceania', population: 0.011, areaSqKm: 26, famousCities: ['Funafuti'], landmark: 'Funafuti Conservation Area' },
];

/**
 * Preload all flag images into browser cache for instant rendering
 */
export function preloadAllFlags(): void {
  if (typeof window === 'undefined') return;
  COUNTRIES.forEach((c) => {
    const img = new Image();
    const code = (c.iso2 || c.id).toLowerCase();
    img.src = `https://flagcdn.com/w320/${code}.png`;
  });
}

/**
 * Smart Believable Distractor Generator
 * Pulls wrong choices from the same continent/region so options are believable and strictly unique
 */
export function getSmartDistractors<T>(
  targetItem: CountryData,
  dataset: CountryData[],
  extractor: (item: CountryData) => T,
  count: number = 3
): T[] {
  const targetValue = extractor(targetItem);

  // Same continent pool
  const sameContinentPool = dataset.filter(
    (c) => c.continent === targetItem.continent && extractor(c) !== targetValue
  );

  // Fallback world pool
  const worldPool = dataset.filter((c) => extractor(c) !== targetValue);

  const selectedDistractors: T[] = [];
  const usedValues = new Set<T>([targetValue]);

  const shuffle = <Y>(arr: Y[]) => [...arr].sort(() => 0.5 - Math.random());
  const candidates = shuffle([...sameContinentPool, ...worldPool]);

  for (const candidate of candidates) {
    const val = extractor(candidate);
    if (val !== null && val !== undefined && val !== '' && !usedValues.has(val)) {
      usedValues.add(val);
      selectedDistractors.push(val);
      if (selectedDistractors.length >= count) break;
    }
  }

  return selectedDistractors;
}

/**
 * Levenshtein Distance Fuzzy String Matcher
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
