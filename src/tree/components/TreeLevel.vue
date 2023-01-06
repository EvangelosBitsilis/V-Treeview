<template>
	<!-- <div class="bw-level"> -->
		
		<TreeItem v-for="(item, index) in data" :key="item.id"
			:parentId="parentId"
			:item="item"
			:index="index"
			:ancestors="ancestors">

			<template #before="props: {item: Item}">
				<slot name="before" :item="props.item"></slot>
			</template>

			<template #after="props: {item: Item}">
				<slot name="after" :item="props.item" ></slot>
			</template>

		</TreeItem>
		
	<!-- </div> -->
</template>

<script lang="ts">
export default {
	name: "TreeLevel"
}
</script>

<script setup lang="ts">
import type { Item } from "@/types/Types";
import TreeItem from "./TreeItem.vue";

defineProps({
	data: {
		type: Array<Item>,
		required: true
	},
	parentId: {
		type: [Number, String],
		required: true
	},
	ancestors: {
		type: Array<number|string>,
		required: true
	}
});
</script>

