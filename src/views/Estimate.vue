<template>
  <div>
    <!-- 헤더영역 -->
    <Header_w lineColor="#092857" />
    <!-- 견적확인 -->
    <div class="esti_check esti_inner">
      <div class="esti_wrap">
        <!-- 영역 이름 -->
        <div class="esti_title">
          <p><i class="fa-solid fa-arrow-left"></i></p>
          <p>견적 확인</p>
          <p></p>
        </div>
        <!-- 게이지 -->
        <div class="esti_gauge">
          <span :style="{ width: gaugeWidth }"></span>
        </div>
        <!-- 선택영역 -->
        <div class="esti_select">
          <!-- 브랜드 선택 -->
          <div class="esti_brand">
            <p>
              제빙기의 브랜드를 선택해주세요.
              <span>(필수)</span>
            </p>
            <div>
              <label
                v-for="(brand, index) in brandList"
                :key="index"
                :class="{ active: selectedIndex === index }"
                class="brand_list">
                <input type="radio" name="brand" :value="index" v-model="selectedIndex" />
                {{ brand.name }}
              </label>
            </div>
          </div>
          <!-- 용량 선택 -->
          <div v-if="selectedIndex !== null" class="esti_size">
            <p>
              제빙기의 용량을 선택해주세요.
              <span>(필수)</span>
            </p>
            <div>
              <label
                v-for="(size, index) in sizeList"
                :key="index"
                :class="{ active: selectedI === index }"
                class="size_list">
                <input type="radio" name="size" :value="index" v-model="selectedI" />
                {{ size.size }}
              </label>
            </div>
          </div>
          <!-- 모델 이름 입력 -->
          <div v-if="selectedI !== null" class="esti_model">
            <p>
              제빙기의 모델명을 입력해주세요.
              <span>(필수)</span>
            </p>
            <span>ex) IMK-3051</span>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
    <!-- 견적 금액 -->
    <div class="esti_price">
      <div class="esti_inner">
        <div class="price_txt">
          <div class="price_title">
            <p>견적 금액</p>
            <span>(VAT 포함)</span>
          </div>
          <div class="price_num">{{}}원</div>
        </div>
        <button class="btn">가능한 일정 확인하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header_w from "@/components/Header_w.vue";
import { ref, computed } from "vue";
// 브랜드 목록
const brandList = [
  { name: "카이저(KAISER)", price: 90000 },
  { name: "호시자키(HOSHIZAKI)", price: 100000 },
  { name: "아이스트로(ICETRO)", price: 80000 },
  { name: "라셀르(Lassele)", price: 90000 },
  { name: "그 외", price: "유선 상담" },
];
const selectedIndex = ref(null);
const sizeList = [
  { size: "~ 20kg", price: 0 },
  { size: "21 ~ 30kg", price: 10000 },
  { size: "31 ~ 50kg", price: 20000 },
  { size: "51kg ~", price: 30000 },
];
const selectedI = ref(null);

// 게이지 계산 (단계별로 3단계)
const gaugeWidth = computed(() => {
  if (selectedI.value !== null) return "100%"; // 3단계
  if (selectedIndex.value !== null) return "66%"; // 2단계
  return "33%"; // 1단계 (브랜드 선택 시작)
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.esti_inner {
  max-width: 1000px;
  margin: auto;
}
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
    height: 100%;
    background-color: $point-color;
    border-radius: 10px;
    transition: width 0.4s ease;
  }
}
.esti_select{
  
}
// 브랜드 선택, 용량 선택
.esti_brand,
.esti_size {
  // background-color: aliceblue;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
  p {
    font-size: $medium-txt-2;
    span {
      font-size: 16px;
      color: $point-color;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .brand_list,
  .size_list {
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
      background-color: rgba($sub-color, 0.5);
    }
  }
}
// 모델명 입력
.esti_model {
  p {
    font-size: $medium-txt-2;
    span {
      font-size: 16px;
      color: $point-color;
      display: inline;
    }
  }
  span {
    color: $border-color;
    font-size: $small-txt;
    margin-top: 15px;
    display: block;
  }
  input {
    border: 1px solid $border-color;
    border-radius: 8px;
    padding: 20px;
    margin-top: 10px;
    width: 100%;
  }
}

// 견적 금액
.esti_price {
  background-color: #fff;
  width: 100%;
  height: 200px;
  border-top: 1px solid $grey-color;
  position: fixed;
  bottom: 0;
  padding: 20px;
  .price_txt {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .price_title {
      p {
        font-size: $btn-large;
        font-weight: 600;
      }
      span {
        font-size: 14px;
      }
    }
    .price_num {
      font-size: $btn-large;
      color: $point-color;
      font-weight: 600;
    }
  }
  .btn {
    margin: auto;
    width: 100%;
    font-weight: 600;
  }
}
</style>
