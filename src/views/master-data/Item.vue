<template>
  <Master>
    <div class="row">
      <div class="col-10 m-auto">
        <div class="d-flex align-items-center justify-content-between">
          <h6 class="text-secondary mb-0">Item List</h6>
          <button @click="is_create = true" class="btn btn-sm btn-primary">
            Add Item
            <i class="fa-solid fa-plus ms-2"></i>
          </button>
        </div>
      </div>

      <div v-if="is_create == true" class="row">
        <div class="col-3 m-auto">
          <div class="card p-3 shadow-sm border-0 rounded">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="fw-normal mb-3 text-secondary mb-0">Create Item</h6>
              <button @click="is_create = false" class="btn btn-close"></button>
            </div>
            <form @submit.prevent="" ref="createItem">
              <div class="mb-3">
                <label class="form-label"></label>
                <textarea name="" rows="1" class="form-control"></textarea>
              </div>
              <text-area label-name="Code" rows="1" name="code"></text-area>
              <text-area label-name="Name" rows="1" name="name"></text-area>
              <Select label-name="Choose Brand" option_name="Select Brand" name="brand_id">
                <option :value="brand.id" v-for="brand in brands">{{brand.name}}</option>
              </Select>
              <text-area label-name="Description" name="description"></text-area>
              <button @click="storeMedicine" class="w-100 btn btn-primary btn-sm">Save</button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="is_edit == true" class="row">
        <div class="col-3 m-auto">
          <div class="card p-3 shadow-sm border-0 rounded">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="fw-normal mb-3 text-secondary mb-0">Edit Medicine</h6>
              <button @click="is_edit = false" class="btn btn-close"></button>
            </div>
            <form @submit.prevent="" ref="editMedicine">
              <text-area label-name="Code" rows="1" name="code" :value="edit_medicine.code"></text-area>
              <text-area label-name="Name" rows="1" name="name" :value="edit_medicine.name"></text-area>
              <Select label-name="Choose Brand" option_name="Select Brand" name="brand_id">
                <option :selected="edit_medicine.brand_id == brand.id" :value="brand.id" v-for="brand in brands">{{brand.name}}</option>
              </Select>
              <text-area label-name="Description" name="description" :value="edit_medicine.description"></text-area>
              <button @click="updateMedicine(edit_medicine.id)" class="w-100 btn btn-success btn-sm">Update</button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="is_create == false && is_edit == false" class="col-8 m-auto">
        <div class="card p-0 border-0">
          <table class="table">
            <thead>
            <tr>
              <th class="text-secondary text-center">#</th>
              <th class="text-secondary text-center">Name</th>
              <th class="text-secondary text-center">Related Brand</th>
              <th class="text-secondary text-center">Description</th>
              <th class="text-secondary text-center">Unit List</th>
              <th class="text-secondary text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="medicine in medicines">
              <td class="text-center">{{medicine.id}}</td>
              <td class="">{{medicine.name}}</td>
              <td class="">{{medicine.brand_name}}</td>
              <td class="">{{medicine.description}}</td>
              <td class="text-center">
                <button @click="checkUnit(medicine.id)" class="btn btn-primary p-1 btn-sm">
                  <span style="font-size: 12px;">Check</span>
                </button>
              </td>
              <td>
                <div class="d-flex mt-2  m-auto gap-3 align-items-center justify-content-center">
                  <i @click="editMedicine(medicine)" type="button" class="fa-solid fa-pen text-warning"></i>
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
export default {
  name: "Item",
  components: {Master}
}
</script>

<style scoped>

</style>