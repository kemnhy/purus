<script setup>
import Header_w from "@/components/Header_w.vue";
// import Event_modal from "@/components/Event_modal.vue";
</script>

<template>
  <div class="review">
    <!-- <div><Event_modal /></div> -->
    <header class="review_header">
      <Header_w />
      <div class="hero container">
        <div class="hero__badge">WELCOME EVENT</div>
        <h1 class="hero__title">Purus<br />리뷰 작성 혜택</h1>
        <button class="hero__coupon" type="button">1회 리뷰 작성시 COUPON</button>
        <div class="hero__cta">
          <!-- <button class="hero__write">지금 바로 리뷰 쓰기</button> -->
          <button class="grp-review-btn">지금 바로 리뷰 쓰기</button>
          <!-- <div class="grp-review-btn">
          </div> -->
        </div>
      </div>
      <!-- <ReviewHero /> -->
    </header>

    <div class="inner"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.review {
  &_header {
    // 히어로 배경 높이: 시안상 974px
    position: relative;
    background-color: #061c34;
    min-height: 974px;
    // 별, 눈송이 등 배경 장식
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: url("/images/eventModal_star_2x.png"); // Vite 기준 public/images/* 경로
      background-repeat: no-repeat;
      background-position: center top;
      background-size: contain;
      pointer-events: none;
      z-index: 0;
    }
    // Header_w가 위에, Hero가 그 아래에 쌓이도록
    :deep(> *) {
      position: relative;
      z-index: 1;
    }
  }
}
.hero {
  color: #fff;
  padding-top: 120px;
  padding-bottom: 140px;
  text-align: center;

  &__badge {
    font-size: 14px;
    letter-spacing: 0.12em;
    opacity: 0.9;
  }
  &__title {
    margin-top: 12px;
    font-size: 56px;
    line-height: 1.1;
    font-weight: 800;
  }
  &__coupon {
    margin-top: 24px;
    padding: 12px 20px;
    border-radius: 999px;
  }
  &__cta {
    margin-top: 24px;
  }
  &__write {
    padding: 12px 18px;
    border-radius: 10px;
    background: #0ea5e9;
    color: #fff;
  }
}

.grp-review-btn {
  width: 100%;
  height: 89px;
  position: relative;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(97, 188, 225, 0.5);
  box-sizing: border-box;
  text-align: left;
  font-size: 30px;
  // font-family: Pretendard;
  text-align: center;
}
</style>
