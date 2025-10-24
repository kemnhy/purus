<template>
  <!-- header wrap -->
  <div class="inner header">
    <!-- 로고 클릭 시 홈으로 이동 -->
    <img src="/images/logo.png" alt="logo" @click="goHome" class="web-logo" />
    <!-- 햄버거 메뉴 버튼 -->
    <div class="hamburger" @click="toggleSide">
      <div
        class="line"
        v-for="n in 3"
        :key="n"
        :style="{ backgroundColor: lineColor }"
      ></div>
    </div>
  </div>
  <!-- 사이드 메뉴 컴포넌트 (열림 / 담힘 제어) -->
  <Side_menu :isOpen="isSideOpen" @close="isSideOpen = false" />
</template>

<script setup>
import { ref } from "vue";
import Side_menu from "./Side_menu.vue";
import { useRouter } from "vue-router";

// props (햄버거 라인 색상 )
const props = defineProps({
  lineColor: {
    type: String,
    default: "#fff", // 기본색: 흰색
  },
});

// Sidemenu status
const isSideOpen = ref(false);

// toggle sidemenu
const toggleSide = () => {
  isSideOpen.value = !isSideOpen.value;
};

// goHome
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  z-index: 9;
  // 로고이미지
  img {
    min-width: 100px;
    width: 10%;
    cursor: pointer;
  }
  // 햄버거 메뉴
  .hamburger {
    cursor: pointer;
    width: 3%;
    max-width: 30px;
    min-width: 25px;
    height: 33px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .line {
      width: 100%;
      height: 2px;
      background-color: #fff;
      border-radius: 1px;
    }
  }
}

// 모바일 스타일
@media screen and (max-width: 480px) {
  .header {
    padding: 10px 0;
    img {
    min-width: 0;
    width: 10%;
    cursor: pointer;
  }
    .web-logo {
      opacity: 0;
    }
    .hamburger {
      min-width: 20px;
      height: 25px;
    }
  }
}
</style>
