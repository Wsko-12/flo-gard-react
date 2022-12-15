import React, { memo, useEffect, useRef } from 'react';

export const GameCanvas = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        console.log(canvasRef.current);
    }, []);
    return (
        <canvas ref={canvasRef}></canvas>
    );
});
