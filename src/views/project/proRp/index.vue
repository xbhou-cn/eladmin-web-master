<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="rpId">
            <el-input v-model="form.rpId" style="width: 370px;" />
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
          <el-form-item label="maintainManual">
            <el-input v-model="form.maintainManual" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="releaseScheme">
            <el-input v-model="form.releaseScheme" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="summary">
            <el-input v-model="form.summary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="trainManual">
            <el-input v-model="form.trainManual" style="width: 370px;" />
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
        <el-table-column prop="rpId" label="rpId" />
        <el-table-column prop="createBy" label="createBy" />
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column prop="updateBy" label="updateBy" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column prop="maintainManual" label="maintainManual" />
        <el-table-column prop="releaseScheme" label="releaseScheme" />
        <el-table-column prop="summary" label="summary" />
        <el-table-column prop="trainManual" label="trainManual" />
        <el-table-column v-if="checkPer(['admin','proRp:edit','proRp:del'])" label="操作" width="150px" align="center">
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
import crudProRp from '@/api/project/proRp'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { rpId: null, createBy: null, createTime: null, updateBy: null, updateTime: null, maintainManual: null, releaseScheme: null, summary: null, trainManual: null }
export default {
  name: 'ProRp',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '投产发布', url: 'api/project/proRp', idField: 'rpId', sort: 'rpId,desc', crudMethod: { ...crudProRp }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'proRp:add'],
        edit: ['admin', 'proRp:edit'],
        del: ['admin', 'proRp:del']
      },
      rules: {
      }    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据

  }
}
</script>

<style scoped>

</style>
