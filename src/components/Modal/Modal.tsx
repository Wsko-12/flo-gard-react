import React, { memo, ReactNode, SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

interface IModalProps {
  close: () => void;
  children: ReactNode;
}

const Modal = memo<IModalProps>(({ close, children }) => {
  const element = (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.container} onClick={(e: SyntheticEvent) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
  const target = document.body;

  return createPortal(element, target);
});
Modal.displayName = "Modal";

export { Modal };
