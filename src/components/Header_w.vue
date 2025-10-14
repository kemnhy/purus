<template>
  <div class="inner header">
    <a href="#"><img src="/public/images/logo.png" alt="logo" /></a>
    <div class="hamburger">
      <div
        class="line"
        v-for="n in 3"
        :key="n"
        :style="{ backgroundColor: lineColor }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lineColor: {
    type: String,
    default: "#fff", // 기본색: 흰색
  },
});
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  z-index: 99999;
  a {
    width: 10%;
    img {
      width: 100%;
    }
  }
  .hamburger {
    cursor: pointer;
    width: 30px;
    height: 33px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .line {
      width: 30px;
      height: 2px;
      background-color: #fff;
      border-radius: 1px;
    }
  }
}
</style>
