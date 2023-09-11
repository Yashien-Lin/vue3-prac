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
    <AlertChangeStatusModal :editStatus="editStatus" ref="modal"></AlertChangeStatusModal>
    
    <!-- Vimeo -->
		<div style="padding:56.25% 0 0 0;position:relative;">
			<iframe src="https://player.vimeo.com/video/854693954?#t=7&badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
				frameborder="0" allow="autoplay; fullscreen; picture-in-picture"
				style="position:absolute;top:0;left:0;width:100%;height:100%;"
				title="Summer Collection Launch">
			</iframe>
		</div>
    現在秒數: {{ currentSecond }}
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import SearchBar from '../components/SearchBar.vue'
import BaseTable from '../components/BaseTable.vue'
import BaseTableBtn from '../components/BaseTableBtn.vue'
import AlertChangeStatusModal from './components/AlertChangeStatusModal.vue'
import axios from 'axios'

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
    "start_date": "2023/08/10",
    "end_date": "2023/08/18",
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
    "start_date": "2023/08/10",
    "end_date": "2023/08/31",
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
const modal = ref([])
const editStatus = {
  id: '',
  status: '',
  name: ''
}
const currentSecond = ref()

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

// const moodal = (el) => {
//   console.log(el);
// }

const checkChangeStatus = () => {
  // $('#alert_change_status_modal').modal('show')
  document.addEventListener('hidden.bs.modal', () => {
    console.log(123)
  })
}

const savePrevValue = () => {
  console.log('savePrevValue');
}

const getVimeoVideo = () => {
  const video_id = 854693954;
  const access_token = `375d32295adbf43761e849df00ae25a1`;
  const apiUrl = `https://api.vimeo.com/videos/${video_id}/pictures`;
  // const apiUrl = `https://api.vimeo.com/users/${video_id}/appearances`; 
  // const apiUrl = `https://api.vimeo.com/users/${205832667}/appearances`; 
  // const apiUrl = `https://api.vimeo.com/videos/${video_id}?fields=metadata.connections.pictures.uri`;

  axios.get( apiUrl, {
    Accept: 
      "application/vnd.vimeo.*+json;version=3.4",
      "Content-Type": "application/json",
    headers: { 
      Authorization: `Bearer ${access_token}`
    }
  }).then((res) => {
    console.log('res:', res);
  })
}

onMounted(() => {
  var iframe = document.querySelector('iframe');
  // var player = new Vimeo.Player(iframe);

  var player = new Player(iframe);
  
  // 監聽播放
  player.on('play', function() {
    console.log('Played the video');
  });
  // 監聽暫停
  player.on('pause', function(pause) {
    console.log('pause:', pause.seconds);
  });
  // 暫停事件
  player.getPaused().then(function(paused) {
    console.log('getPaused()', paused);
  });

  // const endPlay = () => {
  //   console.log('end video');
  // }

  // player.on('ended', endPlay);

  // player.off('ended', endPlay); 

  
  player.getVideoTitle().then(function(title) {
    console.log('title:', title);
  });

  player.on('timeupdate', function(time){
    currentSecond.value = time.seconds
    console.log('second:', time.seconds);
  });

  getVimeoVideo();

})


</script>

<style lang="scss" scoped>

</style>
