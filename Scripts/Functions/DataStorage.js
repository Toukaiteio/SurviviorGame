const _Store = {};
const UsedKey = [];
function STORE(key, value) {
  _Store[key] = value;
  if (!UsedKey.includes(key)) UsedKey.push(key);
}
function GET(key) {
  return _Store[key] || null;
}
function MapDataInit() {
  return _Store["MapData"] || {};
}
