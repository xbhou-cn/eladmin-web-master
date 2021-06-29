<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="rdmId">
            <el-input v-model="form.rdmId" style="width: 370px;" />
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
          <el-form-item label="buisPeerJudgeConfirm">
            <el-input v-model="form.buisPeerJudgeConfirm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="buisPeerJudgeFeedback">
            <el-input v-model="form.buisPeerJudgeFeedback" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="buisPeerJudgeFlawCollect">
            <el-input v-model="form.buisPeerJudgeFlawCollect" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="buisPeerJudgeSummary">
            <el-input v-model="form.buisPeerJudgeSummary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="businessDemandApply">
            <el-input v-model="form.businessDemandApply" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="businessDemandDeclare">
            <el-input v-model="form.businessDemandDeclare" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="correlationSystem">
            <el-input v-model="form.correlationSystem" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="demandSurveyIssue">
            <el-input v-model="form.demandSurveyIssue" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="demandSurveyPlan">
            <el-input v-model="form.demandSurveyPlan" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="demandSurveyRecord">
            <el-input v-model="form.demandSurveyRecord" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="demandTrackMatrix">
            <el-input v-model="form.demandTrackMatrix" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="rfc">
            <el-input v-model="form.rfc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="softPeerJudgeConfirm">
            <el-input v-model="form.softPeerJudgeConfirm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="softPeerJudgeFeedback">
            <el-input v-model="form.softPeerJudgeFeedback" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="softPeerJudgeFlawCollect">
            <el-input v-model="form.softPeerJudgeFlawCollect" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="softPeerJudgeSummary">
            <el-input v-model="form.softPeerJudgeSummary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="softwareRequirements">
            <el-input v-model="form.softwareRequirements" style="width: 370px;" />
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
        <el-table-column prop="rdmId" label="rdmId" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="buisPeerJudgeConfirm" label="buisPeerJudgeConfirm" />
        <el-table-column prop="buisPeerJudgeFeedback" label="buisPeerJudgeFeedback" />
        <el-table-column prop="buisPeerJudgeFlawCollect" label="buisPeerJudgeFlawCollect" />
        <el-table-column prop="buisPeerJudgeSummary" label="buisPeerJudgeSummary" />
        <el-table-column prop="businessDemandApply" label="businessDemandApply" />
        <el-table-column prop="businessDemandDeclare" label="businessDemandDeclare" />
        <el-table-column prop="correlationSystem" label="correlationSystem" />
        <el-table-column prop="demandSurveyIssue" label="demandSurveyIssue" />
        <el-table-column prop="demandSurveyPlan" label="demandSurveyPlan" />
        <el-table-column prop="demandSurveyRecord" label="demandSurveyRecord" />
        <el-table-column prop="demandTrackMatrix" label="demandTrackMatrix" />
        <el-table-column prop="rfc" label="rfc" />
        <el-table-column prop="softPeerJudgeConfirm" label="softPeerJudgeConfirm" />
        <el-table-column prop="softPeerJudgeFeedback" label="softPeerJudgeFeedback" />
        <el-table-column prop="softPeerJudgeFlawCollect" label="softPeerJudgeFlawCollect" />
        <el-table-column prop="softPeerJudgeSummary" label="softPeerJudgeSummary" />
        <el-table-column prop="softwareRequirements" label="softwareRequirements" />
        <el-table-column v-if="checkPer(['admin','proRdm:edit','proRdm:del'])" label="操作" width="150px" align="center">
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
import crudProRdm from '@/api/project/proRdm'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { rdmId: null, createBy: null, createTime: null, updateBy: null, updateTime: null, buisPeerJudgeConfirm: null, buisPeerJudgeFeedback: null, buisPeerJudgeFlawCollect: null, buisPeerJudgeSummary: null, businessDemandApply: null, businessDemandDeclare: null, correlationSystem: null, demandSurveyIssue: null, demandSurveyPlan: null, demandSurveyRecord: null, demandTrackMatrix: null, rfc: null, softPeerJudgeConfirm: null, softPeerJudgeFeedback: null, softPeerJudgeFlawCollect: null, softPeerJudgeSummary: null, softwareRequirements: null }
export default {
  name: 'ProRdm',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '需求开发管理', url: 'api/proRdm', idField: 'rdmId', sort: 'rdmId,desc', crudMethod: { ...crudProRdm }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proRdm:add'],
        edit: ['admin', 'proRdm:edit'],
        del: ['admin', 'proRdm:del']
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
