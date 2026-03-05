"use client"

import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { TattooBand } from "./tattoo-overlays"

const ORGANIZATIONS = [
  { name: "Kaiwi Coalition", role: "Lead Advocacy Coalition", description: "A community committee forever vigilant to keep the Kaiwi coast, mauka-to-makai, in its wild and natural state. Formed in 2004 by organizers from Save Sandy Beach and Livable Maunalua Hui.", founded: "2004" },
  { name: "Livable Maunalua Hui", role: "Grassroots Nonprofit", description: "A 501(c)(3) nonprofit connecting the community to the \u2018\u0101ina of Maunalua through volunteerism, stewardship, and education. Partners with DLNR and The Trust for Public Land.", founded: "2004" },
  { name: "The Trust for Public Land", role: "Land Conservation", description: "National conservation nonprofit that helped secure funding and coordinate the acquisition of the 182-acre Kaiwi mauka lands, completing a decades-long effort to protect the coast.", founded: "1972" },
  { name: "Save Sandy Beach", role: "Founding Movement", description: "The grassroots movement that collected 40,000 signatures and passed a ballot initiative to rezone Sandy Beach from residential to preservation.", founded: "1988" },
  { name: "Kaiwi Action Council", role: "Community Organizing", description: "Organized community opposition to development schemes including a major developer deal in 1995 and the \u2018No Cabins on Kaiwi\u2019 campaign in 2006.", founded: "1995" },
  { name: "Hui Nalu Canoe Club", role: "Cultural Partner", description: "Cultural partner connecting the community to the ocean and traditional Hawaiian canoe practices along the Kaiwi Coast.", founded: "1908" },
  { name: "Friends of Hanauma Bay", role: "Marine Conservation", description: "Non-profit dedicated to the conservation, protection, and restoration of Hanauma Bay, Hawai\u2018i\u2019s first Marine Life Conservation District. Conducts coral restoration, clean-ups, scientific studies, and community education since 1991.", founded: "1991" },
  { name: "Sierra Club Oahu Group", role: "Environmental Advocacy", description: "Volunteer-led advocacy group with over 8,000 members. Led the restoration of Wawamalu Beach on the Kaiwi Scenic Shoreline, removing invasive species, planting native trees, and advocating for protections against illegal off-roading.", founded: "1968" },
]

export function OrganizationsSection() {
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" })

  return (
    <section id="organizations" className="relative pt-2 sm:pt-4 md:pt-8 pb-16 sm:pb-24 md:pb-36 tribal-bg overflow-hidden">
      <TattooBand className="top-4 sm:top-6 md:top-8" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 mt-8 sm:mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-14" ref={headerRef}>
          <div>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-[2px] bg-primary rounded-full glow-teal" />
              <p className="text-sm tracking-[0.5em] uppercase text-primary font-semibold">Grassroots</p>
            </motion.div>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground leading-[0.9] font-light"
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              The organizations
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              {"From the Save Sandy Beach movement of 1988 to today\u2019s Kaiwi Explorations, these organizations have steadfastly opposed urban development for over four decades."}
            </p>
          </motion.div>
        </div>

        <div className="space-y-3" ref={cardsRef}>
          {ORGANIZATIONS.map((org, i) => (
            <motion.div
              key={org.name}
              className="frost rounded-2xl p-5 md:p-7 flex flex-col md:flex-row md:items-start gap-3 md:gap-8 group"
              initial={{ opacity: 0, y: 40, x: i % 2 === 0 ? -20 : 20 }}
              animate={cardsInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.008, transition: { duration: 0.3 } }}
            >
              <div className="flex-shrink-0 md:w-56">
                <span className="text-xs text-primary/50 font-semibold tracking-wider">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors duration-300 mt-1 font-medium">{org.name}</h3>
                <p className="text-xs tracking-[0.2em] uppercase text-accent/65 mt-1 font-semibold">{org.role}</p>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed flex-1 font-light">{org.description}</p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-foreground/50 font-medium">{"Est. "}{org.founded}</span>
                <ArrowUpRight className="h-4 w-4 text-foreground/40 group-hover:text-primary transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
