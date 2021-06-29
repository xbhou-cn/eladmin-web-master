<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="cmdbId" prop="cmdbId">
            <el-input v-model="form.cmdbId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="signIn">
            <el-input v-model="form.signIn" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="repositoryApply">
            <el-input v-model="form.repositoryApply" style="width: 370px;" />
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
          <el-form-item label="baselineApply">
            <el-input v-model="form.baselineApply" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="configInspection">
            <el-input v-model="form.configInspection" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="configStatusReport">
            <el-input v-model="form.configStatusReport" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="permissionApply">
            <el-input v-model="form.permissionApply" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="testVersionApply">
            <el-input v-model="form.testVersionApply" style="width: 370px;" />
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
        <el-table-column prop="cmdbId" label="cmdbId" />
        <el-table-column prop="signIn" label="signIn" />
        <el-table-column prop="repositoryApply" label="repositoryApply" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="baselineApply" label="baselineApply" />
        <el-table-column prop="configInspection" label="configInspection" />
        <el-table-column prop="configStatusReport" label="configStatusReport" />
        <el-table-column prop="permissionApply" label="permissionApply" />
        <el-table-column prop="testVersionApply" label="testVersionApply" />
        <el-table-column v-if="checkPer(['admin','proCmdb:edit','proCmdb:del'])" label="操作" width="150px" align="center">
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
import crudProCmdb from '@/api/project/proCmdb'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { cmdbId: null, signIn: null, repositoryApply: null, createBy: null, createTime: null, updateBy: null, updateTime: null, baselineApply: null, configInspection: null, configStatusReport: null, permissionApply: null, testVersionApply: null }
export default {
  name: 'ProCmdb',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '配置管理', url: 'api/proCmdb', idField: 'cmdbId', sort: 'cmdbId,desc', crudMethod: { ...crudProCmdb }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proCmdb:add'],
        edit: ['admin', 'proCmdb:edit'],
        del: ['admin', 'proCmdb:del']
      },
      rules: {
        cmdbId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
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
