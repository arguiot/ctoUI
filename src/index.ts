export { PluginUI } from "./PluginUI";
export * from "./Views/View";
export { Algorithm } from "./Algorithm";
export { Configuration } from "./Configuration";
export { Direction } from "./Direction/Directions";
export { Options } from "./Views/Options";
export { Boolean } from "./Views/Options/Boolean"
export { Textfield } from "./Views/Options/Textfield"
export { Alphabet } from "./Views/Options/Alphabet"
import { Text } from "./Views/IO/Text";
import { Key } from "./Views/IO/Key";
export const IO = {
	Text,
	Key
};
export { LocalesHelper } from "./Locales/Locales";