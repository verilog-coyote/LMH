import { GlassNav } from "@/components/glass-nav"
import { HeroSection } from "@/components/hero-section"
import { MountainMap } from "@/components/mountain-map"
import { ImageBreak } from "@/components/parallax-break"
import { AboutSection } from "@/components/about-section"
import { OrganizationsSection } from "@/components/organizations-section"
import { SiteFooter } from "@/components/site-footer"
import { getAllTimelineEvents, getAllPageContent } from "@/lib/notion/notion-service"
import { TIMELINE_EVENTS } from "@/lib/timeline-data"

export default async function Page() {
  let events = TIMELINE_EVENTS
  let pageContent = {}
  try {
    const notionEvents = await getAllTimelineEvents()
    if (notionEvents.length > 0) {
      events = notionEvents
      pageContent = await getAllPageContent(events)
    }
  } catch {
    // Fallback to hardcoded data silently
  }

  return (
    <>
      <GlassNav />

      <main>
        <HeroSection />
        <MountainMap events={events} pageContent={pageContent} />

        <ImageBreak
          src="/art/kaiwi-peak.jpg"
          alt="The volcanic ridgeline of the Kaiwi Coast at golden hour"
          height="65vh"
          quote={"He ali\u2018i ka \u2018\u0101ina, he kauwa ke kanaka"}
          attribution={"The land is chief, man is its servant"}
        />

        <AboutSection />

        <ImageBreak
          src="/art/kaiwi-ocean.jpg"
          alt="Turquoise waters of the Kaiwi Coast meeting the volcanic shore"
          height="55vh"
        />

        <OrganizationsSection />
        <SiteFooter />
      </main>
    </>
  )
}
