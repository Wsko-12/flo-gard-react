import React, { memo } from 'react';
import GrassMovingButton from './buttons/GrassMovingButton';

const GameInterface = memo(() => {
    return (
        <div style={{position: 'fixed', top: 0 }}>
            <GrassMovingButton />
        </div>
    );
});

export default GameInterface;