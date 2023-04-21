<script setup lang="ts">
import { nextTick, ref, watch } from "vue"

const props = defineProps<{
	items: string[]
}>()

const emit = defineEmits<{
	(e: "update:items", items: string[]): void
}>()

const cells = ref(initList(props.items))
const newCellIdx = ref<number | null>(null)
const newCellValue = ref("")
const inputRef = ref<HTMLInputElement[]>()

function calculateIndex(idx: number) {
	return (idx + 1) * 100
}

function initList(list: string[]) {
	return list.map((v, idx) => ({
		value: v,
		id: calculateIndex(idx),
		new: false,
	}))
}

function addCell(index: number) {
	newCellIdx.value = index
	cells.value.splice(index, 0, {
		value: "",
		id: calculateIndex(index) - 1,
		new: true,
	})

	nextTick(() => {
		if (!inputRef.value) return
		const [input] = inputRef.value
		if (!input) return

		input.focus()
	})
}

function confirmAddCell() {
	if (newCellIdx.value == null) return
	cells.value.splice(newCellIdx.value, 1, {
		value: newCellValue.value,
		new: false,
		id: calculateIndex(newCellIdx.value),
	})
	newCellIdx.value = null
	newCellValue.value = ""
}

watch(
	() => props.items,
	(newValue) => (cells.value = initList(newValue))
)
</script>

<template>
	<div class="expandable-list">
		<template v-for="(item, index) in cells" :key="item.id">
			<button
				type="button"
				:disabled="newCellIdx !== null"
				class="add-cell"
				@click="addCell(index)"
			>
				+
			</button>
			<div class="list-cell" :class="{ new: item.new }">
				<template v-if="!item.new">{{ item.value }}</template>
				<template v-else>
					<input
						ref="inputRef"
						type="text"
						class="add-cell-input"
						v-model="newCellValue"
						@keyup.enter="confirmAddCell"
					/>
				</template>
			</div>
		</template>
		<button
			type="button"
			class="add-cell"
			:disabled="newCellIdx !== null"
			@click="addCell(cells.length - 1)"
		>
			+
		</button>
	</div>
</template>

<style scoped>
.expandable-list {
	display: flex;
	padding-block: 1rem;
	background-color: #333;
}

.expandable-list .list-cell,
.expandable-list .add-cell {
	display: flex;
	justify-content: center;
	align-items: center;
	aspect-ratio: 1/1;
	width: 4rem;
	border: 1px solid #ccc;
	border-radius: 1rem;
}

.expandable-list .add-cell {
	opacity: 0;
	width: 1rem;
	cursor: none;
	margin: 0;
	transition: width 200ms ease-in-out, margin 200ms ease-in-out,
		opacity 100ms ease-in-out;
}

.expandable-list .add-cell:hover {
	opacity: 1;
	width: 4rem;
	cursor: pointer;
	margin-inline: 1rem;
}

.expandable-list .add-cell:disabled {
	pointer-events: none;
}

.expandable-list .list-cell.new {
	border-style: dashed;
}

.add-cell-input {
	max-width: 100%;
	text-align: center;
	background-color: transparent;
	border: none;
	outline: none;
}
</style>
