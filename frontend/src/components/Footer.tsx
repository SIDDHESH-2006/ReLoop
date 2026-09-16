import { Link, useLocation } from "react-router";
import { ArrowUpRight, Mail, Phone, MapPin, Recycle } from "lucide-react";
import { RadialEmblem } from "./effects";
import { isPublicPath } from "../lib/routeKind";

/* ---------- Student portal footer (authenticated experience) ---------- */
const portalLinks = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/analyze", label: "Analyze Item" },
  { to: "/impact", label: "Impact" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/list", label: "List an item" },
  { to: "/map", label: "Campus Map" },
];

function PortalFooter() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-primary">
              <Recycle className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <span className="font-display text-2xl font-extrabold">Reloop</span>
          </div>
          <h2 className="max-w-xl font-display text-4xl font-extrabold leading-[0.95] sm:text-5xl">
            GIVE YOUR NEXT ITEM A <span className="text-primary">NEXT LIFE.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/list"
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-primary px-6 py-3 font-mono text-sm font-bold uppercase text-primary-foreground shadow-[4px_4px_0_#fff] transition-transform hover:-translate-y-1"
            >
              List an item <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-white bg-amber px-6 py-3 font-mono text-sm font-bold uppercase text-foreground shadow-[4px_4px_0_#fff] transition-transform hover:-translate-y-1"
            >
              Explore marketplace
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {portalLinks.map((u) => (
              <Link
                key={u.label}
                to={u.to}
                className="group flex items-center gap-1 py-1 text-sm font-semibold text-white/70 transition-colors hover:text-primary"
              >
                {u.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <RadialEmblem size={92} />
            <p className="max-w-[16rem] text-xs text-white/50">
              A campus circular-economy platform. Environmental figures shown across Reloop are estimates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Public footer (general RELOOP information) ---------- */
const generalLinks = [
  { to: "/about", label: "About Reloop" },
  { to: "/about#how", label: "How It Works" },
  { to: "/about#services", label: "Our Services" },
  { to: "/about#contact", label: "Contact" },
];
const partnerLinks = [
  { to: "/food-institutions", label: "Food Institutions" },
  { to: "/recyclers-upcyclers", label: "Recyclers / Upcyclers" },
  { to: "/ngos-donations", label: "NGOs / Donation Organisations" },
];
const socialLinks = ["LinkedIn", "Instagram", "Email"];

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{title}</div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function PublicFooter() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-primary">
              <Recycle className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <span className="font-display text-2xl font-extrabold">Reloop</span>
          </div>
          <h2 className="max-w-md font-display text-3xl font-extrabold leading-[0.98] sm:text-4xl">
            Find the next best life for <span className="text-primary">every item.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm text-white/60">
            A circular-economy platform keeping products, materials and resources in use — connecting students,
            food institutions, recyclers, upcyclers and donation organisations.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map((s) => (
              <span
                key={s}
                data-cursor="link"
                className="cursor-pointer rounded-full border-2 border-white/40 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-white/70 transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* General + Partner */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">
          <FooterCol title="General">
            {generalLinks.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm font-semibold text-white/70 transition-colors hover:text-primary">
                {l.label}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Partner with Reloop">
            {partnerLinks.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm font-semibold text-white/70 transition-colors hover:text-primary">
                {l.label}
              </Link>
            ))}
          </FooterCol>
        </div>

        {/* Contact */}
        <div className="flex flex-col justify-between gap-8">
          <FooterCol title="Contact">
            <span className="inline-flex items-center gap-2 text-sm text-white/70">
              <Mail className="h-4 w-4 text-primary" /> hello@reloop.example
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-white/70">
              <Phone className="h-4 w-4 text-primary" /> +91 XXXXX XXXXX
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 text-primary" /> Campus Circular Economy Network
            </span>
          </FooterCol>
          <div className="flex items-center gap-4">
            <RadialEmblem size={80} />
            <p className="max-w-[14rem] text-xs text-white/50">
              Contact details are placeholders. Environmental figures shown across Reloop are estimates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const isPublic = isPublicPath(pathname);
  return (
    <footer className="relative mt-24 overflow-hidden bg-foreground text-white">
      {isPublic ? <PublicFooter /> : <PortalFooter />}

      {/* kinetic watermark */}
      <div aria-hidden className="overflow-hidden">
        <div className="flex w-max animate-marquee-rev select-none whitespace-nowrap font-display text-[22vw] font-extrabold leading-none text-white/[0.06]">
          <span className="pr-[0.08em]">RELOOP</span>
          <span className="pr-[0.08em]">RELOOP</span>
          <span className="pr-[0.08em]">RELOOP</span>
          <span className="pr-[0.08em]">RELOOP</span>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center font-mono text-[11px] uppercase tracking-widest text-white/40">
        © 2026 Reloop · Find the next best life for every item
      </div>
    </footer>
  );
}
