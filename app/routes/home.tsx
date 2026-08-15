import type { SeoConfig } from "@shopify/hydrogen";
import { AnalyticsPageType, getSeoMeta } from "@shopify/hydrogen";
import { getWeaverseSeoMeta, type PageType } from "@weaverse/hydrogen";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import type { ShopQuery } from "storefront-api.generated";
import { seoPayload } from "~/.server/seo";
import { routeHeaders } from "~/utils/cache";
import { validateWeaverseData, WeaverseContent } from "~/weaverse";
import {
  buildSiluaHomePage,
  hasSiluaSections,
} from "~/weaverse/silua-home-page";

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const { params, context } = args;
  const { pathPrefix } = context.storefront.i18n;
  const locale = pathPrefix?.slice(1) || "";
  let type: PageType = "INDEX";

  if (params.locale && params.locale.toLowerCase() !== locale) {
    // Update for Weaverse: if it not locale, it probably is a custom page handle
    type = "CUSTOM";
  }

  // Load async data in parallel for better performance
  const [rawWeaverseData, { shop }] = await Promise.all([
    context.weaverse.loadPage({ type }),
    // Shop name/description only — effectively static content.
    context.storefront.query<ShopQuery>(SHOP_QUERY, {
      cache: context.storefront.CacheLong(),
    }),
  ]);

  let weaverseData = rawWeaverseData;
  // Until a Silua composition is saved in Studio, render the code-defined
  // Silua homepage built from the registered Weaverse sections. Once the
  // cloud page contains any silua-* section, it takes over automatically.
  if (
    type === "INDEX" &&
    weaverseData &&
    !weaverseData.configs?.isPreviewMode &&
    !hasSiluaSections(weaverseData.page)
  ) {
    weaverseData = { ...weaverseData, page: buildSiluaHomePage() };
  }

  // Check weaverseData after parallel loading
  validateWeaverseData(weaverseData);

  const seo = type === "INDEX" ? seoPayload.home({ shop }) : null;

  return {
    shop,
    weaverseData,
    analytics: {
      pageType: AnalyticsPageType.home,
    },
    seo,
  };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // INDEX (real homepage) keeps the code-defined SEO — no Weaverse override.
  // CUSTOM pages served by this route get their SEO from Weaverse.
  if (data?.seo) {
    return getSeoMeta(data.seo as SeoConfig);
  }
  return getWeaverseSeoMeta(data?.weaverseData);
};

export default function Homepage() {
  return <WeaverseContent />;
}

const SHOP_QUERY = `#graphql
  query shop($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    shop {
      name
      description
    }
  }
` as const;
