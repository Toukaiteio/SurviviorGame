function BuildSurviviorPage(Container=void 0){
    for(const i of [...Container.children]){
        i.remove();
    }
    //Check Item Tag Here
    const _st=ComponentRender(LoadedComponentList["_component_story_teller"],GET("this_round_logs"));
    TSTORE("_story_teller",_st);
    Container.appendChild(_st);
    for(const i of GET("ability_list")){
        Container.appendChild(TGET("ability_list")[i]);
    }
    // add Tag ability Here.
    for(const i in GET("backpack_items")){
        if(isOverlay(i)){
            for(const j of GET("backpack_items")[i]["tag"]){
                const _r=(TagFunction[j])(i);
                if(_r) Container.appendChild(_r);
            }
        }else{
            for(const j in GET("backpack_items")[i]){
                for(const k of GET("backpack_items")[i][j]["tag"]){
                    const _r=(TagFunction[k])(i,j);
                    if(_r) Container.appendChild(_r);
                }
            }
        }
    }
    return Container;
}
function BuildActionList(Container){
    for(const i of GET("action_list")){
        Container.appendChild(TGET("action_list")[i]);
    }
    SwitchSelecting(TGET("action_list")[GET("action_list")[0]],GET("action_list")[0]);
    return Container;
}
function BuildStartMenu(Container){
    Container.appendChild(ComponentRender(LoadedComponentList["_component_general_button"],$$l.start_game,game_start))
}