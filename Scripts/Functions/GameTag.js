const TagFunctionMap = {
  food: function (ItemID, UUID = void 0) {
    let cost;
    if (isOverlay(ItemID))
      cost = GET("backpack_items")[ItemID]["status"]["food"]["cost"];
    else cost = GET("backpack_items")[ItemID][UUID]["status"]["food"]["cost"];
    if (!GET("is_first_fire_up"))
      if (TGET("now_selecting_action") === "Survive") {
        return ComponentRender(
          LoadedComponentList["_component_ability_button"],
          $$l._tag_function_food + ` ${ItemList[ItemID].name}`,
          cost,
          () => {
            _function_eat_food(ItemID, UUID);
            _update_survive_page();
          }
        );
      } else if (TGET("now_selecting_action") === "BackPack") {
        return {
          excutor_name: $$l._tag_function_food,
          excutor_duration: cost,
          excutor: () => {
            _function_eat_food(ItemID, UUID);
            // BuildBackPackPage();
          },
        };
      }
  },
  tinned: function (ItemID, UUID = void 0) {
    let cost;
    if (isOverlay(ItemID))
      cost = GET("backpack_items")[ItemID]["status"]["tinned"]["cost"];
    else cost = GET("backpack_items")[ItemID][UUID]["status"]["tinned"]["cost"];
    if (_function_check_can_do("tinned") && !GET("is_first_fire_up"))
      if (TGET("now_selecting_action") === "Survive") {
        return ComponentRender(
          LoadedComponentList["_component_ability_button"],
          $$l._tag_function_tinned + ` ${ItemList[ItemID].name}`,
          cost,
          () => {
            _function_open_tinned(ItemID, UUID);
            _update_survive_page();
          }
        );
      } else if (TGET("now_selecting_action") === "BackPack") {
        return {
          excutor_name: $$l._tag_function_tinned,
          excutor_duration: cost,
          excutor: () => {
            _function_open_tinned(ItemID, UUID);
            // BuildBackPackPage();
          },
        };
      }
  },
};
const TagFunction = new Proxy(TagFunctionMap, {
  get: (item, property) => {
    return function () {
      if (arguments.length === 0) throw new Error("Tag Function:Need Item ID.");
      if (typeof arguments[0] !== "string")
        throw new Error("Tag Function:Not An Item ID.");
      if (!GET("backpack_items")[arguments[0]])
        throw new Error(
          "Tag Function:Player Dont Have The Item " + arguments[0]
        );
      // console.log(item,property);
      if (item[property])
        if (arguments[1] && GET("backpack_items")[arguments[0]][arguments[1]]) {
          return item[property](arguments[0], arguments[1]);
        } else {
          return item[property](arguments[0]);
        }
    };
  },
});
