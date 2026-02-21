export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  category: "land" | "organization" | "cultural" | "restoration"
  location: string
  /** Position on the landscape as percentage (x%, y%) from top-left */
  position: { x: number; y: number }
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "oppose-resort",
    year: "1972",
    title: "Community Opposes Resort",
    description:
      "Community organizes to oppose a 7,756-room resort at Awawamalu. This marks the beginning of decades of grassroots advocacy to protect the Ka Iwi Coast from overdevelopment.",
    category: "organization",
    location: "Awawamalu",
    position: { x: 30, y: 10 },
  },
  {
    id: "sandy-beach-rezone",
    year: "1983",
    title: "Sandy Beach Rezoned",
    description:
      "City rezones Awawamalu in response to 10-year community effort to stop the proposed resort, a major early victory for coastal preservation advocates.",
    category: "land",
    location: "Sandy Beach",
    position: { x: 65, y: 18 },
  },
  {
    id: "coastal-view-study",
    year: "1987",
    title: "Coastal View Study",
    description:
      "The Hawai\u2018i Coastal View Study notes that the Koko Head Viewshed from Hanauma Bay to Makapu\u2018u has long been recognized for its unique visual and environmental qualities.",
    category: "cultural",
    location: "Koko Head to Makapu\u2018u",
    position: { x: 40, y: 27 },
  },
  {
    id: "save-sandy-beach",
    year: "1988",
    title: "Save Sandy Beach Initiative",
    description:
      "After collecting 40,000 signatures in 10 weeks, the Save Sandy Beach Initiative is put on the ballot. Residents vote overwhelmingly to rezone land mauka of Sandy Beach Park from residential to preservation.",
    category: "organization",
    location: "Sandy Beach Park",
    position: { x: 58, y: 35 },
  },
  {
    id: "state-condemns",
    year: "1998",
    title: "305 Acres Condemned",
    description:
      "The State condemns 305 acres at Awawamalu for incorporation into the proposed Ka Iwi State Park. The city completes the purchase of the land near Sandy Beach Park once targeted for development.",
    category: "land",
    location: "Awawamalu",
    position: { x: 35, y: 44 },
  },
  {
    id: "ka-iwi-coalition",
    year: "2004",
    title: "Ka Iwi Coalition Formed",
    description:
      "Organizers from Save Sandy Beach mentor new community grassroots nonprofit Livable Hawaii Kai Hui. Together they create the Ka Iwi Coalition, a committee forever vigilant to keep the Ka Iwi coast mauka-to-makai in its wild and natural state.",
    category: "organization",
    location: "Ka Iwi Coast",
    position: { x: 62, y: 52 },
  },
  {
    id: "no-cabins",
    year: "2006",
    title: "No Cabins on Ka Iwi",
    description:
      "Community launches the 'No Cabins on Ka Iwi' campaign following plans for 180 resort cabins on the Ka Iwi coast mauka land zoned preservation. Organized opposition leads the city to tighten rules for development on preservation-zoned land.",
    category: "organization",
    location: "Ka Iwi Coast Mauka",
    position: { x: 38, y: 60 },
  },
  {
    id: "reclassify",
    year: "2010",
    title: "Reclassified to Conservation",
    description:
      "Urged by the Ka Iwi Coalition, the State Land Use Commission votes unanimously to reclassify the Ka Iwi Scenic Shoreline from 'urban' to 'conservation,' encompassing approximately 215 acres between Awawamalu and the Makapu\u2018u Lighthouse.",
    category: "land",
    location: "Ka Iwi Scenic Shoreline",
    position: { x: 55, y: 68 },
  },
  {
    id: "mauka-purchase",
    year: "2015",
    title: "Community Raises $600K",
    description:
      "The community raises $600,000 in three months to cap off funds needed for Ka Iwi mauka land acquisition and start up stewardship, working with The Trust for Public Land.",
    category: "restoration",
    location: "Ka Iwi Mauka Lands",
    position: { x: 40, y: 77 },
  },
  {
    id: "explorations",
    year: "2018",
    title: "Ka Iwi Explorations Launch",
    description:
      "Ka Iwi Explorations: guided hikes on Parcel 1 open to the public. Partner organizations dedicate a commemorative bronze plaque at the Makapuu Point Lighthouse Trail, recognizing 45 years of community aloha.",
    category: "cultural",
    location: "Makapu\u2018u Lighthouse Trail",
    position: { x: 58, y: 88 },
  },
]

export const CATEGORY_CONFIG = {
  land: { label: "Land History", color: "#4db8a4" },
  organization: { label: "Community Action", color: "#3d9b6e" },
  cultural: { label: "Cultural", color: "#5aadcc" },
  restoration: { label: "Restoration", color: "#68c07a" },
} as const
