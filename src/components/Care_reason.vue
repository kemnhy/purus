<template>
  <div class="care-wrap inner">
    <!-- 타이틀  -->
    <div class="care-title">
      <h2>제빙기 케어는 왜, 필요할까요?</h2>
      <p><span>깨끗한 얼음</span>은 보이지 않는 곳부터</p>
    </div>

    <!-- 웹 / 태블릿용 카드 -->
    <div v-if="!isMobile" class="web-cards">
      <div v-for="item in cares" :key="item.id" class="card">
        <img :src="item.img" :alt="item.name" />
        <div class="gradient"></div>
        <p>{{ item.dscr }}</p>
      </div>
    </div>

    <!-- 모바일 Swiper -->
    <swiper
      v-else
      :modules="[EffectCoverflow, Autoplay]"
      effect="coverflow"
      :watch-slides-progress="true"
      :grab-cursor="true"
      :centered-slides="true"
      :loop="true"
      slides-per-view="auto"
      :autoplay="{
        delay: 1500,
        disableOnInteraction: false,
      }"
      :initialSlide="0"
      :coverflow-effect="{
        rotate: 0, // 좌우 회전각 
        stretch: 130, // 카드 간 거리
        depth: 200, // 깊이감 
        modifier: 1, // 효과 강도
        scale: 0.9, // 양옆 카드 축소 비율
        slideShadows: false,
      }"
      :breakpoints="{
        0: {
          coverflowEffect: { stretch: 130 },
        },
        400: {
          coverflowEffect: { stretch: 110 },
        },
      }"
      class="care-swiper"
    >
    <!-- swiper 카드 -->
      <swiper-slide v-for="item in cares" :key="item.id">
        <div class="card">
          <img :src="item.img" :alt="item.name" />
          <div class="gradient"></div>
          <p>{{ item.dscr }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// 카드 데이터
const cares = [
  {
    id: 1,
    name: "care1",
    img: "/images/care1.png",
    dscr: "세균과 곰팡이 번식",
  },
  {
    id: 2,
    name: "care2",
    img: "/images/care2.png",
    dscr: "얼음의 맛과 냄새 변화",
  },
  {
    id: 3,
    name: "care3",
    img: "/images/care3.png",
    dscr: "제빙기 수명 단축 방지",
  },
  { id: 4, name: "care4", img: "/images/care4.png", dscr: "고객 신뢰 유지" },
];

// 모바일 판단 (450px 이하에서 스와이퍼 적용)
const isMobile = ref(window.innerWidth <= 450);

// 사이즈 핸들러 (반응형 감지)
const handleResize = () => {
  isMobile.value = window.innerWidth <= 450;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.care-wrap {
  padding: $web-spacing 0;
  // 타이틀
  .care-title {
    text-align: center;
    h2 {
      font-size: $main-title;
    }
    p {
      font-size: $medium-txt-2;
      margin-top: 20px;
      span {
        font-weight: bold;
        color: $point-color;
      }
    }
  }
  // 웹 / 태블릿 카드
  .web-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 25px;
    margin-top: 60px;
    .card {
      position: relative;
      border-radius: 25px;
      overflow: hidden;
      // box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      cursor: pointer;
      padding: 0;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }

      .gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0) 60%
        );
      }

      p {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: #fff;
        font-weight: 500;
        font-size: $medium-txt-2;
        padding: 55px 0px;
        margin: 0;
        text-align: center;
      }
    }
  }

  // 모바일 swiper
  .care-swiper {
    margin-top: 50px;

    .swiper-slide {
      .card {
        padding: 0;
        width: 90%;
        height: auto;
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        margin: 0 auto;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }

        .gradient {
          position: absolute;
          inset: 0;

          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0) 60%
          );
        }

        p {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          color: #fff;
          font-weight: 600;
          font-size: $small-txt;
          padding: 20px 15px;
          margin: 0;
          text-align: center;
          line-height: 1.3;
        }
      }
    }
  }
}

// 태블릿 스타일
@media (max-width: 768px) {
  .care-wrap {
    padding: $tab-spacing 0;

    .care-title {
      h2 {
        font-size: $medium-txt-2;
        margin-bottom: 15px;
      }
      p {
        font-size: $small-txt;
        margin-top: 8px;
      }
    }

    .web-cards {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 8px;
      margin-top: 30px;

      .card {
        border-radius: 12px;
        p {
          font-size: 13px;
          padding: 25px 0;
        }
      }
    }
  }
}

// 모바일 스타일
@media (max-width: 450px) {
  .care-wrap {
    padding: $mo-spacing 0;

    .care-title {
      h2 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .care-swiper {
      margin-top: 24px;
      .swiper-wrapper {
        .swiper-slide {
          width: auto;
          overflow: hidden;
          transition: transform 0.3s, opacity 0.3s;
          .card {
            width: 200px;
            p {
              font-size: 16px;
              padding: 30px 0;
            }
          }
        }
        .swiper-slide-active {
          transform: scale(1.05);
          z-index: 3;
          opacity: 1;
        }
        .swiper-slide-prev,
        .swiper-slide-next {
          z-index: 2;
          opacity: 0.9;
          filter: blur(1px);
        }
        // 나머지 슬라이드는 완전히 숨김
        .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(
            .swiper-slide-next
          ) {
          opacity: 0 !important;
          pointer-events: none;
        }
      }
    }
  }
}
</style>
