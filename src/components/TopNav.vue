<template>
  <div class="navbar px-3 my-2 rounded">
      <div>
        <h5 class="text-white fw-normal mb-0">Photo Studio</h5>
      </div>
      <div class="d-flex gap-3 align-items-center">
        <div>
          <img src="../assets/user.png" style="width: 40px;height: 40px; border-radius: 50%;" alt="">
        </div>
        <h6 class="text-white mb-0">Name</h6>
      </div>

    </div>
<!--  <div class="navbar shadow mb-3">-->
<!--    <div class="container-fluid">-->
<!--      <router-link to="/dashboard" class="navbar-brand" href="#">-->
<!--        <div class="">-->
<!--        </div>-->
<!--      </router-link>-->
<!--      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
<!--        <span class="navbar-toggler-icon"></span>-->
<!--      </button>-->
<!--      <div class="collapse navbar-collapse" id="navbarSupportedContent">-->
<!--        <ul class="navbar-nav me-auto mb-2 mb-lg-0">-->

<!--          <li class="nav-item dropdown">-->
<!--            <a class="nav-link text-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">-->
<!--              Inventory-->
<!--            </a>-->
<!--            <ul class="dropdown-menu">-->
<!--              <li>-->
<!--                <router-link class="nav-link" aria-current="page" to="/category">-->
<!--                  Category Lists-->
<!--                </router-link>-->

<!--              </li>-->
<!--            </ul>-->
<!--          </li>-->
<!--          <li class="nav-item dropdown">-->
<!--            <a class="nav-link text-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">-->
<!--              Appointment-->
<!--            </a>-->
<!--            <ul class="dropdown-menu">-->
<!--              <li>-->
<!--                <router-link class="nav-link" aria-current="page" to="/appointment">-->
<!--                  Appointment List-->
<!--                </router-link>-->
<!--              </li>-->
<!--              <li>-->
<!--                <router-link class="nav-link" aria-current="page" to="/collection">-->
<!--                  Collection List-->
<!--                </router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </li>-->
<!--        </ul>-->

<!--      </div>-->
<!--      -->
<!--    </div>-->
<!--  </div>-->

</template>

<script>
export default {
  name: "TopNav",
  data() {
    return {
      user : JSON.parse(localStorage.getItem('user'))
    }
  },
}
</script>

<style scoped>
.navbar{
  background: #4b6cda;
}
</style>