PAGENAME="Home Page Render";
AUTHOR="Daiyosei";
ID="page_home_page";
require_parameters=0;
is_forced_full_parameter=false;
para_types=[];
Render=function(){
    if(TGET("freezed_home_page")){
        return TGET("freezed_home_page");
    }
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
    BuildActionList(_action_selector);
    ApplyStyle("button#_component_action_button.selecting",`
        background-color:var(--selectedBgColor) !important;
    `)
    Home.appendChild(_action_selector);
    const main_wrapper=ComponentRender(LoadedComponentList["_component_general_wrapper"]);
    BuildSurviviorPage(main_wrapper);
    Home.appendChild(main_wrapper);
    TSTORE("freezed_home_page",Home);
    return Home;
}