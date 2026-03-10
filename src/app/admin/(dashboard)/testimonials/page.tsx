import { getTestimonials } from "@/app/actions/testimonial-actions";
import TestimonialsClient from "./TestimonialsClient";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
    const testimonials = await getTestimonials();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Gestion des Témoignages</h1>
            <TestimonialsClient initialTestimonials={testimonials || []} />
        </div>
    );
}
