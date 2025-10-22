<script setup>
import Review_content from "@/components/Review_content.vue";
import Header_w from "@/components/Header_w.vue";
import Footer_w from "@/components/Footer_w.vue";
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
          <p>리뷰 작성 혜택!!</p>
        </div>
        <!-- 쿠폰 img-->
        <div class="review-div">
          <img src="/images/coupon.png" alt="1회 케어 무상제공" />
        </div>

        <!-- 이동버튼 -->
        <div class="review-div">
          <div class="glass-btn">
            <p>리뷰 작성 하고 쿠폰 받기</p>
            <img src="/images/download.svg" alt="리뷰쓰고 쿠폰 다운" />
          </div>
        </div>
        <!--  -->
      </div>
      <!-- 푸터 -->
    </div>
  </div>

  <Review_content />
  <Footer_w />
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
    height: 974px;
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

// banner ============================================
.banner {
  display: flex;
  flex-direction: column;
  gap: 50px;
  text-align: center;
  margin: 60px auto;
  .review-div {
    img {
      width: 43%;
    }
    p {
      font-size: $main-title;
      font-weight: 700;
      color: #fff;
    }
    .glass-btn {
      margin: auto;
      position: relative;
      height: 90px;
      width: 530px;
      padding: 0 30px;
      border-radius: 50px;
      border: 1px solid transparent;
      background: transparent;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 0 0 0.5px $bd-alpha inset, 0 6px 24px rgba(97, 188, 225, 0.1); /* 외곽선 느낌을 조금 더 선명하게 */
      cursor: pointer;
      color: $grey-color;
      font-size: $esti-large-txt;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;

      p {
        font-size: 30px;
      }

      img {
        width: 10%;
      }

      &::after {
        content: "";
        position: absolute;
        inset: 1px 1px auto 1px;
        height: 90%;
        border-radius: 50px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
        pointer-events: none;
      }

      &:hover {
        color: #061c34;
        background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)) padding-box,
          $border-grad border-box;
        box-shadow: 0 0 0 0.5px $bd-alpha inset, 0 8px 28px rgba(33, 150, 243, 0.28),
          /* 블루 글로우 */ 0 6px 24px rgba(0, 0, 0, 0.25);
        transform: translateY(-1px);
      }
    }
  }
}

// 반응형
@media screen and (max-width: 768px) {
  .review {
    &_top {
      height: 600px;
    }
    .banner {
      gap: 30px;
      .review-div {
        padding: 0;
        img {
          width: 40%;
        }
        p {
          font-size: 30px;
          // margin-top: 10px;
        }
        .glass-btn {
          width: 300px;
          height: 50px;
          p {
            font-size: 18px;
          }
          img {
            width: 10%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 390px) {
  .review {
    &_top {
      height: 400px;
    }
    .banner {
      gap: 20px;
      margin: 20px auto;
      .review-div {
        img {
          width: 60%;
        }
        p {
          font-size: 20px;
          margin-top: 3px;
        }
        .glass-btn {
          width: 230px;
          height: 40px;
          p {
            font-size: 14px;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
