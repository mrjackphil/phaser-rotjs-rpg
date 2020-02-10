import {Action} from "../types/types"
import IActionDistributor from "../types/IActionDistributor"

export enum ACTIONS {
    TEST,
    OPEN_DOOR
}

export default class ActionDistributor implements IActionDistributor {
    private actions: Action[] = [open_door, test_action]

    public getAction(key: ACTIONS, params?: unknown) {
        const action = this.getByKey(key)

        ActionDistributor.paramValidation(action, params)

        return action
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

    private static paramValidation(
        action: Action,
        params?: unknown
    ) {

        if (!action.condition) { return true }

        const isValid = action.condition(params)
        if (!isValid) {
            throw Error("Parameter is not valid")
        }

        return true
    }
}

const test_action = {
    key: ACTIONS.TEST,
    action: () => null,
    condition: (params) => typeof params === "boolean"
}

const open_door: Action<{ param: string }> = {
    key: ACTIONS.OPEN_DOOR,
    action: () => null,
}
