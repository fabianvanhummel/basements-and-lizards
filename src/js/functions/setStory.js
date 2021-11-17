// Uit te breiden met dat de ID van de button bepaalt welke story je uiteindelijk selecteert. Die logica blijven jullie me nog even verschuldigd tot we meerdere passende stories hebben

export function setStoryFromJson(button_id) {
  if (button_id === 'introduction') {
    const jsonData = require('../../json/maze.json');
    return jsonData
  }
}