STORE("is_first_fire_up", true);
STORE("game_log", {
  RoundLog: [],
  HistoryLog: [],
  LoggerStorage: {
    RoundPointAtHistory: 0,
  },
});
STORE("game_round", 0);
TSTORE("player",new Player());
TSTORE("event_interceptors",EventInterceptorGenerator());
TSTORE(
  "this_round_logs",
  new Proxy(GET("game_log"), {
    get(target, prop, receiver) {
      if (!prop) return Reflect.get(target, "RoundLog", receiver);
      if (prop === "push") {
        return (...args) => {
          if (!target.LoggerStorage["LastRound"])
            target.LoggerStorage["LastRound"] = GET("game_round");
          if (target.LoggerStorage["LastRound"] !== GET("game_round")) {
            target.RoundLog = [];
            target.LoggerStorage["LastRound"] = GET("game_round");
          }
          target.RoundLog.push(...args);
          target.HistoryLog.push(...args);
          if (target.HistoryLog.length === 300) {
            target.HistoryLog.shift();
            target.LoggerStorage["RoundPointAtHistory"] -= 1;
          }
        };
      } else if (prop === "clearRoundLog") {
        return () => {
          target.RoundLog = [];
          target.LoggerStorage["RoundPointAtHistory"] =
            target.HistoryLog.length;
        };
      } else if (prop === "getHistoryLog") {
        return () => {
          return target.HistoryLog;
        };
      } else if (prop === "getRoundLog") {
        return () => {
          return target.RoundLog;
        };
      } else if (prop === "updateRound") {
        return ()=>{
          STORE("game_round",GET("game_round") + 1);
        }
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      throw new Error("Logger Error:Don't change the Logger!");
      return false;
    },
  })
);
TGET("this_round_logs").push($$l._log_1, $$l._log_2);
STORE("ability_list", []);
TSTORE("ability_list", AbilityGenerator());
STORE("action_list", ["Survive"]);
TSTORE("action_list", ActionGenerator());
STORE("backpack_items", {
  item_kindling: ITEM("item_kindling", 3),
  item_wood: ITEM("item_wood", 1),
  item_food_tinned_tomato: ITEM("item_food_tinned_tomato", 1),
  weapon_knife: ITEM("weapon_knife"),
});
STORE(
  "GAME_SEED",
  Math.round(Math.random() * 100000 + 1) *
    Math.round(Math.random() * 100000 + 1)
);
STORE("GAME_ORIGINAL_MAP", MapGenerator()); // PlaceRegisteredInterceptor will not be saved!

const CreateNestedProxy = (TargetObject) => {
  return new Proxy(TargetObject, {
    get: function (target, prop, receiver) {
      if (target["PlaceRegisteredInterceptor"])
        if (Object.keys(target["PlaceRegisteredInterceptor"]).includes(prop)) {
          if (target["PlaceRegisteredInterceptor"][prop]["getter"])
            return target["PlaceRegisteredInterceptor"][prop]["getter"](
              target,
              prop
            );
        }
      if (target[prop] instanceof Object) {
        return CreateNestedProxy(target[prop]);
      }
      return Reflect.get(target, prop, receiver);
    },
    set: function (target, prop, value, receiver) {
      if (target["PlaceRegisteredInterceptor"])
        if (Object.keys(target["PlaceRegisteredInterceptor"]).includes(prop)) {
          if (target["PlaceRegisteredInterceptor"][prop]["setter"]) {
            target[prop] = target["PlaceRegisteredInterceptor"][prop]["setter"](
              target,
              prop
            );
            return true;
          }
        }
      if (value instanceof Object) {
        Reflect.set(target, prop, CreateNestedProxy(value), receiver);
        return true;
      }
      Reflect.set(target, prop, value, receiver);
      // target[prop] = value;
      return true;
    },
  });
};
TSTORE("GAME_MAP", CreateNestedProxy(GET("GAME_ORIGINAL_MAP")));
TSTORE("GAME_NPC", {});
// place Npc to the map.
for (const i in __Game_NPC_Config__){
  TGET("GAME_NPC")[i] = new NPC(i);
  if (TGET("GAME_MAP")[TGET("GAME_NPC")[i]["Storage"]["At"]]){
    if (!TGET("GAME_MAP")[TGET("GAME_NPC")[i]["Storage"]["At"]]["PlaceStoredObject"]["NPC_List"])
      TGET("GAME_MAP")[TGET("GAME_NPC")[i]["Storage"]["At"]]["PlaceStoredObject"]["NPC_List"] = {};
    TGET("GAME_MAP")[TGET("GAME_NPC")[i]["Storage"]["At"]]["PlaceStoredObject"]["NPC_List"][i] = TGET("GAME_NPC")[i];
  }
}
STORE("player_location", "forest_0_0_0");
// add location tip.
TGET("this_round_logs").push($f($$l.location, $$l[GET("player_location")]));
TGET("this_round_logs").push(
  TGET("GAME_MAP")[GET("player_location")]["PlaceDescription"] || ""
);
