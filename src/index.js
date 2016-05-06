/* eslint-env browser */

import HEmbed from "./element";

export default HEmbed;

document.registerElement("h-embed", {
	prototype: HEmbed.prototype,
	extends: "a"
});
