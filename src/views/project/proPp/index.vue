<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="ppId">
            <el-input v-model="form.ppId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="createBy">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="createTime">
            <el-input v-model="form.createTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="updateBy">
            <el-input v-model="form.updateBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="updateTime">
            <el-input v-model="form.updateTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="qaPlan">
            <el-input v-model="form.qaPlan" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="confManagePlan">
            <el-input v-model="form.confManagePlan" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="defProcess">
            <el-input v-model="form.defProcess" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="estimate">
            <el-input v-model="form.estimate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="launchMaterials">
            <el-input v-model="form.launchMaterials" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="manManagePlan">
            <el-input v-model="form.manManagePlan" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="measureData">
            <el-input v-model="form.measureData" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="peerJudgeConfirm">
            <el-input v-model="form.peerJudgeConfirm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="peerJudgeFeedback">
            <el-input v-model="form.peerJudgeFeedback" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="peerJudgeFlawCollect">
            <el-input v-model="form.peerJudgeFlawCollect" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="peerJudgeSummary">
            <el-input v-model="form.peerJudgeSummary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="plan">
            <el-input v-model="form.plan" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="rfc">
            <el-input v-model="form.rfc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="riskChance">
            <el-input v-model="form.riskChance" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="summary">
            <el-input v-model="form.summary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="wbs">
            <el-input v-model="form.wbs" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="ppId" label="ppId" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="qaPlan" label="qaPlan" />
        <el-table-column prop="confManagePlan" label="confManagePlan" />
        <el-table-column prop="defProcess" label="defProcess" />
        <el-table-column prop="estimate" label="estimate" />
        <el-table-column prop="launchMaterials" label="launchMaterials" />
        <el-table-column prop="manManagePlan" label="manManagePlan" />
        <el-table-column prop="measureData" label="measureData" />
        <el-table-column prop="peerJudgeConfirm" label="peerJudgeConfirm" />
        <el-table-column prop="peerJudgeFeedback" label="peerJudgeFeedback" />
        <el-table-column prop="peerJudgeFlawCollect" label="peerJudgeFlawCollect" />
        <el-table-column prop="peerJudgeSummary" label="peerJudgeSummary" />
        <el-table-column prop="plan" label="plan" />
        <el-table-column prop="rfc" label="rfc" />
        <el-table-column prop="riskChance" label="riskChance" />
        <el-table-column prop="summary" label="summary" />
        <el-table-column prop="wbs" label="wbs" />
        <el-table-column v-if="checkPer(['admin','proPp:edit','proPp:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudProPp from '@/api/project/proPp'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { ppId: null, createBy: null, createTime: null, updateBy: null, updateTime: null, qaPlan: null, confManagePlan: null, defProcess: null, estimate: null, launchMaterials: null, manManagePlan: null, measureData: null, peerJudgeConfirm: null, peerJudgeFeedback: null, peerJudgeFlawCollect: null, peerJudgeSummary: null, plan: null, rfc: null, riskChance: null, summary: null, wbs: null }
export default {
  name: 'ProPp',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '项目策划', url: 'api/proPp', idField: 'ppId', sort: 'ppId,desc', crudMethod: { ...crudProPp }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proPp:add'],
        edit: ['admin', 'proPp:edit'],
        del: ['admin', 'proPp:del']
      },
      rules: {
      }    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
