<template>
  <div class="inner header">
    <img src="/public/images/logo.png" alt="logo" />
    <div class="hamburger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  z-index: 99999;
  img {
    width: 10%;
  }
  .hamburger {
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
