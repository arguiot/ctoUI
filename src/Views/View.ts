import {
	Configuration
} from "../Configuration";
import {
	Notification,
	NotificationCenter
} from "@arguiot/broadcast.js";
import {
	DirectionList
} from "../Direction/DirectionList";

/**
 * View protocol.
 *
 * A View is object that translates into an HTML element, and manages its lifecycle.
 */
export interface ViewType {
	render(element: HTMLElement, windowObject?: any): JSX.Element;
	update?(state: Configuration) : void;
	value: any;
}

export abstract class View implements ViewType {
	/**
	 * The name associated with the view.
	 */
	name: string;
	/**
	 * Creates a new view.
	 *
	 * When extending a View, make sure to call `super`:
	 * ```js
	 * class MyView extends View {
	 *	placement: PlacementType;
	 *
	 *	constructor() {
	 *		super();
	 *		this.placement = Placement.Input;
	 *	}
	 * ```
	 *
	 * This way, you can specify a custom placement
	 */
	constructor(name: string) {
		this.name = name;
	}
	/**
	 * Method that will be called once, to create the HTML for the component
	 */
	abstract render(element: HTMLElement, windowObject?: any): JSX.Element;
	/**
	 * Method that will be called when another component requires to be updated.
	 *
	 * It must be very lightweight as it might be called often.
	 * @param element The parent element where the component is.
	 * @param state The configuration object, that acts as a state
	 */
	update(_state: Configuration) {} // Optional
	/**
	 * Getter that must return the internal state of the component.
	 *
	 * In the case of a text input for example, `value` should return the `string` written inside the text field.
	 */
	abstract get value(): any;
	/**
	 * Setter that should update the internal of the component.
	 *
	 * In the case of a text input for example, `value` should set the `string` written inside the text field.
	 */
	abstract set value(newValue: any);
	/**
	 * When your view changes, ask for an update, this will update all other views impacted.
	 */
	requestUpdate(direction ? : DirectionList) {
		const request = new Notification("requestRender", direction);
		NotificationCenter.default.post(request);
	}
}

interface RenderArguments {
	element: JSX.Element;
	container: HTMLElement;
	binder: ViewType;
	useNS?: string;
}

/**
 * Renders JSX without React
 * @param element Any JSX element
 * @param container The HTML element you want to render your component in
 */
export function render({ element, container, binder, useNS }: RenderArguments) {
	const isNS = typeof element.props != "undefined" ? useNS || element.props["xmlns"] : useNS
	const dom = isNS ? container.ownerDocument.createElementNS(isNS, element.type) : container.ownerDocument.createElement(element.type);

	if ((element as any)["ref"] != null) {
		(element as any).ref.bind(binder)(dom)
	}
	const isProperty = (key: any) => (key !== "children" && key !== "xmlns");
	if (typeof element.props != "undefined") {
		Object.keys(element.props)
			.filter(isProperty)
			.forEach(name => {
				if (
					typeof element.props[name] == "function" &&
					name.substring(0, 2) == "on"
				) {
					dom.addEventListener(
						name.substring(2).toLowerCase(),
						element.props[name].bind(binder)
					);
				} else {
					if (isNS) {
						dom.setAttributeNS(null, name, element.props[name])
					} else if (typeof dom[name] != "undefined") {
						try {
							dom[name] = element.props[name];
						} catch {
							dom.setAttribute(name, element.props[name])
						}
					} else {
						dom.setAttribute(name, element.props[name])
					}
				}
			});
		if (Array.isArray(element.props.children)) {
			element.props.children.forEach((child: JSX.Element | string) => {
				if (typeof child == "string") {
					(dom as HTMLElement).innerHTML += child;
				} else {
					render({ element: child, container: dom, binder, useNS: isNS })
				}
			});
		} else if (typeof element.props.children == "object") {
			render({ element: (element.props.children as JSX.Element), container: dom, binder, useNS: isNS })
		} else if (typeof element.props.children == "string") {
			(dom as HTMLElement).innerHTML = element.props.children;
		}
	}
	container.appendChild(dom);
}