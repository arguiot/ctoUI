import {
	Configuration
} from "../Configuration";
import {
	Placement,
	PlacementType
} from "./Placement";
import { Notification, NotificationCenter } from "@arguiot/broadcast.js";

/**
 * View protocol.
 *
 * A View is object that translates into an HTML element, and manages its lifecycle.
 */
export interface ViewType {
	placement: PlacementType;
	render(): JSX.Element;
	update(element: HTMLElement, state: Configuration): void;
	value: any;
}

export abstract class View implements ViewType {
	/**
	 * Where to display the view
	 */
	placement: PlacementType;
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
	constructor() {
		this.placement = Placement.Option();
	}
	/**
	 * Method that will be called once, to create the HTML for the component
	 */
	abstract render(): JSX.Element
	/**
	 * Method that will be called when another component requires to be updated.
	 * 
	 * It must be very lightweight as it might be called often.
	 * @param element The parent element where the component is.
	 * @param state The configuration object, that acts as a state
	 */
	abstract update(element: HTMLElement, state: Configuration): void
	/**
	 * Getter that must return the internal state of the component.
	 * 
	 * In the case of a text input for example, `value` should return the `string` written inside the text field.
	 */
	abstract get value(): any
	/**
	 * Setter that should update the internal of the component.
	 * 
	 * In the case of a text input for example, `value` should set the `string` written inside the text field.
	 */
	abstract set value(newValue: any)
	/**
	 * When your view changes, ask for an update, this will update all other views impacted.
	 */
	requestUpdate() {
		const request = new Notification("requestRender")
		NotificationCenter.default.post(request)
	}
}

/**
 * Renders JSX without React
 * @param element Any JSX element
 * @param container The HTML element you want to render your component in
 */
export function render(element: JSX.Element, container: HTMLElement) {
	const dom = container.ownerDocument.createElement(element.type);
	const isProperty = (key: any) => key !== "children";
	Object.keys(element.props)
		.filter(isProperty)
		.forEach(name => {
			dom[name] = element.props[name];
		});

	if (Array.isArray(element.props.children)) {
		element.props.children.forEach((child: JSX.Element) => render(child, dom));
	} else if (typeof element.props.children == "string") {
		(dom as HTMLElement).innerHTML = element.props.children;
	}
	container.appendChild(dom);
}