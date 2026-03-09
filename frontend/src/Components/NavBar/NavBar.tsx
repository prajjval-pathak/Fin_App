import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { useAuth } from "../../Context/useAuth";

type NavLinkItem = {
  to: string;
  label: string;
  accent?: boolean;
  onClick?: () => void;
  state?: { from?: { pathname: string } };
};

const NavBar = () => {
  const { isLoggedIn, logoutUser, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedIn = isLoggedIn();

  const primaryLinks: NavLinkItem[] = loggedIn
    ? [
        { to: "/", label: "Home" },
        { to: "/analyze", label: "Analyze" },
        { to: "/search", label: "Dashboard" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/analyze", label: "Analyze" },
        {
          to: "/login",
          label: "Dashboard",
          state: { from: { pathname: "/search" } },
        },
      ];

  const secondaryLinks: NavLinkItem[] = loggedIn
    ? [{ to: "/", label: "Logout", accent: true, onClick: logoutUser }]
    : [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Sign up", accent: true },
      ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-8">
          <Link to="/" onClick={closeMenu} className="shrink-0">
            <img src={logo} alt="FinApp" className="h-10 w-auto" />
          </Link>

          <div className="hidden items-center gap-6 text-sm font-semibold text-stone-700 lg:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                state={link.state}
                className="transition hover:text-darkBlue"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {loggedIn && user?.username ? (
            <div className="text-sm font-medium text-stone-500">
              {user.username}
            </div>
          ) : null}
          {secondaryLinks.map((link) =>
            link.onClick ? (
              <button
                key={link.label}
                onClick={link.onClick}
                className="rounded-full bg-lightGreen px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:opacity-90"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                state={link.state}
                className={
                  link.accent
                    ? "rounded-full bg-lightGreen px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:opacity-90"
                    : "text-sm font-semibold text-stone-700 transition hover:text-darkBlue"
                }
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-stone-700 lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="text-xl leading-none">{isMenuOpen ? "x" : "="}</span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8">
            {loggedIn && user?.username ? (
              <div className="pb-2 text-sm font-medium text-stone-500">
                Signed in as {user.username}
              </div>
            ) : null}
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                state={link.state}
                onClick={closeMenu}
                className="rounded-2xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-800"
              >
                {link.label}
              </Link>
            ))}
            {secondaryLinks.map((link) =>
              link.onClick ? (
                <button
                  key={link.label}
                  onClick={() => {
                    link.onClick?.();
                    closeMenu();
                  }}
                  className="rounded-2xl bg-lightGreen px-4 py-3 text-sm font-semibold text-stone-950"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  state={link.state}
                  onClick={closeMenu}
                  className={
                    link.accent
                      ? "rounded-2xl bg-lightGreen px-4 py-3 text-sm font-semibold text-stone-950"
                      : "rounded-2xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-800"
                  }
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
