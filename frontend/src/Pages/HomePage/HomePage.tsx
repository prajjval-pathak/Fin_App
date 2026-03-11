import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

const analyzerHighlights = [
  {
    title: "No account required",
    description:
      "Start with the public analyzer immediately and decide later if you want a saved workspace.",
  },
  {
    title: "Built on financial data",
    description:
      "Search listed companies, choose up to three tickers, and generate a concise analysis from your inputs.",
  },
  {
    title: "Fast first pass",
    description:
      "Use it to narrow what deserves deeper diligence before you move into the authenticated dashboard.",
  },
];

const analyzerSteps = [
  "Search by company name or ticker.",
  "Select up to 3 stocks for the same run.",
  "Generate an AI summary of the current setup and risks.",
];

const dashboardSteps = [
  "Search listed companies and compare performance inputs.",
  "Save the names that matter to your portfolio workspace.",
  "Open company pages for profile, statements, and deeper review.",
];

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const loggedIn = isLoggedIn();
  const dashboardLink = loggedIn
    ? { pathname: "/search" }
    : { pathname: "/login" };
  const dashboardState = loggedIn
    ? undefined
    : { from: { pathname: "/search" } };

  return (
    <main className="bg-stone-950 text-white">
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 md:pb-20 md:pt-12 lg:px-10 lg:pb-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Public analysis plus authenticated workspace
            </div>
            <h1 className="font-sans text-4xl font-semibold leading-[0.95] text-white sm:text-5xl md:text-6xl">
              Use the analyzer now. Move into your dashboard when you want a portfolio.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
              FinApp now has two clear entry points: a public AI analysis flow
              for fast screening, and an authenticated dashboard for search,
              portfolio tracking, and company fundamentals.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center rounded-full bg-lightGreen px-6 py-3 text-base font-semibold text-stone-950 transition hover:scale-[0.99] hover:opacity-90"
              >
                Analyze now
              </Link>
              <Link
                to={dashboardLink}
                state={dashboardState}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Open dashboard
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950/70 p-6 shadow-2xl shadow-black/30">
              <div className="absolute inset-x-8 top-0 h-32 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                  Public track
                </div>
                <h2 className="text-3xl font-semibold text-white">
                  Analyze stocks without signing in first.
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
                  Search companies, choose up to three tickers, and generate a
                  quick AI summary before you decide what deserves deeper work.
                </p>
                <ol className="mt-6 space-y-3 text-sm text-stone-300">
                  {analyzerSteps.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-xs font-bold text-stone-950">
                        {index + 1}
                      </span>
                      <span className="leading-6">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {analyzerHighlights.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-stone-300">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/10 bg-stone-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="mb-4 inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                Authenticated track
              </div>
              <h2 className="text-3xl font-semibold text-white">
                Track stocks, build a portfolio, and open company fundamentals.
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
                The dashboard stays the place for saved workflow: search for
                companies, add them to your portfolio, and open statement views
                when you want a deeper pass.
              </p>
              <ol className="mt-6 space-y-3 text-sm text-stone-300">
                {dashboardSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-200 text-xs font-bold text-stone-950">
                      {index + 1}
                    </span>
                    <span className="leading-6">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-stone-400">
                        Dashboard preview
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        Search and portfolio workspace
                      </p>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-stone-300">
                      Login required
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-stone-950/70 p-4">
                    <div className="rounded-full border border-white/10 px-4 py-3 text-sm text-stone-500">
                      Search by company name
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-sm font-semibold text-white">NVDA</p>
                        <p className="text-xs uppercase tracking-[0.16em] text-stone-400">
                          Add to portfolio
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-sm font-semibold text-white">TSLA</p>
                        <p className="text-xs uppercase tracking-[0.16em] text-stone-400">
                          Open company page
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-dashed border-sky-300/30 bg-sky-300/10 p-4">
                      <p className="text-sm font-semibold text-white">
                        Portfolio lives inside Dashboard
                      </p>
                      <p className="mt-2 text-sm leading-6 text-stone-300">
                        Save the names you are tracking, revisit them quickly,
                        and jump into profile, income statement, balance sheet,
                        and cash flow pages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;
