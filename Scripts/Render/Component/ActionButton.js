COMPONENTNAME="Action Button Render";
AUTHOR="Daiyosei";
ID="_component_action_button";
require_parameters=4;
is_forced_full_parameter=false;
para_types=["string","string","function","boolean"];
Render=function(){
    let _content=arguments[0] || "";
    let _attached_style=arguments[1] || "";
    let _callback=arguments[2] || (()=>{return;})
    let _is_replace_style=arguments[3] || false;
    const _gbutton=document.createElement("button");
    if(!_is_replace_style)
        _gbutton.style.cssText=`
            border-radius:4px;
            font-size:20px;
            font-weight:bolder;
            text-align:center;
            border:none;
            outline:none;
            padding:6px;
            height:44px;
            width:100%;
            background:var(--bgcolor);
            border-bottom:3px solid var(--selectionColor);
        `+_attached_style;
    else
        _gbutton.style.cssText=_attached_style;
    _gbutton.id="_component_action_button";
    _gbutton.onclick=_callback;
    _gbutton.innerHTML=_content;
    return _gbutton;
}