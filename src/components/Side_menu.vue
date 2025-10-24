<template>
  <!-- 사이드메뉴용 오버레이 ( 배경 클릭 시 사이드 메뉴 닫힘 )-->
  <div
    class="overlay"
    :style="{
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
    }"
    @click="$emit('close')" 
  ></div>
  <!-- 사이드메뉴 패널 -->
  <div
    class="side-menu"
    :style="{
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
    }"
  >
  <!-- 메뉴항목 -->
    <ul>
      <li>
        <!-- 로고클릭시 홈 이동 -->
        <img src="/public/images/logo.png" alt="logo" @click="goHome" />
      </li>
      <li @click="goReview">고객후기</li>
      <li @click="goReser">예약 내역 조회</li>
      <li>
        <button class="btn" @click="goEstimate">
          <span>견적 확인</span
          ><span><i class="fa-solid fa-arrow-right"></i></span>
        </button>
      </li>
    </ul>
    <!-- 닫기 버튼 -->
    <button class="close" @click="$emit('close')">⨉</button>
  </div>
</template>

<script setup>
import { onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";

// props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

// router
const router = useRouter();
const goHome = () => {
  router.push("/");
};
const goReview = () => {
  router.push("/review");
};
const goReser = () => {
  router.push("/reser_check");
};
const goEstimate = () => {
  router.push("/estimate");
};

// isOpen 때 스크롤 제어
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
  { immediate: true }
);

// 컴포넌트 해제 시 스크롤 초기화
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

// 오버레이 스타일
.overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transition: all 0.5s ease;
  cursor: pointer;
}

// 사이드메뉴 스타일
.side-menu {
  padding: 30px;
  position: fixed;
  top: 0;
  right: 0;
  transition: all 0.5s ease;
  z-index: 99999;
  width: 18%;
  height: 100vh;
  background-color: #fff;
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    li {
      width: 100%;
      color: #111;
      font-size: $medium-txt-2;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        font-weight: 500;
        color: $point-color;
      }
      // 로고
      img {
        width: 45%;
        cursor: pointer;
      }
      // 견적이동 버튼
      .btn {
        margin-top: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        span {
          font-weight: bold;
        }
      }
    }
  }
  // 닫기 버튼
  .close {
    border: none;
    background: none;
    font-size: $medium-txt-2;
    position: absolute;
    top: 12px;
    right: 16px;
    cursor: pointer;
  }
}

// 태블릿 스타일
@media screen and (max-width: 768px) {
  .side-menu {
    width: 40%;
    ul {
      li {
        .btn {
          margin-top: 30px;
        }
      }
    }
  }
}

// 모바일 스타일
@media screen and (max-width: 450px) {
  .side-menu {
    width: 65%;
    padding: 24px 20px;
    ul {
      gap: 30px;
      li {
        font-size: $small-txt;
        .btn {
          font-size: $small-txt;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
