const _Store={};
function STORE(key,value){
    _Store[key]=value;
}
function GET(key){
    return _Store[key] || null;
}