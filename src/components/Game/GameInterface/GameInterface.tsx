import React, { memo } from 'react';
import GrassMovingButton from './buttons/GrassMovingButton';
import Clocks from './Clocks/Clocks';

const GameInterface = memo(() => {
  return (
    <div style={{ position: 'fixed', top: 0 }}>
      <GrassMovingButton />
      <Clocks />
    </div>
  );
});

export default GameInterface;
