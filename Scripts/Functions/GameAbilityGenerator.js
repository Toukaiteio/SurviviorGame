const AbilityGenerator = () => {
  const _abilityList = {
    fire_up: ComponentRender(
      LoadedComponentList["_component_ability_button"],
      $$l.ability_fire_up,
      2,
      event_fire_up
    ),
    check_backpack: ComponentRender(
      LoadedComponentList["_component_ability_button"],
      $$l.ability_check_backpack,
      2,
      event_check_backpack
    ),
  };
  return _abilityList;
};
const MoveAbilityGenerator = (MoveTo) => {
  if (!Object.keys(TGET("GAME_MAP")).includes(MoveTo))
    throw new Error("Move Ability Generator:Not a valid location!", MoveTo);
  const MoveToInfo = {
    destination: MoveTo,
  };
  return ComponentRender(
    LoadedComponentList["_component_ability_button"],
    $f($$l.move_ability, $$l[MoveTo]),
    2,
    event_move_to.bind(MoveToInfo)
  );
};
const NPCTalkAbilityGenerator = (TargetNPC) => {
  const TalkToInfo = {
    NPC:TargetNPC,
  }
  return ComponentRender(
    LoadedComponentList["_component_ability_button"],
    $f($$l.talk_ability, $$l[TargetNPC.GetState().name]),
    2,
    event_talk_to.bind(TalkToInfo)
  );
};
const PlayerResponseAbilityGenerator = (ResponseID,FromNPC) => {
  const ResponseData = GetPlayerResponse(ResponseID);
  if (ResponseID === "Leave"){
    return ComponentRender(
      LoadedComponentList["_component_ability_button"],
      $f($$l.response_ability,ResponseData.Preview || ResponseData.Content),
      0.5,
      ()=>{
        TGET("this_round_logs").clearRoundLog();
        _update_survive_page();
      }
    )
  }
  ResponseData["NPC"] = FromNPC;
  if(!ResponseData.Preview && !ResponseData.Content)
    throw new Error("Player Response Ability Generator:Not a valid ResponseID.",ResponseID,ResponseData);
  return ComponentRender(
    LoadedComponentList["_component_ability_button"],
    $f($$l.response_ability,ResponseData.Preview || ResponseData.Content),
    0.5,
    event_response_to.bind(ResponseData)
  );
}