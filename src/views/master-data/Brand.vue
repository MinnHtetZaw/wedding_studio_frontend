<template>
  <Master>
    <div class="row">
      <div class="col-8 m-auto">
        <div class="d-flex mb-3 align-items-center justify-content-between">
          <h6 class="text-secondary mb-0">Brand List</h6>
          <button @click="is_create = true" class="btn btn-sm btn-primary">
            Add Brand
            <i class="fa-solid fa-plus ms-2"></i>
          </button>
        </div>
      </div>

      <div v-if="is_create == true" class="row">
        <div class="col-3 m-auto">
          <div class="card p-3 shadow-sm border-0 rounded">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="fw-normal mb-3 text-secondary mb-0">Create Brand</h6>
              <button @click="is_create = false" class="btn btn-close"></button>
            </div>
            <form @submit.prevent="" ref="createBrand">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <textarea name="name" class="form-control" rows="1"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Choose Category</label>
                <select name="category_id" class="form-select">
                  <option value="">Select Category</option>
                  <option :value="category.id" v-for="category in categories">{{category.name}}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="3"></textarea>
              </div>
              <button @click="storeBrand" class="w-100 btn btn-primary btn-sm">Save</button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="is_edit == true" class="row">
        <div class="col-3 m-auto">
          <div class="card p-3 shadow-sm border-0 rounded">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="fw-normal mb-3 text-secondary mb-0">Edit Brand</h6>
              <button @click="is_edit = false" class="btn btn-close"></button>
            </div>
            <form @submit.prevent="" ref="editBrand">
              <text-area label-name="Name" rows="1" name="name" :value="edit_brand.name"></text-area>
              <Select name="subcategory_id" option_name="Select Subcategory" label-name="Choose Subcategory">
                <option :selected="edit_brand.subcategory_id == subcategory.id" :value="subcategory.id" v-for="subcategory in subcategories">{{subcategory.name}}</option>
              </Select>
              <text-area label-name="Description" name="description" :value="edit_brand.description"></text-area>
              <button @click="updateBrand(edit_brand.id)" class="w-100 btn btn-success btn-sm">Update</button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="is_create == false && is_edit == false" class="col-8 m-auto">
        <div class="card p-0 border-0">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="text-secondary text-center">#</th>
              <th class="text-secondary text-center">Name</th>
              <th class="text-secondary text-center">Related Category</th>
              <th class="text-secondary text-center">Description</th>
              <th class="text-secondary text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="brand in brands">
              <td class="text-center">{{brand.id}}</td>
              <td class="">{{brand.name}}</td>
              <td class="">{{brand.category_name}}</td>
              <td class="">{{brand.description}}</td>
              <td>
                <div class="d-flex gap-3 align-items-center justify-content-center">
                  <i @click="editBrand(brand)" type="button" class="fa-solid fa-pen text-warning"></i>
                  <i  type="button" class="fa-solid fa-trash text-danger"></i>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Master>

</template>

<script>
import Master from "@/components/Master";
import {mapGetters} from "vuex";
import axios from "axios";
export default {
  name: "Brand",
  components: {Master},
  data() {
    return {
      is_create : false,
      is_edit : false,
      brands : {},
      categories : {},
      edit_brand : {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getBrand: function (){
      axios.get(this.getUrl('brand'))
          .then(res=>{
            this.brands = res.data.data
          })
          .catch(err=>{
            console.log(err)
          })
    },
    getCategories: function (){
      axios.get(this.getUrl('category'))
          .then(res=>{
            this.categories = res.data.data
          })
          .catch(err=>{
            console.log(err)
          })
    },
    storeBrand: function (){
      let formData = new FormData(this.$refs.createBrand)
      axios.post(this.getUrl('brand'),formData)
          .then(res=>{
            this.$store.dispatch('showSuccessAlert')
            this.$refs.createBrand.reset()
            this.is_create = false
            this.getBrand()
          })
          .catch(err=>{
            this.$store.dispatch('showErrorAlert')
          })
    },
    editBrand: function (data){
      this.edit_brand = data
      this.is_edit = true
    },
    updateBrand: function (id){
      let formData = new FormData(this.$refs.editBrand)
      formData.append('_method','PATCH')
      axios.post(this.getUrl('brand/'+id),formData)
          .then(res=>{
            this.$store.dispatch('showSuccessAlert')
            this.$refs.editBrand.reset()
            this.edit_brand = ''
            this.is_edit= false
            this.getBrand()
          })
          .catch(err=>{
            this.$store.dispatch('showErrorAlert')
          })
    },
  },
  mounted() {
    this.getBrand()
    this.getCategories()
  }
}
</script>

<style scoped>

</style>