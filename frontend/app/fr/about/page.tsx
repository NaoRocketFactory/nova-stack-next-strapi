import type { Metadata } from "next";
import AboutPage from "../../../components/about/AboutPage";
import { aboutContentFr } from "../../../lib/content/about";

export const metadata: Metadata = {
  title: aboutContentFr.meta.title,
  description: aboutContentFr.meta.description,
  alternates: {
    canonical: "/fr/about",
    languages: {
      en: "/about",
      fr: "/fr/about",
    },
  },
};

export default function AboutFr() {
  return <AboutPage content={aboutContentFr} />;
}
