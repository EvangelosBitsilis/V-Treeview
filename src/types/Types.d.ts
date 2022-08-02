enum Position {
	Unknown = 0,
	Before = 1,
	Within = 2,
	After = 3
}

export type Config = {
	colors: {
		indicators: {
			text: string
			lines: string
			background: string,
		},
		ghost: {
			text: string
			background: string
		},
		notDraggable: {
			text: string
		}
	}
}

export type Intend = {
	item?: Item
	parentId?: number
	index?: number
	position: Position
};

export type Dragging = {
	item?: Item,
	element?: HTMLDivElement
	ghost?: HTMLDivElement
}

export type Item = {
	id: number,
	text: string,
	children: Array<Item>,
	state: {
		expanded: boolean,
		draggable: boolean,
		dropable: boolean
	}
}