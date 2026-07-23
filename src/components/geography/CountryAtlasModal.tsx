import React, { useState, useMemo } from 'react';
import { X, Search, Globe, ArrowUpDown, Phone, Clock, Coins } from 'lucide-react';
import { COUNTRIES, getCountryDetails } from '../../data/geographyData';
import type { CountryData } from '../../data/geographyData';
import { CountryFlagImage } from './GeographyGameEngine';
import { sounds } from '../../services/audio';

interface CountryAtlasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CountryAtlasModal: React.FC<CountryAtlasModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'population' | 'area'>('name');
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const continents = ['All', 'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'];

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((c) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subregion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.famousCities && c.famousCities.some((city) => city.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesContinent = selectedContinent === 'All' || c.continent === selectedContinent;

      return matchesSearch && matchesContinent;
    }).sort((a, b) => {
      if (sortBy === 'population') return b.population - a.population;
      if (sortBy === 'area') return b.areaSqKm - a.areaSqKm;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedContinent, sortBy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in select-none">
      <div className="bg-[#0F1523] border border-white/15 rounded-[32px] w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative text-white">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-[#6366F1]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#10B981] p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#080C14] rounded-[14px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#818CF8]" />
              </div>
            </div>
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2">
                <span>World Geography Atlas</span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8]">
                  {filteredCountries.length} Nations
                </span>
              </h2>
              <p className="text-xs font-medium text-slate-400">
                Explore flags, capitals, currencies in INR (₹), phone codes & timezones
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all btn-tactile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar & Continent Filter Toolbar */}
        <div className="p-4 border-b border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-3 z-10 shrink-0">
          {/* Live Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country, capital..."
              className="w-full bg-[#080C14]/90 text-white placeholder-slate-400 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm font-bold border border-white/15 focus:outline-none focus:border-[#6366F1] shadow-inner"
            />
          </div>

          {/* Continent Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            {continents.map((continent) => (
              <button
                key={continent}
                onClick={() => {
                  sounds.playPop();
                  setSelectedContinent(continent);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-display font-extrabold transition-all shrink-0 btn-tactile ${
                  selectedContinent === continent
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
                }`}
              >
                {continent}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#080C14] text-white border border-white/15 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#6366F1]"
            >
              <option value="name">Sort A-Z</option>
              <option value="population">Largest Population</option>
              <option value="area">Largest Land Area</option>
            </select>
          </div>
        </div>        {/* Main Countries Grid Display (Smooth Infinite Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 no-scrollbar z-10 max-h-[72vh]">
          {filteredCountries.map((country) => {
            const meta = getCountryDetails(country);
            const codeMatch = meta.currency.match(/\(([A-Z]{3,4})\)/);
            const currCode = codeMatch ? codeMatch[1] : 'Unit';

            return (
              <div
                key={country.id}
                onClick={() => {
                  sounds.playPop();
                  setSelectedCountry(country);
                }}
                className="group glass-card rounded-2xl p-4 border border-white/10 hover:border-[#6366F1]/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <CountryFlagImage country={country} variant="compact" />
                    <div className="overflow-hidden">
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-white truncate group-hover:text-[#818CF8] transition-colors">
                        {country.name}
                      </h4>
                      <p className="text-xs font-bold text-amber-400 truncate">
                        🏛️ {country.capital}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-slate-300 shrink-0">
                    {country.continent}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-300 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1 font-bold text-emerald-400">
                    <Coins className="w-3 h-3 shrink-0" />
                    <span>1 {currCode} = ₹{meta.rate} INR</span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-cyan-400">
                    <Phone className="w-3 h-3 shrink-0" />
                    <span>{meta.phone}</span>
                  </div>

                  <div className="flex items-center gap-1 col-span-2 text-indigo-300 truncate">
                    <Clock className="w-3 h-3 shrink-0 text-indigo-400" />
                    <span className="truncate">{meta.tz}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Country Drawer Modal View */}
        {selectedCountry && (() => {
          const meta = getCountryDetails(selectedCountry);
          const codeMatch = meta.currency.match(/\(([A-Z]{3,4})\)/);
          const currCode = codeMatch ? codeMatch[1] : 'Unit';

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
              <div className="bg-[#080C14] border border-white/20 rounded-3xl p-5 sm:p-6 max-w-lg w-full text-white shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col">
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center text-center gap-2 mb-4 shrink-0 pt-2">
                  <div className="w-36 sm:w-48 h-24 sm:h-32 rounded-2xl bg-[#0F1523] border border-white/20 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://flagcdn.com/w320/${(selectedCountry.iso2 || selectedCountry.id).toLowerCase()}.png`}
                      alt={`${selectedCountry.name} Flag`}
                      className="max-h-full max-w-full object-contain rounded-md shadow-md"
                    />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white mt-1">{selectedCountry.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8] text-xs font-extrabold uppercase">
                    {selectedCountry.continent} • {selectedCountry.subregion}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-300 mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                    <span className="text-slate-400 text-[10px] uppercase font-extrabold">Capital City</span>
                    <span className="text-amber-400 text-sm font-black">🏛️ {selectedCountry.capital}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                    <span className="text-slate-400 text-[10px] uppercase font-extrabold">Currency & INR Rate</span>
                    <span className="text-emerald-400 text-xs font-black">💵 {meta.currency}</span>
                    <span className="text-[11px] text-amber-300">1 {currCode} = ₹{meta.rate} INR</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                    <span className="text-slate-400 text-[10px] uppercase font-extrabold">International Calling Code</span>
                    <span className="text-cyan-400 text-sm font-black">📞 {meta.phone}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                    <span className="text-slate-400 text-[10px] uppercase font-extrabold">Time Zone</span>
                    <span className="text-indigo-300 text-xs font-black">⏰ {meta.tz}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                    <span className="text-slate-400 text-[10px] uppercase font-extrabold">Population</span>
                    <span className="text-cyan-400 text-xs font-black">👥 {selectedCountry.population} Million</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                    <span className="text-slate-400 text-[10px] uppercase font-extrabold">Land Area</span>
                    <span className="text-emerald-400 text-xs font-black">📐 {selectedCountry.areaSqKm.toLocaleString()} km²</span>
                  </div>

                  {selectedCountry.landmark && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1 col-span-2">
                      <span className="text-slate-400 text-[10px] uppercase font-extrabold">Famous Landmark</span>
                      <span className="text-purple-300 text-xs font-extrabold">🗿 {selectedCountry.landmark}</span>
                    </div>
                  )}
                </div>

                {selectedCountry.famousCities && selectedCountry.famousCities.length > 0 && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs mb-4">
                    <span className="text-slate-400 text-[10px] uppercase font-extrabold block mb-1">Famous Cities</span>
                    <span className="text-white font-bold">{selectedCountry.famousCities.join(', ')}</span>
                  </div>
                )}

                <button
                  onClick={() => setSelectedCountry(null)}
                  className="w-full py-2.5 rounded-xl bg-[#6366F1] text-white font-extrabold text-xs btn-tactile shadow-lg"
                >
                  Close Reference
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
