<template>
  <!-- quick wrap -->
  <ul class="quickMenu">
    <!-- 견적확인 버튼 -->
    <li>
      <button class="blue estimate" @click="goEstimate">견적<br />확인</button>
    </li>
    <!-- 고객후기 버튼 -->
    <li>
      <button class="blue" @click="goReview">고객<br />후기</button>
    </li>
    <!-- 고탑 버튼(스크롤 시 노출) -->
    <li>
      <button class="stroke" v-if="show" @click="goTop">
        <img src="/images/goTop.png" alt="goTop" />
      </button>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// router
const router = useRouter();

// 견적확인 페이지 이동
const goEstimate = () => {
  router.push("/estimate");
};

// 리뷰 페이지 이동
const goReview = () => {
  router.push("/review");
};

// goTop 버튼 활성화
const show = ref(false);
const handleScroll = () => {
  show.value = window.scrollY > 300;
};

// 마운트시 이벤트 등록
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
// 탑으로 이동함수
const goTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.quickMenu {
  position: fixed;
  width: 3.7%;
  min-width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  right: 1%;
  bottom: 2%;
  z-index: 999999;
  li {
    width: 100%;
    button {
      cursor: pointer;
      line-height: 1.1;
      width: 100%;
      border: none;
      display: block;
      text-align: center;
      font-weight: 500;
      font-size: 110%;
      background-color: $point-color;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-bottom: 5px;
      transition: all 0.1s ease;
      &:hover {
        background-color: transparent;
        border: 2.5px solid $point-color;
        color: $point-color;
        font-weight: bold;
      }
    }
    // 탑버튼 (테두리형)
    .stroke {
      background-color: transparent;
      border: 2.5px solid $point-color;
      transition: all 0.3s ease;
      img {
        width: 35%;
      }
    }
    // 견적버튼 애니메이션
    .estimate {
      animation: floatY 2.5s ease-in-out infinite;
    }
  }
}
@keyframes floatY {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

// responsive
@media screen and (max-width:1300px) {
  .quickMenu {
    width: 5%;
  }
}
@media screen and (max-width:1024px) {
  .quickMenu {
    width: 6%;
    li{
      button{
        font-size: 100%;
      }
    }
  }
}
@media screen and (max-width:768px) {
  .quickMenu {
    width: 7.5%;
  }
}
@media screen and (max-width:450px) {
  .quickMenu {
    width: 13%;
  }
}
</style>
