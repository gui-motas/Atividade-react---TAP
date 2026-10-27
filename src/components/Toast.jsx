import { useEffect } from "react";
import { useLearning } from "../context/LearningContext.jsx";
import Icon from "./Icon.jsx";

export default function Toast() {
  const { notification, dismissNotification } = useLearning();
  useEffect(() => {
    if (!notification) return;
    const timeout = setTimeout(dismissNotification, 5000);
    return () => clearTimeout(timeout);
  }, [notification, dismissNotification]);

  return (
    <div
      className="toast-region"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {notification && (
        <div
          className={`toast toast-${notification.type}`}
          key={notification.id}
        >
          <span className="toast-icon">
            <Icon name="check" />
          </span>
          <p>{notification.message}</p>
          <button aria-label="Fechar notificação" onClick={dismissNotification}>
            <Icon name="close" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
