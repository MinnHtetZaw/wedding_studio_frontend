<template>
  <Master>
    <div class="row">
      <div class="col-10 m-auto">
        <h5 class="text-secondary mb-3">Collection Lists</h5>

      </div>
      <div class="row">
        <div class="col-6 m-auto">
          <div class="card border-0 p-3">
            <div>
              <form @submit.prevent="" ref="collection" enctype="multipart/form-data">
                <div class="mb-3">
                  <label class="form-label">File Upload</label>
                  <input name="photo[]" multiple type="file" class="form-control">
                </div>
                <div class="mb-3">
                  <button @click="storeCollection" class="btn btn-primary w-100">Upload</button>
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
import Master from "@/components/Master";
import axios from "axios";
import {mapGetters} from "vuex";
export default {
  name: "Collection",
  components: {Master},
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['getUrl'])
  },
  methods: {
    storeCollection : function () {
      let formData = new FormData(this.$refs.collection)
      axios.post(this.getUrl('photo_collection'),formData)
      .then(res => {
        if (res.status === 200){
         this.$store.dispatch('showSuccessAlert')
        }
      })
      .catch(err => console.log(err))
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>