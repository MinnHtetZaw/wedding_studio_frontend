<template>
  <Master>
    <div class="row">
      <div class="col-12 m-auto">
        <div class="d-flex justify-content-between mb-3 align-items-center">
          <h5 class="text-secondary mb-0">Package Lists</h5>
          <button @click="is_create = true" class="text-primary btn">
            Add Package <i class="fa-solid fa-plus ms-2"></i>
          </button>
        </div>

      </div>
    </div>
    <div v-if="is_create == true" class="row">
      <div class="col-10 m-auto">
        <div class="col-4 m-auto">
          <div class="card mb-3 p-3 shadow-sm border-0 rounded">
            <div class="d-flex  mb-3 justify-content-between align-items-center">
              <h6 class=" text-secondary mb-0">Create Package</h6>
              <button @click="is_create = false" class="btn btn-close"></button>
            </div>
            <form @submit.prevent="" ref="storePackage" enctype="multipart/form-data">
              <div class="mb-3">
                <label class="form-label small text-secondary">Code</label>
                <textarea name="code" rows="1" class="form-control form-control-sm"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Name</label>
                <textarea name="name" rows="1" class="form-control form-control-sm"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Price</label>
                <input type="number" class="form-control form-control-sm" name="price">
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">Dress Type</label>
                    <select name="dress_id" class="form-select form-select-sm">
                      <option value="">Select Dress Type</option>
                      <option :value="category.id" v-for="category in dress_categories">{{category.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">No of Dresses</label>
                    <input type="number" class="form-control form-control-sm" name="no_of_dress">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">Theme Type</label>
                    <select name="theme_id" class="form-select form-select-sm">
                      <option value="">Select Theme Type</option>
                      <option :value="category.id" v-for="category in theme_categories">{{category.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">No of Themes</label>
                    <input type="number" class="form-control form-control-sm" name="no_of_theme">
                  </div>
                </div>
              </div>


              <div class="mb-3">
                <label class="form-label small text-secondary">Main Frame Photo Size</label>
                <textarea name="main_frame_size" rows="1" class="form-control form-control-sm"></textarea>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">No of Retouched Photo</label>
                    <input type="number" class="form-control form-control-sm" name="no_of_retouched_photo">
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">No of Normal Photo</label>
                    <input type="number" class="form-control form-control-sm" name="no_of_normal_photo">
                  </div>
                </div>
              </div>


              <div class="mb-3">
                <label class="form-label small text-secondary">Description</label>
                <textarea name="description" rows="2" class="form-control form-control-sm" ></textarea>
              </div>
              <button @click="storePackage" class="w-100 btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="is_create == false" class="col-12 m-auto">
      <div class="card p-0 border-0">
        <table class="table table-hover">
          <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Code</th>
            <th class="text-center">Name</th>
            <th class="text-center">Dress Type</th>
            <th class="text-center">No of Dresses</th>
            <th class="text-center">Theme Type</th>
            <th class="text-center">No of Themes</th>
            <th class="text-center">Main Frame Size</th>
            <th class="text-center">No of Retouched Photo</th>
            <th class="text-center">No of Normal Photo</th>
            <th class="text-center">Price( MMK )</th>
            <th class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-center" v-for="p in packages">
            <td class="">{{p.id}}</td>
            <td class="">{{p.code}}</td>
            <td class="">{{p.name}}</td>
            <td class="">{{p.dress_category}}</td>
            <td class="">{{p.no_of_dress}}</td>
            <td class="">{{p.theme_category}}</td>
            <td class="">{{p.no_of_theme}}</td>
            <td class="">{{p.main_frame_size}}</td>
            <td class="">{{p.no_of_retouched_photo}}</td>
            <td class="">{{p.no_of_normal_photo}}</td>
            <td class="">{{p.price}}</td>
            <td>
              <div class="d-flex mt-2 gap-4 align-items-center justify-content-center">
                <i @click="packageDetail(p.id)" type="button" class="fa-solid fa-info-circle text-primary"></i>
                <i type="button" class="fa-solid fa-pen text-warning"></i>
                <i type="button" class="fa-solid fa-trash text-danger"></i>
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
  name: "Package",
  components: {Master},
  data() {
    return {
      is_create: false,
      packages: {},
      dress_categories: {},
      theme_categories: {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getPackages: function (){
      axios.get(this.getUrl('package'))
      .then(res => {
        this.packages = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCategories: function () {
      axios.get(this.getUrl('category'))
      .then(res => {
        this.dress_categories = res.data.data.filter(el => el.type == 'Dress')
        this.theme_categories = res.data.data.filter(el => el.type == 'Theme')
      })
      .catch(err => {
        console.log(err)
      })
    },
    storePackage : function (){
      let formData = new FormData(this.$refs.storePackage)
      axios.post(this.getUrl('package'),formData)
      .then(res => {
        this.$refs.storePackage.reset()
        this.is_create = false
        this.$store.dispatch('showSuccessAlert')
        this.getPackages()
      })
      .catch(err => {
        console.log(err)
      })
    },
    packageDetail : function (id) {
      router.push({path: '/package/detail',query: {id: id}})
    }
  },
  mounted() {
    this.getPackages()
    this.getCategories()
  }
}
</script>

<style scoped>

</style>