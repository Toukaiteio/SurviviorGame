COMPONENTNAME="Story Teller Render";
AUTHOR="Daiyosei";
ID="_component_story_teller";
require_parameters=1;
is_forced_full_parameter=false;
para_types=["object"];
Render=function(){
    const _log=arguments[0];
    if(!(_log instanceof Array)){
        throw new Error("Parameter For Story Teller Should Be an Array Type!");
    }
    const _story_teller=document.createElement("ul");
    for(const i of _log){
        const _story_teller_item=document.createElement("li");
        _story_teller_item.innerHTML=i;
        _story_teller.appendChild(_story_teller_item);
    }
    _story_teller.style.cssText=`
            height:fit-content;
            width:100%;
        `;
    _story_teller.id="_component_story_teller";
    return _story_teller;
}