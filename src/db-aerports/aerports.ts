export const GLOBAL_AIRPORTS = [
  // --- UZBEKISTAN ---
  { country: "Uzbekistan", city: "Tashkent", code: "TAS", label: "Tashkent (TAS)", airports: [{ name: "Tashkent International", code: "TAS" }] },
  { country: "Uzbekistan", city: "Samarkand", code: "SKD", label: "Samarkand (SKD)", airports: [{ name: "Samarkand International", code: "SKD" }] },
  { country: "Uzbekistan", city: "Bukhara", code: "BHK", label: "Bukhara (BHK)", airports: [{ name: "Bukhara International", code: "BHK" }] },
  { country: "Uzbekistan", city: "Urgench", code: "UGC", label: "Urgench (UGC)", airports: [{ name: "Urgench International", code: "UGC" }] },
  { country: "Uzbekistan", city: "Namangan", code: "NMA", label: "Namangan (NMA)", airports: [{ name: "Namangan International", code: "NMA" }] },
  { country: "Uzbekistan", city: "Fergana", code: "FEG", label: "Fergana (FEG)", airports: [{ name: "Fergana International", code: "FEG" }] },

  // --- TURKEY (Bridges Asia and Europe) ---
  { country: "Turkey", city: "Istanbul", code: "IST", label: "Istanbul (IST)", airports: [
      { name: "Istanbul Airport", code: "IST" },
      { name: "Sabiha Gokcen", code: "SAW" }
    ]},
  { country: "Turkey", city: "Antalya", code: "AYT", label: "Antalya (AYT)", airports: [{ name: "Antalya Airport", code: "AYT" }] },
  { country: "Turkey", city: "Ankara", code: "ANK", label: "Ankara (ANK)", airports: [{ name: "Esenboga Airport", code: "ESB" }] },
  { country: "Turkey", city: "Izmir", code: "IZM", label: "Izmir (IZM)", airports: [{ name: "Adnan Menderes", code: "ADB" }] },

  // --- ASIA MAIN HUBS ---
  { country: "United Arab Emirates", city: "Dubai", code: "DXB", label: "Dubai (DXB)", airports: [{ name: "Dubai International", code: "DXB" }, { name: "Al Maktoum", code: "DWC" }] },
  { country: "United Arab Emirates", city: "Abu Dhabi", code: "AUH", label: "Abu Dhabi (AUH)", airports: [{ name: "Zayed International", code: "AUH" }] },
  { country: "South Korea", city: "Seoul", code: "SEL", label: "Seoul (SEL)", airports: [{ name: "Incheon", code: "ICN" }, { name: "Gimpo", code: "GMP" }] },
  { country: "Japan", city: "Tokyo", code: "TYO", label: "Tokyo (TYO)", airports: [{ name: "Haneda", code: "HND" }, { name: "Narita", code: "NRT" }] },
  { country: "China", city: "Beijing", code: "BJS", label: "Beijing (BJS)", airports: [{ name: "Capital Int.", code: "PEK" }, { name: "Daxing", code: "PKX" }] },
  { country: "Singapore", city: "Singapore", code: "SIN", label: "Singapore (SIN)", airports: [{ name: "Changi Airport", code: "SIN" }] },
  { country: "Thailand", city: "Bangkok", code: "BKK", label: "Bangkok (BKK)", airports: [{ name: "Suvarnabhumi", code: "BKK" }, { name: "Don Mueang", code: "DMK" }] },
  { country: "India", city: "Delhi", code: "DEL", label: "Delhi (DEL)", airports: [{ name: "Indira Gandhi", code: "DEL" }] },
  { country: "Kazakhstan", city: "Almaty", code: "ALA", label: "Almaty (ALA)", airports: [{ name: "Almaty Airport", code: "ALA" }] },
  { country: "Kazakhstan", city: "Astana", code: "NQZ", label: "Astana (NQZ)", airports: [{ name: "Nursultan Nazarbayev", code: "NQZ" }] },
  { country: "Qatar", city: "Doha", code: "DOH", label: "Doha (DOH)", airports: [{ name: "Hamad International", code: "DOH" }] },

  // --- EUROPE MAIN HUBS ---
  { country: "United Kingdom", city: "London", code: "LON", label: "London (LON)", airports: [
      { name: "Heathrow", code: "LHR" },
      { name: "Gatwick", code: "LGW" },
      { name: "Stansted", code: "STN" }
    ]},
  { country: "France", city: "Paris", code: "PAR", label: "Paris (PAR)", airports: [
      { name: "Charles de Gaulle", code: "CDG" },
      { name: "Orly", code: "ORY" }
    ]},
  { country: "Germany", city: "Frankfurt", code: "FRA", label: "Frankfurt (FRA)", airports: [{ name: "Frankfurt Main", code: "FRA" }] },
  { country: "Germany", city: "Munich", code: "MUC", label: "Munich (MUC)", airports: [{ name: "Munich Airport", code: "MUC" }] },
  { country: "Germany", city: "Berlin", code: "BER", label: "Berlin (BER)", airports: [{ name: "Berlin Brandenburg", code: "BER" }] },
  { country: "Netherlands", city: "Amsterdam", code: "AMS", label: "Amsterdam (AMS)", airports: [{ name: "Schiphol", code: "AMS" }] },
  { country: "Spain", city: "Madrid", code: "MAD", label: "Madrid (MAD)", airports: [{ name: "Barajas", code: "MAD" }] },
  { country: "Spain", city: "Barcelona", code: "BCN", label: "Barcelona (BCN)", airports: [{ name: "El Prat", code: "BCN" }] },
  { country: "Italy", city: "Rome", code: "ROM", label: "Rome (ROM)", airports: [{ name: "Fiumicino", code: "FCO" }, { name: "Ciampino", code: "CIA" }] },
  { country: "Italy", city: "Milan", code: "MIL", label: "Milan (MIL)", airports: [{ name: "Malpensa", code: "MXP" }, { name: "Linate", code: "LIN" }] },
  { country: "Switzerland", city: "Zurich", code: "ZRH", label: "Zurich (ZRH)", airports: [{ name: "Zurich Airport", code: "ZRH" }] },
  { country: "Austria", city: "Vienna", code: "VIE", label: "Vienna (VIE)", airports: [{ name: "Vienna Int.", code: "VIE" }] },
  { country: "Czech Republic", city: "Prague", code: "PRG", label: "Prague (PRG)", airports: [{ name: "Vaclav Havel", code: "PRG" }] },
  { country: "Poland", city: "Warsaw", code: "WAW", label: "Warsaw (WAW)", airports: [{ name: "Chopin Airport", code: "WAW" }] },
  { country: "Hungary", city: "Budapest", code: "BUD", label: "Budapest (BUD)", airports: [{ name: "Liszt Ferenc", code: "BUD" }] },
  { country: "Greece", city: "Athens", code: "ATH", label: "Athens (ATH)", airports: [{ name: "Eleftherios Venizelos", code: "ATH" }] },
  { country: "Portugal", city: "Lisbon", code: "LIS", label: "Lisbon (LIS)", airports: [{ name: "Humberto Delgado", code: "LIS" }] },
  { country: "Belgium", city: "Brussels", code: "BRU", label: "Brussels (BRU)", airports: [{ name: "Brussels Airport", code: "BRU" }] },
  { country: "Sweden", city: "Stockholm", code: "STO", label: "Stockholm (STO)", airports: [{ name: "Arlanda", code: "ARN" }] },
  { country: "Norway", city: "Oslo", code: "OSL", label: "Oslo (OSL)", airports: [{ name: "Gardermoen", code: "OSL" }] },
  { country: "Finland", city: "Helsinki", code: "HEL", label: "Helsinki (HEL)", airports: [{ name: "Helsinki-Vantaa", code: "HEL" }] },
  { country: "Denmark", city: "Copenhagen", code: "CPH", label: "Copenhagen (CPH)", airports: [{ name: "Kastrup", code: "CPH" }] },
  { country: "Latvia", city: "Riga", code: "RIX", label: "Riga (RIX)", airports: [{ name: "Riga International", code: "RIX" }] },
  { country: "Lithuania", city: "Vilnius", code: "VNO", label: "Vilnius (VNO)", airports: [{ name: "Vilnius International", code: "VNO" }] }
];