<script setup lang="ts">
import { ref } from "vue"
import ExpandableList from "./components/ExpandableList.vue"
const list = ref<string[]>(["a", "b", "c"])
</script>

<template>
	<ExpandableList v-model:items="list" />
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
