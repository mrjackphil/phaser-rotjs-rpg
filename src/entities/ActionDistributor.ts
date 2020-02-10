import {Action, Vector} from "../types/types"
import IActionDistributor from "../types/IActionDistributor"

export enum ACTIONS {
    TEST,
    OPEN_DOOR
}

type ActionParams<T> =
  T extends ACTIONS.TEST ? boolean
: T extends ACTIONS.OPEN_DOOR ? { position: Vector }
: {}

export default class ActionDistributor implements IActionDistributor {
    private actions: Action[] = [open_door, test_action]

    public getAction<T extends ACTIONS>(key: T, params?: ActionParams<T>) {
        return this.getByKey(key)
    }

    private getByKey(key: ACTIONS) {
        const found = this.actions.filter(a => a.key === key)

        if (found.length > 1) {
            throw Error('Found too many actions')
        }
        if (found.length === 0) {
            throw Error('Action not found')
        }

        return found[0]
    }
}


const test_action = {
    key: ACTIONS.TEST,
    action: (params: ActionParams<ACTIONS.TEST>) => params,
}

const open_door = {
    key: ACTIONS.OPEN_DOOR,
    action: (params: ActionParams<ACTIONS.OPEN_DOOR>) => params,
}
