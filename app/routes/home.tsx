import type { SeoConfig } from "@shopify/hydrogen";
import { AnalyticsPageType, getSeoMeta } from "@shopify/hydrogen";
import { getWeaverseSeoMeta, type PageType } from "@weaverse/hydrogen";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import type { ShopQuery } from "storefront-api.generated";
import { seoPayload } from "~/.server/seo";
import { SiluaHomepage } from "~/components/silua-homepage";
import { routeHeaders } from "~/utils/cache";
import { validateWeaverseData, WeaverseContent } from "~/weaverse";

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
  const [weaverseData, { shop }] = await Promise.all([
    // The Silua homepage (INDEX) is a code-defined design; Weaverse is only
    // used for root-level custom pages served by this route.
    type === "INDEX"
      ? Promise.resolve(null)
      : context.weaverse.loadPage({ type }),
    // Shop name/description only — effectively static content.
    context.storefront.query<ShopQuery>(SHOP_QUERY, {
      cache: context.storefront.CacheLong(),
    }),
  ]);

  const seo = type === "INDEX" ? seoPayload.home({ shop }) : null;

  return {
    shop,
    type,
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
  const { type, weaverseData } = useLoaderData<typeof loader>();

  // The real homepage renders the Silua design; CUSTOM pages (root-level
  // Weaverse handles) keep rendering the Weaverse visual builder content.
  if (type === "INDEX") {
    return <SiluaHomepage />;
  }

  if (weaverseData) {
    validateWeaverseData(weaverseData);
  }
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
