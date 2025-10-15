<template>
  <ul class="quickMenu">
    <li>
      <button class="blue estimate" @click="goEstimate">견적<br />확인</button>
    </li>
    <li>
      <button class="blue" @click="goReview">고객<br />후기</button>
    </li>
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
const goEstimate = () => {
  router.push("/estimate");
};
const goReview = () => {
  router.push("/review");
};
// goTop
const show = ref(false);
const handleScroll = () => {
  show.value = window.scrollY > 300;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
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
      font-size: 18px;
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
    .stroke {
      background-color: transparent;
      border: 2.5px solid $point-color;
      transition: all 0.3s ease;
      img {
        width: 35%;
      }
    }
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
    transform: translate3d(0, -4px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
