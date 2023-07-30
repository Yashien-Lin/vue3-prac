<template>
  <div class="container p-4">
    <h3 class="mb-4">試卷管理</h3>
    <SearchBar 
      v-model:search="search" 
      @getTableData="getData"
    >
      <div class="row gy-3">
        <div class="col-12 col-md-6 col-lg-4">
          <label class="mb-2">名稱</label>
          <input type="text" class="form-control" placeholder="請輸入試卷名稱" v-model="search.name">
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <label class="mb-2">試卷類別</label>
          <select class="form-select" v-model="search.test_category_id">
            <option value="" selected disabled>請選擇試卷類別</option>
            <option v-for="(item, index) in ddl.testTypeList" :key="index" :value="item.id">
              {{ item.text }}
            </option>
          </select> 
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <label class="mb-2">出題方式</label>
          <select class="form-select" v-model="search.is_auto">
            <option value="" selected disabled>請選擇出題方式</option>
            <option value="1">自動</option>
            <option value="2">手動</option>
          </select> 
        </div>
      </div>
      search: {{ search }}
    </SearchBar>
    <!-- <button class="btn btn-primary" @click="reset">reset</button> -->
    <button class="btn btn-outline-primary" @click="changeName">changeName</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'

//const labelList = ref([ '名稱', '試卷類別','出題方式' ])
const ddl = ref({
  testTypeList: [ 
    { id: 1, text: '學理' }, 
    { id: 2, text: '操作' }, 
    { id: 3, text: '銷售' },
  ]
})
const search = ref({
  name: '',
  test_category_id: '',
  is_auto: ''
})

const getData = () => {
  const config = {
    method: 'POST',
    url: `/api/v1/test/data-table`,
    data: {
      search: search.value,
    }
  };
  console.log('config:', config);
  // submit api
}

const changeName = () => {
  search.value.is_auto.text = '改值'
  console.log('search:', search);
}

</script>

<style lang="scss" scoped>

</style>
