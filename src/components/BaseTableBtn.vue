<template>
	<!-- 按鈕 -->
	<button type="button" class="base-table-btn btn flex-shrink-0 d-flex align-items-center px-sm-3" :class="[ btnColor, className ]"
		@click="clickEvent" v-if="tag === 'btn'">
		<img :src="getIcon" :alt="iconName" class="mr-sm-2 d-sm-inline-block">
		<span  class="d-none d-sm-inline-block">{{ btnName }}</span>
	</button>
	<!-- 連結 -->
	<a :href="linkUrl" class="base-table-btn btn flex-shrink-0 d-flex align-items-center px-sm-3"
		:class="[ btnColor, className ]" v-else>
		<img :src="getIcon" :alt="iconName" class="mr-sm-2 d-sm-inline-block">
		<span class="d-none d-sm-inline-block">{{ btnName }}</span>
	</a>
</template>

<script setup>
import {  computed } from 'vue'

const props = defineProps({
	tag: { // 'link' or 'btn'
		type: String,
		default: 'btn'
	},
	btnName: { // 按鈕名稱
		type: String,
		required: true
	},
	iconName: { // icon名稱
		type: String,
		required: true
	},
	btnColor: { // 按鈕色彩
		type: String,
		default: 'btn-outline-primary'
	},
	linkUrl: { // 連結
		type: String,
		default: ''
	},
	className: {
		type: String,
		default: ''
	}
})
const emit = defineEmits(['click'])

const getIcon = computed(() => {
	return new URL(`../assets/img/btn-icon/${props.iconName}.svg`, import.meta.url).href; // 載入圖片方式 (這裡不認得"@")
	// return import(`@/assets/img/btn-icon/${props.iconName}.svg`);
})

// const getIcon = async() => {
// 	const aa = await import(`@/assets/img/btn-icon/${props.iconName}.svg`);
// 	return aa;
// }

const clickEvent = () => {
	emit('click');
}

</script>
