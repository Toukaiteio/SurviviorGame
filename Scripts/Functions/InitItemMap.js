const ItemList={
    "item_kindling":{
        "name":$$l.item_kindling,
        "type":"item",
        "overlay":true,
        "tag":["kindling","combustible"],
        "status":{}
    },
    "item_wood":{
        "name":$$l.item_wood,
        "type":"item",
        "overlay":true,
        "tag":["combustible"],
        "status":{}
    },
    "item_food_tinned_tomato":{
        "name":$$l.item_food_tinned_tomato,
        "type":"item",
        "overlay":true,
        "tag":["food","cookable","tinned"],
        "status":{
            "tinned":{
                "remove":"open_tinned",
                "cost":3
            },
            "cooked":{
                "rectification":2,
                "cost":5
            }
        }
    },
    "weapon_knife":{
        "name":$$l.weapon_knife,
        "type":"weapon",
        "overlay":false,
        "tag":["equipable","tool"],
        "status":{
            "tool":{
                "available":["craft_kindling","open_tinned"]
            },
            "weapon":{
                "rectification":[1]
            }
        }
    }
};
function isOverlay(id){
    if(!ItemList[id]){
        throw new Error("isOverlay function:Not Found Item!");
    }
    return ItemList[id]["overlay"];
}
function ITEM(id,count=1){
    if(!ItemList[id]){
        throw new Error("ITEM function:Not Found Item!");
    }
    let _result={...ItemList[id]};
    if(ItemList[id].overlay && typeof count==="number"){
        _result["count"]=Math.round(count);
    }
    if(!ItemList[id].overlay){
        const _n_re={};
        for(let i=0;i<count;i++){
            const uuid=GenerateKey(16);
            _n_re[uuid]=_result;
        }
        return _n_re;
    }else{
        return _result;
    }
}