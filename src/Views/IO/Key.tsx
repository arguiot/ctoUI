import { View } from "../View";
import { LocalesHelper } from "../../Locales/Locales";
import { Configuration } from "../../Configuration";

export class Key extends View {
	element?: HTMLInputElement;
    max = 52

	render() {
		const t = LocalesHelper.getTranslations()

		return (
			<div id="keyBox" className="form-inline col-lg-3 col-md-4 col-sm-5 col-6">
                <span className="mr-2">{ t("key") }</span>
                <button className="btn btn-success " id="minus" onClick={() => {
                    const val = this.value - 1
                    this.value = String(val < 0 ? 0 : val)

                    this.requestUpdate()
                }}>-</button>
                <input id="key" className="text-center form-control" value="1" maxLength={2} type="text" size={2} 
                ref={ el => { this.element = el! }}
                onChange={() => this.requestUpdate()}/>
                <button className="btn btn-success" id="plus" onClick={() => {
                    const val = this.value + 1
                    this.value = String(val % this.max)

                    this.requestUpdate()
                }}>+</button>
            </div>
		);
	}

    update(state: Configuration) {
        const v = (state as any)?.["options"]?.value?.["alphabet"]?.value
        const alphabet: string = typeof v != "string" ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" : v
        this.max = alphabet.length
        if (this.max > this.value) {
            this.value = String(this.value % this.max)
        }
    }

	get value() {
		return parseInt(this.element?.value ?? "0")
	}
	set value(val: any) {
		if (this.element) {
			this.element.value = val;
		}
	}
}
