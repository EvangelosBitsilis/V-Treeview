<template>

	<div class="bw-item"
		ref="element"
		:class="[{'bw-dragging': isDragging}]">

		<div class="bw-info" :draggable="item.state.draggable"
			ref="infoBox"
			:style="[hoveringIndicators]"
			@dragenter.prevent
			@dragstart.stop="dragStart($event, element, item)"
			@dragover.prevent.stop="dragOver($event, item, infoBox, index, ancestors, parentId)"
			@dragend.stop="dragEnd(index, parentId)">

			<div>

				<button v-if="item.children.length > 0" class="bw-arrow-btn"
					:class="{ expanded: item.state.expanded }"
					@click="toggleExpandedState">
					<svg class="bw-arrow" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12l-18 12v-24z"/></svg>
				</button>

				<div>
					<slot name="before" :item="item"></slot>
				</div>

				<p :style="[isDraggable]">{{ item.text }}</p>

			</div>

			<div>
				<slot name="after" :item="item"></slot>
			</div>

		</div>
		
		<div class="bw-level" :class="{ expanded: item.state.expanded }"
			:style="{ overflow: item.state.expanded ? '' : 'hidden' }">
			<TreeLevel
				:data="item.children"
				:parentId="item.id"
				:ancestors="[...ancestors, item.id]">

				<template #before="props: {item: Item}">
					<slot name="before" :item="props.item"></slot>
				</template>

				<template #after="props: {item: Item}">
					<slot name="after" :item="props.item"></slot>
				</template>

			</TreeLevel>
		</div>
		
	</div>
</template>

<script lang="ts">
export default {
	name: "TreeItem"
}
</script>

<script setup lang="ts">
import TreeLevel from "./TreeLevel.vue";
import { computed, inject, ref, type PropType} from "vue";
import type { Config, Dragging, Intend, Item } from "../../types/Types";
import type Listeners from "@/types/Listeners";

const props = defineProps({
	ancestors: {
		type: Array<number>,
		required: true
	},
	parentId: {
		type: Number,
		required: false
	},
	item: {
		type: Object as PropType<Item>,
		required: true
	},
	index: {
		type: Number,
		required: true
	}
});

const element = ref(null);
const infoBox = ref(null);

const config = inject <Config> ("config") !;
const { dragStart, dragOver, dragEnd } = inject <Listeners> ("listeners")!;
const intend = inject <Intend> ("intend") !;
const dragging = inject <Dragging> ("dragging");

const isDragging = computed(() => {
	return dragging?.element === element.value;
})

const isDraggable = computed(() => {
	if ( ! props.item.state.draggable) {
		return {
			color: config.colors.notDraggable.text
		}
	}
	return {};
})

const hoveringIndicators = computed (() => {
	
	if (intend?.item?.id === props.item.id && intend.position === 1) {
		return {
			borderTopColor: config.colors.indicators.lines
		}
	}
	else if (intend?.item?.id === props.item.id && intend.position === 2) {
		return {
			color: config.colors.indicators.text,
			backgroundColor: config.colors.indicators.background
		}
	}
	else if (intend?.item?.id === props.item.id && intend.position === 3) {
		return {
			borderBottomColor: config.colors.indicators.lines
		}
	}

	return {};
})

function toggleExpandedState() {
	props.item.state.expanded = !props.item.state.expanded;
}
</script>

