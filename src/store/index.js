import { createStore } from 'vuex'
import Swal from "sweetalert2";

export default createStore({
  state: {
    url : 'http://127.0.0.1:8000/api/'
  },
  getters: {
    getUrl : (state) => (url) => state.url + url
  },
  mutations: {
  },
  actions: {
    showSuccessAlert (){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        html: 'Success'
      })
    },
    showErrorAlert (){
      Swal.fire({
        title: 'Error!',
        text: 'Something Wrong!',
        icon: 'error',
      })
    },
  },
  modules: {
  }
})
