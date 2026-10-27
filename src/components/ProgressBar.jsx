export default function ProgressBar({ value, label, showValue = true }) {
  const percentage = Number.isFinite(value)
    ? Math.min(100, Math.max(0, Math.round(value)))
    : 0;
  return (
    <div className="progress-component">
      {showValue && (
        <div className="progress-label">
          <span>{label}</span>
          <strong>{percentage}%</strong>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <span className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
