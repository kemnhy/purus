<template>
  <div class="point-banner">
    <div class="inner">
      <p class="text">"제빙기 청소, 생각보다 저렴할지도?"</p>
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
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 0;
}
.inner{
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
.text{
  font-size: $medium-txt-2;
  font-weight: 600;
  margin: 0;
}


.btn-check {
  align-items: center;
  transition: 0.2s ease;
  display: flex;
  gap: 6px;
  cursor: pointer;
  .arrow {
    font-weight: bold;
    font-size: $small-txt;
  }
  &:hover {
    background-color: $point-color;
  }
}
</style>
