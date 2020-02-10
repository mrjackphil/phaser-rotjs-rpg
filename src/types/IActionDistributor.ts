import {Action, ActionParams} from "./types"
import {ACTIONS} from "../entities/ActionDistributor"

export default interface IActionDistributor {
    getAction: (key: ACTIONS, params: ActionParams) => Action
}