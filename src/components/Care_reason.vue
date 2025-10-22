<template>
  <div class="care-wrap inner">
    <div class="care-title">
      <h2>제빙기 케어는 왜, 필요할까요?</h2>
      <p><span>깨끗한 얼음</span>은 보이지 않는 곳부터</p>
    </div>
    <div class="card-wrap">
      <div v-for="item in cares" :key="item.id" class="card web-tab">
        <img :src="item.img" :alt="item.name" />
        <div class="gradient"></div>
        <p>{{ item.dscr }}</p>
      </div>
      <!-- mobile swiper -->
      <div class="swiper care-swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide card swiper-card"
            v-for="item in cares"
            :key="item.id"
          >
            <img :src="item.img" :alt="item.name" />
            <div class="gradient"></div>
            <p>{{ item.dscr }}</p>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
import Swiper from "swiper";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

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
// swiper
let swiperInstance = null;
const handleSwiper = async () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 450) {
    if (!swiperInstance) {
      await nextTick();
      swiperInstance = new Swiper(".care-swiper", {
        modules: [EffectCoverflow, Navigation, Autoplay],
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        spaceBetween: -80,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 200,
          scale: 0.5,
          modifier: 1,
          slideShadows: false,
        },
        navigation: {
          nextEl: ".swiper-button-prev",
          prevEl: ".swiper-button-next",
        },
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        initialSlide: 0,
        breakpoints: {
          0: {
            spaceBetween: -130,
            coverflowEffect: {
              scale: 0.3,
            },
          },
          450: {
            spaceBetween: -80,
            coverflowEffect: {
              scale: 0.6,
            },
          },
        },
      });
    }
  } else {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }
};
//
onMounted(() => {
  handleSwiper();
  window.addEventListener("resize", handleSwiper);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleSwiper);
  // 스와이퍼 인스턴스가 남아있으면 파괴
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.care-wrap {
  padding: $web-spacing 0;
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
  .card-wrap {
    display: flex;
    justify-content: space-between;
    .care-swiper {
      display: none;
    }
    .card {
      width: 310px;
      margin-top: 60px;
      padding: 0px;
      border-radius: 25px;
      position: relative;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
      .gradient {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0) 60%
        );
      }
      p {
        width: 100%;
        position: absolute;
        font-size: $medium-txt-2;
        font-weight: 500;
        left: 0;
        bottom: 0;
        color: #fff;
        text-align: center;
        padding: 55px 0;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .care-wrap {
    padding: $tab-spacing 0;
    .care-title {
      h2 {
        font-size: $medium-txt-2;
      }
      p {
        font-size: $small-txt;
        margin-top: 8px;
      }
    }
    .card-wrap {
      .card {
        border-radius: 12px;
        margin-top: 30px;
        width: 145px;
        p {
          // width: 80%;
          font-size: 12px;
          padding: 25px 0;
        }
      }
    }
  }
}
@media screen and (max-width: 450px) {
  .care-wrap {
    padding: $mo-spacing 0;

    .care-title {
      h2 {
        font-size: 20px;
      }
      p {
        font-size: 12px;
        margin-top: 8px;
      }
    }
    .card-wrap {
      display: block;
      position: relative;
      .web-tab {
        display: none;
      }
      .care-swiper {
        overflow: visible !important;
        display: block;
        .swiper-wrapper {
          .swiper-slide {
            width: 200px;
            border-radius: 16px;
            overflow: hidden;
            img {
              width: 100%;
              object-fit: cover;
              display: block;
            }
            p {
              font-size: 16px;
              padding: 25px 0;
            }
          }
          .swiper-slide-active {
            transform: scale(1.05);
            z-index: 2;
          }
          .swiper-slide-next,
          .swiper-slide-prev {
            opacity: 1;
          }

          .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(
              .swiper-slide-prev
            ) {
            opacity: 0;
            pointer-events: none;
          }
        }
        .swiper-button-prev {
          line-height: 1;
          position: absolute;
          top: 50%;
          right: -12%;
          z-index: 10;
          opacity: 0.4;
        }
        .swiper-button-next {
          line-height: 1;
          position: absolute;
          top: 50%;
          left: -12%;
          transform: rotate(180deg);
          z-index: 10;
          // border: 1px solid #aaa;
          // padding: 4px 8px 4px 10px;
          // border-radius: 30px;
          opacity: 0.4;
        }
      }
    }
  }
}
</style>
