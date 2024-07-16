import { ListAction } from "./action"
import { ListActions } from "./actions"
import { CustomListItem } from "./item"
import { ListRoot } from "./root"

const List = {
    Root: ListRoot,
    Item: CustomListItem,
    Actions: ListActions,
    Action: ListAction
}

export default List