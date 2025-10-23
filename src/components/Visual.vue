<template>
  <video src="/public/images/main_video.mp4" muted autoplay loop></video>
  <div class="visual inner">
    <div class="text-box">
      <p>제빙기 청소업체</p>
      <ul class="main-txt">
        <li
          v-for="(line, index) in visibleLine"
          :key="index"
          :class="{ fadeIn: activeLines[index] }"
          :style="{ transitionDelay: `${index * 0.3}s` }"
        >
          {{ line }}
        </li>
      </ul>
      <button class="btn" @click="goEstimate">나의 견적 알아보기</button>
    </div>
    <p class="scroll" :class="{ animate: allVisible === false }">
      스크롤하세요<span><i class="fa-solid fa-angle-down"></i></span>
    </p>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
const texts = [
  "청결은 선택이 아닌 필수,",
  "보이지 않는 곳까지 지켜 안심을 제공하는 것,",
  "그것이 퓨어러스가 만드는 가치입니다.",
];
const currentIndex = ref(0);
const wheelCount = ref(0);
const router = useRouter();
const visibleLine = ref([]);
const allVisible = ref(false);
const activeLines = ref(Array(texts.length).fill(false));
let intervalId = null;


const handleScroll = async (e) => {
  if (window.scrollY !== 0) return;

  if (e && e.deltaY > 0 && currentIndex.value < texts.length) {
    e.preventDefault();
    wheelCount.value++;
  }

  if (wheelCount.value >= 4) {
    const index = currentIndex.value;
    visibleLine.value.push(texts[index]);

    await nextTick();

    setTimeout(() => {
      activeLines.value[index] = true;
    }, 10);

    currentIndex.value++;
    wheelCount.value = 0;
  }
  if (currentIndex.value === texts.length && !allVisible.value) {
    allVisible.value = true;
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 800);
  }
};

onMounted(() => {
  // mobile(wheel X)
  const mobile = window.innerWidth <= 768;
  if (mobile) {
    visibleLine.value = [];
    activeLines.value = Array(texts.length).fill(false);
    currentIndex.value = 0;
    allVisible.value = false;
    document.body.style.overflow = "";

    // setInterval
    let index = 0;
    intervalId = setInterval(() => {
      if (currentIndex.value < texts.length) {
        const indexUpdate = currentIndex.value;
        visibleLine.value.push(texts[indexUpdate]);

        nextTick(() => {
          setTimeout(() => (activeLines.value[indexUpdate] = true), 20);
        });

        currentIndex.value++;
      } else {
        allVisible.value = true;
        clearInterval(intervalId);
        intervalId = null;
      }
    }, 500);
  } else {
    // web(wheel O)
    if (window.scrollY === 0) {
      document.body.style.overflow = "hidden";
      visibleLine.value = [];
      activeLines.value = Array(texts.length).fill(false);
      currentIndex.value = 0;
      allVisible.value = false;
    } else {
      visibleLine.value = [...texts];
      activeLines.value = Array(texts.length).fill(true);
      currentIndex.value = texts.length;
      allVisible.value = true;
    }
    window.addEventListener("wheel", handleScroll, { passive: false });
  }
});

onUnmounted(() => {
  window.removeEventListener("wheel", handleScroll);

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  document.body.style.overflow = "";
});

// go estimate
const goEstimate = () => {
  router.push("/estimate");
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  object-fit: cover;
  display: block;
  filter: brightness(40%);
}
.inner {
  position: relative;
  max-width: 1320px;
  margin: auto;
  height: calc(100% - 65px);
  z-index: 9;
  display: flex;
  align-items: center;
  .text-box {
    width: 100%;
    text-align: left;
    padding-bottom: 8%;
    p {
      color: $main-color;
      font-size: clamp($small-txt, 2vw, $medium-txt-2);
      font-weight: bold;
    }
    .main-txt {
      margin: 34px 0;
      min-height: calc(#{$main-title} * 4.5);
      li {
        font-size: $main-title;
        font-weight: bold;
        color: #fff;
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
        transform: translateY(-30px);
        &.fadeIn {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
    .btn {
      cursor: pointer;
      font-weight: bold;
    }
  }
  .scroll {
    transition: all 0.3s ease;
    font-size: $small-txt;
    text-align: center;
    position: absolute;
    bottom: 10%;
    left: 50%;
    color: #fff;
    opacity: 0;
    transform: translateX(-50%);
    span {
      display: block;
    }
    &.animate {
      animation: floatY 1s ease-in-out infinite;
      opacity: 0.7;
    }
  }
}
@keyframes floatY {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 30%, 0);
  }
}
@media screen and (max-width: 1024px) {
  .inner {
    .text-box {
      padding-bottom: 15%;
      .main-txt {
        margin: 30px 0;
        min-height: calc(#{$medium-txt-1} * 4.5);
        li {
          font-size: $medium-txt-1;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .inner {
    .text-box {
      padding-bottom: 15%;
      .main-txt {
        min-height: calc(30px * 4.5);
        li {
          font-size: 30px;
        }
      }
      .btn {
        font-size: $small-txt;
      }
    }
    .scroll {
      display: none;
    }
  }
}
@media screen and (max-width: 450px) {
  .inner {
    .text-box {
      padding-bottom: 15%;
      text-align: center;
      .main-txt {
        margin: 24px 0;
        min-height: calc($small-txt * 6);
        li {
          width: 100%;
          font-size: $small-txt;
          &:nth-child(2) {
            width: 60%;
            margin: auto;
          }
        }
      }
      .btn {
        font-size: 14px;
      }
    }
    .scroll {
      display: none;
    }
  }
}
</style>
