<template>
    <Master>
      <div>
        <h5 class="text-title mb-3">Appointment Detail</h5>
      </div>
      <div class="row">
        <div class="col-10">
          <div class="card mb-3 p-3 border-0">
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Name</p>
              </div>
              <div class="col-6">
                <p>{{appointment.name}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Phone</p>
              </div>
              <div class="col-6">
                <p>{{appointment.phone}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Date</p>
              </div>
              <div class="col-6">
                <p>{{appointment.date}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Duration</p>
              </div>
              <div class="col-6">
                <p>{{appointment.start}} to {{appointment.end}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p class="fw-bold">Package</p>
              </div>
              <div class="col-6">
                <p>{{appointment.package_name}}</p>
              </div>
            </div>
            <div class="mb-3">
              <p>Dresses</p>
              <div class="d-flex flex-wrap gap-3">
                <div v-for="dress in dresses">
                  <img :src="dress.photo" class="rounded" style="width: 200px;" alt="">
                </div>
              </div>
            </div>

            <div class="mb-3">
              <p>Themes</p>
              <div class="d-flex flex-wrap gap-3">
                <div v-for="theme in themes">
                  <img :src="theme.photo" style="width: 200px;" class="rounded" alt="">
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
    name: "AppointmentDetail",
    components: {Master},
    data() {
      return {
        appointment: {},
        dresses: {},
        themes: {},
      }
    },
    computed: {
      ...mapGetters([
          'getUrl'
      ])
    },
    methods: {
      getAppointment: function () {
        axios.get(this.getUrl('appointment/'+this.$route.query.id))
        .then(res=>{
          this.appointment = res.data.data
          this.dresses = res.data.data.dresses
          this.themes = res.data.data.themes
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },
    mounted() {
      this.getAppointment()
    }
  }
  </script>
  <style scoped>
  </style>