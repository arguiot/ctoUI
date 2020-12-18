import { DirectionList } from "./DirectionList";
import { DirectionView } from "../Views/DirectionView";

export const Direction = {
  InputToOutput: (name: string) => new DirectionView(name, DirectionList.InputToOutput),
  Both: (name: string) => new DirectionView(name, DirectionList.Both),
}