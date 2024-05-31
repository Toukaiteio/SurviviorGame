const MapGenerator = () => {
  const _mapData = {
    forest_0_0_0: {
      PlaceTag: [],
      PlaceStatus: {},
      PlaceStoredObject: {},
      PlaceStoredItem: {},
      LinkTo: ["forest_1_0_0"],
      At: [0, 0, 0],
      PlaceRegisteredInterceptor: {
        PlaceTag: {
          getter(target, prop) {
            if (target.PlaceStatus.fire_up) {
              return [];
            } else {
              return ["fire_up"];
            }
          },
        },
        PlaceDescription: {
          getter(target, prop) {
            if (target.PlaceStatus.fire_up) {
              return $$l.forest_0_0_0_des_1;
            } else {
              return $$l.forest_0_0_0_des_0;
            }
          },
        },
      },
    },
    forest_1_0_0: {
      PlaceTag: [],
      PlaceStatus: {},
      PlaceStoredObject: {},
      PlaceStoredItem: {},
      LinkTo: ["forest_0_0_0"],
      At: [1, 0, 0],
      PlaceRegisteredInterceptor: {
        PlaceDescription: {
          getter(target, prop) {
            return $$l.forest_1_0_0_des_0;
          },
        },
      },
    },
  };
  const _changedMapData = MapDataInit();
  for (const i in _changedMapData) {
    for (const j in _changedMapData[i]) {
      _mapData[i][j] = JSON.parse(_changedMapData[i][j]) || {};
    }
  }
  return _mapData;
};
