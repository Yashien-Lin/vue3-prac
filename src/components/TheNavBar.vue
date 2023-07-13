<template>
  <nav class="navbar px-4">
    <a href="#" class="d-flex align-item-center justify-center text-decoration-none">
      <img class="me-2" src="@/assets/image/logo.svg" alt="logo">
      <h1 target="_blank" rel="noopener">{{companyName}}</h1>
    </a>
  </nav>
</template>

<script setup>
defineProps({
  companyName: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.navbar{
  background: #604C3F;
  margin-top: 0;
  height: 80px;
  h1 {
    font-size: 24px;
    color: #fff;
    letter-spacing: 3px;
    margin-bottom: 0;
  }
}
</style>