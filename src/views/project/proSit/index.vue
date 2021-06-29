<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="sitId">
            <el-input v-model="form.sitId" style="width: 370px;" />
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
          <el-form-item label="executeRecord">
            <el-input v-model="form.executeRecord" style="width: 370px;" />
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
          <el-form-item label="performanceReport">
            <el-input v-model="form.performanceReport" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="performanceScheme">
            <el-input v-model="form.performanceScheme" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="performanceScripts">
            <el-input v-model="form.performanceScripts" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="testCase">
            <el-input v-model="form.testCase" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="testImperfection">
            <el-input v-model="form.testImperfection" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="testRecord">
            <el-input v-model="form.testRecord" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="testScheme">
            <el-input v-model="form.testScheme" style="width: 370px;" />
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
        <el-table-column prop="sitId" label="sitId" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="executeRecord" label="executeRecord" />
        <el-table-column prop="peerJudgeConfirm" label="peerJudgeConfirm" />
        <el-table-column prop="peerJudgeFeedback" label="peerJudgeFeedback" />
        <el-table-column prop="peerJudgeFlawCollect" label="peerJudgeFlawCollect" />
        <el-table-column prop="peerJudgeSummary" label="peerJudgeSummary" />
        <el-table-column prop="performanceReport" label="performanceReport" />
        <el-table-column prop="performanceScheme" label="performanceScheme" />
        <el-table-column prop="performanceScripts" label="performanceScripts" />
        <el-table-column prop="testCase" label="testCase" />
        <el-table-column prop="testImperfection" label="testImperfection" />
        <el-table-column prop="testRecord" label="testRecord" />
        <el-table-column prop="testScheme" label="testScheme" />
        <el-table-column v-if="checkPer(['admin','proSit:edit','proSit:del'])" label="操作" width="150px" align="center">
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
import crudProSit from '@/api/project/proSit'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { sitId: null, createBy: null, createTime: null, updateBy: null, updateTime: null, executeRecord: null, peerJudgeConfirm: null, peerJudgeFeedback: null, peerJudgeFlawCollect: null, peerJudgeSummary: null, performanceReport: null, performanceScheme: null, performanceScripts: null, testCase: null, testImperfection: null, testRecord: null, testScheme: null }
export default {
  name: 'ProSit',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '系统集成测试', url: 'api/proSit', idField: 'sitId', sort: 'sitId,desc', crudMethod: { ...crudProSit }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proSit:add'],
        edit: ['admin', 'proSit:edit'],
        del: ['admin', 'proSit:del']
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
