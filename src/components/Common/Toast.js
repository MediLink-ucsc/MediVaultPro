import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from "lucide-react";

const Toast = ({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-600",
          textColor: "text-green-800",
          progressColor: "bg-green-500",
        };
      case "error":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          textColor: "text-red-800",
          progressColor: "bg-red-500",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          iconColor: "text-orange-600",
          textColor: "text-orange-800",
          progressColor: "bg-orange-500",
        };
      default: // info
        return {
          icon: Info,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-600",
          textColor: "text-blue-800",
          progressColor: "bg-blue-500",
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 relative overflow-hidden`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${config.textColor}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md ${
                config.textColor
              } hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${
                type === "success"
                  ? "green"
                  : type === "error"
                  ? "red"
                  : type === "warning"
                  ? "orange"
                  : "blue"
              }-50 focus:ring-${
                type === "success"
                  ? "green"
                  : type === "error"
                  ? "red"
                  : type === "warning"
                  ? "orange"
                  : "blue"
              }-500`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
            <div
              className={`h-full ${config.progressColor} transition-all ease-linear`}
              style={{
                animation: `toast-progress ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Hook to manage toast state
export const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info", duration = 4000) => {
    setToast({
      isVisible: true,
      message,
      type,
      duration,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const ToastComponent = () => (
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={hideToast}
      duration={toast.duration}
    />
  );

  return {
    showToast,
    hideToast,
    ToastComponent,
  };
};

export default Toast;
