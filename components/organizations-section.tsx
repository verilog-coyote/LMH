import { ArrowUpRight } from "lucide-react"

const ORGANIZATIONS = [
  { name: "Ka Iwi Coalition", role: "Lead Advocacy Coalition", description: "A community committee forever vigilant to keep the Ka Iwi coast, mauka-to-makai, in its wild and natural state. Formed in 2004 by organizers from Save Sandy Beach and Livable Hawai\u2018i Kai Hui.", founded: "2004" },
  { name: "Livable Hawai\u2018i Kai Hui", role: "Grassroots Nonprofit", description: "A 501(c)(3) nonprofit connecting the community to the \u2018\u0101ina of Maunalua through volunteerism, stewardship, and education. Partners with DLNR and The Trust for Public Land.", founded: "2004" },
  { name: "The Trust for Public Land", role: "Land Conservation", description: "National conservation nonprofit that helped secure funding and coordinate the acquisition of the 182-acre Ka Iwi mauka lands, completing a decades-long effort to protect the coast.", founded: "1972" },
  { name: "Save Sandy Beach", role: "Founding Movement", description: "The grassroots movement that collected 40,000 signatures and passed a ballot initiative to rezone Sandy Beach from residential to preservation.", founded: "1988" },
  { name: "Ka Iwi Action Council", role: "Community Organizing", description: "Organized community opposition to development schemes including a major developer deal in 1995 and the \u2018No Cabins on Ka Iwi\u2019 campaign in 2006.", founded: "1995" },
  { name: "Hui Nalu Canoe Club", role: "Cultural Partner", description: "Cultural partner connecting the community to the ocean and traditional Hawaiian canoe practices along the Ka Iwi Coast.", founded: "1908" },
]

export function OrganizationsSection() {
  return (
    <section id="organizations" className="relative py-24 md:py-36 tribal-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-primary rounded-full glow-teal" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Grassroots</p>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-foreground leading-[0.9] font-light">The organizations</h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              {"From the Save Sandy Beach movement of 1988 to today\u2019s Ka Iwi Explorations, these organizations have steadfastly opposed urban development for over four decades."}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {ORGANIZATIONS.map((org, i) => (
            <div key={org.name} className="frost rounded-2xl p-5 md:p-7 flex flex-col md:flex-row md:items-start gap-3 md:gap-8 group hover:scale-[1.003] transition-all duration-500">
              <div className="flex-shrink-0 md:w-56">
                <span className="text-[10px] text-primary/30 font-semibold tracking-wider">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300 mt-1 font-medium">{org.name}</h3>
                <p className="text-[9px] tracking-[0.2em] uppercase text-accent/50 mt-1 font-semibold">{org.role}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 font-light">{org.description}</p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[10px] text-foreground/15 font-medium">{"Est. "}{org.founded}</span>
                <ArrowUpRight className="h-4 w-4 text-foreground/15 group-hover:text-primary transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
