<template>
  <!-- 메인비디오 배경 -->
  <video src="/public/images/main_video.mp4" muted autoplay loop></video>
  <div class="visual inner">
    <!-- 메인 비주얼 텍스트 -->
    <div class="text-box">
      <p>제빙기 청소업체</p>
      <!-- 애니메이션 텍스트 : 한줄씩 위에서 내려옴 -->
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
      <!-- CTA 버튼 -->
      <button class="btn" @click="goEstimate">나의 견적 알아보기</button>
    </div>
    <!-- 스크롤 안내 문구 (웹에서만 보이게) -->
    <p class="scroll" :class="{ animate: allVisible === false }">
      스크롤하세요<span><i class="fa-solid fa-angle-down"></i></span>
    </p>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

// 애니메이션 적용 텍스트 데이터
const texts = [
  "청결은 선택이 아닌 필수,",
  "보이지 않는 곳까지 지켜 안심을 제공하는 것,",
  "그것이 퓨어러스가 만드는 가치입니다.",
];

// router
const router = useRouter(); 

// 상태관리
const currentIndex = ref(0); //현재 노출중인 문장 인덱스
const wheelCount = ref(0); //휠 이벤트 횟수
const visibleLine = ref([]); //화면에 표시되는 문장
const allVisible = ref(false); //모든 문장 노출 완료 여부
const activeLines = ref(Array(texts.length).fill(false)); //애니메이션 활성 상태
let intervalId = null;

//웹 - 스크롤 핸들러 
const handleScroll = async (e) => {
  // 스크롤이 맨 위일 때만 작동
  if (window.scrollY !== 0) return;

  // 아래로 스크롤시 누적 카운트
  if (e && e.deltaY > 0 && currentIndex.value < texts.length) {
    e.preventDefault();
    wheelCount.value++;
  }

  // 휠이 4번 돌때마다 문장 나오게
  if (wheelCount.value >= 4) {
    const index = currentIndex.value;
    visibleLine.value.push(texts[index]);

    await nextTick();

    // fadeIn 효과
    setTimeout(() => {
      activeLines.value[index] = true;
    }, 10);

    currentIndex.value++;
    wheelCount.value = 0;
  }

  // 모든 문장이 나오면 스크롤 해제
  if (currentIndex.value === texts.length && !allVisible.value) {
    allVisible.value = true;
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 800);
  }
};

// 모바일 - interval 로 자동 텍스트 애니메이션
onMounted(() => {
  const mobile = window.innerWidth <= 768;

  if (mobile) {
    // 초기화
    visibleLine.value = [];
    activeLines.value = Array(texts.length).fill(false);
    currentIndex.value = 0;
    allVisible.value = false;
    document.body.style.overflow = "";

    // setInterval - 0.5초 간격으로 한 줄씩 나오게
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
      // 이미 스크롤이 내려가 있는 상태면 전부 보이게 처리
      visibleLine.value = [...texts];
      activeLines.value = Array(texts.length).fill(true);
      currentIndex.value = texts.length;
      allVisible.value = true;
    }
    window.addEventListener("wheel", handleScroll, { passive: false });
  }
});

// 언마운트시 리스너 해제
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

// 비디오 배경
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
// 메인 비주얼 콘텐츠
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
    // 애니메이션 문장 리스트 (이벤트 시 다른 요소 밀리지 않게 최소높이 확보)
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
    // CTA 버튼
    .btn {
      cursor: pointer;
      font-weight: bold;
    }
  }
  // 웹용 스크롤 안내 문구
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
// 스크롤 텍스트 애니메이션 키프레임
@keyframes floatY {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 30%, 0);
  }
}
// responsive
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
// 태블릿 스타일
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
// 모바일 스타일
@media screen and (max-width: 450px) {
  .inner {
    .text-box {
      padding-bottom: 15%;
      text-align: center;
      p{
        font-weight: 500;
      }
      .main-txt {
        margin: 24px 0;
        min-height: calc(20px * 6);
        li {
          width: 100%;
          font-size: 20px;
          line-height: 1.3;
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
