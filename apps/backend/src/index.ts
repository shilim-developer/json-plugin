import json5 from "json5";
export default class JsonPlugin {
  #system;
  name: string;
  constructor(system) {
    this.#system = system;
    this.name = "Back24";
    system.hello().then((r) => {
      console.log(r);
    });
  }

  getName() {
    return json5.stringify({
      name: this.name,
    });
  }
}
