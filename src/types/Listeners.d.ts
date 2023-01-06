import { Item } from "./Types";
type Listeners = {
	dragStart: (event: DragEvent, element: HTMLDivElement | null, item: Item) => void,
	// dragEnter: Function,
	dragOver: (event: DragEvent, item: Item, infoBox: HTMLDivElement | null, index: number, ancestors: Array<number | string>, parentId: number|string|undefined) => void,
	// dragLeave: Function,
	dragEnd: (index: number, parentId: number|string|undefined) => void
}

export default Listeners;