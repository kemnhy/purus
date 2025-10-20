<template>
  <section class="best-pro">
    <div class="inner">
      <div class="title-box">
        <div class="title-top">
          <img src="/images/logo.png" alt="Purus 로고" />
          <h2>명예의 전당</h2>
        </div>
        <p class="desc">별 다섯 개의 기사님, 지금 만나보세요 !</p>
      </div>

      <div class="pro-list">
        <div
          class="pro-card"
          v-for="(item, index) in items"
          :key="index"
          :class="{ reverse: index === 1 }"
        >
          <!-- ✅ 순서 변경: 제목 → 이미지 → 이름 → 상세정보 -->
          <h3 class="pro-title">{{ item.title }}</h3>

          <div class="pro-img-box">
            <img :src="item.image" alt="기사님 이미지" class="pro-img" />
          </div>

          <p class="pro-name">{{ item.name }}</p>

          <div class="pro-detail">
            <div>
              <p>현장출동</p>
              <b>{{ item.activity }}</b>
            </div>
            <div>
              <p>총경력</p>
              <b>{{ item.career }}</b>
            </div>
            <div>
              <p>리뷰</p>
              <b>{{ item.review }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    image: "/images/img1.png",
    title: "제 얼굴을 걸고 청소합니다!",
    name: "진완벽 기사님",
    activity: "1,230회",
    career: "10년",
    review: "5.0",
  },
  {
    image: "/images/img2.png",
    title: "얼음만큼 투명한 서비스!",
    name: "최깨끗 기사님",
    activity: "987회",
    career: "9년",
    review: "5.0",
  },
  {
    image: "/images/img3.png",
    title: "신뢰 할 수 있는 청소 퀄리티!",
    name: "김클린 기사님",
    activity: "887회",
    career: "9년",
    review: "5.0",
  },
];
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.best-pro {
  background-color: $main-color;
  padding: 80px 0;
  text-align: center;

  .title-box {
    margin-bottom: 50px;

    .title-top {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      img {
        width: 200px;
      }

      h2 {
        font-size: $main-title;
        font-weight: bold;
        color: $point-color;
      }
    }

    .desc {
      font-size: $medium-txt-1;
      margin-top: 10px;
      font-weight: bold;
    }
  }

  /* 카드 레이아웃 */
  .pro-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    justify-items: center;

    .pro-card {
      background: #fff;
      border-radius: 30px;
      border: 1.5px solid #e5e8ef;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      padding: 30px 25px;
      width: 100%;
      max-width: 360px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      min-height: 460px;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      }

      /* ✅ 순서 변경 후 약간의 마진 조정 */
      .pro-title {
        font-size: $medium-txt-2;
        font-weight: bold;
        color: $font-color;
        margin-bottom: 14px;
        line-height: 1.25;
        min-height: 52px;
      }

      .pro-img-box {
        width: 160px;
        height: 160px;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 18px;
        background: transparent;

        .pro-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .pro-name {
        color: $point-color;
        font-size: $medium-txt-2;
        font-weight: bold;
        margin-top: 10px;
        
      }

      .pro-detail {
        width: 100%;
        max-width: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        gap: 10px;
        padding-top: 8px;

        div {
          display: flex;
          flex-direction: column;
          align-items: center;

          p {
            margin-bottom: 10px;
            font-size: $small-txt;
            font-weight: bold;
          }

          b {
            color: $point-color;
            font-size: $medium-txt-2;
          }
        }
      }
    }
  }

  /* 반응형 */
  @media (max-width: 768px) {
    .pro-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 390px) {
    .pro-list {
      grid-template-columns: 1fr;
    }
  }
}
</style>