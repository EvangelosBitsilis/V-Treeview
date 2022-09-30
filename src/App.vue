<template>

<div class="main-cnt">
	<div class="cols">
		<Tree :config="config"
			:data="data"
			@orderChanged="orderChangedTest">
			
			<!-- <template #before="data">
				<div style="margin-right: 20px; display: flex; justify-content: end;">
					before {{ data.item.id }}
				</div>
			</template> -->
			
			<template #after="data: any">
				<div style="display: flex; justify-content: end;">
					<div style="margin-right: 40px">
						<input :id="data.item.slug" type="checkbox"
							v-model="data.item.state.draggable">
						<label style="margin-left: 10px;" :for="data.item.slug">Draggable</label>
					</div>
					<div>
						<input :id="data.item.slug" type="checkbox"
							v-model="data.item.state.droppable">
						<label style="margin-left: 10px;" :for="data.item.slug">
							Droppable
						</label>
					</div>
				</div>
			</template>

		</Tree>
	</div>
	<div class="cols">
		<pre>{{ data }}</pre>
	</div>
</div>

</template>

<script setup lang="ts">
import Tree from './tree/Tree.vue';
import testData from "./assets/testing.json";
import type { Item } from './types/Types';
import { reactive, ref, type Ref } from 'vue';

const config: any = reactive({
	colors: {
		// indicators: {
		// 	text: "Green",
		// 	lines: "Yellow",
		// 	background: "Coral"
		// },
		// ghost: {
		// 	text: "Yellow",
		// 	background: "Green"
		// },
		// notDraggable: {
		// 	text: "Yellow"
		// }
	}
});

const data: Ref<Array<Item>> = ref(testData);

function orderChangedTest(newData: Array<Item>) {

	data.value = newData;
}

function testt(id: number) {

	console.log(id);
	
}

</script>

<style>

html {
	background-color: black;
	color: white;
	/* font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; */
}

.main-cnt {
	display: flex;
	/* margin: 0 -2rem; */
}

.primary-col {
	width: 20%;
}

.secondary-col {
	width: 80%;
}

.cols {
	width: 50%;
	padding: 2rem;
	/* padding: 0 2rem; */
	border: 2px solid 
}

</style>
