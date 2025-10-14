<template>
  <div class="review-Wrap">
    <!-- <div><Event_modal /></div> -->
    <div class="inner">
      <div class="review-top-banner">
        <!-- <div class="top-star-bg"">별</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Event_modal from "@/components/Event_modal.vue";
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.review-Wrap {
  .inner {
    border: 1px solid #f00;
    align-items: center;
    .review-top-banner {
      background-color: #061c34;
      // flex-shrink: 0;
    }

    .top-star-bg {
      //  z-index: 99999;
      // background-color: ;
      background-image: url("/public/images/eventModal_star_2x.png");
    }
  }
}
</style>
