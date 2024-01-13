const _TStore={};
function TSTORE(key,value){
    _TStore[key]=value;
}
function TGET(key){
    return _TStore[key] || null;
}