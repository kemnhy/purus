<template>
  <div class="point-banner">
    <div class="inner">
      <p class="text">"<span class="highlight">청결 이상의 가치</span>, 합리적인 비용으로 경험하세요"</p>
      <button @click="goEstimate" class="btn-check btn">
        <span>견적 확인</span>
        <span><i class="fa-solid fa-arrow-right"></i></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const goEstimate = ()=>{
  router.push("/estimate")
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.point-banner {
  background-color: $font-color;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 46px 0;
}

.inner {
  // width: 100%;
  // max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.text {
  font-size: 40px;
  font-weight: 400;
  margin: 0;
  line-height: 1.2;

  // 강조 부분 (제빙기 청소)
  .highlight {
    font-weight: 700;
    color: $sub-color;
    font-family: "Pretendard-Bold", sans-serif;
  }
}
// 견적확인 박스
.btn-check {
  background-color: $point-color;
  color: #fff;
  border: transparent;
  border-radius: 10px;
  padding: 10px 24px;
  display: flex;
  align-items: baseline;
  gap: 70px;
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;
  // justify-content: space-between;
  // transition: background-color 0.2s ease;

  span{
    padding-bottom: 2.5px;
  }
  &:hover {
    background-color: darken($point-color, 5%);
  }
}
</style>
