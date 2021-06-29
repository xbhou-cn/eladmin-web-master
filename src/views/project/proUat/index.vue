<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="uatId">
            <el-input v-model="form.uatId" style="width: 370px;" />
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
          <el-form-item label="acceptTestBlemish">
            <el-input v-model="form.acceptTestBlemish" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="acceptTestCase">
            <el-input v-model="form.acceptTestCase" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="acceptTestPlan">
            <el-input v-model="form.acceptTestPlan" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="acceptTestReport">
            <el-input v-model="form.acceptTestReport" style="width: 370px;" />
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
          <el-form-item label="userGuide">
            <el-input v-model="form.userGuide" style="width: 370px;" />
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
        <el-table-column prop="uatId" label="uatId" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="acceptTestBlemish" label="acceptTestBlemish" />
        <el-table-column prop="acceptTestCase" label="acceptTestCase" />
        <el-table-column prop="acceptTestPlan" label="acceptTestPlan" />
        <el-table-column prop="acceptTestReport" label="acceptTestReport" />
        <el-table-column prop="executeRecord" label="executeRecord" />
        <el-table-column prop="peerJudgeConfirm" label="peerJudgeConfirm" />
        <el-table-column prop="peerJudgeFeedback" label="peerJudgeFeedback" />
        <el-table-column prop="peerJudgeFlawCollect" label="peerJudgeFlawCollect" />
        <el-table-column prop="peerJudgeSummary" label="peerJudgeSummary" />
        <el-table-column prop="userGuide" label="userGuide" />
        <el-table-column v-if="checkPer(['admin','proUat:edit','proUat:del'])" label="操作" width="150px" align="center">
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
import crudProUat from '@/api/project/proUat'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { uatId: null, createBy: null, createTime: null, updateBy: null, updateTime: null, acceptTestBlemish: null, acceptTestCase: null, acceptTestPlan: null, acceptTestReport: null, executeRecord: null, peerJudgeConfirm: null, peerJudgeFeedback: null, peerJudgeFlawCollect: null, peerJudgeSummary: null, userGuide: null }
export default {
  name: 'ProUat',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '用户验收测试', url: 'api/proUat', idField: 'uatId', sort: 'uatId,desc', crudMethod: { ...crudProUat }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proUat:add'],
        edit: ['admin', 'proUat:edit'],
        del: ['admin', 'proUat:del']
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
