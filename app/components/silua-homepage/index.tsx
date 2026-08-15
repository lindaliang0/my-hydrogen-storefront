import type React from "react";
import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import "~/styles/silua-home.css";
import { useCartStore } from "~/components/cart/store";
import {
  BESTSELLERS,
  FOOTER_COLUMNS,
  IMAGES,
  MARQUEE_ITEMS,
  SUBSCRIBE_FEATURES,
  TALISMANS,
  TIERS,
  VOICES,
  type BestProduct,
  type Talisman,
  type Tier,
  type Voice,
} from "./data";

/* ------------------------------------------------------------------ */
/*  Interactions: reveal-on-scroll, nav dark-mode switch, smooth scroll */
/* ------------------------------------------------------------------ */

function useSiluaInteractions(rootRef: React.RefObject<HTMLDivElement | null>) {
  // Smooth anchor scrolling with offset for the fixed nav.
  useEffect(() => {
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    const prevPadding = html.style.scrollPaddingTop;
    html.style.scrollBehavior = "smooth";
    html.style.scrollPaddingTop = "80px";
    return () => {
      html.style.scrollBehavior = prevBehavior;
      html.style.scrollPaddingTop = prevPadding;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reveal-on-scroll for every `.reveal` block.
    const revealElements = Array.from(
      root.querySelectorAll<HTMLElement>(".reveal"),
    );
    if (reduceMotion) {
      revealElements.forEach((el) => el.classList.add("in"));
    } else {
      const revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealIO.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
      );
      revealElements.forEach((el) => revealIO.observe(el));
      return () => revealIO.disconnect();
    }
  }, [rootRef]);

  // Swap the fixed nav to its dark variant when a dark section is under it.
  useEffect(() => {
    const root = rootRef.current;
    const nav = root?.querySelector<HTMLElement>(".nav");
    if (!root || !nav) return;

    const darkSections = root.querySelectorAll<HTMLElement>(
      ".hero, .talismans, .ritual-strip, .subscribe, .silua-footer",
    );
    const updateNav = () => {
      const anyDark = Array.from(darkSections).some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top < 60 && rect.bottom > 60;
      });
      nav.classList.toggle("on-dark", anyDark);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, [rootRef]);
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

function Nav() {
  const serverCart = useCartStore((state) => state.serverCart);
  const cartCount = serverCart?.totalQuantity ?? 0;

  return (
    <nav className="nav" id="silua-nav">
      <div className="nav-left">
        <a href="#story" className="nav-link">
          The Story
        </a>
        <a href="#collection" className="nav-link">
          Collection
        </a>
        <a href="#bestsellers" className="nav-link">
          Bestsellers
        </a>
        <a href="#membership" className="nav-link">
          Circle Silua
        </a>
      </div>
      <div className="brand-mark">
        <span className="dot" />
        SILUA
      </div>
      <div className="nav-right">
        <a href="#" className="nav-link">
          Journal
        </a>
        <a href="#subscribe" className="nav-link">
          Subscribe
        </a>
        <a href="#" className="nav-link">
          Bag
          {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
        </a>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${IMAGES.heroBg})` }}
      />

      <div className="hero-content">
        <div className="hero-inner reveal">
          <div className="hero-meta">
            <span className="eyebrow" style={{ color: "var(--clay-light)" }}>
              丝露雅 · Mindful Activation · Volume I / MMXXVI
            </span>
          </div>
          <h1>
            Find Your <em>Inner</em>
            <br />
            Silua.
          </h1>
          <p className="hero-sub">
            Silence meets moonlight — a tangible reminder that gentle strength
            is still strength. Worn as a quiet companion, not a promise.
          </p>
          <div className="hero-cta-row">
            <a href="#collection" className="hero-cta">
              Enter the Collection
            </a>
            <a href="#story" className="hero-cta ghost">
              Read our Story
            </a>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>

      <div className="hero-bottom-bar">
        <div className="hero-bottom-bar-inner">
          <div className="grouped">
            <div>
              <span className="label">Volume</span>
              <span className="value">I / MMXXVI</span>
            </div>
            <div>
              <span className="label">Origin</span>
              <span className="value">Deep Valley · China</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="label">Ritual</span>
            <span className="value">Resonance Attunement</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section header (num + title + desc)                                */
/* ------------------------------------------------------------------ */

function SectionHeader({
  num,
  title,
  desc,
}: {
  num: string;
  title: React.ReactNode;
  desc: string;
}) {
  return (
    <div className="section-header reveal">
      <div className="section-num">{num}</div>
      <div className="section-title-row">
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  01 · The Story                                                     */
/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section className="silua-section story" id="story">
      <SectionHeader
        num="i. The Story"
        title={
          <>
            For the woman who <em>carries the world</em>
            <br />
            on her shoulders.
          </>
        }
        desc="A house born in the quiet — where silence, moonlight and skin meet."
      />

      <div className="story-body">
        <div className="story-image reveal">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${IMAGES.storyMountain})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="story-text reveal">
          <p className="lead">
            Silua isn't jewelry. It's a <em>reminder</em> — like moonlight on a
            late-night walk home, it doesn't speak; it simply lights the way.
          </p>

          <p>
            Our name is a word we created from two ancient roots:{" "}
            <em>Silence</em> and <em>Luna</em>. Stillness and moonlight — the
            two things that have guided travelers through darkness for thousands
            of years, and the gift we all long for, yet rarely give ourselves.
          </p>

          <p>
            Every piece begins as a journey from mountain to mind. Deep in a
            remote valley, far from urban electromagnetic noise, each raw stone
            undergoes our signature <em>Resonance Ritual</em> — a precision
            attunement in a natural acoustic sanctuary, absorbing the rhythm of
            nature and low-frequency temple resonance.
          </p>

          <div className="story-pull">
            "Your quietest moments hold your greatest power."
            <span className="attribution">— The Silua Manifesto</span>
          </div>

          <p className="small">
            We don't promise miracles. We offer something simpler: a tangible
            reminder — for the moments you forget who you are, so you can
            remember. These symbols have guided seekers for millennia. Now, they
            guide you.
          </p>

          <div className="story-signature">
            <div>
              <span className="name-serif">Ling, Founder of Silua</span>
            </div>
            <a href="#">Read the founder letter →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  02 · The Collection (Four Talismans)                               */
/* ------------------------------------------------------------------ */

function TalismanCard({ talisman }: { talisman: Talisman }) {
  return (
    <div className="talisman-card reveal">
      <div
        className="talisman-img"
        style={{ backgroundImage: `url(${talisman.image})` }}
      >
        <span className="talisman-num">{talisman.num}</span>
        <span className="talisman-cn">{talisman.cn}</span>
      </div>
      <div className="talisman-info">
        <h3 className="talisman-name">{talisman.name}</h3>
        <p className="talisman-tag">{talisman.tag}</p>
        <p className="talisman-desc">{talisman.desc}</p>
        <a href="#" className="talisman-arrow">
          <span>Discover</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}

function Talismans() {
  return (
    <section className="silua-section talismans dark-section" id="collection">
      <SectionHeader
        num="ii. The Collection"
        title={
          <>
            Four <em>talismans.</em>
            <br />
            Four intentions.
          </>
        }
        desc="Symbols that have guided seekers for millennia — now, they guide you."
      />

      <div className="talisman-grid">
        {TALISMANS.map((talisman) => (
          <TalismanCard key={talisman.name} talisman={talisman} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  03 · Bestsellers                                                   */
/* ------------------------------------------------------------------ */

const BADGE_CLASS: Record<BestProduct["badge"], string> = {
  signature: "",
  gold: "gold",
  new: "new",
};

function BestCard({ product }: { product: BestProduct }) {
  return (
    <article className="best-card reveal">
      <div
        className="best-img"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundColor: product.imageBg,
        }}
      >
        <span className={`best-badge ${BADGE_CLASS[product.badge]}`}>
          {product.badgeLabel}
        </span>
        <div className="best-fav" role="button" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24">
            <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
          </svg>
        </div>
      </div>
      <div className="best-body">
        <div className="best-meta">
          <span>{product.meta}</span>
          <span>{product.metaRight}</span>
        </div>
        <h3 className="best-name">{product.name}</h3>
        <p className="best-cn">{product.cn}</p>
        <p className="best-material">{product.material}</p>
        <div className="best-foot">
          <div className="best-price">
            {product.price}
            {product.oldPrice && (
              <span className="old">{product.oldPrice}</span>
            )}
          </div>
          <a href="#" className="best-btn">
            Add to Bag
          </a>
        </div>
      </div>
    </article>
  );
}

function Bestsellers() {
  return (
    <section className="silua-section bestsellers" id="bestsellers">
      <SectionHeader
        num="iii. Bestsellers"
        title={
          <>
            Worn by those who have <em>learned to pause.</em>
          </>
        }
        desc="The three pieces most often chosen as a first Silua."
      />

      <div className="best-grid">
        {BESTSELLERS.map((product) => (
          <BestCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Ritual strip (interlude)                                           */
/* ------------------------------------------------------------------ */

function RitualStrip() {
  return (
    <section className="ritual-strip">
      <span className="eyebrow">The Mindful Activation</span>
      <h3>
        Every Silua piece begins as a journey
        <br />
        <em>from mountain to mind.</em>
      </h3>
      <p className="sub">
        True calm isn't manufactured — it's awakened. Each gemstone is attuned
        in a natural acoustic sanctuary, absorbing the rhythm of nature and
        low-frequency temple resonance.
      </p>
      <a href="#" className="ritual-link">
        Discover the Resonance Ritual →
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  04 · Voices                                                        */
/* ------------------------------------------------------------------ */

function VoiceCard({ voice }: { voice: Voice }) {
  return (
    <div className="voice-card reveal">
      <div className="voice-stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>
      <span className="voice-quote-mark">"</span>
      <p className="voice-text">
        {voice.text}
        {voice.translation && <em>{voice.translation}</em>}
      </p>
      <div className="voice-foot">
        <div className="voice-attr">
          <div className="name">{voice.name}</div>
          <div className="role">{voice.role}</div>
        </div>
        <div className="voice-product">
          Wearing
          <em>{voice.product}</em>
        </div>
      </div>
    </div>
  );
}

function Voices() {
  return (
    <section className="silua-section voices" id="voices">
      <SectionHeader
        num="iv. Voices"
        title={
          <>
            Notes from the <em>quiet</em> ones.
          </>
        }
        desc="Real moments, real returns to center."
      />

      <div className="voices-grid">
        {VOICES.map((voice) => (
          <VoiceCard key={voice.name} voice={voice} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  05 · Circle Silua Membership                                       */
/* ------------------------------------------------------------------ */

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div className={tier.featured ? "tier featured" : "tier"}>
      {tier.badge && <span className="tier-badge">{tier.badge}</span>}
      <div className="tier-head">
        <div className="tier-name">{tier.name}</div>
        <div className="tier-cn">{tier.cn}</div>
      </div>
      <div className="tier-benefits">{tier.benefits}</div>
      <div>
        <div className="tier-price">
          {tier.price}
          <span className="per">{tier.per}</span>
        </div>
        <a href="#" className="tier-cta">
          {tier.cta}
        </a>
      </div>
    </div>
  );
}

function Membership() {
  return (
    <section
      className="silua-section membership"
      id="membership"
      style={
        { "--membership-bg": `url(${IMAGES.storyMountain})` } as CSSProperties
      }
    >
      <SectionHeader
        num="v. Circle Silua"
        title={
          <>
            A quiet <em>circle</em> for those who return.
          </>
        }
        desc="Membership isn't a discount — it's a deeper relationship with the ritual."
      />

      <div className="member-grid">
        <div className="member-intro reveal">
          <h2>
            Silua
            <br />
            <em>Circle.</em>
          </h2>
          <p>
            Membership at Silua is a threshold, not a transaction. Each tier
            deepens your relationship with the mountain, the ritual, and the
            atelier behind every piece.
          </p>
          <div className="member-perks">
            <h5>What every member receives</h5>
            <ul>
              <li>Complimentary Resonance Ritual on every piece</li>
              <li>Silua Journal — quarterly print letters</li>
              <li>Members-only atelier drops & pre-releases</li>
              <li>Complimentary re-attunement every 12 months</li>
              <li>Invitations to Silua salons & meditation circles</li>
            </ul>
          </div>
        </div>

        <div className="tier-list reveal">
          {TIERS.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  06 · The Silua Journal Subscribe                                   */
/* ------------------------------------------------------------------ */

function Subscribe() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sent");
  };

  return (
    <section className="subscribe" id="subscribe">
      <div className="subscribe-grid">
        <div className="subscribe-left reveal">
          <span className="num-eyebrow">vi. The Silua Journal</span>
          <h2>
            Letters
            <br />
            from the <em>quiet.</em>
          </h2>
          <p>
            A slow letter — arriving on the first Monday of each month.
            Meditations, atelier notes, and the occasional first look at a piece
            before it becomes public.
          </p>

          <div className="subscribe-features">
            {SUBSCRIBE_FEATURES.map((feature) => (
              <div className="sub-feature" key={feature.num}>
                <span className="num">{feature.num}</span>
                <span className="txt">{feature.txt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="subscribe-right reveal">
          <span className="card-eyebrow">Subscribe — Free</span>
          <h3>
            Receive our <em>monthly letter</em>, and 10% off your first Silua.
          </h3>
          <p className="note">
            Enter your email below. We'll send you a welcome ritual, a
            meditation guide, and a private code for your first piece.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="field-row">
              <input type="email" placeholder="your.email@quiet.co" required />
              <button type="submit">
                {status === "sent" ? "Sent — check your inbox." : "Subscribe →"}
              </button>
            </div>
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>
                I'd like to receive occasional letters & ritual invitations from
                Silua. Unsubscribe anytime.
              </span>
            </label>
          </form>

          <div className="subscribe-benefits">
            <span>10% welcome</span>
            <span>Members-only drops</span>
            <span>Private previews</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function SiluaFooter() {
  return (
    <footer className="silua-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="mark">SILUA</span>
          <p>
            Silence + Luna. The quiet light that guides you home to yourself.
          </p>
          <div className="cn">丝露雅 · 寂静月光</div>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <div className="footer-col" key={column.title}>
            <h5>{column.title}</h5>
            <ul>
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div>© MMXXVI · Silua Atelier · All Rights Reserved</div>
        <div className="cred">Find Your Inner Silua.</div>
        <div>Volume I · MMXXVI</div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Silua Homepage                                                     */
/* ------------------------------------------------------------------ */

export function SiluaHomepage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiluaInteractions(rootRef);

  return (
    <div ref={rootRef} className="silua-home">
      <Nav />
      <Hero />
      <Story />
      <Talismans />
      <Bestsellers />
      <RitualStrip />
      <Voices />
      <Membership />
      <Subscribe />
      <SiluaFooter />
    </div>
  );
}
