import { DirectionList } from "../../../Direction/DirectionList";
import { View } from "../../View";
import { Configuration } from "../../../Configuration";
import { LocalesHelper } from "../../../Locales/Locales";

export class Text extends View {
	element?: HTMLElement;

	constructor(name: string) {
		super(name);
	}

	render(parent: HTMLElement) {
		this.element = parent;

		const t = LocalesHelper.getTranslations()

		const element = (
			<div className="form-group mt-3">
				<label>{ t(this.name) }</label>
				<textarea
					spellCheck="false"
					rows={4}
					className="form-control"
					onInput={() => {
						this.requestUpdate(
							this.name == "input"
								? DirectionList.InputToOutput
								: DirectionList.OutputToInput
						);
					}}
				>
					{ t(this.name + "Content") }
				</textarea>
				<span id="field-len" className="float-right length-label">{ t("length") }: <span className="length-n"></span></span>
			</div>
		);

		return element;
	}

	update(_state: Configuration) {
		if (this.element) {
			this.element.querySelector(
				"#field-len > .length-n"
			)!.innerHTML = `${this.value.length}`;
		}
	}

	get value() {
		return this.element?.querySelector("textarea")!.value;
	}
	set value(val: any) {
		if (this.element) {
			this.element.querySelector("textarea")!.value = val;
		}
	}
}
