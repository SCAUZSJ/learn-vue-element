<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="currentActivitiesList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      tooltip-effect="dark"
      style="width: 100%"
      fit
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column
        label="活动名称"
        prop="title"
        sortable
      >
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.title" class="edit-input" size="small"></el-input>
          </template>
          <span v-else>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="area"
        label="活动区域"
        sortable
      >
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.area" class="edit-input" size="small"></el-input>
          </template>
          <span v-else>{{scope.row.area}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="dateTime"
        label="活动时间"
        sortable
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.dateTime" class="edit-input" size="small"></el-input>
          </template>
          <span v-else>{{scope.row.dateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-button
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(scope.row)"
            >Ok
            </el-button>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >取消
            </el-button>
          </div>
          <div v-else>
            <el-button size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="deleteSelected()">删除所选</el-button>
      <el-button @click="addRow()">添加数据</el-button>
      <el-pagination
        style="display: inline-block"
        layout="prev, pager, next"
        :page-size="5"
        :total="this.activitiesList.length"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

  export default {
    name: '',
    props: ['activitiesList'],
    data() {
      return {
        multipleSelection: [],
        search: '',
        currentPage: 1
      };
    },

    components: {},

    computed: {
      editedActivitiesList() {
        return this.activitiesList.map(item => {
          return {
            id: item.id,
            title: item.title,
            area: item.area,
            dateTime: item.dateTime,
            originalTitle: item.title,
            originalArea: item.area,
            originalDateTime: item.dateTime,
            edit: false
          }
        })
      },
      currentActivitiesList(){
        let result = [];
        for (let i = 0; i <= 4; i++) {
          if (this.editedActivitiesList[(this.currentPage - 1) * 5 + i]) {
            result.push(this.editedActivitiesList[(this.currentPage - 1) * 5 + i]);
          }
        }
        return result;
      }
    },

    watch: {},

    beforeMount() {
    },

    mounted() {
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      confirmEdit(row) {
        row.edit = false;
        row.originalTitle = row.title;
        row.originalArea = row.area;
        row.originalDateTime = row.dateTime;
        let data = {
          id: row.id,
          title: row.title,
          area: row.area,
          dateTime: row.dateTime
        }
        this.$emit('editActivity', data);
        this.$message({
          message: "更新成功",
          type: "success"
        });
      },
      handleDelete(index, row) {
        this.$emit('deleteActivity', row.id)
      },
      deleteSelected() {
        this.multipleSelection.forEach(item => {
          this.$emit('deleteActivity', item.id)
        })
      },
      addRow() {
        let id = Date.now();
        let date = new Date().format("yyyy-MM-dd hh:mm:ss");
        let newActivity = {
          id: id,
          title: '未命名活动',
          area: 'area1',
          dateTime: date
        };
        this.$emit('addRow', newActivity)
      },
      cancelEdit(row) {
        row.title = row.originalTitle;
        row.area = row.originalArea;
        row.dateTime = row.originalDateTime;
        row.edit = false;
        this.$message({
          message: "取消操作",
          type: "warning"
        });
      },
      handleCurrentChange(val){
        this.currentPage = val;
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-table {
    margin-top: 20px;
    .edit-input {
      width: 70%;
    }
  }
</style>
