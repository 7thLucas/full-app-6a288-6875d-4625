import { Form, Link, useActionData, useNavigation } from "react-router";
import { useConfigurables } from "~/modules/configurables";

interface ActionData {
  error?: string;
}

export function AscendRegisterCard() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { config, loading } = useConfigurables();

  const appName = loading ? "ASCEND Career Pathway" : (config.appName ?? "ASCEND Career Pathway");
  const tagline = loading ? "" : (config.tagline ?? "");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "#111111" }}>
      {/* Brand */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: "#C75B12" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 13H2L8 2Z" fill="white" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ color: "#F5E9DC" }}>{appName}</span>
        </div>
        {tagline && <p className="text-sm" style={{ color: "#9E9E9E" }}>{tagline}</p>}
      </div>

      {/* Card */}
      <div className="w-full max-w-sm rounded-xl p-6" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
        <h1 className="text-xl font-bold mb-1" style={{ color: "#F5E9DC" }}>Create Account</h1>
        <p className="text-sm mb-6" style={{ color: "#9E9E9E" }}>Start your career transition journey</p>

        {actionData?.error && (
          <div className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#9E9E9E" }}>
              Name
            </label>
            <input
              name="username"
              type="text"
              placeholder="Your full name"
              required
              autoComplete="name"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: "#111111", color: "#F5E9DC", border: "1px solid rgba(201,168,106,0.2)" }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#9E9E9E" }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: "#111111", color: "#F5E9DC", border: "1px solid rgba(201,168,106,0.2)" }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#9E9E9E" }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: "#111111", color: "#F5E9DC", border: "1px solid rgba(201,168,106,0.2)" }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity mt-2 disabled:opacity-60"
            style={{ backgroundColor: "#C75B12", color: "#ffffff", minHeight: "44px" }}
          >
            {isSubmitting ? "Creating account..." : "Get Started"}
          </button>
        </Form>

        <p className="text-center text-sm mt-4" style={{ color: "#9E9E9E" }}>
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium hover:underline" style={{ color: "#C75B12" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
