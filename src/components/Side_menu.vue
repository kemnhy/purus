<template>
  <div class="side-menu" :style="{ right: sideMenuRight }">
    <ul>
      <li>
        <a href="#"><img src="/public/images/logo.png" alt="logo" /></a>
      </li>
      <li><a href="#">고객후기</a></li>
      <li><a href="#">예약 내역 조회</a></li>
      <li>
        <a href="#"
          ><button class="btn"><span>견적 확인</span><span>→</span></button></a
        >
      </li>
    </ul>
    <button class="close" @click="sideMenuRight = '-1000px'">⨉</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sideMenuRight = ref(0)
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.side-menu {
  padding: 30px;
  position: absolute;
  top: 0;
  transition: all 1s ease;
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
      img {
        width: 45%;
      }
      a {
        width: 100%;
        color: #111;
        font-size: $medium-txt-2;
        .btn {
          margin-top: 50px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .close{
    border: none;
    background: none;
    font-size: $medium-txt-2;
    position: absolute;
    top: 12px;
    right: 16px;
    cursor: pointer;
  }
}
</style>
