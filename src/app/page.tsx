import { Hero } from "@/components/home/Hero";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { Benefits } from "@/components/home/Benefits";
import { ExploreByCity } from "@/components/home/ExploreByCity";
import { MortgageSimulator } from "@/components/home/MortgageSimulator";
import { Testimonials } from "@/components/home/Testimonials";
import { getProperties } from "@/app/actions/property-actions";

export default async function Home() {
  const properties = await getProperties();
  const featured = properties.slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedProperties properties={featured} />
      <Benefits />
      <ExploreByCity />
      <MortgageSimulator />
      <Testimonials />
    </>
  );
}
