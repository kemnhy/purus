<template>
  <video src="/public/images/main_video.mp4" muted autoplay loop></video>
  <div class="visual inner">
    <div class="text-box">
      <p>제빙기 청소업체</p>
      <ul class="main-txt">
        <li v-for="(line, index) in displayedLines" :key="index">
          {{ line }}
        </li>
      </ul>
      <button class="btn" @click="goEstimate">나의 견적 알아보기</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const texts = [
  "청결은 선택이 아닌 필수,",
  "보이지 않는 곳까지 지켜 안심을 제공하는 것,",
  "그것이 퓨어러스가 만드는 가치입니다.",
];
const displayedLines = ref(["", "", ""]);
const currentLine = ref(0);
const router = useRouter();

onMounted(() => {
  const typeLine = (lineIndex = 0) => {
    if (lineIndex >= texts.length) return;
    let charIndex = 0;
    const typing = setInterval(() => {
      displayedLines.value[lineIndex] += texts[lineIndex][charIndex];
      charIndex++;
      if (charIndex === texts[lineIndex].length) {
        clearInterval(typing);
        currentLine.value++;
        setTimeout(() => typeLine(lineIndex + 1), 300);
      }
    }, 30);
  };
  typeLine();
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
      }
    }
    .btn {
      cursor: pointer;
      font-weight: bold;
    }
  }
}
</style>
