export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  category: "land" | "organization" | "cultural" | "restoration"
  location: string
}

export const TRAIL_ANCHORS = [
  { x: 50.4, y: 9 },
  { x: 66.7, y: 11.1 },
  { x: 73.9, y: 13.6 },
  { x: 73.2, y: 17.5 },
  { x: 71.5, y: 23.7 },
  { x: 74.3, y: 25.9 },
  { x: 70.5, y: 27.1 },
  { x: 67.3, y: 28.7 },
  { x: 61.2, y: 32.8 },
  { x: 53.6, y: 36.2 },
  { x: 65.5, y: 39 },
  { x: 79.8, y: 42.4 },
  { x: 65.3, y: 47.5 },
  { x: 80.1, y: 51 },
  { x: 66, y: 58.1 },
  { x: 90.8, y: 66.1 },
  { x: 68.2, y: 78 },
  { x: 86.8, y: 86.6 },
  { x: 62.3, y: 99.4 },
]

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "oppose-resort",
    year: "1972",
    title: "Community Opposes Resort",
    description:
      "Community organizes to oppose a 7,756-room resort at Awawamalu. This marks the beginning of decades of grassroots advocacy to protect the Kaiwi Coast from overdevelopment.",
    category: "organization",
    location: "Awawamalu",
  },
  {
    id: "sandy-beach-rezone",
    year: "1983",
    title: "Sandy Beach Rezoned",
    description:
      "City rezones Awawamalu in response to 10-year community effort to stop the proposed resort, a major early victory for coastal preservation advocates.",
    category: "land",
    location: "Sandy Beach",
  },
  {
    id: "coastal-view-study",
    year: "1987",
    title: "Coastal View Study",
    description:
      "The Hawai\u2018i Coastal View Study notes that the Koko Head Viewshed from Hanauma Bay to Makapu\u2018u has long been recognized for its unique visual and environmental qualities.",
    category: "cultural",
    location: "Koko Head to Makapu\u2018u",
  },
  {
    id: "save-sandy-beach",
    year: "1988",
    title: "Save Sandy Beach Initiative",
    description:
      "After collecting 40,000 signatures in 10 weeks, the Save Sandy Beach Initiative is put on the ballot. Residents vote overwhelmingly to rezone land mauka of Sandy Beach Park from residential to preservation.",
    category: "organization",
    location: "Sandy Beach Park",
  },
  {
    id: "state-condemns",
    year: "1998",
    title: "305 Acres Condemned",
    description:
      "The State condemns 305 acres at Awawamalu for incorporation into the proposed Kaiwi State Park. The city completes the purchase of the land near Sandy Beach Park once targeted for development.",
    category: "land",
    location: "Awawamalu",
  },
  {
    id: "ka-iwi-coalition",
    year: "2004",
    title: "Kaiwi Coalition Formed",
    description:
      "Organizers from Save Sandy Beach mentor new community grassroots nonprofit Livable Maunalua Hui. Together they create the Kaiwi Coalition, a committee forever vigilant to keep the Kaiwi coast mauka-to-makai in its wild and natural state.",
    category: "organization",
    location: "Kaiwi Coast",
  },
  {
    id: "no-cabins",
    year: "2006",
    title: "No Cabins on Kaiwi",
    description:
      "Community launches the 'No Cabins on Kaiwi' campaign following plans for 180 resort cabins on the Kaiwi coast mauka land zoned preservation. Organized opposition leads the city to tighten rules for development on preservation-zoned land.",
    category: "organization",
    location: "Kaiwi Coast Mauka",
  },
  {
    id: "reclassify",
    year: "2010",
    title: "Reclassified to Conservation",
    description:
      "Urged by the Kaiwi Coalition, the State Land Use Commission votes unanimously to reclassify the Kaiwi Scenic Shoreline from 'urban' to 'conservation,' encompassing approximately 215 acres between Awawamalu and the Makapu\u2018u Lighthouse.",
    category: "land",
    location: "Kaiwi Scenic Shoreline",
  },
  {
    id: "mauka-purchase",
    year: "2015",
    title: "Community Raises $600K",
    description:
      "The community raises $600,000 in three months to cap off funds needed for Kaiwi mauka land acquisition and start up stewardship, working with The Trust for Public Land.",
    category: "restoration",
    location: "Kaiwi Mauka Lands",
  },
  {
    id: "explorations",
    year: "2018",
    title: "Kaiwi Explorations Launch",
    description:
      "Kaiwi Explorations: guided hikes on Parcel 1 open to the public. Partner organizations dedicate a commemorative bronze plaque at the Makapuu Point Lighthouse Trail, recognizing 45 years of community aloha.",
    category: "cultural",
    location: "Makapu\u2018u Lighthouse Trail",
  },
]

export const CATEGORY_CONFIG = {
  land: { label: "Land History", color: "#4db8a4" },
  organization: { label: "Community Action", color: "#3d9b6e" },
  cultural: { label: "Cultural", color: "#5aadcc" },
  restoration: { label: "Restoration", color: "#68c07a" },
} as const
