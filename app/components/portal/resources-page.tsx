import { useState } from "react";
import { useConfigurables } from "~/modules/configurables";
import { PortalLayout } from "./portal-layout";
import type { TResourceCategory, TResourceItem } from "~/modules/configurables/src/constants/configurables.default";

const ICONS: Record<string, React.ReactNode> = {
  FileText: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  MessageSquare: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C75B12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  TrendingUp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

function ResourceItemCard({ item }: { item: TResourceItem }) {
  const hasUrl = item.url && item.url.trim().length > 0;

  const content = (
    <div
      className="flex items-start gap-3 p-4 rounded-xl"
      style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.1)" }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(201,168,106,0.1)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: "#F5E9DC" }}>{item.title}</p>
        {item.description && (
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#9E9E9E" }}>{item.description}</p>
        )}
      </div>
      {hasUrl && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C75B12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </div>
  );

  if (hasUrl) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

function CategorySection({ category, defaultOpen }: { category: TResourceCategory; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const icon = ICONS[category.icon] ?? ICONS["FileText"];

  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-4 text-left"
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,168,106,0.1)" }}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold" style={{ color: "#F5E9DC" }}>{category.title}</p>
          {category.description && (
            <p className="text-xs mt-0.5" style={{ color: "#9E9E9E" }}>{category.description}</p>
          )}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9E9E9E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && category.items && category.items.length > 0 && (
        <div className="px-4 pb-4 space-y-2" style={{ borderTop: "1px solid rgba(201,168,106,0.1)" }}>
          <div className="pt-3 space-y-2">
            {category.items.map((item, idx) => (
              <ResourceItemCard key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ResourcesPage() {
  const { config, loading } = useConfigurables();

  const categories: TResourceCategory[] = loading ? [] : (config.resourceCategories ?? []);

  return (
    <PortalLayout
      title="Resources"
      subtitle="Guides and tools for your career transition"
    >
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl h-20 animate-pulse" style={{ backgroundColor: "#1A1A1A" }} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((category, idx) => (
            <CategorySection
              key={idx}
              category={category}
              defaultOpen={idx === 0}
            />
          ))}

          {/* Coming Soon Card */}
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.1)" }}>
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#9E9E9E" }}>More Coming Soon</p>
            <p className="text-sm" style={{ color: "#9E9E9E" }}>Additional resources and tools will be added throughout your journey.</p>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
