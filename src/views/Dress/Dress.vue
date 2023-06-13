<template>
  <Master>
    <div v-if="is_create === false" class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between mb-3 align-items-center">
          <h5 class="text-title">Dress Lists</h5>
          <button @click="is_create = true" class="text-primary btn">
            Add Dress <i class="fa-solid fa-plus ms-2"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="is_create == true" class="row">
      <div class="col-12 m-auto">
        <div class="col-4 m-auto">
          <div class="card mb-3 p-3 shadow-sm border-0 rounded">
            <div class="d-flex  mb-3 justify-content-between align-items-center">
              <h6 class=" text-secondary mb-0">Create Dress</h6>
              <button @click="is_create = false" class="btn btn-sm btn-close"></button>
            </div>
            <form @submit.prevent="" ref="storeDress" enctype="multipart/form-data">
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">Category</label>
                    <select name="category_id" class="form-select form-select-sm">
                      <option value="">Select Category</option>
                      <option :value="category.id" v-for="category in categories">{{category.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">Choose Type</label>
                    <select name="type" class="form-select form-select-sm">
                      <option value="">Select Type</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Western">Western</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">Code</label>
                    <textarea name="code" rows="1" class="form-control form-control-sm"></textarea>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">Name</label>
                    <textarea name="name" rows="1" class="form-control form-control-sm"></textarea>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Current Qty</label>
                <input type="number" name="current_qty" class="form-control form-control-sm">
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">Purchase Price</label>
                    <input type="number" name="purchase_price" class="form-control form-control-sm">
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label small text-secondary">Selling Price</label>
                    <input type="number" name="selling_price" class="form-control form-control-sm">
                  </div>
                </div>
              </div>


              <div class="mb-3">
                <label class="form-label small text-secondary">Supplier</label>
                <textarea name="supplier" rows="1" class="form-control form-control-sm" ></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Photo</label>
                <input type="file" name="photo" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label class="form-label small text-secondary">Description</label>
                <textarea name="description" rows="2" class="form-control form-control-sm" ></textarea>
              </div>
              <button @click="storeDress" class="w-100 btn btn-sm btn-primary">Save</button>
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
            <th class="text-center">Photo</th>
            <th class="text-center">Code</th>
            <th class="text-center">Name</th>
            <th class="text-center">Type</th>
            <th class="text-center">Category</th>
            <th class="text-center">Purchase Price ( MMK )</th>
            <th class="text-center">Selling Price ( MMK )</th>
            <th class="text-center">Supplier</th>
<!--            <th class="text-center">Description</th>-->
            <th class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-center" v-for="dress in dresses">
            <td class="">{{dress.id}}</td>
            <td class="">
              <img :src="dress.photo" class="rounded" style="width: 100px; height: 100px;object-fit: cover;" alt="">
            </td>
            <td class="">{{dress.code}}</td>
            <td class="">{{dress.name}}</td>
            <td class="">{{dress.type}}</td>
            <td class="">{{dress.category}}</td>
            <td class="">{{dress.purchase_price}}</td>
            <td class="">{{dress.selling_price}}</td>
            <td class="">{{dress.supplier}}</td>
<!--            <td style="width: 300px;" class="">{{dress.description}}</td>-->
            <td>
              <div class="d-flex mt-2 gap-4 align-items-center justify-content-center">
                <i @click="editDress(dress.id)" type="button" class="fa-solid fa-pen text-warning"></i>
                <i @click="deleteDress(dress.id)" type="button" class="fa-solid fa-trash text-danger"></i>
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
  name: "Dress",
  components: {Master},
  data() {
    return {
      dresses: {},
      categories: {},
      is_create: false,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getDresses : function (){
      axios.get(this.getUrl('dress'))
      .then(res => {
        this.dresses = res.data.data
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
    storeDress : function (){
      let formData = new FormData(this.$refs.storeDress)
      axios.post(this.getUrl('dress'),formData)
      .then(res=>{
        this.$refs.storeDress.reset()
        this.is_create = false
        this.$store.dispatch('showSuccessAlert')
        this.getDresses()

      })
      .catch(err => {
        console.log(err)
      })
    },
    editDress : function (id){
      router.push({path: '/editDress',query: {id}})
    },
    deleteDress : function (id){
      if (confirm('Please Confirm to Delete!') === true){
        axios.delete(this.getUrl('dress/'+id))
            .then(res => {
              this.$store.dispatch('showSuccessAlert')
              this.getDresses()
            })
            .catch(err => {
              console.log(err)
            })
      }

    }
  },
  mounted() {
    this.getCategories()
    this.getDresses()
  }
}
</script>

<style scoped>

</style>