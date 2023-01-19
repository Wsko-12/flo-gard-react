import React, {
  memo,
  ReactNode,
  RefObject,
  useState,
  DragEvent,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { GameStore } from '../../../../../game/gameStore/GameStore';
import styles from './draggable-card.module.scss';

interface IDraggableCardProps {
  children: ReactNode;
  closeCb: () => void;
  visible?: boolean;
}

const normalizePosition = (
  element: HTMLElement,
  setterX: React.Dispatch<React.SetStateAction<number>>,
  setterY: React.Dispatch<React.SetStateAction<number>>
) => {
  const rect = element.getBoundingClientRect();
  if (rect.x + rect.width > window.innerWidth) {
    setterX(window.innerWidth - rect.width);
  }

  if (rect.y + rect.height > window.innerHeight) {
    setterY(window.innerHeight - rect.height);
  }
};

export const useDraggable = (
  ref: RefObject<HTMLElement>,
  startPosition: [number, number] = [100, 100]
) => {
  const [x, setX] = useState(startPosition[0]);
  const [y, setY] = useState(startPosition[1]);

  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    normalizePosition(ref.current, setX, setY);
  }, [ref]);

  useEffect(() => {
    const resizeHandler = () => {
      if (!ref.current) {
        return;
      }
      normalizePosition(ref.current, setX, setY);
    };

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [ref]);

  const onDragStart = useCallback(
    (e: DragEvent<HTMLElement>) => {
      if (!ref.current) {
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.x;
      const y = e.clientY - rect.y;

      setShiftX(x);
      setShiftY(y);
    },
    [ref]
  );

  const onDrag = useCallback(
    (e: DragEvent<HTMLElement>) => {
      if (e.clientX && e.clientY && ref.current) {
        const rect = ref.current.getBoundingClientRect();

        //check borders
        const x = e.clientX - shiftX;
        const y = e.clientY - shiftY;
        if (x < 0 || x + rect.width > window.innerWidth) {
          return;
        }

        if (y < 0 || y + rect.height > window.innerHeight) {
          return;
        }

        setX(x);
        setY(y);
      }
    },
    [shiftX, shiftY, ref]
  );

  return {
    x,
    y,
    bind: {
      draggable: true,
      onDrag,
      onDragStart,
    },
  };
};

const DraggableCard = memo<IDraggableCardProps>(({ children, closeCb, visible = true }) => {
  const headerRef = useRef<HTMLElement>(null);
  const lastClick: [number, number] = [GameStore.lastClick.x, GameStore.lastClick.y];
  const { x, y, bind: bindDrag } = useDraggable(headerRef, lastClick);

  return (
    <div
      className={styles.card}
      style={{ transform: `translate(${x}px, ${y}px)`, display: visible ? 'block' : 'none' }}
    >
      <header ref={headerRef} {...bindDrag}>
        <div className={styles.drag}>
          <span className={`material-symbols-outlined`}>drag_indicator</span>
        </div>
        <button onClick={closeCb} className={styles.close}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>
      <div className={styles.content}>{children}</div>
    </div>
  );
});

export default DraggableCard;
