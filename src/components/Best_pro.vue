<template>
  <section class="best-pro">
    <div class="inner">
      <div class="title-box">
        <div class="title-top">
          <img src="/images/logo.png" alt="Purus 로고" />
          <h2>명예의 전당</h2>
        </div>
        <p class="desc">별 다섯 개의 기사님, 지금 만나보세요 !</p>
      </div>

      <!--  390px 이하 전용 -->
      <swiper
        v-if="isMobile"
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :space-between="20"
        :autoplay="{ delay: 1500, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :loop="true"
        class="mobile-swiper"
      >
        <swiper-slide v-for="(item, index) in items" :key="'mobile-' + index">
          <div class="pro-card">
            <h3 class="pro-title">{{ item.title }}</h3>
            <div class="pro-img-box">
              <img :src="item.image" alt="기사님 이미지" class="pro-img" />
            </div>
            <p class="pro-name">{{ item.name }}<span>기사님</span></p>
            <div class="line"></div>
            <div class="pro-detail">
              <div>
                <p>현장출동</p>
                <b>{{ item.activity }}</b>
              </div>
              <div>
                <p>총경력</p>
                <b>{{ item.career }}</b>
              </div>
              <div>
                <p>리뷰</p>
                <b>{{ item.review }}</b>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <!--  391~768px : 2개씩 슬라이드 + autoplay 추가됨 -->
      <swiper
        v-else-if="isTablet"
        :modules="[Pagination, Autoplay]"
        :slides-per-view="2"
        :space-between="20"
        :autoplay="{ delay: 1500, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :loop="true"
        class="tablet-swiper"
      >
        <swiper-slide v-for="(item, index) in items" :key="'tablet-' + index">
          <div class="pro-card">
            <h3 class="pro-title">{{ item.title }}</h3>
            <div class="pro-img-box">
              <img :src="item.image" alt="기사님 이미지" class="pro-img" />
            </div>
            <p class="pro-name">{{ item.name }}<span>기사님</span></p>
            <div class="line"></div>
            <div class="pro-detail">
              <div>
                <p>현장출동</p>
                <b>{{ item.activity }}</b>
              </div>
              <div>
                <p>총경력</p>
                <b>{{ item.career }}</b>
              </div>
              <div>
                <p>리뷰</p>
                <b>{{ item.review }}</b>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <!--  PC 버전 -->
      <div v-else class="pro-list">
        <div class="pro-card" v-for="(item, index) in items" :key="'pc-' + index">
          <h3 class="pro-title">{{ item.title }}</h3>
          <div class="pro-img-box">
            <img :src="item.image" alt="기사님 이미지" class="pro-img" />
          </div>
          <p class="pro-name">{{ item.name }}<span>기사님</span></p>
          <div class="line"></div>
          <div class="pro-detail">
            <div>
              <p>현장출동</p>
              <b>{{ item.activity }}</b>
            </div>
            <div>
              <p>총경력</p>
              <b>{{ item.career }}</b>
            </div>
            <div>
              <p>리뷰</p>
              <b>{{ item.review }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted } from "vue";

const items = [
  {
    image: "/images/img1.png",
    title: "제 얼굴을 걸고 청소합니다!",
    name: "진완벽 ",
    activity: "930회",
    career: "10년",
    review: "5.0",
  },
  {
    image: "/images/img2.png",
    title: "얼음만큼 투명한 서비스!",
    name: "최깨끗 ",
    activity: "987회",
    career: "9년",
    review: "5.0",
  },
  {
    image: "/images/img3.png",
    title: "신뢰할 수 있는 청소 퀄리티!",
    name: "김클린 ",
    activity: "887회",
    career: "9년",
    review: "5.0",
  },
];

const isMobile = ref(false);
const isTablet = ref(false);

const handleResize = () => {
  const width = window.innerWidth;
  isMobile.value = width <= 390;
  isTablet.value = width > 390 && width <= 768;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.best-pro {
  background-color: $main-color;
  padding: $web-spacing 0;
  text-align: center;

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .title-box {
    margin-bottom: 50px;

    .title-top {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      img {
        width: 200px;
      }

      h2 {
        font-size: $main-title;
        font-weight: bold;
        color: $point-color;
      }
    }

    .desc {
      font-size: $medium-txt-1;
      margin-top: 10px;
      font-weight: bold;
    }
  }

  .pro-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    justify-items: center;
  }

  .pro-card {
    background: #fff;
    border-radius: 30px;
    border: 1.5px solid #e5e8ef;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    padding: 42px;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    min-height: 460px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    }

    .pro-title {
      font-size: $medium-txt-2;
      font-weight: 500;
      color: $font-color;
      margin-bottom: 14px;
      line-height: 1.25;
      min-height: 52px;
    }

    .pro-img-box {
      width: 200px;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 18px;

      .pro-img {
        width: 100%;
        height: auto;
        object-fit: contain;
      }
    }

    .pro-name {
      color: $point-color;
      font-size: $medium-txt-2;
      font-weight: bold;

      span {
        color: #000;
        font-weight: 500;
        font-size: 22px;
      }
    }

    .line {
      width: 100%;
      height: 1px;
      margin: 30px 0;
      background-color: #e5e8ef;
    }

    .pro-detail {
      width: 100%;
      max-width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;

        p {
          font-size: $small-txt;
          font-weight: 500;
          margin-bottom: 6px;
        }

        b {
          color: $point-color;
          font-size: $medium-txt-2;
          font-weight: 700;
        }
      }
    }
  }

  /* ✅ 391~768px : 스와이퍼 카드 2개씩 */
  @media (max-width: 768px) {
     
      padding: $tab-spacing 0;
      .inner {
        padding: 0 16px;
        .title-box {
          margin-bottom: 40px;

          .title-top img {
            width: 160px;
          }

          .title-top h2 {
            font-size: $medium-txt-2;
          }

          .desc {
            font-size: $small-txt;
          }
        }

        .tablet-swiper {
          padding-bottom: 40px;
        }

        .pro-card {
          max-width: 100%;
          padding: 30px 20px;
          border-radius: 24px;
          min-height: 420px;

          .pro-title {
            font-size: 16px;
            min-height: 46px;
          }

          .pro-img-box {
            width: 160px;
            margin-bottom: 14px;
          }

          .pro-name {
            font-size: 18px;
            span {
              font-size: 16px;
            }
          }

          .pro-detail {
            max-width: 100%;
            div {
              p {
                font-size: 13px;
              }
              b {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  

  /* ✅ 390px 이하 전용 */
  @media (max-width: 390px) {
    padding: 30px 0;

    .title-box {
      margin-bottom: 30px;

      .title-top {
        flex-direction: column;
        gap: 10px;

        img {
          width: 120px;
        }

        h2 {
          font-size: 22px;
          font-weight: bold;
        }
      }

      .desc {
        font-size: 16px;
        margin-top: 6px;
      }
    }

    .mobile-swiper {
      padding-bottom: 40px;
    }

    .pro-card {
      padding: 30px 20px;
      border-radius: 20px;
      min-height: auto;

      .pro-title {
        font-size: 16px;
        min-height: auto;
      }

      .pro-img-box {
        width: 150px;
        margin-bottom: 12px;
      }

      .pro-name {
        font-size: 18px;
        span {
          font-size: 16px;
        }
      }

      .line {
        margin: 20px 0;
      }

      .pro-detail {
        max-width: 100%;
        justify-content: space-around;

        div {
          flex: 1;
          p {
            font-size: 12px;
            margin-bottom: 4px;
          }
          b {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
