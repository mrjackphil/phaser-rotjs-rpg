import { Action, Updated } from "./types"

export default interface IEvent extends Updated {
  add: (a: Action) => number;
  getEvents: () => Action[];
}