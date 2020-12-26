import { View } from "../View";
import { nanoid } from "nanoid";

export class Boolean extends View {
	element?: HTMLInputElement;
	uniq?: string;
	render() {
		this.uniq = nanoid();

		return (
			<div className="custom-control custom-checkbox mr-3 d-inline-block">
				<input
					type="checkbox"
					className="custom-control-input"
					id={this.uniq}
                    ref={ el => { this.element = el! }}
                    onChange={() => this.requestUpdate()}
				/>
				<label className="custom-control-label" htmlFor={this.uniq}>
					Label
				</label>
			</div>
		);
	}

	get value() {
		return this.element?.checked
	}
	set value(val: any) {
		if (this.element) {
			this.element.checked = val;
		}
	}
}
