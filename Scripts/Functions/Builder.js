function BuildSurviviorPage(Container = void 0, CurrentMode = "Normal") {
  for (const i of [...Container.children]) {
    i.remove();
  }
  // check item tag here
  const _st = ComponentRender(
    LoadedComponentList["_component_story_teller"],
    TGET("this_round_logs").getRoundLog()
  );
  TSTORE("_story_teller", _st);
  Container.appendChild(_st);
  const _playerLocate = TGET("GAME_MAP")[GET("player_location")];
  switch (CurrentMode) {
    case "Normal":
        // add character ability here
        for (const i of GET("ability_list")) {
          Container.appendChild(TGET("ability_list")[i]);
        }
        // add location ability here
        
        for (const i of _playerLocate["PlaceTag"]) {
          Container.appendChild(TGET("ability_list")[i]);
        }
        // add move ability here
        for (const i of _playerLocate["LinkTo"]) {
          Container.appendChild(MoveAbilityGenerator(i));
        }
        // add talk ability here
        if(_playerLocate["PlaceStoredObject"]["NPC_List"])
          for (const i in _playerLocate["PlaceStoredObject"]["NPC_List"]){
            Container.appendChild(NPCTalkAbilityGenerator(_playerLocate["PlaceStoredObject"]["NPC_List"][i]));
          }
        // add tag ability here
        for (const i in GET("backpack_items")) {
          if (isOverlay(i)) {
            for (const j of GET("backpack_items")[i]["tag"]) {
              const _r = TagFunction[j](i);
              if (_r) Container.appendChild(_r);
            }
          } else {
            for (const j in GET("backpack_items")[i]) {
              for (const k of GET("backpack_items")[i][j]["tag"]) {
                const _r = TagFunction[k](i, j);
                if (_r) Container.appendChild(_r);
              }
            }
          }
        }
      break;
  
    case "Talk":
      // add response ability here
      for (const i of this["ResponseList"]) {
        Container.appendChild(i);
      }
      // add move ability here
      for (const i of _playerLocate["LinkTo"]) {
        Container.appendChild(MoveAbilityGenerator(i));
      }
      // add tag ability here
      for (const i in GET("backpack_items")) {
        if (isOverlay(i)) {
          for (const j of GET("backpack_items")[i]["tag"]) {
            const _r = TagFunction[j](i);
            if (_r) Container.appendChild(_r);
          }
        } else {
          for (const j in GET("backpack_items")[i]) {
            for (const k of GET("backpack_items")[i][j]["tag"]) {
              const _r = TagFunction[k](i, j);
              if (_r) Container.appendChild(_r);
            }
          }
        }
      }
      break;
  }

  return Container;
}
function BuildActionList(Container) {
  for (const i of GET("action_list")) {
    Container.appendChild(TGET("action_list")[i]);
  }
  SwitchSelecting(
    TGET("action_list")[GET("action_list")[0]],
    GET("action_list")[0]
  );
  return Container;
}
function BuildStartMenu(Container) {
  Container.appendChild(
    ComponentRender(
      LoadedComponentList["_component_general_button"],
      $$l.start_game,
      game_start
    )
  );
}
