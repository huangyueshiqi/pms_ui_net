<!--
 * @Descripttion: (头部模板/ui_head)
 * @version: (1.0)
 * @Author: (admin)
 * @Date: (2022-08-12)
 * @LastEditors: (admin)
 * @LastEditTime: (2022-08-12)
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

      <el-form-item label="模板编号" prop="templateID">
        <el-input v-model.number="queryParams.templateID" placeholder="请输入模板编号" />
      </el-form-item>

      <el-form-item label="资源ID" prop="iconResID">
        <el-input v-model.number="queryParams.iconResID" placeholder="请输入资源ID" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 工具区域 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" v-hasPermi="['resourcemng:uihead:add']" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" :disabled="single" v-hasPermi="['resourcemng:uihead:edit']" plain icon="el-icon-edit" size="mini" @click="handleUpdate">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" :disabled="multiple" v-hasPermi="['resourcemng:uihead:delete']" plain icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['resourcemng:uihead:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 数据区域 -->
    <el-table :data="dataList" v-loading="loading" ref="table" border highlight-current-row @sort-change="sortChange" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="name" label="名称" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="index" label="序号" align="center" />
      <el-table-column prop="raceTagID" label="物种标签编号" align="center" />
      <el-table-column prop="templateID" label="模板编号" align="center" />
      <el-table-column prop="iconRes" label="图标资源" align="center">
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
      <el-table-column prop="iconResID" label="资源ID" align="center" />
      <el-table-column prop="selectedIconResID" label="选中资源ID" align="center" />

      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button size="mini" v-hasPermi="['resourcemng:uihead:edit']" type="success" icon="el-icon-edit" title="编辑"
            @click="handleUpdate(scope.row)"></el-button>
          <el-button size="mini" v-hasPermi="['resourcemng:uihead:delete']" type="danger" icon="el-icon-delete" title="删除"
            @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination class="mt10" background :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />

    <!-- 添加或修改头部模板对话框 -->
    <el-dialog :title="title" :lock-scroll="false" :visible.sync="open" >
      <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
        <el-row :gutter="20">

          <el-col :lg="12">
            <el-form-item label="编号" prop="id">
              <el-input-number v-model.number="form.id" controls-position="right" placeholder="请输入编号" :disabled="title=='修改数据'"/>
            </el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称" />
            </el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="序号" prop="index">
              <el-input v-model="form.index" placeholder="请输入序号" />
            </el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="物种标签编号" prop="raceTagID">
              <el-input v-model="form.raceTagID" placeholder="请输入物种标签编号" />
            </el-form-item>
          </el-col>

          <el-col :lg="12">
            <el-form-item label="模板编号" prop="templateID">
              <el-input v-model="form.templateID" placeholder="请输入模板编号" />
            </el-form-item>
          </el-col>

          <el-col :lg="24">
            <el-form-item label="图标资源" prop="iconRes">
              <UploadImage v-model="form.iconRes" column="iconRes" @input="handleUploadSuccess" />
            </el-form-item>
          </el-col>

          <el-col :lg="24">
            <el-form-item label="选中图标" prop="selectedIconRes">
              <UploadImage v-model="form.selectedIconRes" column="selectedIconRes" @input="handleUploadSuccess" />
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
  listUiHead,
  addUiHead,
  delUiHead,
  updateUiHead,
  getUiHead,
  exportUiHead,
} from '@/api/resourcemng/uiHead.js';

export default {
  name: "uihead",
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
        sort: undefined,
        sortType: undefined,
        id: undefined,
        name: undefined,
        templateID: undefined,
        iconResID: undefined,
      },
      // 弹出层标题
      title: "",
      // 操作类型 1、add 2、edit
      opertype: 0,
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      columns: [
        { index: 0, key: 'id', label: `编号`, checked:  true  },
        { index: 1, key: 'name', label: `名称`, checked:  true  },
        { index: 2, key: 'index', label: `序号`, checked:  true  },
        { index: 3, key: 'raceTagID', label: `物种标签编号`, checked:  true  },
        { index: 4, key: 'templateID', label: `模板编号`, checked:  true  },
        { index: 5, key: 'iconRes', label: `图标资源`, checked:  true  },
        { index: 6, key: 'selectedIconRes', label: `选中图标`, checked:  true  },
        { index: 7, key: 'iconResID', label: `资源ID`, checked:  true  },
        { index: 8, key: 'selectedIconResID', label: `选中资源ID`, checked:  true  },
      ],
      // 数据列表
      dataList: [],
      // 总记录数
      total: 0,
      // 提交按钮是否显示
      btnSubmitVisible: true,
      // 表单校验
      rules: {
        id: [
          { required: true, message: "编号不能为空", trigger: "blur" }
        ],
        index: [
          { required: true, message: "序号不能为空", trigger: "blur" }
        ],
        raceTagID: [
          { required: true, message: "物种标签编号不能为空", trigger: "blur" }
        ],
        templateID: [
          { required: true, message: "模板编号不能为空", trigger: "blur" }
        ],
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
      listUiHead(this.queryParams).then(res => {
         if (res.code == 200) {
           this.dataList = res.data.result;
           this.total = res.data.totalNum;
           this.loading = false;
         }
       })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 重置数据表单
    reset() {
      this.form = {
        id: undefined,
        name: undefined,
        index: undefined,
        raceTagID: undefined,
        templateID: undefined,
        iconRes: undefined,
        selectedIconRes: undefined,
        iconResID: undefined,
        selectedIconResID: undefined,
      };
      this.resetForm("form");
    },
    // 重置查询操作
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
     // 自定义排序
    sortChange(column) {
      if (column.prop == null || column.order == null) {
        this.queryParams.sort = undefined;
        this.queryParams.sortType = undefined;
      } else {
        this.queryParams.sort = column.prop;
        this.queryParams.sortType = column.order;
      }

      this.handleQuery();
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
          return delUiHead(Ids);
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
      getUiHead(id).then((res) => {
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
            updateUiHead(this.form)
              .then((res) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
            })
            .catch((err) => {
                //TODO 错误逻辑
              });
          } else {
            addUiHead(this.form)
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
      this.$confirm("是否确认导出所有头部模板数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportUiHead(queryParams);
        })
        .then((response) => {
          this.download(response.data.path);
        });
    },
  },
};
</script>
