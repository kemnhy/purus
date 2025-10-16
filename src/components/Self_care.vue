<template>
  <div class="care-wrap" ref="selfRef">
    <div class="inner">
      <div class="inner-2">
        <div class="header">
          <img src="/images/logo.png" alt="Purus" class="logo" />
          <p class="sub">나혼자서 케어 UP!</p>
        </div>

        <div class="progress">
          <div class="bar bar-bg"></div>
          <div class="bar bar-active" :style="{ width: progressWidth }">
            <span class="txt">{{ Math.floor(progress) }}%</span>
          </div>
        </div>

        <div class="grid">
          <div
            class="card"
            v-for="(item, i) in cards"
            :key="i"
            @mouseenter="activeIndex = i"
            @mouseleave="activeIndex = null"
          >
            <h3 class="title">{{ item.title }}</h3>
            <div class="img" :class="{ lastCard: i === 3 }">
              <img :src="item.img" :alt="item.title" />
            </div>
            <!-- 설명 박스 (hover 시 옆에 나타남) -->
            <div class="hover-desc" v-if="activeIndex === i">
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div class="notice"><span class="arrow">▲</span> 카드에 마우스를 올려보세요 !</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const activeIndex = ref(null)
const isActive = ref(false);
const selfRef = ref(null);
const progress = ref(0);
const progressWidth = computed(() => `${Math.floor(progress.value)}%`);
const handleScroll = () => {
  if (!selfRef.value) return;
  const rect = selfRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight * 0.3) {
    isActive.value = true;
  }
};
//
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
//
const animateProgress = () => {
  const duration = 3000;
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    progress.value = Math.min((elapsed / duration) * 100, 100);
    if (elapsed < duration) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
};
watch(isActive, (val) => {
  if (val) {
    animateProgress();
  }
});

const cards = ref([
  {
    title: "일일 케어",
    img: "/images/self_care1.png",
    desc: "얼음을 모두 버리고, 통을 깨끗한 물로 헹궈주세요. 부드러운 천에 중성세제를 묻혀 표면을 닦고 마무리합니다.",
  },
  {
    title: "주간 케어",
    img: "/images/self_care2.png",
    desc: "뒷면 필터를 분리 후 먼지를 청소기로 제거해주세요. 냄새가 나면 즉시 얼음을 버리고 물을 교체하세요.",
  },
  {
    title: "월간 케어",
    img: "/images/self_care3.png",
    desc: "호스 연결 부위에 물샘이 없는지 확인하고, 전용 세정제를 사용해 내부를 세척해주세요.",
  },
  {
    title: "주의/알림 섹션",
    img: "/images/self_care4.png",
    desc: "정기 점검은 반드시 전문가에게 의뢰하고, 얼음이 덜어졌을 때 필터 막힘 가능성을 확인하세요.",
  },
]);
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.care-wrap {
  background: #f7faff;
  // min-height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  padding: $web-spacing 0;
  .inner {
    background-color: #fff;
    border-radius: 60px;
    .inner-2 {
      width: 800px; // 카드+설명 여유 공간 확보
      text-align: center;
      position: relative;
      margin: auto;
      padding: 80px 0;
    }

    .header {
      margin-bottom: 40px;

      .logo {
        width: 170px;
        display: block;
        margin: 0 auto 8px;
      }

      .sub {
        font-size: $medium-txt-1;
        font-weight: bold;
        color: $point-color;
      }
    }

    .progress {
      position: relative;
      width: 100%;
      height: 50px;
      background: #efefef;
      border-radius: 25px;
      margin-bottom: 50px;
      overflow: hidden;

      .bar {
        height: 100%;
        border-radius: 25px;
        position: absolute;
        top: 0;
        left: 0;
      }

      .bar-active {
        background: linear-gradient(90deg, #80bfff, #4a90e2);
        transition: width 0.3s ease;

        .txt {
          position: absolute;
          top: 0;
          display: flex;
          align-items: center;
          height: 100%;
          right: 0;
          transform: translateX(-50%);
          font-weight: bold;
          color: #fff;
          line-height: 36px;
          font-size: $small-txt;
        }
      }
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      // grid-template-columns: repeat(2, 350px);
      width: 100%;
      gap: 30px;
      margin-bottom: 50px;
      justify-content: center;
      align-items: center;
      position: relative;
      // 카드 호버 햇을때
      .card {
        position: relative;
        background: $sub-color;
        border-radius: 20px;
        padding: 40px 25px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        width: calc((100% - 30px) / 2);
        height: 445px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: $medium-txt-2;
          font-weight: bold;
          color: #1a2c5b;
          margin-bottom: 20px;
        }

        .img {
          width: 80%;
          &.lastCard {
            img {
              padding: 20px;
            }
          }
          img {
            width: 100%;
            // height: auto;
            aspect-ratio: 1 / 1;
            object-fit: contain;
          }
        }
      }
      .hover-desc {
        position: absolute;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 30px;
        display: flex;
        align-items: center;
        font-size: $small-txt;
        line-height: 1.8;
        border-radius: 20px;
      }
    }

    @keyframes fadeIn {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .notice {
      font-size: $medium-txt-2;
      color: $font-color;
      .arrow {
        font-size: $small-txt;
        font-weight: bold;
        margin-right: 4px;
      }
    }
  }
}
</style>
