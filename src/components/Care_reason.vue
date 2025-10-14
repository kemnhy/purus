<template>
  <div class="care-wrap inner">
    <div class="care-title">
      <h2>제빙기 케어는 왜, 필요할까요?</h2>
      <p><span>깨끗한 얼음</span>은 보이지 않는 곳부터</p>
    </div>
    <div class="card-wrap">
      <div v-for="item in cares" :key="cares.id" class="card">
        <img :src="item.img" :alt="item.name" />
        <div class="gradient"></div>
        <p>{{ item.dscr }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const cares = [
  {
    id: 1,
    name: "care1",
    img: "/images/care1.png",
    dscr: "세균과 곰팡이 번식",
  },
  {
    id: 2,
    name: "care2",
    img: "/images/care2.png",
    dscr: "얼음의 맛과 냄새 변화",
  },
  {
    id: 3,
    name: "care3",
    img: "/images/care3.png",
    dscr: "제빙기 수명 단축 방지",
  },
  { id: 4, name: "care4", img: "/images/care4.png", dscr: "고객 신뢰 유지" },
];
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.care-wrap {
  padding: 120px 0;
  .care-title {
    text-align: center;
    h2 {
      font-size: $main-title;
    }
    p {
      font-size: $medium-txt-2;
      margin-top: 20px;
      span {
        font-weight: bold;
        color: $point-color;
      }
    }
  }
  .card-wrap {
    display: flex;
    justify-content: space-between;
    .card {
      width: 310px;
      margin-top: 60px;
      padding: 0px;
      border-radius: 25px;
      position: relative;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
      .gradient {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0) 60%
        );
      }
      p {
        width: 100%;
        position: absolute;
        font-size: $medium-txt-2;
        font-weight: 500;
        left: 0;
        bottom: 0;
        color: #fff;
        text-align: center;
        padding: 55px 0;
      }
    }
  }
}
</style>
