import { generateText } from "ai";
import { getModel } from "../providers";

export type TranslateLang = "fr" | "en";

const LANG_NAMES: Record<TranslateLang, string> = {
  fr: "French",
  en: "English",
};

/**
 * Translates a piece of text into the target language.
 */
export async function translate(text: string, targetLang: TranslateLang): Promise<string> {
  const { text: translated } = await generateText({
    model: getModel(),
    system:
      `You are a professional translator. Translate the user's text into ${LANG_NAMES[targetLang]}. ` +
      "Return only the translated text — no explanation, no quotes, no markdown.",
    prompt: text,
  });
  return translated;
}
