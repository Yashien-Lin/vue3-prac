<template>
	<div class="datatable table-responsive mt-4">
		<!-- 表格: slot 插入 table-header / table-body / card -->
		<div class="main-table">
			<!-- 電腦版 -->
			<table class="table table-hover mb-0">
				<thead>
					<!-- v-slot: thead 內容 -->
					<slot name="table-header"></slot>
				</thead>
				<tbody>
					<!-- v-slot: tbody 內容 -->
					<slot name="table-body"></slot>
					<!-- <tr v-else>
						<td class="table-empty" :colspan="getHeaderLength()">沒有符合的結果</td>
					</tr> -->
				</tbody>
			</table>
		</div>
		<div class="bottom d-flex flex-column flex-lg-row align-items-center mt-2" v-if="!isHideBottom">
			<div class="d-flex flex-column flex-md-row align-items-center mt-3 mt-lg-0">
				<div class="table-length d-flex align-items-center text-nowrap mb-2 mb-md-0 mr-md-4">
					顯示
					<select class="length-select form-control form-control-sm mx-2" v-model="pages.length"
						@change="changeLength(pages.length)">
						<option v-for="item in lengthSelection" :key="`length_${item}`" :value="item">{{ item }}</option>
					</select>
					項結果
				</div>
				<div class="table-information">{{ getInfo }}</div>
			</div>
			<!-- <BasePagination :pages="pages" @change-page="changePage" class="ml-lg-auto"></BasePagination> -->
		</div>
	</div>
</template>

<script setup>
// import * as config from '@/store/config';
import { ref, computed } from 'vue'

const props = defineProps({
  pages: {
    type: Object
  },
  getData: { // 取得表格資料方法 (params: currentPage, length)
    type: Function,
    required: true
  },
  isHideBottom: { // 是否隱藏bottom資訊
    type: Boolean,
    default: false
  },
  hasCard: { // 手持裝置是否改為卡片(RWD)
    type: Boolean,
    default: true
  }
})

const lengthSelection = ref(10)

const getInfo = computed({
  get: () => {
    return `顯示第 ${props.pages.start || 0} 至 ${props.pages.end || 0} 項結果，共 ${props.pages.total || 0} 項`;
  },
  set: () => {

  }
})

	
const getRowIndex = (index) => { // 取得編號
  return (props.pages.current_page - 1) * props.pages.length + index + 1;
}

const changePage = (currentPage) => { // 改變分頁
  props.getData(currentPage, props.pages.length);
}

const changeLength = (length) => { // 改變每頁顯示筆數
  props.getData(1, length);
}

const hasContent = (name) => { // 確認有無內容(若無 -> !!undefined = false)
  // return !!this.$slots[name];
}

const getHeaderLength = () => { // table header 欄位數
  // if (this.$slots['table-header']) {
  //   return this.$slots['table-header'].reduce((acc, obj) => {
  //     const length = obj.children ? obj.children.length : 0;
  //     return acc + length;
  //   }, 0);
  // } else {
  //   return 0;
  // }
}


</script>
