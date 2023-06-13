<template>
  <Master>
    <div class="row">
      <div class="col-4">
        <div class="card border-0 p-3">
          <h5 class="text-title mb-3">Package Information</h5>
          <div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Name</p>
              </div>
              <div class="col-6">
                <p>{{package.name}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Price</p>
              </div>
              <div class="col-6">
                <p>{{package.price}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Dress Type</p>
              </div>
              <div class="col-6">
                <p>{{package.dress_category}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">No of Dress</p>
              </div>
              <div class="col-6">
                <p>{{package.no_of_dress}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Theme Type</p>
              </div>
              <div class="col-6">
                <p>{{package.theme_category}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">No of Theme</p>
              </div>
              <div class="col-6">
                <p>{{package.no_of_theme}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">No of Retouched Photo</p>
              </div>
              <div class="col-6">
                <p>{{package.no_of_retouched_photo}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">No of Normal Photo</p>
              </div>
              <div class="col-6">
                <p>{{package.no_of_normal_photo}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Main Frame Size</p>
              </div>
              <div class="col-6">
                <p>{{package.main_frame_size}}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Description</p>
              </div>
              <div class="col-6">
                <p>{{package.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card p-3 border-0">
          <div class="mb-3">
            <h5 class="text-secondary mb-3">Available Dresses</h5>
            <div class="d-flex gap-4 flex-wrap">
              <div v-for="dress in available_dresses">
                <img :src="dress.photo" class="img" alt="">
                <p class="text-center text-muted my-2">{{dress.name}}</p>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <h5 class="text-secondary mb-3">Available Themes</h5>
            <div class="d-flex gap-4 flex-wrap">
              <div v-for="theme in available_themes">
                <img :src="theme.photo" class="img" alt="">
                <p class="text-center text-muted my-2">{{theme.name}}</p>
              </div>
            </div>
          </div>
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
  name: "PackageDetail",
  components: {Master},
  data() {
    return {
      package: {},
      available_dresses: {},
      available_themes: {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getPackage: function () {
      axios.get(this.getUrl('package/'+this.$route.query.id))
      .then(res => {
        this.package = res.data.data
        this.available_dresses = res.data.data.available_dresses
        this.available_themes = res.data.data.available_themes
      })
      .catch(err => console.log(err))
    }
  },
  mounted() {
    this.getPackage()
  }
}
</script>

<style scoped>
.img{
  width: 200px;
  border-radius: 7px;
  object-fit: cover;
}
</style>