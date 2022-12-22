import React, { memo } from 'react';
import GrassMovingButton from './buttons/GrassMovingButton';
import EntityCards from './Card/EntityCards';
import Clocks from './Clocks/Clocks';
import Inventory from './Inventory/Inventory';

const GameInterface = memo(() => {
  return (
    <div style={{ position: 'fixed', top: 0 }}>
      <GrassMovingButton />
      <Clocks />
      <Inventory />
      <EntityCards />
    </div>
  );
});

export default GameInterface;
