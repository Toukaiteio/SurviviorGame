function SwitchSelecting(To){
    if(TGET("now_selecting")){
        TGET("now_selecting").classList.remove("selecting");
    };
    TSTORE("now_selecting",To);
    TGET("now_selecting").classList.add("selecting");
}
function GenerateKey(totalLength){
    const parentChars="1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const result=[];
    for(let i=0;i<totalLength;i++) result.push(parentChars[Math.round((Math.random()*500)%parentChars.length)]);
    return result.join("");
}