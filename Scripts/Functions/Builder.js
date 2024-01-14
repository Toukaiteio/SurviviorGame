function BuildSurviviorPage(Container){
    const _st=ComponentRender(LoadedComponentList["_component_story_teller"],GET("this_round_logs"));
    const ability_list={
        "fire_up":ComponentRender(LoadedComponentList["_component_ability_button"],$$l.ability_fire_up,2,event_fire_up)
    }
    TSTORE("_story_teller",_st);
    Container.appendChild(_st);
    for(const i in ability_list){
        Container.appendChild(ability_list[i]);
    }
    return Container;
}
function BuildActionList(Container){
    const ActionList={
        "Survive":ComponentRender(LoadedComponentList["_component_action_button"],$$l.action_list_survive,"",()=>{BuildSurviviorPage();SwitchSelecting(ActionList.Survive);})
    }
    for(const i in ActionList){
        Container.appendChild(ActionList[i]);
    }
    SwitchSelecting(ActionList.Survive);
    return Container;
}