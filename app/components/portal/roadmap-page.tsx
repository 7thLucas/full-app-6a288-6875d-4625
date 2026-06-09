import { useState } from "react";
import { useConfigurables } from "~/modules/configurables";
import { PortalLayout } from "./portal-layout";
import type { TRoadmapPhase } from "~/modules/configurables/src/constants/configurables.default";

type PhaseStatus = "completed" | "active" | "upcoming";

function getPhaseStatus(index: number, activePhase: number): PhaseStatus {
  if (index < activePhase) return "completed";
  if (index === activePhase) return "active";
  return "upcoming";
}

function PhaseNode({ status }: { status: PhaseStatus }) {
  if (status === "completed") {
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#C9A86A" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  }
  if (status === "active") {
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#C75B12", boxShadow: "0 0 0 4px rgba(199,91,18,0.2)" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
    );
  }
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: "#222222", border: "2px solid rgba(201,168,106,0.2)" }}
    >
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#9E9E9E" }} />
    </div>
  );
}

function PhaseCard({ phase, index, status, isExpanded, onToggle }: {
  phase: TRoadmapPhase;
  index: number;
  status: PhaseStatus;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const statusColor = status === "completed" ? "#C9A86A" : status === "active" ? "#C75B12" : "#9E9E9E";
  const statusLabel = status === "completed" ? "Completed" : status === "active" ? "In Progress" : "Upcoming";

  return (
    <div className="flex gap-3">
      {/* Timeline line + node */}
      <div className="flex flex-col items-center">
        <PhaseNode status={status} />
        {index < 6 && (
          <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: status === "completed" ? "rgba(201,168,106,0.4)" : "rgba(201,168,106,0.15)", minHeight: "24px" }} />
        )}
      </div>

      {/* Card content */}
      <div className="flex-1 mb-4">
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-left rounded-xl p-4 transition-colors"
          style={{
            backgroundColor: status === "active" ? "rgba(199,91,18,0.08)" : "#1A1A1A",
            border: status === "active" ? "1px solid rgba(199,91,18,0.3)" : "1px solid rgba(201,168,106,0.12)",
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: statusColor }}>
                  {phase.month}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: status === "completed" ? "rgba(201,168,106,0.15)" : status === "active" ? "rgba(199,91,18,0.15)" : "rgba(158,158,158,0.1)",
                    color: statusColor,
                  }}
                >
                  {statusLabel}
                </span>
              </div>
              <h3 className="text-sm font-bold" style={{ color: "#F5E9DC" }}>{phase.title}</h3>
              {phase.description && (
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#9E9E9E" }}>{phase.description}</p>
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
              style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Milestones */}
          {isExpanded && phase.milestones && phase.milestones.length > 0 && (
            <div className="mt-3 pt-3 space-y-2" style={{ borderTop: "1px solid rgba(201,168,106,0.1)" }}>
              {phase.milestones.map((milestone, mIdx) => (
                <div key={mIdx} className="flex items-start gap-2">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: status === "completed" ? "#C9A86A" : "rgba(201,168,106,0.1)",
                      border: status !== "completed" ? "1px solid rgba(201,168,106,0.2)" : "none",
                    }}
                  >
                    {status === "completed" && (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: status === "completed" ? "#9E9E9E" : "#F5E9DC", textDecoration: status === "completed" ? "line-through" : "none" }}>
                    {milestone}
                  </p>
                </div>
              ))}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export function RoadmapPage() {
  const { config, loading } = useConfigurables();
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));

  const phases: TRoadmapPhase[] = loading ? [] : (config.roadmapPhases ?? []);
  const activePhaseIndex = 1; // Month 2 is active (0-indexed)

  const togglePhase = (index: number) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const completedCount = phases.filter((_, i) => getPhaseStatus(i, activePhaseIndex) === "completed").length;
  const overallProgress = phases.length > 0 ? Math.round((completedCount / phases.length) * 100) : 0;

  return (
    <PortalLayout
      title="7-Month Roadmap"
      subtitle="Your structured path to career success"
    >
      {/* Overall progress */}
      <div className="mb-5 rounded-xl p-4" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9E9E9E" }}>Overall Progress</p>
          <span className="text-lg font-bold" style={{ color: "#C9A86A" }}>{overallProgress}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ backgroundColor: "rgba(201,168,106,0.15)" }}>
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%`, backgroundColor: "#C9A86A" }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "#9E9E9E" }}>
          {completedCount} of {phases.length} phases completed
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl h-20 animate-pulse" style={{ backgroundColor: "#1A1A1A" }} />
          ))}
        </div>
      ) : (
        <div>
          {phases.map((phase, index) => (
            <PhaseCard
              key={index}
              phase={phase}
              index={index}
              status={getPhaseStatus(index, activePhaseIndex)}
              isExpanded={expandedPhases.has(index)}
              onToggle={() => togglePhase(index)}
            />
          ))}
        </div>
      )}
    </PortalLayout>
  );
}
