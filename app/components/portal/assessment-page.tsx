import { useState } from "react";
import { useConfigurables } from "~/modules/configurables";
import { PortalLayout } from "./portal-layout";
import type { TAssessmentQuestion } from "~/modules/configurables/src/constants/configurables.default";

const CATEGORY_COLORS: Record<string, string> = {
  "Skills Inventory": "#C75B12",
  "Interests & Values": "#C9A86A",
  "Experience Review": "#C75B12",
  "Career Direction": "#C9A86A",
};

function QuestionCard({ question, answer, onAnswer }: {
  question: TAssessmentQuestion;
  answer: string | string[];
  onAnswer: (id: string, value: string | string[]) => void;
}) {
  if (question.type === "textarea") {
    return (
      <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
        <p className="text-sm font-medium leading-relaxed" style={{ color: "#F5E9DC" }}>{question.question}</p>
        <textarea
          value={answer as string}
          onChange={(e) => onAnswer(question.id, e.target.value)}
          placeholder="Type your answer here..."
          rows={4}
          className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none"
          style={{ backgroundColor: "#111111", color: "#F5E9DC", border: "1px solid rgba(201,168,106,0.2)" }}
        />
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
        <p className="text-sm font-medium leading-relaxed" style={{ color: "#F5E9DC" }}>{question.question}</p>
        <input
          type="text"
          value={answer as string}
          onChange={(e) => onAnswer(question.id, e.target.value)}
          placeholder="Type your answer..."
          className="w-full rounded-lg px-4 py-3 text-sm outline-none"
          style={{ backgroundColor: "#111111", color: "#F5E9DC", border: "1px solid rgba(201,168,106,0.2)" }}
        />
      </div>
    );
  }

  if (question.type === "scale") {
    const scaleValue = parseInt(answer as string) || 5;
    return (
      <div className="rounded-xl p-4 space-y-4" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
        <p className="text-sm font-medium leading-relaxed" style={{ color: "#F5E9DC" }}>{question.question}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#9E9E9E" }}>Beginner</span>
            <span className="text-lg font-bold" style={{ color: "#C75B12" }}>{scaleValue}/10</span>
            <span className="text-xs" style={{ color: "#9E9E9E" }}>Expert</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={scaleValue}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            className="w-full"
            style={{ accentColor: "#C75B12" }}
          />
        </div>
      </div>
    );
  }

  if (question.type === "multiselect") {
    const selected = (answer as string[]) || [];
    const options = question.options || [];
    return (
      <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
        <p className="text-sm font-medium leading-relaxed" style={{ color: "#F5E9DC" }}>{question.question}</p>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  const newSelected = isSelected
                    ? selected.filter((s) => s !== opt)
                    : [...selected, opt];
                  onAnswer(question.id, newSelected);
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: isSelected ? "#C75B12" : "rgba(201,168,106,0.1)",
                  color: isSelected ? "#ffffff" : "#F5E9DC",
                  border: isSelected ? "1px solid #C75B12" : "1px solid rgba(201,168,106,0.2)",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

export function AssessmentPage() {
  const { config, loading } = useConfigurables();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [saved, setSaved] = useState(false);

  const questions: TAssessmentQuestion[] = loading
    ? []
    : (config.assessmentQuestions ?? []);

  const categories = Array.from(new Set(questions.map((q) => q.category)));

  const handleAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const answeredCount = questions.filter((q) => {
    const a = answers[q.id];
    if (!a) return false;
    if (Array.isArray(a)) return a.length > 0;
    return a.trim().length > 0;
  }).length;

  const progress = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  const handleSave = () => {
    // In a real app, this would persist to the backend
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PortalLayout
      title="Career Assessment"
      subtitle="Build your career transition baseline"
    >
      {/* Progress */}
      <div className="mb-5 rounded-xl p-4" style={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(201,168,106,0.15)" }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9E9E9E" }}>
            Assessment Progress
          </p>
          <span className="text-sm font-bold" style={{ color: "#C9A86A" }}>{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ backgroundColor: "rgba(201,168,106,0.15)" }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: "#C9A86A" }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "#9E9E9E" }}>
          {answeredCount} of {questions.length} questions answered
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl h-24 animate-pulse" style={{ backgroundColor: "#1A1A1A" }} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[category] ?? "#C75B12" }} />
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9E9E9E" }}>
                  {category}
                </h3>
              </div>
              <div className="space-y-3">
                {questions
                  .filter((q) => q.category === category)
                  .map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      answer={answers[question.id] ?? (question.type === "multiselect" ? [] : question.type === "scale" ? "5" : "")}
                      onAnswer={handleAnswer}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save button */}
      {!loading && questions.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full rounded-xl py-3.5 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: saved ? "#1A1A1A" : "#C75B12",
              color: saved ? "#C9A86A" : "#ffffff",
              border: saved ? "1px solid #C9A86A" : "none",
              minHeight: "44px",
            }}
          >
            {saved ? "Saved!" : "Save Assessment"}
          </button>
        </div>
      )}
    </PortalLayout>
  );
}
