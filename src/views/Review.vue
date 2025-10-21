<script setup>
import Review_content from "@/components/Review_content.vue";
import Header_w from "@/components/Header_w.vue";
</script>

<template>
  <div class="review">
    <!-- 상단 배너 -->
    <div class="review_top">
      <!-- 헤더 -->
      <Header_w />
      <div class="inner banner">
        <!-- 리뷰 textbox -->
        <div class="review-div">
          <img src="/images/eventText.png" alt="리뷰 작성 혜택" />
        </div>
        <!-- 쿠폰 img-->
        <div class="review-div">
          <img src="/images/coupon.png" alt="1회 케어 무상제공" />
        </div>

        <!-- 이동버튼 -->
        <div class="review-div">
          <button class="glass-btn">
            리뷰 작성 하고 쿠폰 받기
            <img src="/images/download.svg" alt="리뷰쓰고 쿠폰 다운" />
          </button>
        </div>
        <!--  -->
      </div>
    </div>
  </div>

  <Review_content />
</template>

<style lang="scss" scoped>
@use "../assets/styles/_variables" as *;
// 버튼 그라데이션용 ===================================================
$bd-alpha: rgba(97, 188, 225, 0.5); // #61BCE1 50%
$g1: #92d3cd;
$g2: #76c6d3;
$g3: #62bde1;
$g4: #4da5e4;
// 테두리 그라데이션
$border-grad: linear-gradient(135deg, $g1 0%, $g2 25%, $g3 60%, $g4 100%);

.review {
  font-family: Pretendard;
  width: 100%;
  height: auto;
  position: relative;
  align-items: center;
  // background-color: $main-color;
  background-color: #fff;
  font-style: normal;

  &_top {
    position: relative;
    background-color: #061c34;
    max-height: 974px;
    min-height: 974px;
    display: block;

    // 별, 눈송이 등 배경 장식
    &::after {
      margin: 90px;
      // height: ;
      padding: 100px;
      content: "";
      position: absolute;
      inset: 0;
      background-image: url("/images/eventModal_star_4x.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      pointer-events: none;
      z-index: 0;
    }
  }
}

.review-div {
  padding: 25px;
}

// banner ============================================
.banner {
  padding: 30px;
  gap: 20px;
  text-align: center;
}

.glass-btn {
  height: 90px;
  width: 530px;
  padding: 0 30px;
  align-items: center;
  text-align: center;
  color: $grey-color;
  font-size: $esti-large-txt;
  gap: 15px;
  border-radius: 50px;
  border: 1px solid transparent;
  background: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 0 0 0.5px $bd-alpha inset, 0 6px 24px rgba(97, 188, 225, 0.1); /* 외곽선 느낌을 조금 더 선명하게 */
  cursor: pointer;

  /* 상단 유리 하이라이트 */
  &::after {
    content: "";
    position: absolute;
    inset: 1px 1px auto 1px;
    height: 90%;
    // height: 45%;
    border-radius: 50px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    pointer-events: none;
  }

  &:hover {
    color: #061c34;
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)) padding-box, $border-grad border-box;
    box-shadow: 0 0 0 0.5px $bd-alpha inset, 0 8px 28px rgba(33, 150, 243, 0.28), /* 블루 글로우 */ 0 6px 24px rgba(0, 0, 0, 0.25);
    transform: translateY(-1px);
  }
}
</style>
