import { GlassNav } from "@/components/glass-nav"
import { HeroSection } from "@/components/hero-section"
import { MountainMap } from "@/components/mountain-map"
import { ImageBreak } from "@/components/parallax-break"
import { AboutSection } from "@/components/about-section"
import { OrganizationsSection } from "@/components/organizations-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <GlassNav />

      <main>
        <HeroSection />
        <MountainMap />

        <ImageBreak
          src="/art/kaiwi-peak.jpg"
          alt="The volcanic ridgeline of the Ka Iwi Coast at golden hour"
          height="65vh"
          quote={"He ali\u2018i ka \u2018\u0101ina, he kauwa ke kanaka"}
          attribution={"The land is chief, man is its servant"}
        />

        <AboutSection />

        <ImageBreak
          src="/art/kaiwi-ocean.jpg"
          alt="Turquoise waters of the Ka Iwi Coast meeting the volcanic shore"
          height="55vh"
        />

        <OrganizationsSection />
        <SiteFooter />
      </main>
    </>
  )
}
