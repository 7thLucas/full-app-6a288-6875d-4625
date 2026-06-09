import { Form, useActionData, useLoaderData, useNavigation } from "react-router";

interface ActionData {
  error?: string;
}

interface LoaderData {
  token?: string;
}

export function AscendResetPasswordCard() {
  const actionData = useActionData<ActionData>();
  const loaderData = useLoaderData<LoaderData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "#111111" }}>
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: "#C75B12" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 13H2L8 2Z" fill="white" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ color: "#F5E9DC" }}>ASCEND Career Pathway</span>
        </div>
      </div>

      <div className="w-full max-w-sm rounded-xl p-6" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
        <h1 className="text-xl font-bold mb-1" style={{ color: "#F5E9DC" }}>Set New Password</h1>
        <p className="text-sm mb-6" style={{ color: "#9E9E9E" }}>Choose a strong, secure password.</p>

        {actionData?.error && (
          <div className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-4">
          <input type="hidden" name="token" value={loaderData?.token ?? ""} />

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#9E9E9E" }}>
              New Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="Min. 8 characters"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: "#111111", color: "#F5E9DC", border: "1px solid rgba(201,168,106,0.2)" }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#9E9E9E" }}>
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="Re-enter your password"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: "#111111", color: "#F5E9DC", border: "1px solid rgba(201,168,106,0.2)" }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg py-3 text-sm font-semibold disabled:opacity-60"
            style={{ backgroundColor: "#C75B12", color: "#ffffff", minHeight: "44px" }}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </Form>
      </div>
    </div>
  );
}
