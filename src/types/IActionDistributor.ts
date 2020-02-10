import {Action} from "./types"
import {ACTIONS} from "../entities/ActionDistributor"

export default interface IActionDistributor {
    getAction: (key: ACTIONS, params: unknown) => Action
}