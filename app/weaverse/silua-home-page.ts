import type {
  HydrogenComponentData,
  HydrogenPageData,
} from "@weaverse/hydrogen";
import * as SiluaBestsellers from "~/sections/silua-bestsellers";
import * as SiluaFooter from "~/sections/silua-footer";
import * as SiluaHero from "~/sections/silua-hero";
import * as SiluaMembership from "~/sections/silua-membership";
import * as SiluaRitual from "~/sections/silua-ritual";
import * as SiluaStory from "~/sections/silua-story";
import * as SiluaSubscribe from "~/sections/silua-subscribe";
import * as SiluaTalismans from "~/sections/silua-talismans";
import * as SiluaVoices from "~/sections/silua-voices";

type SectionPresets = Record<string, unknown> | undefined;

function pushSection(
  items: HydrogenComponentData[],
  mainRefs: { id: string }[],
  id: string,
  type: string,
  presets: SectionPresets,
) {
  const { children, ...data } = presets ?? {};
  const childRefs: { id: string }[] = [];
  const childItems: HydrogenComponentData[] = [];

  if (Array.isArray(children)) {
    children.forEach((child, index) => {
      const { type: childType, ...childData } = child as {
        type: string;
        [key: string]: unknown;
      };
      const childId = `${id}--${index + 1}`;
      childRefs.push({ id: childId });
      childItems.push({
        id: childId,
        type: childType,
        data: childData as HydrogenComponentData["data"],
        children: [],
      });
    });
  }

  items.push({
    id,
    type,
    data: data as HydrogenComponentData["data"],
    children: childRefs,
  });
  items.push(...childItems);
  mainRefs.push({ id });
}

/**
 * Builds the Silua homepage composition (per design_handoff_silua_homepage)
 * as a Weaverse page data structure. Every section type here is a registered
 * Weaverse component, so the result renders through the normal Weaverse
 * pipeline and stays fully editable in Studio.
 *
 * The values come from each section's schema presets — a single source of
 * truth: editing a section's default settings updates the composition too.
 */
export function buildSiluaHomePage(): HydrogenPageData {
  const items: HydrogenComponentData[] = [];
  const mainRefs: { id: string }[] = [];

  pushSection(
    items,
    mainRefs,
    "silua-hero",
    "silua-hero",
    SiluaHero.schema.presets,
  );
  pushSection(
    items,
    mainRefs,
    "silua-story",
    "silua-story",
    SiluaStory.schema.presets,
  );
  pushSection(
    items,
    mainRefs,
    "silua-talismans",
    "silua-talismans",
    SiluaTalismans.schema.presets,
  );
  pushSection(
    items,
    mainRefs,
    "silua-bestsellers",
    "silua-bestsellers",
    SiluaBestsellers.schema.presets,
  );
  pushSection(
    items,
    mainRefs,
    "silua-ritual",
    "silua-ritual",
    SiluaRitual.schema.presets,
  );
  pushSection(
    items,
    mainRefs,
    "silua-voices",
    "silua-voices",
    SiluaVoices.schema.presets,
  );
  pushSection(
    items,
    mainRefs,
    "silua-membership",
    "silua-membership",
    SiluaMembership.schema.presets,
  );
  pushSection(
    items,
    mainRefs,
    "silua-subscribe",
    "silua-subscribe",
    SiluaSubscribe.schema.presets,
  );
  pushSection(
    items,
    mainRefs,
    "silua-footer",
    "silua-footer",
    SiluaFooter.schema.presets,
  );

  items.unshift({
    id: "silua-main",
    type: "main",
    data: {},
    children: mainRefs,
  });

  return {
    id: "silua-homepage",
    name: "Home",
    rootId: "silua-main",
    items,
    seo: null,
  };
}

/** True when the page already contains any Silua section (user-composed). */
export function hasSiluaSections(
  page: { items?: { type?: string }[] } | undefined | null,
): boolean {
  return page?.items?.some((item) => item.type?.startsWith("silua-")) ?? false;
}
