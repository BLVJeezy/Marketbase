import { ArrowRight, ShieldCheck } from "lucide-react";
import logoHero from "@/assets/logo-belgomed-hero.png";
import { useLang } from "@/contexts/LangContext";

/**
 * The hero's business content, unchanged from the production hero.
 *
 * This stays real DOM — headings, copy and links — rather than moving into
 * the product visual. The animation is presentation; this is the meaning
 * search engines and assistive technology read. §47
 */
export const HeroCopy = () => {
  const { t } = useLang();

  return (
    <>
      <div className="flex items-center gap-2 mb-4 md:mb-6 fade-up">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary font-medium">
          {t("hero.badge")}
        </span>
      </div>
      <img
        src={logoHero}
        alt="Belgomed BV — Medische Groothandel"
        width={1024}
        height={256}
        className="max-w-[240px] md:max-w-lg lg:max-w-xl w-full h-auto mb-4 md:mb-6 fade-up fade-up-delay-1 dark:invert dark:hue-rotate-180"
      />
      <h1 className="sr-only">
        Belgomed BV — GDP &amp; WDA Gecertificeerde Medische Groothandel in Hasselt, België |
        Farmaceutische Distributie
      </h1>
      <p className="text-sm md:text-xl text-muted-foreground max-w-xl leading-relaxed fade-up fade-up-delay-2">
        {t("hero.desc")}
      </p>
    </>
  );
};

/**
 * Both calls to action. Rendered inside the copy column on desktop and below
 * the product on mobile, but never behind it and never gated on finishing the
 * animation. §14
 */
export const HeroCta = () => {
  const { t } = useLang();

  return (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 fade-up fade-up-delay-3">
      <a
        href="#diensten"
        className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(180_100%_40%/0.3)]"
      >
        {t("hero.cta")}
        <ArrowRight className="w-4 h-4" />
      </a>
      <a
        href="#contact"
        className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-lg border border-border text-foreground font-semibold text-sm tracking-wide uppercase hover:border-primary/50 hover:text-primary transition-all duration-300"
      >
        {t("hero.contact")}
      </a>
    </div>
  );
};
