const $l = {
  action_list_survive: "生存",
  ability_fire_up: "生火",
  ability_check_backpack: "检查背包",
  item_kindling: "引火物",
  item_wood: "木材",
  item_food_tinned_tomato: "番茄罐头",
  item_food_untinned_tomato: "番茄罐头(打开)",
  weapon_knife: "匕首",
  start_game: "开始游戏",
  _log_1: "世界发生了灾难，你面前的篝火还冒着一缕白烟",
  _log_2: "你现在只能靠你自己了",
  _log_3: "你点亮了篝火、这带给你了一点温暖。",
  _log_4: "你现在可以在篝火的照亮下做些什么了!",
  _log_5: "你翻遍了背包、发现了你有以下物品:",
  _log_6: "你没有更多东西了",
  _tag_function_food: "食用",
  _tag_after_eat_food: "你吃了 <_Insert_0_> 恢复了 <_Insert_1_> 点饱腹值!",
  _tag_function_tinned: "打开",
  general_standby_dialog_1:"嗯...",
  general_standby_dialog_2:"嗯?",
  general_standby_dialog_3:"(他正在想着什么东西走神)",
  TestNPC:"测试角色",
  TestNPC_dialog_1:"你好",
  event_player_say_hello:"你好",
  event_player_say_goodbye:"再见",
  location:"你现在在:<_Insert_0_>",
  move_ability:"移动到 <_Insert_0_>",
  moved_to:"你移动到了 <_Insert_0_>",
  talk_ability:"与 <_Insert_0_> 交谈",
  talking_to:"你正在与 <_Insert_0_> 对话",
  response_ability:"回复: <_Insert_0_>",
  forest_0_0_0: "森林空地",
  forest_0_0_0_des_0: "森林中的一片空地，中间有一处篝火。",
  forest_0_0_0_des_1: "森林中的一片空地，中间有一处篝火正在发出明亮的火光。",
  forest_1_0_0:"森林小路",
  forest_1_0_0_des_0:"森林里一处荒凉的小路，似乎已经废弃很久了，长满了杂草。",
  You:"你",
  PlayerResponse:{
    hello:{
      Preview:"你好",
      Content:"你好",
    },
    Leave:{
      Preview:"(离开)"
    }
  },
  NPCResponse:{
    "TestNPC_dialog_1":"你好",
  }
};
const $$l = new Proxy($l,{
  get:function(target,prop){
    if(target[prop]) return target[prop];
    else return prop;
  }
})