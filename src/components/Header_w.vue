<template>
  <div class="inner header">
    <img src="/images/logo.png" alt="logo" @click="goHome" class="web-logo" />
    <div class="hamburger" @click="toggleSide">
      <div
        class="line"
        v-for="n in 3"
        :key="n"
        :style="{ backgroundColor: lineColor }"
      ></div>
    </div>
  </div>
  <Side_menu :isOpen="isSideOpen" @close="isSideOpen = false" />
</template>

<script setup>
import { ref } from "vue";
import Side_menu from "./Side_menu.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  lineColor: {
    type: String,
    default: "#fff", // 기본색: 흰색
  },
});
//showSide
const isSideOpen = ref(false);
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
  img {
    min-width: 100px;
    width: 10%;
    cursor: pointer;
  }
  .web-logo {
    display: block;
  }
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
// responsive
// @media screen and (max-width: 768px) {
//   .header {
//     .web-logo {
//       display: none;
//     }
//     .mobile-logo {
//       display: block;
//       max-width: 38px;
//     }
//   }
// }
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
