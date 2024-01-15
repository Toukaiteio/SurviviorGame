function _push_log(log){
    if(GET("this_round_logs")){
        STORE("this_round_logs",GET("this_round_logs").concat(log));
    }else{
        STORE("this_round_logs",log);
    }
}
function _add_ability(id){
    if(!GET("ability_list").includes(id)){
        GET("ability_list").push(id);
    }
}
function _mov_ability(id){
    const _pos=GET("ability_list").indexOf(id);
    if(_pos!==-1){
        STORE("ability_list",GET("ability_list").slice(0,_pos).concat(GET("ability_list").slice(_pos+1)));
    }
}
function game_start(){
    TSTORE("main_page",PageRender(LoadedPageList["page_home_page"]));
}
function _update_survive_page(){
    TSTORE("survive_sub_page",BuildSurviviorPage(TGET("survive_sub_page")));
}
function event_fire_up(){
    if(GET("is_first_fire_up")){
        const new_logs=[$$l._log_3,$$l._log_4];
        _push_log(new_logs);
        STORE("is_first_fire_up",false)
    }else{
        const new_logs=[$$l._log_4];
        _push_log(new_logs);
    }
    _mov_ability("fire_up");
    _add_ability("check_backpack");
    _update_survive_page()
}
function _give_item(id,count=1){
    if(GET("backpack_items").keys().includes(id)){
        if(isOverlay(id)){
            GET("backpack_items")[id]["count"]+=count;
        }else{
            const new_items=ITEM(id,count);
            for(const i in new_items){
                if(!GET("backpack_items")[id][i]){
                    GET("backpack_items")[id][i]=new_items[i];
                }
            }
        }
    }else{
        GET("backpack_items")[id]=ITEM(id,count);
    }
}
function event_check_backpack(){
    const new_logs=[$$l._log_5];
    for(const i in GET("backpack_items")){
        let _newlog="";
        const _item=GET("backpack_items")[i];
        if(isOverlay(i)){
            _newlog=`${_item.name} x${_item.count}`
            new_logs.push(_newlog);
        }else{
            for(const j in _item){
                _newlog=`${_item[j].name}`;
                new_logs.push(_newlog);
            }
        }
        
        
    }
    new_logs.push($$l._log_6);
    _push_log(new_logs);
    _update_survive_page()
}