import { View } from "../View";
import { LocalesHelper } from "../../Locales/Locales";
import { Configuration } from "../../Configuration";
import { ViewType } from "../../Views/View"

export class Alphabet extends View {
    private upperAlphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private lowerAlphabet: string = "abcdefghijklmnopqrstuvwxyz";
    private blank: string = " ";
    private digits: string = "0123456789";
    private punctuationMarks: string = ".,:;!?()";
    private umlautsUpper: string = "ÄÖÜ";
    private umlautsLower: string = "äöüß";

    private alphabetEl?: HTMLTextAreaElement;
    private computedEl?: HTMLTextAreaElement;

    private upperCasedBox?: HTMLInputElement;
    private blanksBox?: HTMLInputElement;
    private digitsBox?: HTMLInputElement;
    private punctuationBox?: HTMLInputElement;
    private lowerCasedBox?: HTMLInputElement;
    private umlautBox?: HTMLInputElement;

    private custom?: HTMLInputElement;
    // private normal?: HTMLInputElement;

    private alphabetTemplate?: HTMLDivElement;

	render() {

		const t = LocalesHelper.getTranslations()

		return (
			<div className="card-text">
                    <label className="mb-0">{ t("plainTextAlphabet") }</label>
                    <textarea rows={1} wrap="soft" className="mt-1 form-control" ref={el => { this.alphabetEl = el! }} onInput={() => this.requestUpdate()} spellCheck={ false } disabled>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</textarea>
                    <label className="mb-0 mt-2">{ t("cipherTextAlphabet") }</label>
                    <textarea rows={1} wrap="soft" className="mt-1 form-control mb-2" ref={el => { this.computedEl = el! }} onInput={() => this.requestUpdate()} spellCheck={ false } disabled>BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzA</textarea>

                    <div ref={el => { this.alphabetTemplate = el! }} className="form-check form-check-inline">

                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" id="uppercaseAlphabet" className="custom-control-input" ref={el => { this.upperCasedBox = el! }} onChange={() => this.requestUpdate()} checked />
                            <label className="custom-control-label" htmlFor="uppercaseAlphabet">{ t("upperCase") }</label>
                        </div>

                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" id="lowercaseAlphabet" className="custom-control-input" ref={el => { this.lowerCasedBox = el! }} onChange={() => this.requestUpdate()} checked />
                            <label className="custom-control-label" htmlFor="lowercaseAlphabet">{ t("lowerCase") }</label>
                        </div>

                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" id="digitsAlphabet" className="custom-control-input" ref={el => { this.digitsBox = el! }} onChange={() => this.requestUpdate()}/>
                            <label className="custom-control-label" htmlFor="digitsAlphabet">{ t("digits") }</label>
                        </div>

                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" id="punctuationAlphabet" className="custom-control-input" ref={el => { this.punctuationBox = el! }} onChange={() => this.requestUpdate()}/>
                            <label className="custom-control-label" htmlFor="punctuationAlphabet">{ t("punctuation") }</label>
                        </div>

                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" id="umlautsAlphabet" className="custom-control-input" ref={el => { this.umlautBox = el! }} onChange={() => this.requestUpdate()}/>
                            <label className="custom-control-label" htmlFor="umlautsAlphabet">{ t("umlauts") }</label>
                        </div>

                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" id="blanksAlphabet" className="custom-control-input" ref={el => { this.blanksBox = el! }} onChange={() => this.requestUpdate()}/>
                            <label className="custom-control-label" htmlFor="blanksAlphabet">{ t("blanks") }</label>
                        </div>

                    </div>
                    <hr />
                    <div className="form-check form-check-inline">

                        <div className="custom-control custom-radio mr-3">
                            <input type="radio" name="customRadio" id="putTogetherAlphabet" className="custom-control-input" onChange={() => this.requestUpdate()} checked />
                            <label className="custom-control-label ml-1" htmlFor="putTogetherAlphabet">{ t("createAlphabet") }</label>
                        </div>

                        <div className="custom-control custom-radio mr-3">
                            <input type="radio" ref={el => { this.custom = el! }}  id="defineOwnAlphabet" name="customRadio" className="custom-control-input" onInput={() => this.requestUpdate()}/>
                            <label className="custom-control-label ml-1" htmlFor="defineOwnAlphabet">{ t("defineAlphabet") }</label>
                        </div>
                    </div>
                </div>
		);
	}

    rotateAlphabet(key: number, alphabetArray: string[]) {
		for (let i = 0; i < key; i++) {
			let temp = alphabetArray.shift();
            if (typeof temp != "undefined") {
                alphabetArray.push(temp);
            }
		}
		return alphabetArray.join("");
	}

    update(state: Configuration) {
        const alphabet = this.value
        if (this.alphabetEl && this.custom) {
            this.alphabetEl.disabled = !this.custom.checked
        }
		
		if (this.custom && this.custom.checked && this.alphabetTemplate) {
			this.alphabetTemplate.style.display = "none"
		} else if (this.alphabetTemplate && this.alphabetEl) {
			this.alphabetTemplate.style.display = ""
			this.alphabetEl.value = alphabet
		}

        const key = typeof state["key"] == "undefined" ? 1 : (state["key"] as ViewType).value
        if (this.computedEl) {
            this.computedEl.value = this.rotateAlphabet(key, alphabet.split(""))
        }
    }

	get value() {
		if (this.custom?.checked) {
			return this.alphabetEl?.value ?? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
		}
		let alphabet = ""
		if (this.upperCasedBox?.checked) {
			alphabet += this.upperAlphabet
		}
		if (this.lowerCasedBox?.checked) {
			alphabet += this.lowerAlphabet
		}
		if (this.blanksBox?.checked) {
			alphabet += this.blank
		}
		if (this.digitsBox?.checked) {
			alphabet += this.digits
		}
		if (this.punctuationBox?.checked) {
			alphabet += this.punctuationMarks
		}
		if (this.umlautBox?.checked) {
			alphabet += this.umlautsUpper + this.umlautsLower
		}

        return alphabet
	}
	set value(_val: string) {
		return // Can't update value
	}
}
