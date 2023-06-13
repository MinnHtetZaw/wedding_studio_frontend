<template>
  <Master>
    <div class="row">
      <div class="col-12">
        <div>
          <h5 class="text-title">Edit Theme</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="card p-3 rounded border-0">
          <div v-if="theme.photo != null">
            <div class="d-flex justify-content-center mb-3">
              <img :src="theme.photo" style="width: 500px;" class="rounded" alt="">
            </div>
            <div class="d-flex justify-content-center">
              <button @click="deletePhoto(theme.id)" class="btn btn-sm btn-danger">Delete Photo
                <i class="fa-solid fa-trash ms-1"></i>
              </button>
            </div>
          </div>
          <div v-else>
            <p class="alert alert-warning"> <i class="fa-solid fa-warning me-2"></i>No photo! </p>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card p-3 border-0">
          <form @submit.prevent="" ref="updateTheme" enctype="multipart/form-data">
            <div class="mb-3">
              <label class="form-label small text-secondary">Category</label>
              <select name="category_id" class="form-select form-select-sm">
                <option value="">Select Category</option>
                <option :selected="theme.category_id === category.id" :value="category.id" v-for="category in categories">{{category.name}}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">Code</label>
              <textarea name="code" rows="1" class="form-control form-control-sm" :value="theme.code"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">Name</label>
              <textarea name="name" rows="1" class="form-control form-control-sm" :value="theme.name"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">Type</label>
              <select name="type" class="form-select form-select-sm">
                <option value="">Select Type</option>
                <option :selected="theme.type === 'In Door'" value="In Door">In Door</option>
                <option :selected="theme.type === 'Out Door'" value="Out Door">Out Door</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">Photo</label>
              <input type="file" name="photo" class="form-control form-control-sm">
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">Description</label>
              <textarea name="description" rows="3" class="form-control form-control-sm" :value="theme.description"></textarea>
            </div>
            <div class="d-flex justify-content-center gap-4">
              <button @click="cancelEdit()" class="w-100 btn btn-sm btn-danger">Cancel</button>
              <button @click="updateTheme(theme.id)" class="w-100 btn btn-sm btn-success">Update</button>
            </div>
          </form>
        </div>
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
  name: "EditTheme",
  components: {Master},
  data() {
    return {
      theme: {},
      categories: {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getTheme: function (id = this.$route.query.id){
      axios.get(this.getUrl('scenery/'+id))
          .then(res => {
            this.theme = res.data.data
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
    cancelEdit: function (){
      router.push({path: '/theme'})
    },
    updateTheme: function (id){
      let formData = new FormData(this.$refs.updateTheme)
      formData.append('_method','PATCH')
      axios.post(this.getUrl('scenery/'+id),formData)
          .then(res => {
            this.$store.dispatch('showSuccessAlert')
            this.$refs.updateTheme.reset()
            this.getTheme()
          })
          .catch(err => {
            this.$store.dispatch('showErrorAlert')
            console.log(err)
          })
    },
    deletePhoto:function (id){
      let formData = new FormData()
      formData.append('delete_photo',true)
      formData.append('_method','PUT')
      axios.post(this.getUrl('scenery/'+id),formData)
          .then(res => {
            this.$store.dispatch('showSuccessAlert')
            this.getTheme()
          })
          .catch(err => {
            this.$store.dispatch('showErrorAlert')
            console.log(err)
          })
    }

  },
  mounted() {
    this.getTheme()
    this.getCategories()
  }
}
</script>

<style scoped>

</style>