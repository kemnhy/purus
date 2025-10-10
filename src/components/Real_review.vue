<template>
  <div class="real-review">
    <div class="inner">
      <div class="title-box">
        <div class="stars">★★★★</div>
        <h2 class="title">사장님 리얼리뷰</h2>
      </div>
      <div class="review-list">
        <div class="review-item" v-for="(review,index) in review" :key="index"></div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
