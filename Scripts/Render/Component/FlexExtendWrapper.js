COMPONENTNAME = "General Wrapper Render";
AUTHOR = "Daiyosei";
ID = "_component_general_wrapper";
require_parameters = 0;
is_forced_full_parameter = false;
para_types = [];
Render = function () {
  const _gwrapper = document.createElement("div");
  _gwrapper.style.cssText = `
            flex:1;
            height:100%;
            width:0px;
        `;
  _gwrapper.id = "_component_general_wrapper";
  return _gwrapper;
};
