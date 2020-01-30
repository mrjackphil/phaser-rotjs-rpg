import {Action, ActionParams} from "./types"

export default interface ActionDistributorModel {
    getAction: (key: string, params: ActionParams) => Action
}