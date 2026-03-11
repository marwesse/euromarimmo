import { Hero } from "@/components/home/Hero";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { getProperties } from "@/app/actions/property-actions";
import nextDynamic from 'next/dynamic';

const Benefits = nextDynamic(() => import('@/components/home/Benefits').then(mod => mod.Benefits));
const ExploreByCity = nextDynamic(() => import('@/components/home/ExploreByCity').then(mod => mod.ExploreByCity));
const Testimonials = nextDynamic(() => import('@/components/home/Testimonials').then(mod => mod.Testimonials));
const SeoSection = nextDynamic(() => import('@/components/home/SeoSection').then(mod => mod.SeoSection));

export const dynamic = 'force-dynamic';

export default async function Home() {
  const properties = await getProperties();
  const featured = properties.slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedProperties properties={featured} />
      <Benefits />
      <ExploreByCity />
      <Testimonials />
      <SeoSection />
    </>
  );
}
