<!--
 * @Descripttion: (菜单管理/)
 * @version: (1.0)
 * @Author: (admin)
 * @Date: (2022-08-12)
 * @LastEditors: (最后更新作者)
 * @LastEditTime: (最后更新时间)
-->
<template>
  <div class="app-container">
    <!-- :model属性用于表单验证使用 比如下面的el-form-item 的 prop属性用于对表单值进行验证操作 -->
    <el-form :model="queryParams" size="small" label-position="right" inline ref="queryForm" :label-width="labelWidth" v-show="showSearch" 
      @submit.native.prevent>
          				                
      <el-form-item label="编号" prop="id">
        <el-input v-model.number="queryParams.id" placeholder="请输入编号" />
      </el-form-item>
    				    
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入名称" />
      </el-form-item>
    				                
      <el-form-item label="父节点" prop="parentID">
        <el-input v-model.number="queryParams.parentID" placeholder="请输入父节点" />
      </el-form-item>
    				    
      <el-form-item label="模板名称" prop="showName">
        <el-input v-model="queryParams.showName" placeholder="请输入模板名称" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 工具区域 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" v-hasPermi="['resourcemng:uilevel:add']" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
       <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-sort" size="mini" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" :disabled="multiple" v-hasPermi="['resourcemng:uilevel:delete']" plain icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['resourcemng:uilevel:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 数据区域 -->
    <el-table v-if="refreshTable" :data="dataList" v-loading="loading" ref="table" border highlight-current-row @selection-change="handleSelectionChange"
      :default-expand-all="isExpandAll" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="name" label="名称" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="level" label="层级" align="center" />
      <el-table-column prop="uiIndex" label="顺序" align="center" />
      <el-table-column prop="iconRes" label="默认图标" align="center">
        <template slot-scope="scope">
          <el-image class="table-td-thumb" fit="contain" :src="scope.row.iconRes" :preview-src-list="[scope.row.iconRes]">
            <div slot="error"><i class="el-icon-document" /></div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="selectedIconRes" label="选中图标" align="center">
        <template slot-scope="scope">
          <el-image class="table-td-thumb" fit="contain" :src="scope.row.selectedIconRes" :preview-src-list="[scope.row.selectedIconRes]">
            <div slot="error"><i class="el-icon-document" /></div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="parentID" label="父节点" align="center" />
      <el-table-column prop="partTagID" label="部件标签编号" align="center" />
      <el-table-column prop="showName" label="模板名称" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="templateHeight" label="模板遮罩高度" align="center" />
      <el-table-column prop="templateGridSizeX" label="模板格子宽度" align="center" />
      <el-table-column prop="templateGridSizeY" label="模板格子高度" align="center" />
      <el-table-column prop="camType" label="相机位置类型" align="center" />
      <el-table-column prop="defaultAdjustNum" label="默认调节项数量" align="center" />
      <el-table-column prop="iconResID" label="资源ID" align="center" />
      <el-table-column prop="selectedIconResID" label="选中资源ID" align="center" />

      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button size="mini" v-hasPermi="['resourcemng:uilevel:edit']" type="success" icon="el-icon-edit" title="编辑" 
            @click="handleUpdate(scope.row)"></el-button>
          <el-button size="mini" v-hasPermi="['resourcemng:uilevel:delete']" type="danger" icon="el-icon-delete" title="删除" 
            @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination class="mt10" background :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />

    <!-- 添加或修改菜单管理对话框 -->
    <el-dialog :title="title" :lock-scroll="false" :visible.sync="open" >
      <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
        <el-row :gutter="20">
            
          <el-col :lg="12" v-if="opertype == 2">
            <el-form-item label="编号">{{form.id}}</el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
    
          <el-col :lg="12">
            <el-form-item label="层级" prop="level">
              <el-input v-model="form.level" placeholder="请输入层级" />
            </el-form-item>
          </el-col>
    
          <el-col :lg="12">
            <el-form-item label="顺序" prop="uiIndex">
              <el-input v-model="form.uiIndex" placeholder="请输入顺序" />
            </el-form-item>
          </el-col>

          <el-col :lg="24">
            <el-form-item label="默认图标" prop="iconRes">
              <UploadImage v-model="form.iconRes" column="iconRes" @input="handleUploadSuccess" />
            </el-form-item>
          </el-col>

          <el-col :lg="24">
            <el-form-item label="选中图标" prop="selectedIconRes">
              <UploadImage v-model="form.selectedIconRes" column="selectedIconRes" @input="handleUploadSuccess" />
            </el-form-item>
          </el-col>
    
          <el-col :lg="24">
            <el-form-item label="父级id" prop="parentID">
              <treeselect v-model="form.parentID" :options="dataList" :normalizer="normalizer" :show-count="true" placeholder="选择上级菜单" />
            </el-form-item>
          </el-col>
    
          <el-col :lg="12">
            <el-form-item label="部件标签编号" prop="partTagID">
              <el-input v-model="form.partTagID" placeholder="请输入部件标签编号" />
            </el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="模板名称" prop="showName">
              <el-input v-model="form.showName" placeholder="请输入模板名称" />
            </el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="模板遮罩高度" prop="templateHeight">
              <el-input v-model="form.templateHeight" placeholder="请输入模板遮罩高度" />
            </el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="模板格子宽度" prop="templateGridSizeX">
              <el-input v-model="form.templateGridSizeX" placeholder="请输入模板格子宽度" />
            </el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="模板格子高度" prop="templateGridSizeY">
              <el-input v-model="form.templateGridSizeY" placeholder="请输入模板格子高度" />
            </el-form-item>
          </el-col>
    
          <el-col :lg="12">
            <el-form-item label="相机位置类型" prop="camType">
              <el-input v-model="form.camType" placeholder="请输入相机位置类型" />
            </el-form-item>
          </el-col>
    
          <el-col :lg="12">
            <el-form-item label="默认调节项数量" prop="defaultAdjustNum">
              <el-input v-model="form.defaultAdjustNum" placeholder="请输入默认调节项数量" />
            </el-form-item>
          </el-col>
    
          <el-col :lg="12">
            <el-form-item label="资源ID" prop="iconResID">
              <el-input v-model="form.iconResID" placeholder="请输入资源ID" />
            </el-form-item>
          </el-col>
    
          <el-col :lg="12">
            <el-form-item label="选中资源ID" prop="selectedIconResID">
              <el-input v-model="form.selectedIconResID" placeholder="请输入选中资源ID" />
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { 
  treelistUiLevel,
  listUiLevel,
  addUiLevel,
  delUiLevel,
  updateUiLevel,
  getUiLevel,
  exportUiLevel,
} from '@/api/resourcemng/uiLevel.js';
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "uilevel",
  components: { Treeselect },
  data() {
    return {
      labelWidth: "100px",
      formLabelWidth:"100px",
      // 选中id数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        name: undefined,
        parentID: undefined,
        showName: undefined,
      },
      // 弹出层标题
      title: "",
      // 操作类型 1、add 2、edit
      opertype: 0,
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部折叠
      isExpandAll: false,
      // 重新渲染表格状态
      refreshTable: true,
      // 表单参数
      form: {},
      columns: [
        { index: 0, key: 'id', label: `编号`, checked:  true  },
        { index: 1, key: 'name', label: `名称`, checked:  true  },
        { index: 2, key: 'level', label: `层级`, checked:  true  },
        { index: 3, key: 'uiIndex', label: `顺序`, checked:  true  },
        { index: 4, key: 'iconRes', label: `默认图标`, checked:  true  },
        { index: 5, key: 'selectedIconRes', label: `选中图标`, checked:  true  },
        { index: 6, key: 'parentID', label: `父节点`, checked:  true  },
        { index: 7, key: 'partTagID', label: `部件标签编号`, checked:  true  },
        { index: 8, key: 'showName', label: `模板名称`, checked:  true  },
        { index: 9, key: 'templateHeight', label: `模板遮罩高度`, checked:  false  },
        { index: 10, key: 'templateGridSizeX', label: `模板格子宽度`, checked:  false  },
        { index: 11, key: 'templateGridSizeY', label: `模板格子高度`, checked:  false  },
        { index: 12, key: 'camType', label: `相机位置类型`, checked:  false  },
        { index: 13, key: 'defaultAdjustNum', label: `默认调节项数量`, checked:  false  },
        { index: 14, key: 'iconResID', label: `资源ID`, checked:  false  },
        { index: 15, key: 'selectedIconResID', label: `选中资源ID`, checked:  false  },
      ],
      // 数据列表
      dataList: [],
      // 总记录数
      total: 0,
      // 提交按钮是否显示
      btnSubmitVisible: true,
      // 表单校验
      rules: {
      },
    };
  },
  created() {
    // 列表数据查询
    this.getList();

        var dictParams = [
    ];
  },
  methods: {
    // 查询数据
    getList() {
      this.loading = true;
      treelistUiLevel(this.queryParams).then(res => {
         if (res.code == 200) {
           this.dataList = res.data;
           this.loading = false;
         }
       })
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      };
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 重置数据表单
    reset() {
      this.form = {
        name: undefined,
        level: undefined,
        uiIndex: undefined,
        iconRes: undefined,
        selectedIconRes: undefined,
        parentID: undefined,
        partTagID: undefined,
        showName: undefined,
        templateHeight: undefined,
        templateGridSizeX: undefined,
        templateGridSizeY: undefined,
        camType: undefined,
        defaultAdjustNum: undefined,
        iconResID: undefined,
        selectedIconResID: undefined,
      };
      this.resetForm("form");
    },
    /** 重置查询操作 */
    resetQuery() {
      this.timeRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1
      this.multiple = !selection.length;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加";
      this.opertype = 1;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const Ids = row.id || this.ids;

      this.$confirm('是否确认删除参数编号为"' + Ids + '"的数据项？')
        .then(function () {
          return delUiLevel(Ids);
        })
        .then(() => {
          this.handleQuery();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getUiLevel(id).then((res) => {
        const { code, data } = res;
        if (code == 200) {
          this.open = true;
          this.title = "修改数据";
          this.opertype = 2;

          this.form = {
            ...data,
          };
        }
      });
    },
    //图片上传成功方法
    handleUploadSuccess(column, filelist) {
      this.form[column] = filelist;
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.form));
          
          if (this.form.id != undefined && this.opertype === 2) {
            updateUiLevel(this.form)
              .then((res) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
            })
            .catch((err) => {
                //TODO 错误逻辑
              });
          } else {
            addUiLevel(this.form)
              .then((res) => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
            })
            .catch((err) => {
                //TODO 错误逻辑
              });
          }
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有菜单管理数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportUiLevel(queryParams);
        })
        .then((response) => {
          this.download(response.data.path);
        });
    },
    //展开/折叠操作
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
  },
};
</script>