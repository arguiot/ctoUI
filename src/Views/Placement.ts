enum PlacementList {
  Input,
  Output,
  Direction,
}

export const Placement = {
  Input: PlacementList.Input,
  Output: PlacementList.Output,
  Direction: PlacementList.Direction,
  Option: function(tab: String = "options") {
    return tab.toLowerCase();
  },
};

export type PlacementType = PlacementList | string;
