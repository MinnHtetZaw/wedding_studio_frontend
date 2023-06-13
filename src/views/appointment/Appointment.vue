<template>
  <Master>
    <div class="row">
      <div class="col-12">
        <h5 class="mb-3 text-title">Appointment Lists</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card border-0">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="text-center">Date</th>
              <th class="text-center">Booking</th>
              <th colspan="2" class="text-center">Duration</th>
              <th class="text-center">Name</th>
              <th class="text-center">Phone</th>
              <th class="text-center">Package</th>
              <th class="text-center">Status</th>
              <th class="text-center">Confirm</th>
              <th class="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="appointment in appointments">
              <td class="text-center">{{appointment.date}}</td>
              <td class="text-center">{{appointment.booking}}</td>
              <td colspan="2" class="text-center">{{appointment.start}} to {{appointment.end}}</td>
              <td>{{appointment.name}}</td>
              <td class="text-center">{{appointment.phone}}</td>
              <td>{{appointment.package_id}}</td>

              <td class="text-center">
                <span v-if="appointment.status === '0'" class="badge rounded-pill bg-warning">
                  {{appointment.status_text}}
                </span>
                <span v-if="appointment.status === '1'" class="badge rounded-pill bg-success">
                  {{appointment.status_text}}
                </span>
                <span v-if="appointment.status === '2'" class="badge rounded-pill bg-danger">
                  {{appointment.status_text}}
                </span>

              </td>
              
              <td class="text-center">
               <button @click="confirm(appointment.id)" class="btn  btn-primary btn-sm">Confirm</button>
                <button @click="cancel(appointment.id)" class="ms-1 btn btn-danger btn-sm">Cancel</button>
              </td>
           
              <td class="text-center">
                <div class="d-flex gap-3 mt-2 align-items-center justify-content-center">
                  <i @click="detail(appointment.id)" type="button" class="fa-solid fa-info-circle text-primary"></i>
                  <i type="button" class="fa-solid fa-pen text-warning"></i>
                  <i @click="deleteAppointment(appointment.id)" type="button" class="fa-solid fa-trash text-danger"></i>
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
import router from "@/router";
export default {
  name: "Appointment",
  components: {Master},
  data() {
    return {
      appointments: {},

    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getAppointments: function () {
      axios.get(this.getUrl('appointment'))
      .then(res=>{
        this.appointments = res.data.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    detail : function(id){
      router.push({path: '/appointment/detail', query: {id} })
    },
    confirm : function(id){
      
      axios.post(this.getUrl('appointment/confirm/'+id))
      .then(res=>{
        console.log(res.data.update);
        this.$store.dispatch('showSuccessAlert')
        this.getAppointments()
      })
      .catch(err=>{
            this.$store.dispatch('showErrorAlert')
          })
    },
    cancel: function(id){
      axios.post(this.getUrl('appointment/cancel/'+id))
      .then(res=>{
        console.log(res.data.cancel);
        this.$store.dispatch('showSuccessAlert')
        this.getAppointments()
      })
      .catch(err=>{
        this.$store.dispatch('showErrorAlert')
      })
    },
    deleteAppointment: function(id){
     console.loge
      axios.delete(this.getUrl('appointment/'+id))
      .then(res=>{
        this.$store.dispatch('showSuccessAlert', res.data.data[0])
        this.getAppointments()
      })
       .catch(err=>{
        this.$store.dispatch('showErrorAlert')
      })
    }

  },
  mounted() {
    this.getAppointments()
  }
}
</script>

<style scoped>

</style>