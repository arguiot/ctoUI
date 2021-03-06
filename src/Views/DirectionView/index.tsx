import { Configuration } from "../../Configuration";
import { View } from "../View";
import { DirectionList } from "../../Direction/DirectionList";
import "./DirectionView.scss";

export class DirectionView extends View {
	element?: HTMLElement;
	value: void;
	direction: DirectionList;

	constructor(name: string, direction: DirectionList) {
		super(name);
		this.direction = direction;
	}

	render(parent: HTMLElement) {
		this.element = parent;

		return (
			<div className="row">
				<div id="direction">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="50"
						viewBox="0 0 50 50"
						fill="none"
					>
						<path d="M0 20H15V0H35V20H50L25 50" fill="black" />
					</svg>
				</div>
			</div>
		);
	}

	update(state: Configuration) {
		if (this.element) {
			(this.element.querySelector("#direction")! as any).style.transform =
				state.currentDirection == DirectionList.OutputToInput
					? "rotate(180deg)"
					: "unset";
		}
	}
}
