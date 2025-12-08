import json5 from "json5";
export default class JsonPlugin {
  name: string;
  constructor() {
    this.name = "Back24";
  }

  getName() {
    return json5.stringify({
      name: this.name,
    });
  }
}
