import { Link, Form } from "react-router";
import { useAuth } from "~/modules/authentication/use-authentication";
import { useConfigurables } from "~/modules/configurables";
import { PortalLayout } from "./portal-layout";

function ProgressBar({ value, gold }: { value: number; gold?: boolean }) {
  return (
    <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: "rgba(201,168,106,0.15)" }}>
      <div
        className="h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: gold ? "#C9A86A" : "#C75B12" }}
      />
    </div>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const { config, loading } = useConfigurables();

  const firstName = user?.username?.split(" ")[0] ?? "there";
  const welcomeMessage = loading
    ? "Welcome back. Here's where you stand today."
    : (config.welcomeMessage ?? "Welcome back. Here's where you stand today.");

  const appName = loading ? "ASCEND" : (config.appName ?? "ASCEND");
  const logoUrl = loading ? "" : (config.logoUrl ?? "");

  // Sample progress data (in a real app, this would come from user data in DB)
  const overallProgress = 24;
  const currentMonth = "Month 2";
  const currentPhase = "Brand & Position";
  const currentGoal = "Land a Senior Product Manager role at a B2B SaaS company";

  const weeklyPriorities = [
    { id: 1, text: "Update resume for target PM roles", done: true },
    { id: 2, text: "Optimize LinkedIn headline and summary", done: false },
    { id: 3, text: "Draft your professional narrative statement", done: false },
    { id: 4, text: "Research 5 target companies", done: false },
  ];

  const nextAction = "Complete LinkedIn profile optimization — this is your #1 priority this week.";

  return (
    <PortalLayout noPadding>
      {/* Custom header with logo */}
      <header
        className="sticky top-0 z-40 px-4"
        style={{
          backgroundColor: "#111111",
          borderBottom: "1px solid rgba(201,168,106,0.1)",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
          paddingBottom: "16px",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logoUrl && logoUrl !== "FILL_LOGO_URL_HERE" ? (
              <img src={logoUrl} alt={appName} className="h-7 w-auto" />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#C75B12" }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L14 13H2L8 2Z" fill="white" />
                  </svg>
                </div>
                <span className="text-sm font-bold tracking-tight" style={{ color: "#F5E9DC" }}>{appName}</span>
              </div>
            )}
          </div>
          <Form method="post" action="/auth/logout">
            <button
              type="submit"
              className="text-xs px-3 py-1.5 rounded-lg"
              style={{ color: "#9E9E9E", border: "1px solid rgba(201,168,106,0.15)" }}
            >
              Sign out
            </button>
          </Form>
        </div>
      </header>

      <div className="px-4 pt-5 space-y-4" style={{ paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px) + 16px)" }}>
        {/* Greeting */}
        <div>
          <p className="text-sm" style={{ color: "#9E9E9E" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h2 className="text-2xl font-bold mt-0.5" style={{ color: "#F5E9DC" }}>
            Hey, {firstName}
          </h2>
          <p className="text-sm mt-1" style={{ color: "#9E9E9E" }}>{welcomeMessage}</p>
        </div>

        {/* Overall Progress */}
        <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9E9E9E" }}>7-Month Roadmap</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: "#F5E9DC" }}>{currentMonth} — {currentPhase}</p>
            </div>
            <span className="text-xl font-bold" style={{ color: "#C9A86A" }}>{overallProgress}%</span>
          </div>
          <ProgressBar value={overallProgress} gold />
          <Link
            to="/roadmap"
            className="block text-xs font-medium"
            style={{ color: "#C75B12" }}
          >
            View full roadmap →
          </Link>
        </div>

        {/* Current Goal */}
        <div className="rounded-xl p-4" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
          <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#9E9E9E" }}>Current Goal</p>
          <p className="text-sm font-medium leading-relaxed" style={{ color: "#F5E9DC" }}>{currentGoal}</p>
        </div>

        {/* Next Action */}
        <div className="rounded-xl p-4" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(199,91,18,0.25)", boxShadow: "0 0 0 1px rgba(199,91,18,0.3)" }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#C75B12" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#C75B12" }}>Next Action</p>
              <p className="text-sm leading-relaxed" style={{ color: "#F5E9DC" }}>{nextAction}</p>
            </div>
          </div>
        </div>

        {/* Weekly Priorities */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#9E9E9E" }}>This Week</h3>
            <span className="text-xs" style={{ color: "#C9A86A" }}>
              {weeklyPriorities.filter(p => p.done).length}/{weeklyPriorities.length} done
            </span>
          </div>
          <div className="space-y-2">
            {weeklyPriorities.map((priority) => (
              <div
                key={priority.id}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.1)" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: priority.done ? "#C75B12" : "transparent",
                    border: priority.done ? "none" : "2px solid rgba(201,168,106,0.3)",
                  }}
                >
                  {priority.done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <p
                  className="text-sm flex-1"
                  style={{ color: priority.done ? "#9E9E9E" : "#F5E9DC", textDecoration: priority.done ? "line-through" : "none" }}
                >
                  {priority.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Nav Cards */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#9E9E9E" }}>Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/assessment"
              className="rounded-xl p-4 flex flex-col gap-2"
              style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="9" y1="16" x2="12" y2="16" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#F5E9DC" }}>Assessment</p>
              <p className="text-xs" style={{ color: "#9E9E9E" }}>Review your profile</p>
            </Link>

            <Link
              to="/ai-strategist"
              className="rounded-xl p-4 flex flex-col gap-2"
              style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(199,91,18,0.2)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C75B12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#F5E9DC" }}>AI Strategist</p>
              <p className="text-xs" style={{ color: "#9E9E9E" }}>Get coaching now</p>
            </Link>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
