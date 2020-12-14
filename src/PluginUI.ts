import {
	Configuration,
	ConfigurationInitiator
} from "./Configuration";
import {
	Algorithm
} from "./Algorithm";
import {
	render, ViewType,
} from "./Views/View";
import { NotificationCenter } from "@arguiot/broadcast.js";

/**
 * Creates and manages the plugin lifecycle
 */

export class PluginUI {
	/**
	 * Configuration for the plugin. The configuration defines the views and he layout of the plugin.
	 */
	configuration: Configuration;
	/**
	 * The cipher algorithm object
	 */
	algorithm: Algorithm;
	/**
	 * Where the plugin will be rendered
	 */
	parent: HTMLElement;

	/**
	 * Initiate the plugin
	 * @param config Configuration for the plugin. The configuration defines the views and he layout of the plugin.
	 */
	constructor(
		algorithm: new(bindings: Configuration) => Algorithm,
		config: ConfigurationInitiator
	) {
		this.configuration = this.configure(config);
		this.algorithm = new algorithm(this.configuration);
		this.parent = config.parent;
		this.containers = []

		NotificationCenter.default.addObserver("requestRender", this.dispatchUpdate.bind(this))
	}

	configure(config: ConfigurationInitiator) {
		return {
			input: new config.input(),
			output: new config.output(),
			direction: config.direction,
			options: Object.fromEntries(
				Object.entries(config.options).map(entry => {
					const view = new entry[1]();
					return [entry[0], view];
				})
			),
		};
	}

	containers: Array<HTMLElement>

	render(windowObject: any) {
		const views = [
			["input", this.configuration.input],
			["output", this.configuration.output],
			...Object.entries(this.configuration.options)
		]
		views.forEach(view => {
			let doc: Document;
			if (__DEV__ && typeof window != "undefined") {
				doc = windowObject.document;
			} else {
				doc = window.document;
			}
			const container = doc.createElement("div");
			container.className = (view[0] as string)
			this.parent.appendChild(container);

			const element = (view[1] as ViewType).render();
			render(element, container);

			this.containers.push(container)
		});
	}


	dispatchUpdate() {
		const views = [
			this.configuration.input,
			this.configuration.output,
			...Object.values(this.configuration.options)
		]

		views.forEach((view, index) => {
			view.update(this.containers[index], this.configuration)
		})
	}
}