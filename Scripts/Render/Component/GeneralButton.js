COMPONENTNAME="General Button Render";
AUTHOR="Daiyosei";
ID="_component_general_button";
require_parameters=2;
is_forced_full_parameter=false;
para_types=["string","function"];
Render=function(){
    let _content=arguments[0] || "";
    let _callback=arguments[1] || (()=>{return;})
    const _gbutton=document.createElement("button");
    _gbutton.style.cssText=`
        background-color:var(--color);
        border:3px solid var(--bdcolor);
        border-radius:4px;
        font-size:18px;
        text-align:center;
        padding:6px;
        height:42px;

    `
    _gbutton.onclick=_callback;
    _gbutton.innerHTML=_content;
    return _gbutton;
}