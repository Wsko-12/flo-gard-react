import { EntityId } from "@reduxjs/toolkit";
import { memo, useState } from "react";
import { Pot } from "../../../../../../game/entities/entities/pots/Pot";
import { IPotGroundState } from "../../../../../../game/entities/entities/pots/PotGround";
import { EntityManager } from "../../../../../../game/entities/EntityManager";
import { selectEntityById } from "../../../../../../store/slices/gameEntitiesSlice/gameEntitiesSlice";
import { useAppSelector } from "../../../../../../store/store";
import { EntityCardProgressSlider } from "../../components/EntityCardProgressSlider/EntityCardProgressSlider";
import { GroundSelectModal } from "./GroundSelectModal/GroundSelectModal";

interface IGroundPartCardProps {
  potId: EntityId;
  groundId: EntityId | null;
}

const GroundPartCard = memo<IGroundPartCardProps>(({ groundId, potId }) => {
  const groundState = useAppSelector(selectEntityById(groundId)) as IPotGroundState;
  const potInstance = EntityManager.getEntityById(potId);
  const [isGroundSelect, setIsGroundSelect] = useState(false);

  if (!potInstance || !(potInstance instanceof Pot)) {
    return null;
  }

  if (!groundId) {
    return isGroundSelect ? (
      <GroundSelectModal
        close={() => setIsGroundSelect(false)}
        select={(groundId) => {
          potInstance.setGround(groundId);
          setIsGroundSelect(false);
        }}
      />
    ) : (
      <button onClick={() => setIsGroundSelect(true)}>Add ground</button>
    );
  }

  if (!groundState || !potInstance) {
    return null;
  }

  return (
    <div>
      <p>Ground</p>
      <EntityCardProgressSlider value={groundState.adds.water} icon={"humidity_low"} />
      {/*  create watering can*/}
      {/*<button onClick={() => potInstance.pourGround()}>*/}
      {/*  <span className="material-symbols-outlined">humidity_low</span>*/}
      {/*</button>*/}
      <button onClick={() => potInstance.setGround(null)}>
        <span className="material-symbols-outlined" style={{ color: "red" }}>
          delete
        </span>
      </button>
    </div>
  );
});
GroundPartCard.displayName = "GroundPartCard";

export { GroundPartCard };
