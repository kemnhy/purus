<template>
  <div
    class="overlay"
    :style="{
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
    }"
    @click="$emit('close')"
  ></div>
  <div
    class="side-menu"
    :style="{
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
    }"
  >
    <ul>
      <li>
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
    <button class="close" @click="$emit('close')">⨉</button>
  </div>
</template>

<script setup>
import { onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";

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
// isOpen:scroll
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
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
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
      img {
        width: 45%;
        cursor: pointer;
      }
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
@media screen and (max-width: 450px) {
  .side-menu {
    width: 55%;
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
