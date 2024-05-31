const __Game_Player_Response__ = {
  hello:{
    isNPCNeedRespond:false,
  },
  Leave:{
  }
}
const GetPlayerResponse = (Response_ID) => {
  const Default = {
    Preview:null,
    Content:null,
    isNPCNeedRespond:false,
    GetNPCResponse:null
  }
  if(!__Game_Player_Response__[Response_ID]) return Default;
  Default.Preview = __Game_Player_Response__[Response_ID]["Preview"] || ($$l.PlayerResponse[Response_ID]["Preview"] || null);
  Default.Content = __Game_Player_Response__[Response_ID]["Content"] || ($$l.PlayerResponse[Response_ID]["Content"] || null);
  Default.isNPCNeedRespond = __Game_Player_Response__[Response_ID]["isNPCNeedRespond"] || false;
  if(Default.isNPCNeedRespond) Default.GetNPCResponse = __Game_Player_Response__[Response_ID]["GetNPCResponse"] || null;
  return Default;
}
const __Game_NPC_Config__ = {
  TestNPC: {
    Init: [
      "TestNPC",
      2,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      {
        Relation: GET("TestNPC_Relation") ? GET("TestNPC_Relation") : 0,
        Talk(Source, Self) {
          if (Self.Storage.Relation === 0) {
            Self.Storage.Relation += 1;
            Self.Storage.IsBothered = false;
            return false
          };
          if (Self.Storage.Relation === 1 && !Self.Storage.IsBothered) {
            Self.Storage.IsBothered = true;
            return [
              ["TestNPC_dialog_1"], // NPC say
              [
                "hello", // Player Response choice
              ],
            ];
          } else {
            Self.Storage.IsBothered = false;
            return false;
          }
          
        },
        At: "forest_0_0_0",
      },
    ],
  },
};
// Add NPC to Map After Map was Loaded