/* eslint-env browser */

export default class HEmbed extends HTMLAnchorElement {
	attachedCallback() {
		this.transclude();
	}

	detachedCallback() {
		let wrapper = this.wrapper;
		if(wrapper) {
			wrapper.parentNode.removeChild(wrapper);
			delete this.wrapper;
		}
	}

	transclude(html) {
		if(!this.href) {
			return;
		}

		this.retrieve().
			then(html => {
				this.generateWrapper();
				this.wrapper.innerHTML = sanitize(html);
			}).
			catch(err => {
				console.error(err); // eslint-disable-line no-console
			});
	}

	retrieve() {
		let cors = this.getAttribute("cors") === "true";
		let credentials = cors ? "include" : "same-origin";
		return fetch(this.href, { credentials }).
			then(res => {
				let status = res.status;
				if(status < 200 || status > 299) { // XXX: bad heuristic?
					throw new Error("failed to retrieve transclusion resource");
				}
				// TODO: check MIME type?
				return res.text(); // TODO: discard script tags
			});
	}

	generateWrapper() {
		if(this.wrapper) {
			return;
		}

		let tag = this.getAttribute("container") || "div";
		let wrapper = this.wrapper = document.createElement(tag);
		wrapper.className = "h-embed";

		this.style.display = "none";

		// insert as sibling
		this.parentNode.insertBefore(wrapper, this.nextSibling);
	}
}

function sanitize(html) {
	let doc = document.implementation.createHTMLDocument();
	doc.documentElement.innerHTML = html;

	// strip scripts -- XXX: unnecessary, as `innerHTML` does not execute scripts!?
	let scripts = doc.querySelectorAll("script");
	[].forEach.call(scripts, node => node.parentNode.removeChild(node));

	// TODO: also strip `onload` and similar attributes?

	return doc.body.innerHTML;
}
