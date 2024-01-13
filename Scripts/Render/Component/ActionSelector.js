COMPONENTNAME="Action Selector Render";
AUTHOR="Daiyosei";
ID="_component_action_selector";
require_parameters=0;
is_forced_full_parameter=false;
para_types=[];
Render=function(){
    const _actionSelector=document.createElement("div");
    _actionSelector.style.cssText=`
            border-right:2px solid var(--bdcolor);
            height:100%;
            width:20%;
            min-width:185px;
            max-width:275px;
        `
    return _actionSelector;
}