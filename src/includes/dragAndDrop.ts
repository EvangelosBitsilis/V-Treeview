import type { Config, Dragging, Intend, Item } from "@/types/Types";
import { reactive } from "vue";

export default function dragAndDrop(config: Config, emit: (name: "orderChanged", data: Array<Item>) => Array<Item>, data: Array<Item>) {

	const dragging: Dragging = reactive({
		item: undefined,
		element: undefined,
		ghost: undefined
	});
	
	const intend: Intend = reactive({
		parentId: undefined,
		index: undefined,
		position: 0
	});
	
	function dragStart (event: DragEvent, element: HTMLDivElement | null, item: Item) {

		if (element != null) {
			
			dragging.element = element;
	
			dragging.ghost = document.createElement("DIV") as HTMLDivElement;
			dragging.ghost.classList.add("bw-ghost");
			dragging.ghost.style.color = config.colors.ghost.text;
			dragging.ghost.style.backgroundColor = config.colors.ghost.background;
			dragging.ghost.textContent = item.text;
	
			dragging.item = item;
	
			document.body.appendChild(dragging.ghost);
	
			if (event.dataTransfer != null) {
				
				event.dataTransfer.effectAllowed = "all";
		
				if ( dragging.ghost !== undefined ) {
		
					event.dataTransfer.setDragImage(dragging.ghost, -20, -8);
				}
			}
		}
	}

	function dragOver (event: DragEvent, item: Item, infoBox: HTMLDivElement, index: number, ancestors: Array<number|string>, parentId: number|string|undefined) {
		
		if (
			(dragging.item !== undefined && ancestors.includes(dragging.item.id)) ||
			dragging.item?.id === undefined || 
			item.id === dragging.item.id ) {

			intend.parentId = undefined,
			intend.index = undefined;
			intend.item = undefined;
			intend.position = 0;
		}
		else {

			const rect = infoBox.getBoundingClientRect();
			const positionY = event.clientY - rect.top;
			const quarter = rect.height / 4;
			const thirds = quarter * 3;
			const half = quarter * 2;
	
			intend.item = item;
			intend.index = index;
			intend.parentId = parentId;
	
			if ( (item.children.length !== 0 && positionY <= half ) || positionY <= quarter ) {
	
				intend.position = 1;
			}
			else if (positionY <= thirds && item.children.length === 0) {
	
				if ( ! item.state.droppable && event.dataTransfer !== null) {
	
					event.dataTransfer.dropEffect = "none";
					
					intend.parentId = undefined,
					intend.index = undefined;
					intend.item = undefined;
					intend.position = 0;
				}
	
				intend.position = 2;
			}
			else {
	
				intend.position = 3;
			}
		}

	}

	function dragEnd (index: number, parentId: number) {	

		let treeChanged = false;

		if (intend.index !== undefined && intend.position !== 0 && (parentId !== intend.parentId || index !== intend.index) && intend.parentId !== undefined) {
			
			const oldParent = findParent(data, parentId);
			const item = oldParent.splice(index, 1)[0];
			const newParent = findParent(data, intend.parentId);
	
			if ( intend.position === 2 ) {
				
				if (parentId === intend.parentId && index < intend.index) {
					intend.index--;
				}
				
				newParent[intend.index].children.push(item);
				treeChanged = true;
			}
			else if ( intend.position === 3 ) {
	
				if (parentId !== intend.parentId || (parentId === intend.parentId && intend.index < index)) {
					intend.index++;
				}
	
				newParent.splice(intend.index, 0, item);
				treeChanged = true;
			}
			else if ( intend.position === 1 ) {
				
				if (parentId === intend.parentId && intend.index > index) {
					intend.index--;
				}
	
				newParent.splice(intend.index, 0, item);
				treeChanged = true;
			}
		}

		if (dragging.ghost !== undefined) {
			
			document.body.removeChild(dragging.ghost);
			dragging.ghost = undefined;
		}

		intend.item = undefined;
		intend.parentId = undefined;
		intend.index = undefined;
		intend.position = 0;
		dragging.element = undefined;

		if ( treeChanged ) {
			emit("orderChanged", data);
		}
	}
	
	function findParent(items: Array<Item>, id: number|string): Array<Item> {
	
		if (id === 0) {
			
			return data
		}
	
		let needle: Array<Item> = [];
	
		for (let i = 0; i < items.length; i++) {
			
			if ( items[i].id == id) {
				return items[i].children;
			}
	
			needle = findParent(items[i].children, id);
	
			if ( needle.length !== 0) {
				
				return needle;
			}
		}
	
		return needle;
	}

	return {
		dragging,
		intend,
		dragStart,
		dragOver,
		dragEnd
	}
}
