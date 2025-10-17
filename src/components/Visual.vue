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
// const currentLine = ref(0);
const router = useRouter();
const visibleLine = ref([]);
const allVisible = ref(false);
const activeLines = ref([]);
// const displayedLines = ref(["", "", ""]);

// typing
// const typeLine = (lineIndex) => {
//   if (lineIndex >= texts.length) return;
//   let charIndex = 0;
//   const typing = setInterval(() => {
//     displayedLines.value[lineIndex] += texts[lineIndex][charIndex];
//     charIndex++;
//     if (charIndex === texts[lineIndex].length) {
//       clearInterval(typing);
//       // currentLine.value++;
//       // setTimeout(() => typeLine(lineIndex + 1), 300);
//     }
//   }, 30);
// };

const handleScroll = async (e) => {
  // e.preventDefault();
  if (window.scrollY === 0) {
    if (e.deltaY > 0 && currentIndex.value < texts.length) {
      wheelCount.value++;
    }
    if (wheelCount.value >= 5) {
      const index = currentIndex.value;
      visibleLine.value.push(texts[index]);
      activeLines.value.push(false);
      // typeLine(currentIndex.value);

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
      }, 1000);
    }
  }
};

onMounted(() => {
  if (window.scrollY === 0) {
    document.body.style.overflow = "hidden";
  } else {
    visibleLine.value = [...texts];
    activeLines.value = Array(texts.length).fill(true);
    currentIndex.value = texts.length;
    allVisible.value = true;
  }
});

window.addEventListener("wheel", handleScroll, { passive: false });

onUnmounted(() => {
  window.addEventListener("wheel", handleScroll);
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
  height: 100vh;
  object-fit: cover;
  display: block;
  filter: brightness(40%);
}
.inner {
  position: relative;
  max-width: 1320px;
  margin: auto;
  height: 100%;
  z-index: 9;
  margin-top: 200px;
  .text-box {
    text-align: left;
    p {
      color: $main-color;
      font-size: $medium-txt-2;
      font-weight: bold;
    }
    .main-txt {
      margin: 34px 0;
      min-height: 220px;
      li {
        font-size: $main-title;
        font-weight: bold;
        color: #fff;
        opacity: 0;
        transition: all 0.5s ease;
        transform: translateY(-50px);
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
}
</style>
