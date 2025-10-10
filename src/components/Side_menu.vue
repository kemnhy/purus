<template>
  <div class="side-menu">
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
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.side-menu {
  padding: 30px;
  position: absolute;
  top: 0;
  right: 0;
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
        width: 50%;
      }
      a {
        width: 100%;
        color: #111;
        font-size: $medium-txt-1;
        .btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
