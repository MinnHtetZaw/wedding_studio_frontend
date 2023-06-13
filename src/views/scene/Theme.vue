<template>
  <Master>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between mb-3 align-items-center">
          <h5 class="text-secondary">Theme Lists</h5>
          <button @click="is_create = true" class="text-primary btn">
            Add Theme <i class="fa-solid fa-plus ms-2"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="is_create == true" class="row">
      <div class="col-10 m-auto">
        <div class="col-4 m-auto">
          <div class="card mb-3 p-3 shadow-sm border-0 rounded">
            <div class="d-flex mb-3 justify-content-between align-items-center">
              <h6 class=" text-secondary mb-0">Create Theme</h6>
              <button @click="is_create = false" class="btn btn-sm btn-close"></button>
            </div>
            <form @submit.prevent="" ref="storeScenery" enctype="multipart/form-data">
              <div class="mb-3">
                <label class="form-label small text-secondary">Category</label>
                <select name="category_id" class="form-select form-select-sm">
                  <option value="">Select Category</option>
                  <option :value="category.id" v-for="category in categories">{{category.name}}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Code</label>
                <textarea name="code" rows="1" class="form-control form-control-sm"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Name</label>
                <textarea name="name" rows="1" class="form-control form-control-sm"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Type</label>
                <select name="type" class="form-select form-select-sm">
                  <option value="">Select Type</option>
                  <option value="In Door">In Door</option>
                  <option value="Out Door">Out Door</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Photo</label>
                <input type="file" name="photo" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Description</label>
                <textarea name="description" rows="3" class="form-control form-control-sm" ></textarea>
              </div>
              <button @click="storeTheme" class="w-100 btn btn-sm btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="is_create == false" class="col-12">
      <div class="card p-0 border-0">
        <table class="table table-hover">
          <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Photo</th>
            <th class="text-center">Code</th>
            <th class="text-center">Name</th>
            <th class="text-center">Type</th>
            <th class="text-center">Category</th>
            <th class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-center" v-for="theme in sceneries">
            <td class="">{{theme.id}}</td>
            <td class="">
              <img :src="theme.photo" style="width: 100px" class="rounded" alt="">
            </td>
            <td class="">{{theme.code}}</td>
            <td class="">{{theme.name}}</td>
            <td class="">{{theme.type}}</td>
            <td class="">{{theme.category}}</td>
            <td>
              <div class="d-flex mt-2 gap-4 align-items-center justify-content-center">
                <i @click="editTheme(theme.id)" type="button" class="fa-solid fa-pen text-warning"></i>
                <i @click="deleteTheme(theme.id)" type="button" class="fa-solid fa-trash text-danger"></i>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/components/Master";
import {mapGetters} from "vuex";
import axios from "axios";
import router from "@/router";
export default {
  name: "Theme",
  components: {Master},
  data() {
    return {
      sceneries: {},
      categories: {},
      is_create: false,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ]),
  },
  methods: {
    getThemes : function (){
      axios.get(this.getUrl('scenery'))
          .then(res => {
            this.sceneries = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getCategories : function (){
      axios.get(this.getUrl('category'))
          .then(res => {
            this.categories = res.data.data.filter(el => el.type === 'Theme')
          })
          .catch(err => {
            console.log(err)
          })
    },
    storeTheme : function (){
      let formData = new FormData(this.$refs.storeScenery)
      axios.post(this.getUrl('scenery'),formData)
          .then(res=>{
            this.$refs.storeScenery.reset()
            this.is_create = false
            this.$store.dispatch('showSuccessAlert')
            this.getThemes()
          })
          .catch(err => {
            console.log(err)
          })
    },
    editTheme: function (id){
      router.push({
        path: '/editTheme/'+id,
        query: {id}
      })
    },
    deleteTheme: function (id){
      if (confirm('Please press "OK" to Delete!') === true){
        axios.delete(this.getUrl('scenery/'+id))
        .then(res => {
          this.$store.dispatch('showSuccessAlert')
          this.getThemes()
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  mounted() {
    this.getCategories()
    this.getThemes()
  }
}
</script>

<style scoped>

</style>