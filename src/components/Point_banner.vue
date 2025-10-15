<template>
  <div class="point-banner">
    <div class="inner">
      <p class="text">
        "<span class="highlight">제빙기 청소</span>, 생각보다 저렴할지도?"
      </p>
      <button class="btn-check btn">
        견적확인
        <span class="arrow">→</span>
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.point-banner {
  background-color: $font-color;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
}

.inner {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.text {
  font-size: $main-title;
  font-weight: 400; 
  margin: 0;
  line-height: 1.2;

  // 강조 부분 (제빙기 청소)
  .highlight {
    font-weight: 700;
    color: $sub-color; 
    font-family: 'Pretendard-Bold', sans-serif; 
  }
}
// 견적확인 박스
.btn-check {
  background-color: $point-color;
  color: #fff;
  border: transparent;
  border-radius: 10px;
  padding: 8px 28px;
  // display: flex;
  align-items: center;
  // gap: 6px;
  cursor: pointer;
  font-size: 25px bold;
  // font-weight: bold;
  // transition: background-color 0.2s ease;

  .arrow {
    font-weight: bold;
    font-size: $small-txt;
  }

  &:hover {
    background-color: darken($point-color, 5%);
  }
}
</style>