<template>
  <div>
    <my-form v-on:addRow="addRow"></my-form>
    <my-table :activitiesList="activitiesList" v-on:deleteActivity="deleteActivity" v-on:editActivity="editActivity" v-on:addRow="addRow"></my-table>
  </div>
</template>

<script>
  import MyForm from './components/MyForm'
  import MyTable from './components/MyTable'
  import {getActivitiesList} from '@/mock/activities'

  export default {
    name: '',
    props: [''],
    data() {
      return {
        activitiesList: []
      };
    },

    components: {
      MyForm,
      MyTable
    },

    computed: {},

    watch: {},

    beforeMount() {
    },

    mounted() {
      this.activitiesList = getActivitiesList();
    },

    methods: {
      deleteActivity(id) {
        this.activitiesList.forEach((item, index) => {
          if (item.id == id) {
            this.activitiesList.splice(index, 1);
          }
        })
      },
      editActivity(data) {
        this.activitiesList.forEach((item, index) => {
          if (item.id == data.id) {
            item.title = data.title;
            item.area = data.area;
            item.dateTime = data.dateTime;
          }
        })
      },
      addRow(data){
        this.activitiesList.push(data);
      }
    }

  }

</script>
<style lang="scss" scoped>

</style>
