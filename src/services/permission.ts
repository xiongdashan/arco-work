/* eslint-disable prettier/prettier */
import tools from "@/utils/tools"
import { App } from "vue"

export function enable(permission: string): boolean {
    const storePermissions = tools.getAuthor()
    if (!storePermissions) {
        return false
    }
    return storePermissions.includes(permission)
}




function install(app: App) {
    app.directive("enable", (el, binding) => {
            if (!enable(binding.value)) {
                el.parentNode.removeChild(el)
            }
        })
}

export default { install }