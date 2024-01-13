PAGENAME="Home Page Render";
AUTHOR="Daiyosei";
ID="page_home_page";
require_parameters=0;
is_forced_full_parameter=false;
para_types=[];
Render=function(){
    const Home=document.createElement("div");
    Home.classList.add("HomeWrapper");
    Home.id="Home";
    Home.style.cssText=`
        --bgcolor:transparent;
        --bdcolor:#8FEBA6;
        --selectionColor:#9FAFA1;
        --selectedBgColor:#D6FADC;
        display:flex;
        height:100vh;
        width:100vw;
    `
    const _action_selector=ComponentRender(LoadedComponentList["_component_action_selector"]);
    //render action selector
    const ActionList={
        "Survive":ComponentRender(LoadedComponentList["_component_action_button"],$$l.action_list_survive,"",()=>{BuildSurviviorPage();SwitchSelecting(ActionList.Survive);})
    }
    ApplyStyle("button#_component_action_button.selecting",`
        background-color:var(--selectedBgColor) !important;
    `)
    SwitchSelecting(ActionList.Survive);
    for(const i in ActionList){
        _action_selector.appendChild(ActionList[i]);
    }
    Home.appendChild(_action_selector);
    const main_wrapper=ComponentRender(LoadedComponentList["_component_general_wrapper"]);
    const ability_list={
        "fire_up":ComponentRender(LoadedComponentList["_component_ability_button"],$$l.ability_fire_up,2,()=>{console.log("Hello,World!");})
    }
    main_wrapper.appendChild(ability_list.fire_up);
    Home.appendChild(main_wrapper);
    return Home;
}