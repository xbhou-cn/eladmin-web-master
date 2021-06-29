<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="pmcId">
            <el-input v-model="form.pmcId" style="width: 370px;" />
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
          <el-form-item label="issueTrack">
            <el-input v-model="form.issueTrack" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="manManagePlan">
            <el-input v-model="form.manManagePlan" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="milestoneMeetSummary">
            <el-input v-model="form.milestoneMeetSummary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="milestoneReport">
            <el-input v-model="form.milestoneReport" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="proMeetSummary">
            <el-input v-model="form.proMeetSummary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="riskChanceManage">
            <el-input v-model="form.riskChanceManage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="summaryReport">
            <el-input v-model="form.summaryReport" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="wbs">
            <el-input v-model="form.wbs" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="weekMeetSummary">
            <el-input v-model="form.weekMeetSummary" style="width: 370px;" />
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
        <el-table-column prop="pmcId" label="pmcId" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="issueTrack" label="issueTrack" />
        <el-table-column prop="manManagePlan" label="manManagePlan" />
        <el-table-column prop="milestoneMeetSummary" label="milestoneMeetSummary" />
        <el-table-column prop="milestoneReport" label="milestoneReport" />
        <el-table-column prop="proMeetSummary" label="proMeetSummary" />
        <el-table-column prop="riskChanceManage" label="riskChanceManage" />
        <el-table-column prop="summaryReport" label="summaryReport" />
        <el-table-column prop="wbs" label="wbs" />
        <el-table-column prop="weekMeetSummary" label="weekMeetSummary" />
        <el-table-column v-if="checkPer(['admin','proPmc:edit','proPmc:del'])" label="操作" width="150px" align="center">
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
import crudProPmc from '@/api/project/proPmc'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { pmcId: null, createBy: null, createTime: null, updateBy: null, updateTime: null, issueTrack: null, manManagePlan: null, milestoneMeetSummary: null, milestoneReport: null, proMeetSummary: null, riskChanceManage: null, summaryReport: null, wbs: null, weekMeetSummary: null }
export default {
  name: 'ProPmc',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '跟踪与控制', url: 'api/proPmc', idField: 'pmcId', sort: 'pmcId,desc', crudMethod: { ...crudProPmc }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proPmc:add'],
        edit: ['admin', 'proPmc:edit'],
        del: ['admin', 'proPmc:del']
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
