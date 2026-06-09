import { BottomNav } from "./bottom-nav";

interface PortalLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  noPadding?: boolean;
}

export function PortalLayout({ children, title, subtitle, headerRight, noPadding }: PortalLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#111111" }}>
      {/* Header */}
      {title && (
        <header
          className="sticky top-0 z-40 px-4 py-4"
          style={{
            backgroundColor: "#111111",
            borderBottom: "1px solid rgba(201,168,106,0.1)",
            paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ color: "#F5E9DC" }}>{title}</h1>
              {subtitle && <p className="text-xs mt-0.5" style={{ color: "#9E9E9E" }}>{subtitle}</p>}
            </div>
            {headerRight && <div>{headerRight}</div>}
          </div>
        </header>
      )}

      {/* Main content */}
      <main
        className={`flex-1 overflow-y-auto ${noPadding ? "" : "px-4 py-4"}`}
        style={{ paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px) + 16px)" }}
      >
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
