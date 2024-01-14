function _push_log(log){
    if(GET("this_round_logs")){
        STORE("this_round_logs",GET("this_round_logs").concat(log));
    }else{
        STORE("this_round_logs",log);
    }
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
    TSTORE("_story_teller",$Update(TGET("_story_teller"),LoadedComponentList["_component_story_teller"],GET("this_round_logs")));
}