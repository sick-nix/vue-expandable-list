<script setup lang="ts">
import { nextTick, ref, watch } from "vue"

const props = defineProps<{
	items: string[]
}>()

const emit = defineEmits<{
	(e: "update:items", items: string[]): void
}>()

const cells = ref(props.items)
const newCellIdx = ref<number | null>(null)
const inputRef = ref<HTMLInputElement[]>()

function addCell(index: number) {
	newCellIdx.value = index

	nextTick(() => {
		if (!inputRef.value) return
		const [input] = inputRef.value
		if (!input) return

		input.focus()
	})
}

function confirmAddCell(value: string) {
	if (newCellIdx.value == null) return
	cells.value.splice(newCellIdx.value, 0, value)
	newCellIdx.value = null
}

function setCellValue(index: number, value: string) {
	cells.value.splice(index, 1, value)
}

watch(
	() => props.items,
	(newValue) => (cells.value = newValue)
)

watch(cells, (newValue) => emit("update:items", newValue), {
	deep: true,
})
</script>

<template>
	<div class="expandable-list">
		<template v-for="(item, index) in cells" :key="item">
			<button
				type="button"
				:disabled="newCellIdx !== null"
				class="add-cell"
				:class="{
					'no-transition': newCellIdx !== null,
				}"
				@click="addCell(index)"
			>
				+
			</button>
			<template v-if="newCellIdx !== null && index == newCellIdx">
				<div class="list-cell new">
					<input
						ref="inputRef"
						type="text"
						class="cell-input"
						@keyup.enter="(e) => confirmAddCell((e.target as HTMLInputElement).value)"
						@blur="(e) => confirmAddCell((e.target as HTMLInputElement).value)"
					/>
				</div>
			</template>
			<div class="list-cell">
				<input
					type="text"
					class="cell-input"
					:value="item"
					@blur="(e) => setCellValue(index, (e.target as HTMLInputElement).value)"
					@keyup.enter="(e) => setCellValue(index, (e.target as HTMLInputElement).value)"
				/>
			</div>
		</template>
		<button
			type="button"
			class="add-cell"
			:class="{
				'no-transition': newCellIdx !== null,
			}"
			:disabled="newCellIdx !== null"
			@click="addCell(cells.length)"
		>
			+
		</button>
		<template v-if="newCellIdx !== null && cells.length == newCellIdx">
			<div class="list-cell new">
				<input
					ref="inputRef"
					type="text"
					class="cell-input"
					@keyup.enter="(e) => confirmAddCell((e.target as HTMLInputElement).value)"
					@blur="(e) => confirmAddCell((e.target as HTMLInputElement).value)"
				/>
			</div>
		</template>
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
	padding: 0;
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
	margin-right: 1rem;
}

.cell-input {
	max-width: 100%;
	text-align: center;
	background-color: transparent;
	border: none;
	outline: none;
}

.expandable-list .add-cell.no-transition {
	transition: none;
}
</style>
