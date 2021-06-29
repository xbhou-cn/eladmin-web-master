<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="piId">
            <el-input v-model="form.piId" style="width: 370px;" />
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
          <el-form-item label="delivery">
            <el-input v-model="form.delivery" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="environInspection">
            <el-input v-model="form.environInspection" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="moduleInspection">
            <el-input v-model="form.moduleInspection" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="testCase">
            <el-input v-model="form.testCase" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="testCaseRecord">
            <el-input v-model="form.testCaseRecord" style="width: 370px;" />
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
        <el-table-column prop="piId" label="piId" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="delivery" label="delivery" />
        <el-table-column prop="environInspection" label="environInspection" />
        <el-table-column prop="moduleInspection" label="moduleInspection" />
        <el-table-column prop="testCase" label="testCase" />
        <el-table-column prop="testCaseRecord" label="testCaseRecord" />
        <el-table-column v-if="checkPer(['admin','proPi:edit','proPi:del'])" label="操作" width="150px" align="center">
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
import crudProPi from '@/api/project/proPi'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { piId: null, createBy: null, createTime: null, updateBy: null, updateTime: null, delivery: null, environInspection: null, moduleInspection: null, testCase: null, testCaseRecord: null }
export default {
  name: 'ProPi',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '产品集成', url: 'api/proPi', idField: 'piId', sort: 'piId,desc', crudMethod: { ...crudProPi }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proPi:add'],
        edit: ['admin', 'proPi:edit'],
        del: ['admin', 'proPi:del']
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
