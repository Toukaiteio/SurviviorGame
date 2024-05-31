const ActionGenerator = () => {
    const _actionList = {
        Survive: ComponentRender(
          LoadedComponentList["_component_action_button"],
          $$l.action_list_survive,
          "",
          () => {
            BuildSurviviorPage();
            SwitchSelecting(ActionList.Survive);
          }
        ),
        
    }
    return _actionList;
}