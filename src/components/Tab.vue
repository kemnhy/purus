<template>
  <div class="home">
    <div class="container">
      <!-- 탭메뉴 -->
      <div class="tabs">
        <button @click="activeTab = 'detaile'" :class="{ active: activeTab === 'detaile' }">상세정보</button>
        <button @click="activeTab = 'review'" :class="{ active: activeTab === 'review' }">리뷰</button>
      </div>
      <!-- 상세정보 -->
      <div class="content" v-if="activeTab === 'detaile'">
        <h2>제품 상세 설명</h2>
        <p>이 이어폰은 최상의 음질을 제공하며, 무선으로 편리하게 사용할 수 있습니다.</p>
        <ul>
          <li>✔ 블루투스 5.0 지원</li>
          <li>✔ 최대 24시간 사용 가능</li>
          <li>✔ 노이즈 캔슬링 기능 포함</li>
        </ul>

        <div class="img-container" :class="{ expened: isExpened }">
          <img src="/public/images/detail_img.jpg" alt="상세이미지" />
          <div class="gradient-overlay">
            <!--  -->
          </div>
          <!--  -->
        </div>
        <button class="moreBtn" @click="tglReadeMore">
          {{ isExpened ? "접기" : "더보기" }}
        </button>
      </div>
      <!-- 리뷰 -->
      <Review_com class="content" v-if="activeTab === 'review'" />
      <!-- <div class="content" v-if="activeTab === 'review'">리뷰 영역</div> -->
      <!-- <Review_compo class="content" v-if="activeTab === 'review'"/> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Review_com from "./Review_com.vue";

const activeTab = ref("detaile");
//detail img
const isExpened = ref(false);
const tglReadeMore = () => {
  //
  isExpened.value = !isExpened.value;
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  .tabs {
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 10px;
    button {
      flex: 1;
      padding: 10px;
      border: none;
      background: #d3d3d3;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
      &.active {
        background-color: #42b983;
        color: #fff;
        font-weight: bold;
      }
    }
  }
  .img-container {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    transition: all 0.3s;
    &.expended {
      height: auto;
    }
    img {
      width: 100%;
    }
    .gradient-overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to bottom, rgba(225, 225, 225, 0) 0%, white 100%);
    }
  }
  .moreBtn {
    width: 100%;
    padding: 10px;
    border: none;

    cursor: pointer;
    background-color: #42b983;
    color: #fff;
    font-weight: bold;
  }
}
</style>
