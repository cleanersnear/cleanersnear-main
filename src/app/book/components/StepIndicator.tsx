interface StepIndicatorProps {
  currentStep: number; // 1..4
}

const steps = [
  { id: 1, label: "Choose Service" },
  { id: 2, label: "Service Details" },
  { id: 3, label: "Your Details" },
  { id: 4, label: "Confirmation" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const progressPercent = Math.max(
    0,
    Math.min(100, ((currentStep - 1) / (steps.length - 1)) * 100)
  );

  return (
    <div>
      {/* Mobile: progress bar only */}
      <div className="md:hidden h-2 bg-gray-200 rounded-full max-w-xl mx-auto" aria-label="Progress">
        <div
          className="h-2 bg-[#1E3D8F] rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Desktop: numbered steps with labels */}
      <ol className="hidden md:flex items-center justify-center gap-6 overflow-x-auto pb-4" aria-label="Progress">
        {steps.map((step) => {
          const active = step.id === currentStep;
          const done = step.id < currentStep;
          return (
            <li key={step.id} className="flex items-center gap-3">
              <span
                className={
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold " +
                  (active
                    ? "bg-[#1E3D8F] text-white"
                    : done
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700")
                }
              >
                {step.id}
              </span>
              <span className={active ? "font-semibold text-gray-900" : "text-gray-600"}>{step.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
