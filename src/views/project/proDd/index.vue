<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="ddId">
            <el-input v-model="form.ddId" style="width: 370px;" />
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
          <el-form-item label="codeWalkthroughIssue">
            <el-input v-model="form.codeWalkthroughIssue" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="codeWalkthroughMeet">
            <el-input v-model="form.codeWalkthroughMeet" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="codeWalkthroughReport">
            <el-input v-model="form.codeWalkthroughReport" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="databaseDesign">
            <el-input v-model="form.databaseDesign" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="frameworkDesign">
            <el-input v-model="form.frameworkDesign" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="highLevelDesign">
            <el-input v-model="form.highLevelDesign" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="installDeployManual">
            <el-input v-model="form.installDeployManual" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="interfaces">
            <el-input v-model="form.interfaces" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="jUnitResult">
            <el-input v-model="form.jUnitResult" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="lowLevelDesign">
            <el-input v-model="form.lowLevelDesign" style="width: 370px;" />
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
          <el-form-item label="rfc">
            <el-input v-model="form.rfc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="softwareDesign">
            <el-input v-model="form.softwareDesign" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="source">
            <el-input v-model="form.source" style="width: 370px;" />
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
        <el-table-column prop="ddId" label="ddId" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="codeWalkthroughIssue" label="codeWalkthroughIssue" />
        <el-table-column prop="codeWalkthroughMeet" label="codeWalkthroughMeet" />
        <el-table-column prop="codeWalkthroughReport" label="codeWalkthroughReport" />
        <el-table-column prop="databaseDesign" label="databaseDesign" />
        <el-table-column prop="frameworkDesign" label="frameworkDesign" />
        <el-table-column prop="highLevelDesign" label="highLevelDesign" />
        <el-table-column prop="installDeployManual" label="installDeployManual" />
        <el-table-column prop="interfaces" label="interfaces" />
        <el-table-column prop="jUnitResult" label="jUnitResult" />
        <el-table-column prop="lowLevelDesign" label="lowLevelDesign" />
        <el-table-column prop="peerJudgeConfirm" label="peerJudgeConfirm" />
        <el-table-column prop="peerJudgeFeedback" label="peerJudgeFeedback" />
        <el-table-column prop="peerJudgeFlawCollect" label="peerJudgeFlawCollect" />
        <el-table-column prop="peerJudgeSummary" label="peerJudgeSummary" />
        <el-table-column prop="rfc" label="rfc" />
        <el-table-column prop="softwareDesign" label="softwareDesign" />
        <el-table-column prop="source" label="source" />
        <el-table-column v-if="checkPer(['admin','proDd:edit','proDd:del'])" label="操作" width="150px" align="center">
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
import crudProDd from '@/api/project/proDd'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { ddId: null, createBy: null, createTime: null, updateBy: null, updateTime: null, codeWalkthroughIssue: null, codeWalkthroughMeet: null, codeWalkthroughReport: null, databaseDesign: null, frameworkDesign: null, highLevelDesign: null, installDeployManual: null, interfaces: null, jUnitResult: null, lowLevelDesign: null, peerJudgeConfirm: null, peerJudgeFeedback: null, peerJudgeFlawCollect: null, peerJudgeSummary: null, rfc: null, softwareDesign: null, source: null }
export default {
  name: 'ProDd',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '设计与开发', url: 'api/proDd', idField: 'ddId', sort: 'ddId,desc', crudMethod: { ...crudProDd }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proDd:add'],
        edit: ['admin', 'proDd:edit'],
        del: ['admin', 'proDd:del']
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
