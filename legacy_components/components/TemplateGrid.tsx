import TemplateCard from "./TemplateCard";

interface Template {
  title: string;
  views: string;
  hearts: string;
  imageUrl?: string;
  authorIcon?: string;
}

const templates: Template[] = [
  {
    title: "Brilliance SaaS Landing Page",
    views: "4.9K",
    hearts: "801",
  },
  {
    title: "3D Gallery Photography Template",
    views: "1.5K",
    hearts: "347",
    authorIcon: "H/S",
  },
  {
    title: "AI Gateway Starter",
    views: "252",
    hearts: "53",
  },
  {
    title: "Pointer AI landing page",
    views: "14K",
    hearts: "1K",
  },
  {
    title: "Dashboard – M.O.N.K.Y",
    views: "6.8K",
    hearts: "646",
    authorIcon: "😊",
  },
  {
    title: "Skal Ventures Template",
    views: "2.9K",
    hearts: "388",
    authorIcon: "😊",
  },
  {
    title: "Shaders Hero Section",
    views: "8.9K",
    hearts: "1.2K",
  },
  {
    title: "Shaders Landing Page",
    views: "639",
    hearts: "147",
  },
  {
    title: "Storefront w/Nano Banana + AI SDK + AI Gateway",
    views: "1.8K",
    hearts: "250",
  },
  {
    title: "v0 icon",
    views: "275",
    hearts: "41",
  },
  {
    title: "Portfolio Template",
    views: "1.2K",
    hearts: "215",
    authorIcon: "😊",
  },
  {
    title: "Minimalist Portfolio",
    views: "2.9K",
    hearts: "658",
  },
];

export default function TemplateGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              From the Community
            </h2>
            <p className="text-gray-400">
              Explore what the community is building with v0.
            </p>
          </div>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
          >
            Browse All →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg text-white transition-colors">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}

