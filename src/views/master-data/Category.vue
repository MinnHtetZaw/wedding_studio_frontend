<template>
  <Master>
    <div class="row">
      <div class="col-12">
        <h5 class="text-title mb-3">Category Lists</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <!--      table-->
          <div class="col-8">
            <div class="card p-0 border-0">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th class="text-center">#</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Type</th>
                  <th class="text-center">Description</th>
                  <th class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="category in categories">
                  <td class="">{{category.id}}</td>
                  <td class="">{{category.name}}</td>
                  <td class="">{{category.type}}</td>
                  <td class="">{{category.description}}</td>
                  <td>
                    <div class="d-flex mt-2 gap-4 align-items-center justify-content-center">
                      <i @click="editCategory(category)" type="button" class="fa-solid fa-pen text-warning"></i>
                      <i @click="deleteCategory(category.id)" type="button" class="fa-solid fa-trash text-danger"></i>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--      Create Edit-->
          <div class="col-4">
            <div v-if="is_create === true" class="card p-3 border-0">
              <h6 class="text-secondary mb-3">Create Category</h6>
              <form @submit.prevent="" ref="createCategory">
                <div class="mb-3">
                  <label class="form-label small text-secondary">Name</label>
                  <textarea name="name" rows="1" class="form-control form-control-sm"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label small text-secondary">Type</label>
                  <select name="type" class="form-select form-select-sm">
                    <option value="">Select Type</option>
                    <option value="Dress">Dress</option>
                    <option value="Theme">Theme</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label small text-secondary">Description</label>
                  <textarea name="description" rows="3" class="form-control"></textarea>
                </div>
                <button @click="storeCategory" class="w-100 btn btn-primary btn-sm">Save</button>
              </form>
            </div>
            <div v-if="is_create === false " class="card p-3 border-0">
              <h6 class="text-secondary mb-3">Edit Category</h6>
              <form @submit.prevent="" ref="updateCategory">
                <div class="mb-3">
                  <label class="form-label small text-secondary">Name</label>
                  <textarea name="name" rows="1" class="form-control form-control-sm" :value="edit_category.name"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label small text-secondary">Type</label>
                  <select name="type" class="form-select form-select-sm">
                    <option value="">Select Type</option>
                    <option :selected="edit_category.type === 'Dress'" value="Dress">Dress</option>
                    <option :selected="edit_category.type === 'Theme'" value="Theme">Theme</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label small text-secondary">Description</label>
                  <textarea name="description" rows="3" class="form-control" :value="edit_category.description"></textarea>
                </div>
                <div class="d-flex justify-content-center gap-4">
                  <button @click="is_create = true" class="btn btn-danger btn-sm">Cancel</button>
                  <button @click="updateCategory(edit_category.id)" class="btn btn-success btn-sm">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  </Master>

</template>

<script>
import {mapGetters} from "vuex";
import Master from "@/components/Master";
import axios from "axios";

export default {
  name: "Category",
  components: {Master},
  data() {
    return {
      is_create : true,
      categories : {},
      edit_category : {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getCategory: function (){
      axios.get(this.getUrl('category'))
          .then(res=>{
            this.categories = res.data.data
          })
          .catch(err=>{
            console.log(err)
          })
    },
    storeCategory: function (){
      let formData = new FormData(this.$refs.createCategory)
      axios.post(this.getUrl('category'),formData)
          .then(res=>{
            console.log(res.data.data)
            this.$store.dispatch('showSuccessAlert')
            this.$refs.createCategory.reset()
            this.getCategory()
          })
          .catch(err=>{
            this.$store.dispatch('showErrorAlert')
          })
    },
    editCategory: function (data){
      this.edit_category = data
      this.is_create = false
    },
    updateCategory: function (id){
      let formData = new FormData(this.$refs.updateCategory)
      formData.append('_method','PATCH')
      axios.post(this.getUrl('category/'+id),formData)
          .then(res=>{
            this.$store.dispatch('showSuccessAlert', res.data.data[0])
            this.$refs.updateCategory.reset()
            this.edit_category = ''
            this.is_create = true
            this.getCategory()
          })
          .catch(err=>{
            this.$store.dispatch('showErrorAlert')
          })
    },
    deleteCategory: function (id){
      if (confirm('Please Confirm to Delete!') === true){
        axios.delete(this.getUrl('category/'+id))
            .then(res=>{
              this.$store.dispatch('showSuccessAlert', res.data.data[0])
              this.getCategory()
            })
            .catch(err=>{
              this.$store.dispatch('showErrorAlert')
            })
      }

    },
  },
  mounted() {
    this.getCategory()
  }
}
</script>

<style scoped>

</style>