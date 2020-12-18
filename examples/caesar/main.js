import {
    Direction,
    PluginUI, IO,
} from "../../dist/index";
import "../../dist/ctoui.cjs.development.css";

class Algo {
    constructor(bindings) {
        this.bindings = bindings;
    }

    algorithm(text, key, b_encrypt, b_block_of_five, alphabet, b_keep_chars) {
        // change lowercase chars to uppercase
        let ciphertext = ""
        // iterate through text
        for (let old_character of text) {
            let new_character = ""
            // if character is in alphabet append to ciphertext
            if (alphabet.includes(old_character)) {
                const index = alphabet.indexOf(old_character)
                // if text get encrypted
                if (b_encrypt) {
                    const new_index = (index + key) % alphabet.length
                    new_character = alphabet[new_index]
                } else {
                    const new_index = (index - key) % alphabet.length
                    new_character = alphabet[new_index]
                }
            }
            // if the symbol is not in alphabet then look if block_of_five is true, if yes then skip spaces,
            // if block_of_five is false take all symbols
            else if (!b_keep_chars) {
                continue
            } else {
                if (b_block_of_five && b_encrypt) {
                    if (old_character != " ") {
                        new_character = old_character
                    } else {
                        continue
                    }
                } else {
                    new_character = old_character
                }
            }
            if (typeof new_character != "undefined") {
                ciphertext = ciphertext + new_character
            } else {
                ciphertext = ciphertext + old_character
            }
            // if blocks_of_five is true then after 5 characters append a space
            if (b_block_of_five && b_encrypt) {
                if (ciphertext.split(" ").join("").length % 5 == 0) {
                    ciphertext = ciphertext + " "
                }
            }
        }
        return ciphertext
    }

    encode() {
        this.bindings.output.value = this.algorithm(
            this.bindings.input.value,
            2,
            true,
            false,
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            true
        )
    }

    decode() {
        this.bindings.input.value = this.algorithm(
            this.bindings.output.value,
            2,
            false,
            false,
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            true
        )
    }
}

const plugin = new PluginUI(Algo, {
    input: IO.Text,
    direction: Direction.Both,
    output: IO.Text,
    parent: window.document.querySelector(".plugin"),
})

plugin.render(window)