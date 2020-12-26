import { DirectionList } from "./Direction/DirectionList";
import { ViewType } from "./Views/View";

/**
 * Configuation interface for the algorithm
 */
export interface Configuration {
	[key: string]: ViewType | DirectionList | undefined;
	currentDirection?: DirectionList;
}

/**
 * Configuation interface for the PluginUI class
 */
export interface ConfigurationInitiator {
	[key: string]:
		| (new (name: string) => ViewType)
		| ((name: string) => ViewType)
		| HTMLElement;
	parent: HTMLElement;
}
