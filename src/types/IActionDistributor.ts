import {Action, ActionParams} from "./types"

export default interface IActionDistributor {
    getAction: (key: string, params: ActionParams) => Action
}