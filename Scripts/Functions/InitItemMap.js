const ItemList = {
  item_kindling: {
    name: $$l.item_kindling,
    type: "item",
    overlay: true,
    tag: ["kindling", "combustible"],
    status: {
      kindling: {
        cost: 2,
        value: 2,
      },
    },
  },
  item_wood: {
    name: $$l.item_wood,
    type: "item",
    overlay: true,
    tag: ["combustible"],
    status: {},
  },
  item_food_tinned_tomato: {
    name: $$l.item_food_tinned_tomato,
    type: "item",
    overlay: true,
    tag: ["tinned"],
    status: {
      tinned: {
        replace: "item_food_untinned_tomato",
        cost: 3,
      },
    },
  },
  item_food_untinned_tomato: {
    name: $$l.item_food_untinned_tomato,
    type: "item",
    overlay: false,
    tag: ["food", "cookable", "untinned"],
    status: {
      food: {
        cost: 2,
        value: 3,
      },
      cookable: {
        cost: 16,
        add_tag: "cooked",
      },
      untinned: {
        value: 0,
      },
      cooked: {
        value: 2,
        cost: 5,
      },
    },
  },
  weapon_knife: {
    name: $$l.weapon_knife,
    type: "weapon",
    overlay: false,
    tag: ["equipable", "tool"],
    status: {
      tool: {
        available: ["craft_kindling", "tinned"],
      },
      weapon: {
        value: [1],
      },
    },
    Onequip(){
      const Atk = this.status.weapon.value[0];
      if(TGET("Player")){
        TGET("Player").UpgradeSkill({
          atk:Atk
        })
      }
    },
    Ondequip(){
      const Atk = this.status.weapon.value[0];
      if(TGET("Player")){
        TGET("Player").DegradeSkill({
          atk:Atk
        })
      }
    }
  },
};
function isOverlay(id) {
  if (!ItemList[id]) {
    throw new Error("isOverlay function:Not Found Item!");
  }
  return ItemList[id]["overlay"];
}
function ITEM(id, count = 1) {
  if (!ItemList[id]) {
    throw new Error("ITEM function:Not Found Item!");
  }
  let _result = { ...ItemList[id] };
  if (ItemList[id].overlay && typeof count === "number") {
    _result["count"] = Math.round(count);
  }
  if (!ItemList[id].overlay) {
    const _n_re = {};
    for (let i = 0; i < count; i++) {
      const uuid = GenerateKey(16);
      _n_re[uuid] = _result;
    }
    return _n_re;
  } else {
    return _result;
  }
}
