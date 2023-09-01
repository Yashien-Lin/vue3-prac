<template>
	<div class="alert-modal modal fade" id="alert_change_status_modal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title">注意</h2>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<img src="~@/assets/img/close.svg" alt="delete">
					</button>
				</div>
				<div class="modal-body text-center p-4">
					<p v-if="!isEditableStatus">考生進行考試中，不得關閉試卷。</p>
					<p v-else>
						您將關閉{{editStatus.name}}<br>
						考生將無法進行測驗，
						<span class="text-danger">關閉後不得再開啟</span><br>
						並結算已考試卷的成績
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-primary" data-dismiss="modal">取消</button>
					<button v-if="isEditableStatus" type="button" class="btn btn-secondary" @click="changeStatus()">確認</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Alert',
	props: {
		editStatus: {
			type: Object,
			required: true
		},
		isEditableStatus: {
			type: Boolean,
		}
	},
	data() {
		return {
			update: false
		};
	},
	mounted() {
		// $('#alert_change_status_modal').on('hide.bs.modal', () => { // 關閉視窗前，觸發的事件
		// 	if (!this.update) {
		// 		// this.$emit('close-modal');
		// 	}
		// });
	},
	methods: {
		changeStatus() { // 確認更新狀態
			this.update = true;
			// this.$emit('change-status');
			// $('#alert_change_status_modal').modal('hide');
			this.update = false;
		}
	}
};
</script>
