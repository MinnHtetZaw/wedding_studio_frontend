<template>
  <div class="vh-100 side-nav">
    <div class="p-3">
      <div>

        <div class="text-white mb-3">
          <h6 class=""><i class="fa-solid fa-cart-shopping me-2"></i> INVENTORY </h6>
          <div class="px-4">
            <router-link class="side-nav-link mb-2 text-decoration-none d-block" to="/category">
              Category Lists
            </router-link>
            <router-link class="side-nav-link mb-2 text-decoration-none d-block" to="/dress">
              Dress Lists
            </router-link>
            <router-link class="side-nav-link mb-2 text-decoration-none d-block" to="/theme">
              Theme Lists
            </router-link>
            <router-link class="side-nav-link mb-2 text-decoration-none d-block" to="/package">
              Package Lists
            </router-link>
          </div>
        </div>

        <div class="text-white mb-3">
          <h6 class=""><i class="fa-solid fa-calendar me-2"></i> Appointment </h6>
          <div class="px-4">
            <router-link class="side-nav-link mb-2 text-decoration-none d-block" to="/appointment">
              Appointment Lists
            </router-link>
          </div>
        </div>

        <div class="text-white mb-3">
          <h6 class=""><i class="fa-solid fa-folder-open me-2"></i> Collection </h6>
          <div class="px-4">
            <router-link class="side-nav-link mb-2 text-decoration-none d-block" to="/collection">
              Collection Lists
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNav"
}
</script>

<style scoped>
.side-nav{
  background: #4b6cda;
}
.side-nav-link{
  font-size: 14px;
  color: #ffffff;
}
</style>