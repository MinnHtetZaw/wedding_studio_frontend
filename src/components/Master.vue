<template>
  <div class="container-fluid">
    <div class="row p-0">
      <div class="col-2 p-0">
        <SideNav/>
      </div>
      <div class="col-10 px-0">
        <div class="px-3 vh-100 overflow-auto">
          <TopNav></TopNav>
          <div class="row">
            <div class="col-12">
              <slot></slot>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";
export default {
  name: "Master",
  components: {SideNav, TopNav}
}
</script>

<style scoped>

</style>