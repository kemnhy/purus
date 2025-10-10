<template>
  <div>
    <!-- 헤더영역 -->
    <Header_w />
    <!-- 견적확인 -->
    <div class="esti_price inner">
      <div class="esti_wrap">
        <!-- 영역 이름 -->
        <div class="esti_title">
          <p><i class="fa-solid fa-arrow-left"></i></p>
          <p>견적 확인</p>
          <p></p>
        </div>
        <!-- 게이지 -->
        <div class="esti_gauge">
          <span></span>
          <span></span>
        </div>
        <!-- 브랜드 선택 -->
        <div class="esti_brand">
          <p>
            제빙기의 브랜드를 선택해주세요.
            <span>(필수)</span>
          </p>
          <ul>
            <li
              v-for="(brand, index) in brandList"
              :key="index"
              :class="{ active: selectedIndex === index }"
              class="brand_list">
              <label>
                <input type="radio" name="brand" :value="index" v-model="selectedIndex" />
                {{ brand }}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header_w from "@/components/Header_w.vue";
import { ref } from "vue";
// 브랜드 목록
const brandList = [
  "카이저(KAISER)",
  "호시자키(HOSHIZAKI)",
  "아이스트로(ICETRO)",
  "라셀르(Lassele)",
  "그 외",
];
const selectedIndex = ref(null);
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
// 견적 확인
// 영역 이름
.esti_title {
  display: flex;
  height: 70px;
  // background-color: aliceblue;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $grey-color;
  margin-bottom: 20px;
  p {
    font-size: $esti-large-txt;
    font-weight: bold;
    color: $font-color;
  }
}
// 게이지
.esti_gauge {
  position: relative;
  margin-bottom: 60px;
  width: 100%;
  height: 15px;
  border-radius: 10px;
  background-color: #ebebeb;
  overflow: hidden;
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% / 3);
    height: 100%;
    background-color: $point-color;
    &:nth-child(2) {
      left: 50%;
      transform: translateX(-50%);
      display: none;
      &.active {
        display: block;
      }
    }
  }
}
// 브랜드 선택
.esti_brand {
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  gap: 30px;
  p {
    font-size: $medium-txt-2;
    span {
      font-size: 16px;
      color: $point-color;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .brand_list {
    font-size: $small-txt;
    padding: 20px;
    border: 1px solid $border-color;
    border-radius: 8px;
    input {
      margin-right: 15px;
    }
    &.active {
      color: $point-color;
      font-weight: bold;
      border: 1px solid $point-color;
    }
  }
}
</style>
