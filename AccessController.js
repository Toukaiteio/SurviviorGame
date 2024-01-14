const Components=[
    './Scripts/Render/Component/GeneralButton.js',
    './Scripts/Render/Component/ActionSelector.js',
    './Scripts/Render/Component/ActionButton.js',
    './Scripts/Render/Component/FlexExtendWrapper.js',
    './Scripts/Render/Component/AbilityButton.js',
    './Scripts/Render/Component/StoryTeller.js',
]
const Pages=[
    './Scripts/Render/Page/HomePage.js'
]
//Register Component Render
function ComponentRender(Component){
    const _given_arguments=[...arguments].slice(1)
    if(Component.is_forced_full_parameter){
        if(_given_arguments.length!==Component.require_parameters){
            throw new Error(`${Component.name}: Need ${Component.require_parameters} Parameters,Only ${_given_arguments.length} Were Given!`);
        }
    }
    for(const i in _given_arguments){
        if(Component.para_types[i]!=="any")
        if(typeof _given_arguments[i] !== Component.para_types[i]){
            throw new Error(`${Component.name}: Need Type ${Component.para_types[i]} At ${i+1} Parameter.The Given Was ${typeof _given_arguments[i]}!`);
        }
    }
    return Component.render(..._given_arguments);
}
//Register Page Render
let CurrentActivePage=void 0;
function PageRender(Page){
    if(CurrentActivePage){
        CurrentActivePage.remove();
    }
    const _given_arguments=[...arguments].slice(1)
    if(Page.is_forced_full_parameter){
        if(_given_arguments.length!==Page.require_parameters){
            throw new Error(`${Page.name}: Need ${Page.require_parameters} Parameters,Only ${_given_arguments.length} Were Given!`);
        }
    }
    for(const i in _given_arguments){
        if(Page.para_types[i]!=="any")
        if(typeof _given_arguments[i] !== Page.para_types[i]){
            throw new Error(`${Page.name}: Need Type ${Page.para_types[i]} At ${i+1} Parameter.The Given Was ${typeof _given_arguments[i]}!`);
        }
    }
    CurrentActivePage=Page.render(..._given_arguments)
    return CurrentActivePage;
}
//Register Style Render
function ApplyStyle(selector,cssText){
    const _nStyle=document.createElement("style");
    _nStyle.innerHTML=`${selector}{${cssText}}`;
    document.head.appendChild(_nStyle);
    return _nStyle;
}
//Register DOM Updater
function $Update(DOM,Component){
    if(!DOM){
        throw new Error("Trying to Update an Unknown DOM!");
    }
    const _DOM_parent=DOM.parentElement;
    if(!_DOM_parent){
        throw new Error("Trying to Update an Illegal DOM!");
    }
    const _new_DOM=ComponentRender(Component,...[...arguments].slice(2));
    _DOM_parent.replaceChild(_new_DOM,DOM);
    return _new_DOM;
}
const LoadedComponentList={};
const LoadedPageList={};

let COMPONENTNAME=void 0;
let PAGENAME=void 0;
let AUTHOR=void 0;
let require_parameters=void 0;
let is_forced_full_parameter=void 0;
let para_types=void 0;
let ID=void 0;
async function inject_script(){
    const InitialMetaData=()=>{
        PAGENAME=void 0;
        AUTHOR=void 0;
        require_parameters=void 0;
        is_forced_full_parameter=void 0;
        para_types=void 0;
        COMPONENTNAME=void 0;
        ID=void 0;
    }
    //Load Component
    for(const i of Components){
        await Load_Script(i).then((Self)=>{
            const _cn=COMPONENTNAME || "Unnamed";
            const _au=AUTHOR || "Unknown";
            const _rp=require_parameters || 0;
            const _ip=is_forced_full_parameter || false;
            const _pt=para_types || [];
            const _rd=Render || (()=>{return document.createElement("div");});
            if(typeof ID==="string"){
                LoadedComponentList[ID]={
                    "name":_cn,
                    "author":_au,
                    "require_parameters":_rp,
                    "is_forced_full_parameter":_ip,
                    "para_types":_pt,
                    "render":_rd
                }
            }else{
                throw new Error(`${COMPONENTNAME}: Didn't Set It's ID Properly!Which It's ID was`,ID);
            }
            InitialMetaData();
            Self.remove();
        })
    
    }
    //Load Pages

    for(const i of Pages){
        await Load_Script(i).then((Self)=>{
            const _cn=PAGENAME || "Unnamed";
            const _au=AUTHOR || "Unknown";
            const _rp=require_parameters || 0;
            const _ip=is_forced_full_parameter || false;
            const _pt=para_types || [];
            const _rd=Render || (()=>{return document.createElement("div");});
            if(typeof ID==="string"){
                LoadedPageList[ID]={
                    "name":_cn,
                    "author":_au,
                    "require_parameters":_rp,
                    "is_forced_full_parameter":_ip,
                    "para_types":_pt,
                    "render":_rd
                }
            }else{
                throw new Error(`${COMPONENTNAME}: Didn't Set It's ID Properly!Which It's ID was`,ID);
            }
            InitialMetaData();
            Self.remove();
        })
    
    }
}
