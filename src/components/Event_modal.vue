<template>
  <div class="card">
    <div class="star">
      <button class="btn down-coupon">버튼버튼</button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.card {
  //   background-color: #101010;
  //   z-index: 9999;

  .star {
    width: 100%;
    background-image: url("/public/images/eventModal_star_2x.png");
  }
}
</style>
