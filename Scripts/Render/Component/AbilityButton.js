COMPONENTNAME="Ability Button Render";
AUTHOR="Daiyosei";
ID="_component_ability_button";
require_parameters=4;
is_forced_full_parameter=false;
para_types=["string","number","function","string"];
Render=function(){
    let _content=arguments[0] || "";
    let _duration=arguments[1] || 1;
    let _callback=arguments[2] || (()=>{return;})
    let _beforeStyle=arguments[4] || "";
    if(!TGET("_has_applied_animation_style")){
        ApplyStyle('@keyframes progress',`
            from{
                width:0%;
            }
            to{
                width:100%;
            }
        `);
        TSTORE("_has_applied_animation_style",true);
    }
    const _abutton=document.createElement("button");
    const _thisClass=GenerateKey(8);
    const _thisClass2=GenerateKey(4);
    _abutton.classList.add(_thisClass);
    _abutton.classList.add(_thisClass2);
    _abutton.id="_component_ability_button";
    ApplyStyle(`button#_component_ability_button.${_thisClass}.${_thisClass2}::after`,`
        content:"${_content}";
        position:absolute;
        top:0px;
        left:0px;
        color:red;
        font-size:18px;
        text-align:center;
        height:100%;
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
    `+_beforeStyle);
    
    ApplyStyle(`button#_component_ability_button.${_thisClass}.${_thisClass2}::before`,`
        content:"";
        position:absolute;
        top:0px;
        left:0px;
        font-size:18px;
        text-align:center;
        background-color:black;
        height:100%;
        width:0%;
    `+_beforeStyle)
    const _progress_controller=ApplyStyle(`button#_component_ability_button.${_thisClass}.${_thisClass2}::before`,
    `   animation:progress ${_duration}s paused;`);
    _abutton.style.cssText=`
        background-color:var(--color);
        border:3px solid var(--bdcolor);
        border-radius:4px;
        height:42px;
        color:transparent;
        user-select:none;
        position:relative;
        padding:6px;
        padding-left:24px;
        padding-right:24px;
        box-sizing:border-box;
        overflow:hidden;
    `
    _abutton.innerHTML=_content;
    _abutton.onclick=()=>{
        if(TGET("is_working")){
            return;
        }else{
            TSTORE("is_working",true);
            _progress_controller.innerHTML=`button#_component_ability_button.${_thisClass}.${_thisClass2}::before`+`{animation:progress ${_duration}s infinite;}`
            setTimeout(()=>{
                _callback();
                _progress_controller.innerHTML=`button#_component_ability_button.${_thisClass}.${_thisClass2}::before`+`{animation:progress ${_duration}s paused;}`;
                TSTORE("is_working",false);
            },_duration*1000)
        }

        
    };
    return _abutton;
}