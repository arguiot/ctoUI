import { Configuration, ConfigurationInitiator } from "./Configuration";
import { Algorithm } from "./Algorithm";
import { render, ViewType } from "./Views/View";
import { NotificationCenter } from "@arguiot/broadcast.js";
import { DirectionList } from "./Direction/DirectionList";
import { Locales, LocalesHelper, LocalesHelperInterface } from "./Locales/Locales";

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

	bindings(target: Configuration): any {
		const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T => k in obj;

		const handler = {
			get: (target: any, key: string): any | undefined => {
				if (!hasKey(target, key)) { return undefined }
				const t = target[key] as any
				const newTarget = t.value
				if (typeof newTarget == "undefined") { 
					if (typeof t == "object") {
						return new Proxy(t, handler)
					}
					return t 
				}
				if (typeof newTarget != "object") { return newTarget }
				const p = new Proxy(newTarget, handler)
				return p
			},
			set: (target: any, key: string, value: any) => {
				if (!hasKey(target, key)) {
					target[key] = value
					return true
				}
				const t = target[key] as any
				if (hasKey(t, "value")) {
					target[key].value = value
					return true
				}
				target[key] = value
				return true
			}
		}

		const p = new Proxy(target, handler)
		return p
	}

	/**
	 * Initiate the plugin
	 * @param config Configuration for the plugin. The configuration defines the views and he layout of the plugin.
	 */
	constructor(
		algorithm: new (bindings: Configuration) => Algorithm,
		config: ConfigurationInitiator
	) {
		this.configuration = this.configure(config);
		this.algorithm = new algorithm(this.bindings(this.configuration));
		this.parent = config.parent;
		this.direction = DirectionList.InputToOutput;

		NotificationCenter.default.addObserver(
			"requestRender",
			this.dispatchUpdate.bind(this)
		);
	}

	configure(config: ConfigurationInitiator) {
		return Object.fromEntries(
			Object.entries(config)
				.filter((entry) => entry[0] != "parent")
				.map((entry) => {
					const func = entry[1] as new (name: string) => ViewType;
					const view = new func(entry[0]);
					return [entry[0], view];
				})
		);
	}

	/**
	 * Render the interface. Call this only once.
	 * @param windowObject The global window object.
	 */
	render(windowObject: any) {
		this.parent.innerHTML = ""; // Make sure the container is empty

		const views = Object.entries(this.configuration).filter(
			(entry) => entry[0] != "currentDirection"
		);

		views.forEach((view) => {
			let doc: Document;
			if (__DEV__ && typeof window != "undefined") {
				doc = windowObject.document;
			} else {
				doc = window.document;
			}
			const container = doc.createElement("div");
			container.className = view[0] as string;
			this.parent.appendChild(container);

			const element = (view[1] as ViewType).render(
				container,
				windowObject
			);
			render({ element, container, binder: view[1] as ViewType });
		});

		this.dispatchUpdate(); // Hydration
	}

	direction: DirectionList;

	dispatchUpdate(from?: DirectionList) {
		// console.log("[CTO UI] Dispatch Update")
		if (typeof from != "undefined" && from != null) {
			this.direction = from;
		}
		if (this.direction == null) {
			this.direction = DirectionList.InputToOutput // Default option
		}
		
		switch (this.direction) {
			case DirectionList.InputToOutput:
				this.algorithm.encode();
				break;
			case DirectionList.OutputToInput:
				if (this.algorithm.decode) {
					this.algorithm.decode();
				}
				break;
		}

		const filter = (
			obj: object,
			predicate: (array: Array<any>) => Boolean
		) => Object.fromEntries(Object.entries(obj).filter(predicate));

		const views = Object.values(
			filter(
				this.configuration,
				(entry) => entry[0] != "currentDirection"
			)
		) as Array<ViewType>;

		views.forEach((view) => {
			if (view.update) {
				view.update({
					currentDirection: this.direction,
					...this.configuration,
				});
			}
		});
	}

	/**
	 * Loads the translation into the system. Make sure to call this function before calling "render"
	 * @param dictionary Your translations, either in a dictionary form or a LocaleHelper object
	 */
	loadTranslations(dictionary: Locales | LocalesHelperInterface, windowObject: any = globalThis) {
		if (dictionary instanceof LocalesHelper) {
			windowObject.ctoUI_Locales = dictionary.dictionary
		} else {
			windowObject.ctoUI_Locales = dictionary
		}
	}
}
