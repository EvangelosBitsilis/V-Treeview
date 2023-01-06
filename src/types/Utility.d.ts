import { Item } from "./Types";
type Listeners = {
	toggleExpandedState: (item: Item) => void,
}

export default Listeners;