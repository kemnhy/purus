<template>
  <div class="visual">
    <video src="/public/images/main_video.mp4" muted autoplay loop></video>
    <div class="text-box">
      <p>제빙기 청소업체</p>
      <ul class="main-txt">
        <li>청결은 선택이 아닌 필수,</li>
        <li>보이지 않는 곳까지 지켜 안심을 제공하는 것,</li>
        <li>그것이 퓨어러스가 만드는 가치입니다.</li>
      </ul>
      <button class="btn">나의 견적 알아보기</button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.visual {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(60%);
  }
  .text-box {
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
    p {
      color: $main-color;
      font-size: $medium-txt-2;
      font-weight: bold;
    }
    .main-txt {
      margin: 34px 0;
      li {
        font-size: $main-title;
        font-weight: bold;
        color: #fff;
      }
    }
    // .btn{
    //   font-weight: bold;
    //   font-size: 25px;
    // }
  }
}
</style>
