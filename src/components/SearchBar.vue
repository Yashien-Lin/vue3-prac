<template>
  <div class="card-header" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    <h3 class="p-3">進階搜尋</h3>
  </div>
  <div class="collapse" id="collapseExample">
    <div class="card card-body">
      <slot></slot>
      <div class="py-4 d-flex justify-content-center">
        <button class="btn btn-outline-primary mx-2" @click="reset">清除搜尋</button>
        <button class="btn btn-primary mx-2" @click="getTableData">搜尋</button>
      </div>
    </div>
  </div>

</template>

<script setup>
// component、plugin、第三方套件
// import { onMounted } from "vue";

// props & emit
const props = defineProps({
  search: Object,
})
const emit = defineEmits(['update:search', 'getTableData']) // 若emit直接寫在template，就不用先定義

// 自定義變數
const copySearch = JSON.parse(JSON.stringify(props.search))


// methods
const reset = () => {
  emit('update:search', JSON.parse(JSON.stringify(copySearch)))
}
const getTableData = () => {
  emit('getTableData')
}

// 生命週期(按執行順序)

</script>

<style lang="scss" scoped>
.card-header {
  background-color: #D6C3A7;
  border-radius: 5px 5px 0px 0px; 
  h3 {
    margin-bottom: 0;
  }
}

</style>