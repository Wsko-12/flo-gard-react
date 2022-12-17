import React, { memo } from 'react';
import GrassMovingButton from './buttons/GrassMovingButton';
import CircleClocks from './Clocks/circle/CircleClocks';

const GameInterface = memo(() => {
    return (
        <div style={{position: 'fixed', top: 0 }}>
            <GrassMovingButton />
            <CircleClocks />
        </div>
    );
});

export default GameInterface;