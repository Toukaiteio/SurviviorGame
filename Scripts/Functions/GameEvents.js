function EventWrapper(fun_name, ori_fun) {
  return function (...args) {
    if (
      TGET("event_interceptors")[fun_name] &&
      TGET("event_interceptors")[fun_name]["Before"]
    ) {
      for (const i in TGET("event_interceptors")[fun_name]["Before"]) {
        TGET("event_interceptors")[fun_name]["Before"][i](fun_name, ...args);
      }
    }
    ori_fun.bind(this)(...args, fun_name);
    if (
      TGET("event_interceptors")[fun_name] &&
      TGET("event_interceptors")[fun_name]["After"]
    ) {
      for (const i in TGET("event_interceptors")[fun_name]["After"]) {
        TGET("event_interceptors")[fun_name]["After"][i](fun_name, ...args);
      }
    }
  };
}
function TriggerEmptyEvent(event_name, ...args) {
  if (
    TGET("event_interceptors")[event_name] &&
    TGET("event_interceptors")[event_name]["Before"]
  ) {
    for (const i in TGET("event_interceptors")[fun_name]["Before"]) {
      TGET("event_interceptors")[fun_name]["Before"][i](fun_name, ...args);
    }
  }
  if (
    TGET("event_interceptors")[event_name] &&
    TGET("event_interceptors")[event_name]["After"]
  ) {
    for (const i in TGET("event_interceptors")[fun_name]["After"]) {
      TGET("event_interceptors")[fun_name]["After"][i](fun_name, ...args);
    }
  }
}
(() => {
  const event_before = {
    _push_log(log) {
      if (log instanceof Array) {
        TGET("this_round_logs").push(...log);
      } else if (typeof log === "string") {
        TGET("this_round_logs").push(log);
      } else {
        throw new Error("_push_log function: Cannot push this log ", log);
      }
    },
    _add_ability(id) {
      if (!GET("ability_list").includes(id)) {
        GET("ability_list").push(id);
      }
    },
    _mov_ability(id) {
      const _pos = GET("ability_list").indexOf(id);
      if (_pos !== -1) {
        STORE(
          "ability_list",
          GET("ability_list")
            .slice(0, _pos)
            .concat(GET("ability_list").slice(_pos + 1))
        );
      }
    },
    _update_survive_page(Mode, event_name) {
      TSTORE(
        "survive_sub_page",
        BuildSurviviorPage.bind(this)(TGET("survive_sub_page"), Mode)
      );
    },

    _give_item(id, count = 1) {
      if (Object.keys(GET("backpack_items")).includes(id)) {
        if (isOverlay(id)) {
          GET("backpack_items")[id]["count"] += count;
        } else {
          const new_items = ITEM(id, count);
          for (const i in new_items) {
            if (!GET("backpack_items")[id][i]) {
              GET("backpack_items")[id][i] = new_items[i];
            }
          }
        }
      } else {
        GET("backpack_items")[id] = ITEM(id, count);
      }
    },
    _use_item(id, count = 1, UUID = void 0) {
      if (Object.keys(GET("backpack_items")).includes(id)) {
        if (isOverlay(id) && GET("backpack_items")[id]["count"] - count >= 0) {
          GET("backpack_items")[id]["count"] -= count;
          if (GET("backpack_items")[id]["count"] <= 0) {
            delete GET("backpack_items")[id];
          }
          return true;
        } else if (UUID instanceof Array && UUID.length >= count) {
          for (let i = 0; i < count; i++) {
            if (GET("backpack_items")[id][UUID[i]])
              delete GET("backpack_items")[id][UUID[i]];
          }
          return true;
        } else if (
          typeof UUID === "string" &&
          GET("backpack_items")[id][UUID]
        ) {
          delete GET("backpack_items")[id][UUID];
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    _function_eat_food(ItemID, UUID = void 0) {
      let _add_value = 0;
      if (_use_item(ItemID, 1, UUID)) {
        for (const i of ["food", "cooked"]) {
          if ((_add_value, ItemList[ItemID]["status"][i]))
            _add_value += ItemList[ItemID]["status"][i]["value"];
        }
        _push_log([
          $f($$l._tag_after_eat_food, ItemList[ItemID].name, _add_value),
        ]);
      }
    },
    _function_check_can_do(name) {
      const _player_item_list = Object.keys(GET("backpack_items"));
      for (const i of _player_item_list) {
        if (
          ItemList[i]["tag"].includes("tool") &&
          ItemList[i]["status"]["tool"]
        ) {
          if (ItemList[i]["status"]["tool"]["available"].includes(name)) {
            return true;
          }
        }
      }
      return false;
    },
    _function_open_tinned(ItemID, UUID = void 0) {
      let _item_status;
      if (isOverlay(ItemID)) {
        _item_status = GET("backpack_items")[ItemID]["status"];
      } else {
        _item_status = GET("backpack_items")[ItemID][UUID]["status"];
      }
      if (_use_item(ItemID, 1, UUID)) {
        _give_item(_item_status["tinned"]["replace"], 1);
      }
    },
    game_start() {
      TSTORE("main_page", PageRender(LoadedPageList["page_home_page"]));
    },
    event_fire_up() {
      if (GET("is_first_fire_up")) {
        const new_logs = [$$l._log_3, $$l._log_4];
        _push_log(new_logs);
        STORE("is_first_fire_up", false);
      } else {
        const new_logs = [$$l._log_4];
        _push_log(new_logs);
      }
      _mov_ability("fire_up");
      TGET("GAME_MAP")[GET("player_location")]["PlaceStatus"]["fire_up"] = true;
      _add_ability("check_backpack");
      _update_survive_page("Normal");
    },
    event_check_backpack() {
      const new_logs = [$$l._log_5];
      for (const i in GET("backpack_items")) {
        let _newlog = "";
        const _item = GET("backpack_items")[i];
        if (isOverlay(i)) {
          _newlog = `${_item.name} x${_item.count}`;
          new_logs.push(_newlog);
        } else {
          for (const j in _item) {
            _newlog = `${_item[j].name}`;
            new_logs.push(_newlog);
          }
        }
      }
      new_logs.push($$l._log_6);
      _push_log(new_logs);
      _update_survive_page("Normal");
    },
    event_move_to() {
      STORE("player_location", this.destination);
      // add location tip
      _push_log($f($$l.moved_to, $$l[this.destination]));
      _push_log($f($$l.location, $$l[GET("player_location")]));
      _push_log(TGET("GAME_MAP")[GET("player_location")]["PlaceDescription"]);
      _update_survive_page("Normal");
    },
    event_talk_to() {
      TGET("this_round_logs").clearRoundLog();
      const TalkingDetail = this.NPC.Storage.Talk(GET("player"), this.NPC);
      // Get Response ID,then Load Further Information
      if (!TalkingDetail) {
        // console.log(typeof this.NPC.Storage.StandByDialogs[Math.ceil(this.NPC.Storage.StandByDialogs.length * Math.random())]);
        _push_log($f($$l.talking_to, this.NPC.GetState().name));
        _push_log(
          $$l[this.NPC.GetState().name] +
            ": " +
            this.NPC.Storage.StandByDialogs[
              Math.floor(this.NPC.Storage.StandByDialogs.length * Math.random())
            ]
        );
        _push_log($f($$l.location, $$l[GET("player_location")]));
        _push_log(TGET("GAME_MAP")[GET("player_location")]["PlaceDescription"]);
        _update_survive_page("Normal");
      } else {
        const ResponseIDs = TalkingDetail[1];
        if (TalkingDetail[0].length > 0)
          _push_log(
            $$l[this.NPC.GetState().name] +
              ": " +
              $$l["NPCResponse"][TalkingDetail[0]]
          );

        const ResponseData = {
          ResponseList: (() => {
            const result = [PlayerResponseAbilityGenerator("Leave", this.NPC)];
            for (const i of ResponseIDs) {
              result.push(PlayerResponseAbilityGenerator(i, this.NPC));
            }
            return result;
          })(),
          Player: GET("player"),
          NPC: this.NPC,
        };
        _update_survive_page.bind(ResponseData)("Talk");
      }
    },
    event_response_to() {
      _push_log($$l.You + ": " + this.Content);
      if (this.isNPCNeedRespond) {
        _push_log(this.GetNPCResponse());
      }
      const TalkingDetail = this.NPC.Storage.Talk(GET("player"), this.NPC);
      if (!TalkingDetail) {
        // console.log(typeof this.NPC.Storage.StandByDialogs[Math.ceil(this.NPC.Storage.StandByDialogs.length * Math.random())]);
        _push_log($f($$l.location, $$l[GET("player_location")]));
        _push_log(TGET("GAME_MAP")[GET("player_location")]["PlaceDescription"]);
        _update_survive_page("Normal");
      } else {
        const ResponseIDs = TalkingDetail[1];
        if (TalkingDetail[0].length > 0) _push_log(TalkingDetail[0]);
        const ResponseData = {
          ResponseList: (() => {
            const result = [PlayerResponseAbilityGenerator("Leave", this.NPC)];
            for (const i of ResponseIDs) {
              result.push(PlayerResponseAbilityGenerator(i, this.NPC));
            }
            return result;
          })(),
          Player: GET("player"),
          NPC: this.NPC,
        };
        _update_survive_page.bind(ResponseData)("Talk");
      }
    },
  };
  for (const i in event_before) {
    window[i] = EventWrapper(i, event_before[i]);
  }
})();
