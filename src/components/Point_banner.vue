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
  

  span{
    padding-bottom: 2.5px;
  }
  &:hover {
    background-color: darken($point-color, 5%);
  }
}
// 768px 반응형 테블릿
@media (max-width: 768px) {
  .point-banner {
    padding: 30px 0;
  }

  .inner {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: row; /* 한 줄 유지 */
    align-items: center;
    justify-content: center; 
    gap: 18px; 
    padding: 0 16px;
  }

  .text {
    font-size: $medium-txt-2;
    line-height: 1.4;
    margin: 0;
    text-align: center;

    .highlight {
      font-weight: bold;
    }
  }

  .btn-check {
    font-size: $small-txt;
    padding: 8px 20px;
    gap: 18px;
    border-radius: 8px;
    flex-shrink: 0; /* 버튼이 줄어들지 않게 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
// 390px 반응형 모바일 
@media (max-width: 390px) {
  .point-banner {
    display: none;
  }
}

</style>
