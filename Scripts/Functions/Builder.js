function BuildSurviviorPage(Container){
    const _st=ComponentRender(LoadedComponentList["_component_story_teller"],GET("this_round_logs"));
    TSTORE("_story_teller",_st);
    Container.appendChild(_st);
    for(const i of GET("ability_list")){
        Container.appendChild(TGET("ability_list")[i]);
    }
    return Container;
}
function BuildActionList(Container){
    for(const i of GET("action_list")){
        Container.appendChild(TGET("action_list")[i]);
    }
    SwitchSelecting(TGET("action_list")[GET("action_list")[0]]);
    return Container;
}