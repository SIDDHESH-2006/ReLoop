import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
import { Menu, X, Recycle, User, Wrench } from "lucide-react";
import { cx } from "./ui";

// Authenticated Student Portal navigation.
const links = [
  { to: "/sell", label: "Sell" },
  { to: "/marketplace", label: "Buy" },
  { to: "/marketplace", label: "Rent" },
  { to: "/marketplace", label: "Donate" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.1 }}
      className="fixed left-1/2 top-4 z-50 w-[min(1120px,calc(100%-1.5rem))] -translate-x-1/2"
    >
      <nav
        className={cx(
          "flex items-center justify-between rounded-full border-[3px] border-foreground bg-white/80 backdrop-blur-xl shadow-[4px_4px_0_#111] transition-all duration-300",
          scrolled ? "px-3 py-1.5" : "px-4 py-2.5",
        )}
      >
        <Link to="/" className="flex items-center gap-2" data-cursor="link">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-foreground bg-primary">
            <Recycle className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">Reloop</span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end
              data-cursor="link"
              className={({ isActive }) =>
                cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted",
                  isActive && "underline decoration-primary decoration-2 underline-offset-4",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            data-cursor="link"
            className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-foreground bg-[#e5484d] px-5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-0.5"
          >
            <Wrench className="h-4 w-4" /> Repair
          </button>
          <Link
            to="/dashboard"
            data-cursor="link"
            aria-label="Profile"
            className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-foreground bg-white shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-0.5"
          >
            <User className="h-5 w-5" strokeWidth={2.4} />
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-3xl border-[3px] border-foreground bg-white p-3 shadow-[4px_4px_0_#111] lg:hidden"
        >
          {[...links, { to: "/dashboard", label: "Profile" }].map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-base font-semibold hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-2xl border-[3px] border-foreground bg-[#e5484d] px-4 py-3 text-center font-bold uppercase tracking-wide text-white"
          >
            <Wrench className="h-4 w-4" /> Repair
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
