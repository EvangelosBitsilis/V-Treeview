import type { Item } from "@/types/Types";

export default function utility() {

	function toggleExpandedState(item: Item) {

		item.state.expanded = !item.state.expanded;
	}

	return {
		toggleExpandedState
	}
}