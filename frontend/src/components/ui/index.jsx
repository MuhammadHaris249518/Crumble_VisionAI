/**
 * UI Component Library - Production-Ready Utilities
 * 
 * This file provides reusable component primitives and UI utilities
 * for building a consistent, accessible production interface.
 */

import { forwardRef } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

/* ============================================================================
   Badge Component
   ============================================================================ */

export const Badge = forwardRef(
  ({ children, variant = "primary", size = "md", className = "", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full";
    
    const variants = {
      primary: "bg-primary/10 text-primary",
      accent: "bg-accent/10 text-accent",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      error: "bg-alert/10 text-alert",
      info: "bg-info/10 text-info",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

/* ============================================================================
   Status Badge Component
   ============================================================================ */

export const StatusBadge = forwardRef(
  ({ status, children, className = "", ...props }, ref) => {
    const statusConfig = {
      success: {
        bg: "bg-success/10",
        text: "text-success",
        border: "border-success/20",
        icon: CheckCircle,
      },
      error: {
        bg: "bg-alert/10",
        text: "text-alert",
        border: "border-alert/20",
        icon: AlertCircle,
      },
      warning: {
        bg: "bg-warning/10",
        text: "text-warning",
        border: "border-warning/20",
        icon: AlertTriangle,
      },
      info: {
        bg: "bg-info/10",
        text: "text-info",
        border: "border-info/20",
        icon: Info,
      },
    };

    const config = statusConfig[status] || statusConfig.info;
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border} ${className}`}
        {...props}
      >
        <Icon className="h-4 w-4" />
        {children}
      </div>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

/* ============================================================================
   Alert Component
   ============================================================================ */

export const Alert = forwardRef(
  ({ type = "info", title, message, action, onDismiss, className = "", ...props }, ref) => {
    const typeConfig = {
      success: {
        bg: "bg-success/10",
        border: "border-success/30",
        text: "text-success",
        icon: CheckCircle,
      },
      error: {
        bg: "bg-alert/10",
        border: "border-alert/30",
        text: "text-alert",
        icon: AlertCircle,
      },
      warning: {
        bg: "bg-warning/10",
        border: "border-warning/30",
        text: "text-warning",
        icon: AlertTriangle,
      },
      info: {
        bg: "bg-info/10",
        border: "border-info/30",
        text: "text-info",
        icon: Info,
      },
    };

    const config = typeConfig[type];
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={`flex gap-3 rounded-lg border p-4 ${config.bg} ${config.border} ${className}`}
        role="alert"
        {...props}
      >
        <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.text}`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold ${config.text} mb-1`}>
              {title}
            </h4>
          )}
          {message && (
            <p className="text-sm text-gray-700">
              {message}
            </p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className={`mt-2 text-sm font-medium ${config.text} hover:opacity-80 transition-opacity`}
            >
              {action.label}
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

/* ============================================================================
   Loading Spinner Component
   ============================================================================ */

export const Spinner = forwardRef(
  ({ size = "md", className = "", ...props }, ref) => {
    const sizes = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    };

    return (
      <svg
        ref={ref}
        className={`animate-spin ${sizes[size]} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }
);

Spinner.displayName = "Spinner";

/* ============================================================================
   Loading Skeleton Component
   ============================================================================ */

export const Skeleton = forwardRef(
  ({ width = "w-full", height = "h-4", className = "", count = 1, ...props }, ref) => {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            ref={ref}
            className={`bg-gray-200 rounded-md animate-pulse ${width} ${height} ${className}`}
            {...props}
          />
        ))}
      </>
    );
  }
);

Skeleton.displayName = "Skeleton";

/* ============================================================================
   Tooltip Component
   ============================================================================ */

