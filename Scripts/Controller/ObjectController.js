class Player {
  #PlayerState;
  #PlayerName;
  constructor(
    name = "unnamed",
    lvl = 0, // 等级
    skillpoints = 0, // 未分配技能点数
    str = 0, // 力量
    con = 0, // 体质
    res = 0, // 抗性
    def = 0, // 防御
    agi = 0, // 敏捷
    dod = 0, // 闪避%
    hit = 0, // 命中%
    crt = 0, // 暴击%
    arm = 0, // 护甲
    cha = 0, // 魅力
    maxhp = 0, // 体力值
    maxmp = 0, // 魔力值
    initStorage = {}
  ) {
    this.#PlayerName = name;
    this.#PlayerState = {
      name: name,
      lvl: lvl,
      skillpoints: skillpoints,
      str: str,
      con: con,
      res: res,
      def: def,
      agi: agi,
      dod: dod,
      hit: hit,
      crt: crt,
      arm: arm,
      cha: cha,
      hp: maxhp,
      maxhp: maxhp,
      mp: maxmp,
      maxmp: maxmp,
    };
    this.Storage = initStorage;
    this.GetState = this.GetState.bind(this);
  }
  ChangeName(NewName) {
    this.#PlayerName = NewName;
    this.#PlayerState.name = NewName;
  }
  UpgradeSkill(UpgradeMap) {
    for (const i in UpgradeMap) {
      if (this.#PlayerState[i] && i !== "name" && i !== "hp" && i !== "mp") {
        if (
          typeof this.#PlayerState[i] === "number" &&
          typeof UpgradeMap[i] === "number"
        )
          this.#PlayerState[i] += UpgradeMap[i];
        else
          console.warn(
            "Player UpgradeSkill Function:Illegal Data Type in UpgradeMap " + i,
            UpgradeMap[i]
          );
      }
    }
  }
  DegradeSkill(DegradeMap) {
    for (const i in DegradeMap) {
      if (this.#PlayerState[i] && i !== "name" && i !== "hp" && i !== "mp") {
        if (
          typeof this.#PlayerState[i] === "number" &&
          typeof DegradeMap[i] === "number"
        )
          this.#PlayerState[i] += DegradeMap[i];
        else
          console.warn(
            "Player DegradeMap Function:Illegal Data Type in DegradeMap " + i,
            DegradeMap[i]
          );
      }
    }
  }
  #Chance(chance, isHundred = true) {
    if (chance <= 0) return false;
    if (chance > 1 && !isHundred) return true;
    if (chance > 100 && isHundred) return true;
    return Math.floor(Math.random() * 10100) < isHundred
      ? chance * 100
      : chance * 10000;
  }
  GenerateMetaDamageMap() {
    const State = this.#PlayerState;
    const GetChance = this.#Chance;
    return {
      BaseDamge: 1 + str,
      CriticalDamage: GetChance(State.crt + State.agi * 0.05)
        ? (1 + str) * (0.5 + State.con * 0.05)
        : 1,
      InitiativeAdditionalDamage: 1 + State.str * (State.agi * 0.08),
      MagicDamage: State.con * 0.1 + State.maxmp * 0.01,
      HitChance: 0.2 + State.hit + State.agi * 0.02,
      HitCallBack: (
        FinalDamage = 0,
        IsKilled = false,
        Rewards = null,
        target = null
      ) => {
        TriggerEmptyEvent("event_hit_target", this, FinalDamage);
        if (IsKilled) TriggerEmptyEvent("event_kill_target", this, target);
        if (Rewards && Rewards.length > 0)
          TriggerEmptyEvent("event_gain_rewards", this, Rewards); // this event should not be emptied.
      },
      Source: this,
    };
  }
  OnDie(Source = null) {
    const IsDiedPunish = GET("game_is_die_punish") ? true : false;
    STORE("game_is_player_die", true);
    if (GET("player_die_event")) GET("player_die_event")(this, Source);
  }
  CalculateReceiveDamage(MetaDamageMap) {
    const State = this.#PlayerState;
    const FinalBaseDamage =
      MetaDamageMap.BaseDamge *
        (MetaDamageMap.BaseDamge / State.def -
          Math.min(State.con * 0.01, 0.3)) +
      MetaDamageMap.InitiativeAdditionalDamage;
    const FinalCriticalDamage =
      MetaDamageMap.CriticalDamage *
      ((MetaDamageMap.BaseDamge + MetaDamageMap.CriticalDamage) / State.def) *
      0.8;
    const FinalMagicDamage = Math.max(
      0,
      MetaDamageMap.MagicDamage - State.con * 0.1
    );
    const ReceivedDamage =
      FinalBaseDamage + FinalCriticalDamage + FinalMagicDamage;
    State.hp -= ReceivedDamage;
    MetaDamageMap.HitCallBack(ReceivedDamage, State.hp <= 0, null, this);
    if (State.hp <= 0) {
      this.OnDie(MetaDamageMap.Source);
    }
  }
  GetName() {
    return this.#PlayerName;
  }
  GetState() {
    return {...this.#PlayerState};
  }
}
class Monster {
  #SelfState;
  constructor(
    name = "unnamed",
    lvl = 0, // 等级
    str = 0, // 力量
    con = 0, // 体质
    res = 0, // 抗性
    def = 0, // 防御
    agi = 0, // 敏捷
    dod = 0, // 闪避%
    hit = 0, // 命中%
    crt = 0, // 暴击%
    arm = 0, // 护甲
    cha = 0, // 魅力
    maxhp = 0, // 体力值
    maxmp = 0, // 魔力值
    initStorage = {}
  ) {
    this.#SelfState = {
      name: name,
      lvl: lvl,
      str: str,
      con: con,
      res: res,
      def: def,
      agi: agi,
      dod: dod,
      hit: hit,
      crt: crt,
      arm: arm,
      cha: cha,
      hp: maxhp,
      maxhp: maxhp,
      mp: maxmp,
      maxmp: maxmp,
    };
    this.Storage = initStorage;
    this.GetState = this.GetState.bind(this);
  }
  ChangeName(NewName) {
    this.#SelfState.name = NewName;
  }
  #Chance(chance, isHundred = true) {
    if (chance <= 0) return false;
    if (chance > 1 && !isHundred) return true;
    if (chance > 100 && isHundred) return true;
    return Math.floor(Math.random() * 10100) < isHundred
      ? chance * 100
      : chance * 10000;
  }
  GenerateMetaDamageMap() {
    const State = this.#SelfState;
    const GetChance = this.#Chance;
    return {
      BaseDamge: 1 + str,
      CriticalDamage: GetChance(State.crt + State.agi * 0.05)
        ? (1 + str) * (0.5 + State.con * 0.05)
        : 1,
      InitiativeAdditionalDamage: 1 + State.str * (State.agi * 0.08),
      MagicDamage: State.con * 0.1 + State.maxmp * 0.01,
      HitChance: 0.2 + State.hit + State.agi * 0.02,
      HitCallBack: (
        FinalDamage = 0,
        IsKilled = false,
        Rewards = null,
        target = null
      ) => {
        TriggerEmptyEvent("event_hit_target", this, FinalDamage);
        if (IsKilled) TriggerEmptyEvent("event_kill_target", this, target);
        if (Rewards && Rewards.length > 0)
          TriggerEmptyEvent("event_gain_rewards", this, Rewards); // this event should not be emptied.
      },
      Source: this,
    };
  }
  OnDie(Source = null) {
    const IsDiedPunish = GET("game_is_die_punish") ? true : false;
    STORE("game_is_player_die", true);
    if (GET("player_die_event")) GET("player_die_event")(this, Source);
  }
  CalculateReceiveDamage(MetaDamageMap) {
    const State = this.#SelfState;
    const FinalBaseDamage =
      MetaDamageMap.BaseDamge *
        (MetaDamageMap.BaseDamge / State.def -
          Math.min(State.con * 0.01, 0.3)) +
      MetaDamageMap.InitiativeAdditionalDamage;
    const FinalCriticalDamage =
      MetaDamageMap.CriticalDamage *
      ((MetaDamageMap.BaseDamge + MetaDamageMap.CriticalDamage) / State.def) *
      0.8;
    const FinalMagicDamage = Math.max(
      0,
      MetaDamageMap.MagicDamage - State.con * 0.1
    );
    const ReceivedDamage =
      FinalBaseDamage + FinalCriticalDamage + FinalMagicDamage;
    State.hp -= ReceivedDamage;
    MetaDamageMap.HitCallBack(ReceivedDamage, State.hp <= 0, null, this);
    if (State.hp <= 0) {
      this.OnDie(MetaDamageMap.Source);
    }
  }
  GetState() {
    return {...this.#SelfState};
  }
}
class NPC extends Monster {
  constructor(name = "unnamed") {
    const __Default_Storage__ = {
      Relation: 0,
      StandByDialogs: [
        $$l.general_standby_dialog_1,
        $$l.general_standby_dialog_2,
        $$l.general_standby_dialog_3,
      ],
      Talk(Source, Self) {
        if (Self.Storage.Relation === 0) return false;
        return false;
      },
      Say(
        Source,
        Self,
        Dialog = "",
        Response = [],
        IsForcedResponse = true,
        CallBack = () => {
          return;
        },
        DoAfterChoice = () => {
          return;
        }
      ) {
        (async () => {
          TriggerEmptyEvent("event_talk_to", Source, Self);
          CallBack(Source, Self);
        })();
        return [
          Dialog,
          Response,
          IsForcedResponse,
          () => {
            DoAfterChoice();
            TriggerEmptyEvent("event_talked_to", Source, Self);
          },
        ];
      },
      At: GET("player_location"),
    };
    let __Default__ = [
      name,
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
      0,
      0,
      0,
      __Default_Storage__,
    ];
    if (__Game_NPC_Config__[name]) {
      __Default__ = __Game_NPC_Config__[name]["Init"];
    }
    for (const i in __Default_Storage__) {
      if (typeof __Default__[14][i] === "undefined") {
        __Default__[14][i] = __Default_Storage__[i];
      }
    }
    super(
      ...__Default__
    );
  }
}
