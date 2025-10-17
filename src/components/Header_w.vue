<template>
  <div class="inner header">
    <img src="/public/images/logo.png" alt="logo" @click="goHome" />
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
  .hamburger {
    cursor: pointer;
    width: 3%;
    max-width: 30px;
    min-width: 28px;
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
</style>
