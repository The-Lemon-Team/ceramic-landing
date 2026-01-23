import Image from "next/image";
import Link from "next/link";

export default function DiarySection() {
  return (
    <section className="bg-stone-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 border-b border-stone-200 pb-4">
          <h2 className="text-4xl font-serif">Статьи</h2>
          <Link
            href="#"
            className="text-sm uppercase tracking-widest text-primary font-semibold flex items-center gap-2"
          >
            View Archive{" "}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-6">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEcKSfVsH7iGB-mhi7w7JAKeYKnvJHyHkiu7hhvFQY9t4V9OcwOHYHaOaG5V570RL4eOESCIRWecXf8FlKDpKSlWDcUUjNrK1wiK-RN8maFl35EpaE8415OQsRN98U7H8O4BZFEJ_NVD5gzEt-fRk7Iw08E3tAN3qX7TPwk-8DWXJcfNADEiaW2LjnmcfAD1qoXqiB6jvo5RmSSxCRSeRFRSowy4EzsPGjHjtv4b9vfWKtHhzRREP6xBVQx1tVOSMmiEwtNN6womg"
                alt="Finished ceramics on a wooden shelf"
                width={500}
                height={250}
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">
              Process
            </span>
            <h3 className="text-3xl font-serif mb-3">
              The Chemistry of Glazing
            </h3>
            <p className="text-stone-500">
              Exploring the raw interactions of minerals and heat. How a simple
              mix of feldspar and silica transforms into glass under fire.
            </p>
          </div>
          <div className="md:col-span-4 group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-6">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM-HgxXPcEg8h62pk-CuR7vg8jsiUiyDhWTZmXFInrQwEg9P5gXXGSYtpEmQ3d5rUh7HO0UcYe3plkB8PoyvtWzhHyezz_g5y3qQh5LcNZQD7eNmdSccjc-QjDQ6vFO-sIxwAPEQTbYIAPTYJ4eMk8AkPm4INgQ9bY0dNSv4M2ZVUs4JQvvVX7K5pz2pYn4tqgn6vfpWhfovCDZD2NZ85VmQOJb51uR69JWAdkCteAQM4HoTizQb1oIWhTGzqsQY6dgaS4VAaUcE4"
                alt="Morning sketching in a notebook"
                width={400}
                height={400}
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">
              Inspiration
            </span>
            <h3 className="text-3xl font-serif mb-3">Morning Rituals</h3>
            <p className="text-stone-500">
              Quiet moments before the wheel spins. The importance of stillness
              in the creative process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
