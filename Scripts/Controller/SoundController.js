const GLOBAL_SOUND_CONTROLLER={};
let Global_Audio_Context=new (window.AudioContext || window.webkitAudioContext)();
let CurrentBGMGainNode=null;
let CurrentBGMSource=null;
function PreloadSoundResource(Key){
    if(BackgroundMusicResourcesList[Key]){
        const _thisMusic=BackgroundMusicResourcesList[Key];
        GLOBAL_SOUND_CONTROLLER[Key]=new Audio();
        GLOBAL_SOUND_CONTROLLER[Key].src=_thisMusic.source;
        GLOBAL_SOUND_CONTROLLER[Key].preload="auto";
        GLOBAL_SOUND_CONTROLLER[Key].volumn=0;
        GLOBAL_SOUND_CONTROLLER[Key]["_stored_maxVolumn"]=_thisMusic.volumn;
        GLOBAL_SOUND_CONTROLLER[Key].onplay=()=>{
            if(TGET("now_displaying_music")){
                TGET("now_displaying_music").remove();
            }
            if(!GLOBAL_SOUND_CONTROLLER[Key]["_stored_source"]){
                GLOBAL_SOUND_CONTROLLER[Key]["_stored_source"]=Global_Audio_Context.createMediaElementSource(GLOBAL_SOUND_CONTROLLER[Key])
            }
            if(!GLOBAL_SOUND_CONTROLLER[Key]["_stored_gainNode"]){
                GLOBAL_SOUND_CONTROLLER[Key]["_stored_gainNode"]=Global_Audio_Context.createGain();
            }
            CurrentBGMSource = GLOBAL_SOUND_CONTROLLER[Key]["_stored_source"];
            CurrentBGMGainNode = GLOBAL_SOUND_CONTROLLER[Key]["_stored_gainNode"];
            CurrentBGMSource.connect(CurrentBGMGainNode);
            CurrentBGMGainNode.connect(Global_Audio_Context.destination);
            CurrentBGMGainNode.gain.setValueAtTime(0, Global_Audio_Context.currentTime);
            CurrentBGMGainNode.gain.linearRampToValueAtTime(GLOBAL_SOUND_CONTROLLER[Key]["_stored_maxVolumn"], Global_Audio_Context.currentTime + 2);
            CurrentBGMGainNode.gain.linearRampToValueAtTime(0, GLOBAL_SOUND_CONTROLLER[Key].duration - 5);
            TSTORE("now_displaying_music",ComponentRender(LoadedComponentList["_component_music_info"],_thisMusic.name,_thisMusic.author,_thisMusic.album));
            document.body.appendChild(TGET("now_displaying_music"))
            setTimeout(()=>{
                TGET("now_displaying_music").classList.add("fadeout");
                setTimeout(()=>{
                    TGET("now_displaying_music").remove();
                    TSTORE("now_displaying_music",null);
                },1050)
            },2450)
        }
        GLOBAL_SOUND_CONTROLLER[Key].onended=()=>{
            CurrentBGMSource=null;
            CurrentBGMGainNode=null;
        }
        GLOBAL_SOUND_CONTROLLER[Key].onpaused=()=>{
            CurrentBGMGainNode.gain.setValueAtTime(0, Global_Audio_Context.currentTime);
        }
        GLOBAL_SOUND_CONTROLLER[Key].onstop=()=>{
            CurrentBGMGainNode.gain.setValueAtTime(0, Global_Audio_Context.currentTime);
        }
    }else{
        throw new Error("Sound Controller:Trying to Load a Non-exist Resource:"+Key)
    }
}
function PlayBGM(key,is_loop=false){
    if(TGET("current_music_controller")){
        TGET("current_music_controller").currentTime=0;
        TGET("current_music_controller").paused();
        CurrentBGMGainNode=null;
        CurrentBGMSource=null;
    }
    TSTORE("current_music_controller",GLOBAL_SOUND_CONTROLLER[key]);
    if(GLOBAL_SOUND_CONTROLLER[key].readyState<2){
        GLOBAL_SOUND_CONTROLLER[key].onloadeddata=()=>{
            GLOBAL_SOUND_CONTROLLER[key].play();
        }
    }else{
        GLOBAL_SOUND_CONTROLLER[key].play();
    }
    if(is_loop){
        GLOBAL_SOUND_CONTROLLER[key].onended=()=>{
            GLOBAL_SOUND_CONTROLLER[key].play();
        }
    }
}