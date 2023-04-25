import { AtlasItem } from "../../ts/interfaces";

const getPlantAtlasItems = (itemName: string, variations = 1) => {
  const stages = ["SEEDING", "ENGRAFTMENT", "GROWTH", "FLOWERING", "REST"];

  const dist: AtlasItem[] = [];
  for (let variationIndex = 1; variationIndex <= variations; variationIndex++) {
    const variation = stages.flatMap<AtlasItem>((stage) => {
      if (stage === "FLOWERING") {
        const items: AtlasItem[] = [];
        for (let j = 1; j <= 3; j++) {
          const item: AtlasItem = {
            name: `${itemName}_${variationIndex}_${stage}_${j}`,
            folder: `plants/${itemName}/${variationIndex}`,
            file: `${itemName}_${variationIndex}_${stage}_${j}.glb`,
          };

          items.push(item);
        }

        return items;
      }

      const item: AtlasItem = {
        name: `${itemName}_${variationIndex}_${stage}`,
        folder: `plants/${itemName}/${variationIndex}`,
        file: `${itemName}_${variationIndex}_${stage}.glb`,
      };

      return [item];
    });

    dist.push(...variation);
  }

  return dist;
};

const geometriesAtlas: AtlasItem[] = [
  {
    name: "ground",
    folder: "",
    file: "ground.glb",
  },
  {
    name: "grass",
    folder: "grass/",
    file: "grass.glb",
  },

  {
    name: "dandelion_1",
    folder: "grass/weeds/dandelion/",
    file: "dandelion_1.glb",
  },
  {
    name: "dandelion_2",
    folder: "grass/weeds/dandelion/",
    file: "dandelion_2.glb",
  },
  {
    name: "dandelion_3",
    folder: "grass/weeds/dandelion/",
    file: "dandelion_3.glb",
  },
  {
    name: "dandelion_4",
    folder: "grass/weeds/dandelion/",
    file: "dandelion_4.glb",
  },
  {
    name: "dandelion_5",
    folder: "grass/weeds/dandelion/",
    file: "dandelion_5.glb",
  },
  {
    name: "dandelion_6",
    folder: "grass/weeds/dandelion/",
    file: "dandelion_6.glb",
  },
  {
    name: "urtica_1",
    folder: "grass/weeds/urtica/",
    file: "urtica_1.glb",
  },
  {
    name: "urtica_2",
    folder: "grass/weeds/urtica/",
    file: "urtica_2.glb",
  },
  {
    name: "arctium_1",
    folder: "grass/weeds/arctium/",
    file: "arctium_1.glb",
  },
  {
    name: "arctium_2",
    folder: "grass/weeds/arctium/",
    file: "arctium_2.glb",
  },
  {
    name: "pot_1",
    folder: "pots/pot_1",
    file: "pot_1.glb",
  },
  {
    name: "pot_1_shadow",
    folder: "pots/pot_1",
    file: "pot_1_shadow.glb",
  },
  {
    name: "pot_1_ground",
    folder: "pots/pot_1",
    file: "pot_1_ground.glb",
  },
  {
    name: "pallet_1",
    folder: "stands/pallet_1",
    file: "pallet_1.glb",
  },
  {
    name: "pallet_1_shadow",
    folder: "stands/pallet_1",
    file: "pallet_1_shadow.glb",
  },
  {
    name: "greenhouse_1",
    folder: "greenhouses/greenhouse_1",
    file: "greenhouse_1.glb",
  },
  {
    name: "greenhouse_1_floor",
    folder: "greenhouses/greenhouse_1",
    file: "greenhouse_1_floor.glb",
  },
  ...getPlantAtlasItems("opuntia"),
];

export { geometriesAtlas };
