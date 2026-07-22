import Image from "next/image";

import { typeBody, typeMeta, typeSubsection } from "@/lib/typography";

type ProjectCardProps = {
  title: string;
  tagline: string;
  description: string;
  tags: readonly string[];
  image: string;
  imageAlt: string;
  onSelect?: () => void;
};

export function ProjectCard({
  title,
  tagline,
  description,
  tags,
  image,
  imageAlt,
  onSelect,
}: ProjectCardProps) {
  const content = (
    <>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-raised">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div>
          <h3 className={`${typeSubsection} mb-2`}>{title}</h3>
          <p className={typeMeta}>{tagline}</p>
        </div>

        <p className={`${typeBody} text-text-primary/85`}>{description}</p>

        <ul className="mt-auto flex flex-wrap gap-2" aria-label="Skills">
          {tags.map((tag) => (
            <li key={tag}>
              <span className="neon-tag inline-block px-3 py-1.5">{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className="focus-neon group w-full text-left"
      >
        <article className="neon-border flex h-full flex-col overflow-hidden bg-surface transition-colors hover:bg-surface-raised">
          {content}
        </article>
      </button>
    );
  }

  return (
    <article className="group neon-border flex flex-col overflow-hidden bg-surface transition-colors hover:bg-surface-raised">
      {content}
    </article>
  );
}
