import type { Metadata } from "next";
import AboutPage from "../../components/about/AboutPage";
import { aboutContentEn } from "../../lib/content/about";

export const metadata: Metadata = {
  title: aboutContentEn.meta.title,
  description: aboutContentEn.meta.description,
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      fr: "/fr/about",
    },
  },
};

export default function About() {
  return <AboutPage content={aboutContentEn} />;
}
