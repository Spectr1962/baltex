import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";

interface Props {
  params: Promise<{ directionSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { directionSlug } = await params;
  const categories = await api.services.getCategories();
  const category = categories.find((item) => item.slug === directionSlug);

  return category
    ? {
        title: `${category.name} | Услуги Baltex`,
        description: `Бухгалтерские услуги для сегмента «${category.name}».`,
      }
    : { title: "Направление не найдено" };
}

export default async function DirectionPage({ params }: Props) {
  const { directionSlug } = await params;
  const [category] = (await api.services.getCategories()).filter(
    (item) => item.slug === directionSlug,
  );

  if (!category) notFound();

  void api.services.getByCategory.prefetch({ categorySlug: directionSlug });
  const services = await api.services.getByCategory({
    categorySlug: directionSlug,
  });

  return (
    <HydrateClient>
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="container mx-auto max-w-5xl">
          <nav className="mb-8 text-xs font-semibold tracking-wider text-white/30 uppercase">
            <Link href="/" className="transition-colors hover:text-white">
              Главная
            </Link>
            {" / "}
            <Link
              href="/services"
              className="transition-colors hover:text-white"
            >
              Услуги
            </Link>
            {" / "}
            <span className="text-white/80">{category.name}</span>
          </nav>

          <header className="mb-12 max-w-3xl">
            <span className="mb-4 inline-block rounded-full border border-[#0070f3]/10 bg-[#0070f3]/5 px-4 py-2 text-xs font-bold tracking-widest text-[#0070f3] uppercase">
              Отраслевое решение
            </span>
            <h1 className="mb-5 text-4xl font-black tracking-tight sm:text-5xl">
              {category.name}
            </h1>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${directionSlug}/${service.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-[#0070f3]/40"
              >
                <span className="mb-4 block text-[10px] font-bold tracking-widest text-[#0070f3] uppercase">
                  {service.subCategory}
                </span>
                <h2 className="mb-3 text-xl font-bold">{service.title}</h2>
                <p className="text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
