STORE("is_first_fire_up",true);
STORE("this_round_logs",[$$l._log_1,$$l._log_2]);
STORE("ability_list",["fire_up"]);
TSTORE("ability_list",{
    "fire_up":ComponentRender(LoadedComponentList["_component_ability_button"],$$l.ability_fire_up,2,event_fire_up),
    "check_backpack":ComponentRender(LoadedComponentList["_component_ability_button"],$$l.ability_check_backpack,2,event_check_backpack),
});
STORE("action_list",["Survive"]);
TSTORE("action_list",{
    "Survive":ComponentRender(LoadedComponentList["_component_action_button"],$$l.action_list_survive,"",()=>{BuildSurviviorPage();SwitchSelecting(ActionList.Survive);})
});

STORE("backpack_items",{
    "item_kindling":ITEM("item_kindling",3),
    "item_wood":ITEM("item_wood",1),
    "item_food_tinned_tomato":ITEM("item_food_tinned_tomato",1),
    "weapon_knife":ITEM("weapon_knife")
})