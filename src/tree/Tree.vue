<template>

	<div class="bw-tree">
		<TreeLevel
			:data="props.data"
			:ancestors="[0]"
			:parentId="0">

			<template #before="props: {item: Item}">
				<slot name="before" :item="props.item"></slot>
			</template>

			<template #after="props: {item: Item}">
				<slot name="after" :item="props.item"></slot>
			</template>

		</TreeLevel>
	</div>

</template>

<script lang="ts">
export default {
	name: "Tree"
}
</script>

<script setup lang="ts">
import { onMounted, provide, reactive, type PropType } from "vue";
import TreeLevel from "./components/TreeLevel.vue";
import type { Config, Item } from "@/types/Types";
import dragAndDrop from "../includes/dragAndDrop";

const props = defineProps({
	config: {
		type: Object as PropType<Config>
	},
	data: {
		type: Array<Item>,
		required: true
	}
});

const emit = defineEmits<{(e: "orderChanged", data: Array<Item>): Array<Item>, (e: "treeMounted"): void}>();

const normalizedConfig: Config = reactive({
	colors: {
		// indicators: props.config?.colors?.indicators ?? "RoyalBlue",
		indicators: {
			text: props.config?.colors?.indicators?.text ?? "White",
			lines: props.config?.colors?.indicators?.lines ?? "RoyalBlue",
			background: props.config?.colors?.indicators?.background ?? "RoyalBlue",
		},
		ghost: {
			text: props.config?.colors?.ghost?.text ?? "White",
			background: props.config?.colors?.ghost?.background ?? "RoyalBlue"
		},
		notDraggable: {
			text: props.config?.colors?.notDraggable?.text ?? "Red"
		}
	}
});

onMounted(() => {
	emit("treeMounted");
});

const { dragStart, dragOver, dragEnd, intend, dragging } = dragAndDrop(normalizedConfig, emit, props.data);

provide("listeners", {dragStart, dragOver, dragEnd});
provide("intend", intend);
provide("dragging", dragging);
provide("config", normalizedConfig);

</script>

<style src="../assets/base.css"></style>