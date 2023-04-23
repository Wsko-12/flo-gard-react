import { memo, useEffect, useRef } from "react";
import { Game } from "../../../game/Game";

const GameCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      Game.init(canvasRef.current);
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }}></canvas>;
});
GameCanvas.displayName = "GameCanvas";

export { GameCanvas };
