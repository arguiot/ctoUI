import { View } from "../View";
import { nanoid } from "nanoid";
import { LocalesHelper } from "../../Locales/Locales";

export class Textfield extends View {
	element?: HTMLInputElement;
	uniq?: string;
	render() {
		this.uniq = nanoid();

		const t = LocalesHelper.getTranslations()

		return (
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text">{ t(this.name) }</span>
				</div>
				<input
					className="form-control"
					id={this.uniq}
                    ref={ el => { this.element = el! }}
                    onChange={() => this.requestUpdate()}
				/>
			</div>
		);
	}

	get value() {
		return this.element?.value
	}
	set value(val: any) {
		if (this.element) {
			this.element.value = val;
		}
	}
}
