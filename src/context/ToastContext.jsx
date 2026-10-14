import { createContext, useCallback, useContext, useRef, useState } from "react";
import Icon from "../components/Icon";

const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState("");
  const timer = useRef();

  const show = useCallback((text) => {
    clearTimeout(timer.current);
    setMsg(text);
    timer.current = setTimeout(() => setMsg(""), 2800);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {msg && (
        <div className="toast" role="status">
          <span className="toast-icon"><Icon name="check" size={14} strokeWidth={3} /></span>
          {msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}
