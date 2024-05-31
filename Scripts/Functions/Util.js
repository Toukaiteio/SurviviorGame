function SwitchSelecting(To, Key) {
  if (TGET("now_selecting")) {
    TGET("now_selecting").classList.remove("selecting");
  }
  TSTORE("now_selecting", To);
  TGET("now_selecting").classList.add("selecting");
  TSTORE("now_selecting_action", Key);
}
function GenerateKey(totalLength) {
  const parentChars =
    "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const result = [];
  for (let i = 0; i < totalLength; i++)
    result.push(
      parentChars[Math.round((Math.random() * 500) % parentChars.length)]
    );
  return "_" + result.join("");
}
function $f(OriString) {
  const _tobeReplaced = [...arguments];
  for (const i in _tobeReplaced.shift()) {
    OriString = OriString.replace(`<_Insert_${i}_>`, _tobeReplaced[i]);
  }
  return OriString;
}
