import React, { useRef, useEffect, ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
  display: boolean;
  close: () => void;
  children: ReactNode;
};

/**
 * Modal component
 */
export default function Modal({ display, close, children }: Props) {
  const displayStyle = {
    ...(!display ? { display: "none" } : {}),
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Close Modal if clicked outside
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={styles.modal} style={displayStyle}>
      <div ref={ref} className={styles.modal__content}>
        {children}
      </div>
    </div>
  );
}
