import React, { memo } from 'react';
import GrassMovingButton from './buttons/GrassMovingButton';
import Clocks from './Clocks/Clocks';
import ObjectsCards from './Card/ObjectsCards/ObjectsCards';
import Inventory from './Inventory';
import EntityMoveBar from './EntityMoveBar/EntityMoveBar';

const GameInterface = memo(() => {
  return (
    <div style={{ position: 'fixed', top: 0 }}>
      <GrassMovingButton />
      <ObjectsCards />
      <Clocks />
      <Inventory />
      <EntityMoveBar />
    </div>
  );
});

export default GameInterface;
