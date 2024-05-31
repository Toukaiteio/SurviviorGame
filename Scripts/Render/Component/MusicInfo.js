COMPONENTNAME = "Music Info Render";
AUTHOR = "Daiyosei";
ID = "_component_music_info";
require_parameters = 3;
is_forced_full_parameter = true;
para_types = ["string", "string", "string"];
Render = function () {
  if (!TGET("music_info_animation_style")) {
    TSTORE(
      "music_info_animation_style",
      ApplyStyle(
        "@keyframes popup",
        `
            from{
                transform:translateX(100%);
            }
            to{
                transform:translateX(0%);
            }
        `
      )
    );
    ApplyStyle(
      "@keyframes fadeout",
      `
            from{
                opacity:1;
            }
            to{
                opacity:0;
            }
        `
    );
    ApplyStyle(
      "div#_component_music_info div#_music_name",
      `
            transform:translateX(100%);
            animation-delay:0.6s;
            animation:popup 1.2s forwards;
        `
    );
    ApplyStyle(
      "div#_component_music_info div#_music_author",
      `
            transform:translateX(100%);
            animation-delay:0.9s;
            animation:popup 1.2s forwards;
        `
    );
    ApplyStyle(
      "div#_component_music_info div#_music_album",
      `
            transform:translateX(100%);
            animation-delay:1.2s;
            animation:popup 1.2s forwards;
        `
    );
    ApplyStyle(
      "div#_component_music_info.fadeout",
      `
            animation:fadeout 1s forwards;
        `
    );
  }
  const _music_info = document.createElement("div");
  const _name = arguments[0];
  const _author = arguments[1];
  const _album = arguments[2];
  _music_info.style.cssText = `
            position:absolute;
            height:120px;
            width:100%;
            bottom:0px;
            left:0px;
            display:flex;
            flex-direction: column;
            user-select:none;
            pointer-event:none;
            align-items: flex-end;
            justify-content: flex-end;
        `;
  _music_info.id = "_component_music_info";
  const _music_name = document.createElement("div");
  _music_name.id = "_music_name";
  _music_name.innerHTML = _name;
  const _music_author = document.createElement("div");
  _music_author.id = "_music_author";
  _music_author.innerHTML = _author;
  const _music_album = document.createElement("div");
  _music_album.id = "_music_album";
  _music_album.innerHTML = _album;
  _music_info.appendChild(_music_name);
  _music_info.appendChild(_music_author);
  _music_info.appendChild(_music_album);
  return _music_info;
};
