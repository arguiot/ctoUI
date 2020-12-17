import { Configuration } from "../../Configuration";
import { Placement, PlacementType } from "../Placement";
import { View } from "../View";
import { Direction } from "../../Directions";
import "./DirectionView.scss";

export class DirectionView extends View {
	placement: PlacementType;
	element?: HTMLElement;
	value: void;

	constructor(name: string) {
		super(name);
		this.placement = Placement.Direction;
	}

	render(parent: HTMLElement) {
		this.element = parent;

		return (<div className="row">
			<div id="direction">
				<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
					<path d="M0 20H15V0H35V20H50L25 50" fill="black" />
				</svg>
			</div>
		</div>);
	}

	update(state: Configuration) {
		if (this.element) {
			(this.element.querySelector("#direction")! as any)
				.style.transform = state.currentDirection == Direction.OutputToInput ? "rotate(180deg)" : "unset";
		}
	}
}