export const Tooltip = forwardRef(
  ({ content, position = "top", children, delay = 200, className = "", ...props }, ref) => {
    const positionClasses = {
      top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
      bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
      left: "right-full mr-2 top-1/2 -translate-y-1/2",
      right: "left-full ml-2 top-1/2 -translate-y-1/2",
    };

    return (
      <div ref={ref} className="relative group inline-block" {...props}>
        {children}
        <div
          className={`
            absolute ${positionClasses[position]} 
            hidden group-hover:block 
            bg-gray-900 text-white text-sm rounded-md px-3 py-1.5
            whitespace-nowrap z-40
            opacity-0 group-hover:opacity-100
            transition-opacity ${delay}ms
            pointer-events-none
            ${className}
          `}
          role="tooltip"
        >
          {content}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

/* ============================================================================
   Progress Bar Component
   ============================================================================ */

export const ProgressBar = forwardRef(
  ({ value = 0, max = 100, size = "md", variant = "primary", label, showPercent = true, className = "", ...props }, ref) => {
    const percentage = (value / max) * 100;

    const sizeClasses = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    };

    const variantClasses = {
      primary: "bg-primary",
      accent: "bg-accent",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-alert",
    };

    return (
      <div className={className} {...props}>
        {(label || showPercent) && (
          <div className="flex justify-between items-center mb-1.5">
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
            {showPercent && <span className="text-xs text-gray-600">{Math.round(percentage)}%</span>}
          </div>
        )}
        <div
          ref={ref}
          className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        >
          <div
            className={`${variantClasses[variant]} h-full transition-all duration-300 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

/* ============================================================================
   Card Component
   ============================================================================ */

export const Card = forwardRef(
  ({ children, className = "", elevated = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-gray-200 bg-white p-4 ${
          elevated ? "shadow-lg" : "shadow-sm"
        } transition-shadow hover:shadow-md ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/* ============================================================================
   Card Header Component
   ============================================================================ */

export const CardHeader = forwardRef(
  ({ title, subtitle, action, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`flex items-start justify-between mb-4 pb-4 border-b border-gray-200 ${className}`} {...props}>
        <div>
          {title && <h3 className="font-semibold text-lg text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

/* ============================================================================
   Button Component (Enhanced)
   ============================================================================ */

export const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled = false,
      icon: Icon,
      iconPosition = "left",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-100 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(42,111,219,0.1),_0_0_0_1px_#2A6FDB]";

    const variants = {
      primary: "bg-accent text-white hover:bg-accent-dark hover:shadow-md active:bg-accent-dark disabled:bg-gray-300",
      secondary: "bg-surface text-text-primary border border-border hover:bg-surface-dark hover:border-border-dark",
      ghost: "text-text-primary hover:bg-surface-dark",
      danger: "bg-alert text-white hover:bg-red-700 active:bg-red-700",
      success: "bg-success text-white hover:opacity-90 active:opacity-75",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${baseStyles} 
          ${variants[variant]} 
          ${sizes[size]} 
          ${fullWidth ? "w-full" : ""}
          ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size="sm" className="!h-4 !w-4" />
            {children}
          </>
        ) : (
          <>
            {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
            {children}
            {Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/* ============================================================================
   Input Field Component (Enhanced)
   ============================================================================ */

export const InputField = forwardRef(
  (
    {
      label,
      hint,
      error,
      required,
      icon: Icon,
      iconPosition = "left",
      type = "text",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
            {required && <span className="text-alert ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={`
              w-full px-3 py-2 border rounded-md text-sm
              transition-all duration-100
              focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus
              disabled:bg-surface disabled:text-text-tertiary disabled:cursor-not-allowed
              ${error ? "border-alert focus-visible:border-alert" : "border-border"}
              ${Icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""}
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
            {...props}
          />
          {Icon && (
            <Icon
              className={`
                absolute top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary
                ${iconPosition === "left" ? "left-3" : "right-3"}
              `}
            />
          )}
        </div>
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-xs text-alert font-medium">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${props.id}-hint`} className="mt-1 text-xs text-text-secondary">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

/* ============================================================================
   Modal Component
   ============================================================================ */

export const Modal = forwardRef(
  ({ isOpen, onClose, title, children, footer, size = "md", className = "", ...props }, ref) => {
    if (!isOpen) return null;

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
    };

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
        {...props}
      >
        <div
          className={`bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto ${sizeClasses[size]} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          )}
          <div className="p-6">{children}</div>
          {footer && <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">{footer}</div>}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default {
  Badge,
  StatusBadge,
  Alert,
  Spinner,
  Skeleton,
  Tooltip,
  ProgressBar,
  Card,
  CardHeader,
  Button,
  InputField,
  Modal,
};
