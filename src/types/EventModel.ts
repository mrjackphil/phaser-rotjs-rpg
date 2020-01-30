import { Action, Updated } from "./types"

export default interface EventModel extends Updated {
  add: (a: Action) => number;
  getEvents: () => Action[];
}