<template>
  <section class="real-review">
    <div class="inner">
      <div class="title-box">
        <div class="stars">★★★★★</div>
        <h2 class="title">사장님 리얼 리뷰</h2>
      </div>

      <!-- 일반 레이아웃 (768px 이상) -->
      <div class="review-list" v-if="!isMobile">
        <div
          class="review-item"
          v-for="(review, index) in reviews"
          :key="index"
          :class="{ reverse: index % 2 === 1 }">
          <div class="img-box">
            <img :src="review.image" alt="리뷰 이미지" />
          </div>
          <div class="text-box">
            <div class="rating">
              ★★★★★
              <span>{{ review.star }}</span>
            </div>
            <p class="desc">“{{ review.text }}”</p>
            <p class="writer">- {{ review.writer }}</p>
          </div>
        </div>
      </div>

      <!-- 390px 이하에서 Swiper 작동 -->
      <div class="review-swiper" v-else>
        <Swiper
          :modules="[Autoplay]"
          direction="vertical"
          :slides-per-view="3"
          :space-between="10"
          :loop="true"
          :allowTouchMove="false"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
          }"
          :speed="1500"
          class="reviewSwiper">
          <SwiperSlide v-for="(review, index) in reviews" :key="index">
            <div class="review-item">
              <div class="img-box">
                <img :src="review.image" alt="리뷰 이미지" />
              </div>
              <div class="text-box">
                <p class="desc">“{{ review.text }}”</p>
                <p class="writer">- {{ review.writer }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const reviews = [
  {
    image: "/images/Real-riv.png",
    text: "예전엔 얼음에서 약간 비린내가 났는데,청소 받고 나니 완전히 없어졌습니다.고객들도 음료 맛이 깔끔해졌다고 해요.",
    writer: "네이버 yg***님",
  },
  {
    image: "/images/Real_review2.png",
    text: "청소 서비스를 받은 후에는 잡내가 싹 사라지고,얼음이 투명하게 맑아져서 음료 퀼리티가 달라졌습니다.",
    writer: "네이버 dm***님",
  },
  {
    image: "/images/Real-riv3.png",
    text: "다른 업체도 알아봤는데,여기처럼 꼼꼼하게 청소해주는 곳은 처음입니다. 정기적으로 이용하고 싶어요.",
    writer: "네이버 nh***님",
  },
  {
    image: "/images/Real-riv4.png",
    text: "얼음에서 냄새가 사라지고,손님 반응이 확 달라졌습니다!",
    writer: "네이버 dy***님",
  },
];

const isMobile = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 390;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.real-review {
  display: flex;
  justify-content: center;
  padding: 100px 0;
  background-color: #f0faff;
}

.title-box {
  text-align: center;
  margin-bottom: 60px;
}
.stars {
  font-size: $main-title;
  color: $point-color;
  margin-bottom: 10px;
}
.title {
  font-size: $main-title;
  color: $font-color;
  font-weight: 700;
}
.review-list {
  display: flex;
  gap: 50px;
  flex-direction: column;
}
.review-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  overflow: hidden;

  &.reverse {
    flex-direction: row-reverse;
  }

  .img-box {
    flex: 1 1 40%;
    height: 330px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      /* cover: 비율 유지하며 박스 가득 채움(일부 잘릴 수 있음) */
      object-position: center; /* 중앙 기준으로 잘라짐, 필요하면 변경 */
    }
  }

  .text-box {
    flex: 1 1 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 50px;
  }
}

.rating {
  font-size: $small-txt;
  color: $point-color;
  margin-bottom: 10px;
  span {
    color: $sub-font-color;
    font-size: 16px;
    margin-left: 4px;
  }
}

.desc {
  font-size: $medium-txt-2;
  font-weight: 500;
  color: $font-color;
  margin-bottom: 16px;
  line-height: 1.4;
}
.writer {
  font-size: $small-txt;
  color: $sub-font-color;
}

/* 반응형 */
@media (max-width: 768px) {
  .inner {
    .title-box {
      margin-bottom: 30px;
      .stars {
        font-size: 28px;
        margin-bottom: 0;
      }
      .title {
        font-size: $medium-txt-2;
      }
    }
  }
  .real-review {
    padding: 50px 0 0;
    .review-list {
      gap: 30px;
      .review-item {
        .text-box {
          padding: 20px;
          .desc {
            font-size: 16px;
          }
          .writer {
            font-size: 14px;
          }
        }

        .img-box {
          height: 200px;
        }
      }
    }
  }
}

.review-swiper {
  width: 100%;
  .review-item {
    flex-direction: column;
    text-align: center;
  }
}
// 390px 일때
@media (max-width: 390px) {
  .inner {
    .title-box {
      margin-bottom: 24px;
      .stars {
        font-size: 20px;
      }
      .title {
        font-size: 20px;
      }
    }
  }

  .real-review {
    padding: 30px 0 0;
    .review-swiper {
      // width: 100% !important;
      max-width: 280px;
      margin: auto;

      .reviewSwiper {
        width: 100%;
        height: 400px; /* 세로 길이 - 한 번에 3개가 보일 만큼 */
        overflow: hidden;

        .review-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          text-align: center;
          border-radius: 15px;

          .text-box {
            padding: 20px 10px;
            height: 120px;
            .desc {
              font-size: 12px;
              margin-bottom: 5px;
            }
            .writer {
              font-size: 12px;
            }
          }
        }
      }

      .img-box {
        height: 120px !important;
        width: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          // border-radius: 50%;
        }
      }
    }
  }
}
</style>
