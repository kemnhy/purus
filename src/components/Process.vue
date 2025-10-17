<template>
  <div class="process-wrap" ref="processRef">
    <div class="inner">
      <h2 class="title">청소 과정 한눈에</h2>
      <div class="slide-wrap">
        <ul class="process">
          <li
            :class="[{ click: current === index }]"
            v-for="(pro, index) in process"
            :key="pro.id"
            @click="handleClick(index)"
          >
            {{ pro.id }} {{ pro.title }}
          </li>
        </ul>
        <div class="slide">
          <ul class="slide-list">
            <li
              v-for="(image, index) in processImg"
              :key="image.img"
              :style="{
                opacity: current === index ? 1 : 0,
                visibility: current === index ? 'visible' : 'hidden',
                transition: 'opacity 0.5s ease',
              }"
            >
              <img :src="image.img" :alt="image.alt" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const current = ref(0);
const process = [
  { id: "01", title: "제품 완전 분해" },
  { id: "02", title: "전용 세정제로 세척" },
  { id: "03", title: "고압 스팀 살균 세척" },
  { id: "04", title: "친환경 UV 살균 소독" },
  { id: "05", title: "제품 조립" },
  { id: "06", title: "테스트 작동" },
];
const processImg = [
  { img: "/images/process2.png", alt: "process1" },
  { img: "/images/process1.png", alt: "process2" },
  { img: "/images/process3.png", alt: "process3" },
  { img: "/images/process4.png", alt: "process4" },
  { img: "/images/process5.png", alt: "process5" },
  { img: "/images/process6.png", alt: "process6" },
];
// slide
let interval = null;
let inProcess = false;
let clickTimeout = null;

const processRef = ref(null);
const startSlide = () => {
  clearInterval(interval);
  current.value = 0;
  interval = setInterval(() => {
    current.value = (current.value + 1) % process.length;
  }, 2000);
};
const stopSlide = () => {
  clearInterval(interval);
  current.value = 0;
  inProcess = false;
};
// handleClick
const handleClick = (index) => {
  clearInterval(interval);
  clearTimeout(clickTimeout);

  current.value = index;

  clickTimeout = setTimeout(() => {
    startSlide();
    current.value = index;
  }, 500);
};
const handleScroll = () => {
  if (!processRef.value) return;
  const rect = processRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;

  if (isVisible && !inProcess) {
    inProcess = true;
    startSlide();
  }
  if (!isVisible && inProcess) {
    stopSlide();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
onBeforeUnmount(() => {
  clearInterval(interval);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.process-wrap {
  padding-bottom: $web-spacing;
  .inner {
    .title {
      text-align: center;
      font-size: $main-title;
      margin-bottom: 60px;
    }
    .slide-wrap {
      width: 100%;
      height: 500px;
      display: flex;
      border-radius: 30px;
      overflow: hidden;
      .process {
        width: 40%;
        height: 100%;
        li {
          cursor: pointer;
          width: 100%;
          height: calc(100% / 6);
          display: flex;
          align-items: center;
          font-size: $medium-txt-2;
          font-weight: 500;
          color: $font-color;
          background-color: $main-color;
          padding-left: 46px;
          transition: all 0.2s ease;
          &.click {
            background-color: #daecf8;
            font-weight: bold;
            font-size: 28px;
          }
        }
      }
      .slide {
        width: 60%;
        height: 100%;
        .slide-list {
          width: 100%;
          height: 100%;
          position: relative;
          li {
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
