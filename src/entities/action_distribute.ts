import {Action} from "../types/types"
import IActionDistributor from "../types/IActionDistributor"

export default class ActionDistributor implements IActionDistributor {
    private actions: Action[] = [open_door, test_action]

    public getAction(key: string, params?: any) {
        const action = this.getByKey(key)

        ActionDistributor.paramValidation(action, params)

        return action
    }

    private getByKey(key: string) {
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
        params?: any
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
    key: 'test_with_parameter',
    action: () => null,
    condition: (params) => typeof params === "boolean"
}

const open_door = {
    key: "open_door",
    action: () => null,
}
