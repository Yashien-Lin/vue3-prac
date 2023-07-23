<template>
  <div class="card-header" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    <h3 class="p-3">進階搜尋</h3>
  </div>
  <div class="collapse" id="collapseExample">
    <div class="card card-body">
      <slot></slot>
      <div class="py-4 d-flex justify-content-center">
        <button class="btn btn-outline-primary mx-2" @click="reset()">清除搜尋</button>
        <button class="btn btn-primary mx-2" @click="addFunc">搜尋</button>
      </div>
    </div>
  </div>

</template>

<script setup>
// component、plugin、第三方套件
import { onMounted, onUnmounted, ref } from "vue";

// props & emit
const props = defineProps({
  search: Object
})

// 自定義變數
const count = ref(0);
const isDisabled = ref(false);

// methods
let times = 0;
const addFunc = () => {
  count.value +=1;
  times +=1;
  if (times >=5) {
    console.log('times:', times);
    isDisabled.value = true
  }
}

const reset = () => {
  console.log('search:', search);
}

const getData = () => {}

// 生命週期(按執行順序)
onMounted(()=> {
  getData();
})

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