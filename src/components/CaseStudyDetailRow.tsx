import { typeBody, typeSubsection } from "@/lib/typography";

type CaseStudyDetailRowProps = {
  label: string;
  body: string;
};

export function CaseStudyDetailRow({ label, body }: CaseStudyDetailRowProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-[minmax(140px,225px)_minmax(0,36rem)] md:items-start md:gap-x-6 lg:grid-cols-[225px_minmax(3rem,1fr)_minmax(280px,530px)] lg:gap-x-8 xl:gap-x-10">
      <h3 className={`${typeSubsection} md:col-start-1 md:row-start-1`}>{label}</h3>

      <div
        aria-hidden
        className="h-[2px] w-full bg-neon-pink shadow-[0_0_10px_rgba(255,19,240,0.45)] md:hidden"
      />

      <div
        aria-hidden
        className="hidden h-[2px] w-full min-w-[3rem] bg-neon-pink shadow-[0_0_10px_rgba(255,19,240,0.45)] lg:col-start-2 lg:row-start-1 lg:mt-[22px] lg:block"
      />

      <p
        className={`min-w-0 max-w-[65ch] ${typeBody} text-text-primary/85 md:col-start-2 md:row-start-1 lg:col-start-3 lg:max-w-[530px]`}
      >
        {body}
      </p>
    </div>
  );
}
