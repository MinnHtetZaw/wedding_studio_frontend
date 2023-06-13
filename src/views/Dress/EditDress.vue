<template>
  <Master>
    <div class="row">
      <div class="col-12">
        <div>
          <h5 class="text-title">Edit Dress</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="card p-3 rounded border-0">
          <div v-if="dress.photo != null">
            <div class="d-flex justify-content-center mb-3">
              <img :src="dress.photo" style="width: 300px;" class="rounded" alt="">
            </div>
            <div class="d-flex justify-content-center">
              <button @click="deletePhoto(dress.id)" class="btn btn-sm btn-danger">Delete Photo
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
          <form @submit.prevent="" ref="updateDress" enctype="multipart/form-data">
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label small text-secondary">Category</label>
                  <select name="category_id" class="form-select form-select-sm">
                    <option value="">Select Category</option>
                    <option :selected="dress.category_id === category.id" :value="category.id" v-for="category in categories">{{category.name}}</option>
                  </select>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label small text-secondary">Choose Type</label>
                  <select name="type" class="form-select form-select-sm">
                    <option value="">Select Type</option>
                    <option :selected="dress.type === 'Traditional'" value="Traditional">Traditional</option>
                    <option :selected="dress.type === 'Western'" value="Western">Western</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label small text-secondary">Code</label>
                  <textarea name="code" rows="1" class="form-control form-control-sm" :value="dress.code"></textarea>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label small text-secondary">Name</label>
                  <textarea name="name" rows="1" class="form-control form-control-sm" :value="dress.name"></textarea>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">Current Qty</label>
              <input type="number" name="current_qty" class="form-control form-control-sm" :value="dress.current_qty">
            </div>
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label small text-secondary">Purchase Price</label>
                  <input type="number" name="purchase_price" class="form-control form-control-sm" :value="dress.purchase_price">
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label small text-secondary">Selling Price</label>
                  <input type="number" name="selling_price" class="form-control form-control-sm" :value="dress.selling_price">
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">Supplier</label>
              <textarea name="supplier" rows="1" class="form-control form-control-sm" :value="dress.supplier"></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label small text-secondary">Description</label>
              <textarea name="description" rows="2" class="form-control form-control-sm" :value="dress.description"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">Photo</label>
              <input type="file" name="photo" class="form-control form-control-sm">
            </div>
            <div class="d-flex justify-content-center gap-4">
              <button @click="cancelEdit(dress.id)" class="w-100 btn btn-sm btn-danger">Cancel</button>
              <button @click="updateDress(dress.id)" class="w-100 btn btn-sm btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/components/Master";
import axios from "axios";
import {mapGetters} from "vuex";
import router from "@/router";
export default {
  name: "EditDress",
  components: {Master},
  data() {
    return {
      dress: {},
      categories: {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getDress: function (id = this.$route.query.id){
      axios.get(this.getUrl('dress/'+id))
      .then(res => {
        this.dress = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCategories : function (){
      axios.get(this.getUrl('category'))
          .then(res => {
            this.categories = res.data.data.filter(el => el.type === 'Dress')
          })
          .catch(err => {
            console.log(err)
          })
    },
    cancelEdit: function (){
      router.push({path: '/dress'})
    },
    updateDress: function (id){
      let formData = new FormData(this.$refs.updateDress)
      formData.append('_method','PATCH')
      axios.post(this.getUrl('dress/'+id),formData)
      .then(res => {
        this.$store.dispatch('showSuccessAlert')
        this.$refs.updateDress.reset()
        this.getDress()
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
      axios.post(this.getUrl('dress/'+id),formData)
          .then(res => {
            this.$store.dispatch('showSuccessAlert')
            this.getDress()
          })
          .catch(err => {
            this.$store.dispatch('showErrorAlert')
            console.log(err)
          })
    }
  },
  mounted() {
    this.getDress()
    this.getCategories()
  }
}
</script>

<style scoped>

</style>