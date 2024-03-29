import {Action, GridVector} from "../types/types"
import IActionDistributor from "../types/IActionDistributor"
import IGameObjects from "../types/IGameObjects"

export enum ACTIONS {
    TEST,
    REMOVE_DOOR
}

type ActionParams<T> =
  T extends ACTIONS.TEST ? boolean
: T extends ACTIONS.REMOVE_DOOR ? { position: GridVector, objects: IGameObjects }
: {}

export default class ActionDistributor implements IActionDistributor {
    private actions: Action[] = [open_door, test_action]

    public getAction<T extends ACTIONS>(key: T, params?: ActionParams<T>) {
      const action = this.getByKey(key)
      return {...action, params }
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
    key: ACTIONS.REMOVE_DOOR,
    action: (params: ActionParams<ACTIONS.REMOVE_DOOR>) => {
        const { position, objects } = params
        const idToRemove = objects.getIDByPosition(position.value)

        objects.removeObject(idToRemove[0])
    },
}
