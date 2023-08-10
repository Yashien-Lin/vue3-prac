<template>
  <div class="container p-4">
    <h3 class="mb-4">試卷管理</h3>
    <SearchBar 
      v-model:search="search" 
      @get-data="getTableData"
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
    <BaseTable :pages="pagination" :get-data="getTableData">
      <template v-slot:table-header>
        <tr>
					<th>編號</th>
					<th>試卷名稱</th>
					<th>試卷類別</th>
					<th>出題方式</th>
					<th>開卷期間</th>
					<th>試卷狀態</th>
					<th>限時</th>
					<th>操作</th>
				</tr>
      </template>
      <template v-slot:table-body>
				<tr v-for="(item, index) in tableData" :key="item.id">
					<!-- <td>{{ $refs.datatable.getRowIndex(index) }}</td> -->
          <td>{{ index + 1  }}</td>
					<td class="test-name text-wrap">
						<span class="text-left d-inline-block mx-auto">{{ item.name }}</span>
					</td>
					<td>{{ item.category }}</td>
					<td>{{ item.is_auto }}</td>
					<td>{{ item.start_date }} - {{ item.end_date }}</td>
					<td>
						<div class="form-check form-switch">
							<input class="form-check-input flex-shrink-0" type="checkbox" v-model="item.status" @focus="savePrevValue(item.id, item.status)"
								@change="checkChangeStatus(item.id)" :disabled="item.status === false">
						</div>
					</td>
					<td>{{ item.limited_time }}</td>
					<td>
						<div class="d-flex justify-content-center">
							<BaseTableBtn :btn-name="'編輯'" :icon-name="'edit'" class="mr-2" @click="editTest(item.id)" :disabled="!item.is_editable_test"></BaseTableBtn>
							<BaseTableBtn :btn-name="'預覽'" :icon-name="'review'" class="mx-2" @click="previewTest(item.id, item.name)"></BaseTableBtn>
							<BaseTableBtn :btn-name="'複製'" :icon-name="'copy'" class="ml-2" @click="copyTest(item.id)"></BaseTableBtn>
						</div>
					</td>
				</tr>
			</template>
    </BaseTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import BaseTable from '../components/BaseTable.vue'
import BaseTableBtn from '../components/BaseTableBtn.vue'

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
const pagination = ref({ 
  count: 10, 
  current_page: 1,
  end: 10,
  length: 10,
  start: 1,
  total: 50,
  total_pages: 100
})
const tableData = [
  {
    "id": 171,
    "category": "機車駕照筆試",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:10:00",
    "name": "測試週期試卷(每半年1~31)-0804",
    "status": true,
    "is_editable_test": true,
    "is_editable_status": true
  },
  {
    "id": 170,
    "category": "機車駕照筆試",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:10:00",
    "name": "測試週期試卷(每半年)-0804",
    "status": true,
    "is_editable_test": false,
    "is_editable_status": true
  },
  {
    "id": 169,
    "category": "機車駕照筆試",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:10:00",
    "name": "測試週期試卷(每月15~31)-0804",
    "status": true,
    "is_editable_test": true,
    "is_editable_status": true
  },
  {
    "id": 168,
    "category": "機車駕照筆試",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:10:00",
    "name": "測試週期試卷(每月1~15)-0804",
    "status": true,
    "is_editable_test": false,
    "is_editable_status": true
  },
  {
    "id": 167,
    "category": "機車駕照筆試",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:10:00",
    "name": "測試週期試卷0804",
    "status": true,
    "is_editable_test": false,
    "is_editable_status": true
  },
  {
    "id": 166,
    "category": "機車駕照筆試",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:10:00",
    "name": "測試週期試卷0804",
    "status": true,
    "is_editable_test": false,
    "is_editable_status": true
  },
  {
    "id": 165,
    "category": "特殊考試",
    "start_date": "2023/07/13",
    "end_date": "2023/07/13",
    "is_auto": "自動",
    "limited_time": "00:03:00",
    "name": "培訓驗收測試",
    "status": true,
    "is_editable_test": false,
    "is_editable_status": true
  },
  {
    "id": 164,
    "category": "特殊考試",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:30:00",
    "name": "例行考試230711",
    "status": true,
    "is_editable_test": false,
    "is_editable_status": true
  },
  {
    "id": 163,
    "category": "操作",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:15:00",
    "name": "考試230711",
    "status": true,
    "is_editable_test": false,
    "is_editable_status": true
  },
  {
    "id": 162,
    "category": "機車駕照筆試",
    "start_date": "",
    "end_date": "",
    "is_auto": "自動",
    "limited_time": "00:20:00",
    "name": "考試230710",
    "status": true,
    "is_editable_test": false,
    "is_editable_status": true
  }
]

const getTableData = (currentPage=1, length=10) => {
  const config = {
    method: 'POST',
    url: `/api/v1/test/data-table`,
    data: {
      search: search.value,
      page: currentPage,
      length: length
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
