"use client";

interface Option {
  value: string;
  label: string;
  icon: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export function StateSelector({ label, value, onChange, options }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="flex flex-col gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-150
              ${
                value === opt.value
                  ? "bg-kimi-50 text-kimi-700 border border-kimi-300 font-medium"
                  : "bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100"
              }`}
          >
            <span className="text-xs">{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
