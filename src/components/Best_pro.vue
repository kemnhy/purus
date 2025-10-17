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
        <div class="pro-card" v-for="(item, index) in items" :key="index" :class="{ reverse: index === 1 }">
          <div class="pro-img-box">
            <img :src="item.image" alt="기사님 이미지" class="pro-img" />
          </div>
          <div class="pro-info">
            <h3 class="pro-title">{{ item.title }}</h3>
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
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    image: "/images/img1.png",
    title: "제 얼굴을 걸고 청소합니다!",
    name: "000 기사님",
    activity: "1,230회",
    career: "10년",
    review: "5.0",
  },
  {
    image: "/images/img2.png",
    title: "고객님의 얼음을 책임지겠습니다!",
    name: "000 기사님",
    activity: "987회",
    career: "9년",
    review: "5.0",
  },
  {
    image: "/images/img3.png",
    title: "신뢰 할 수 있는 청소 퀄리티!",
    name: "000 기사님",
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
      h2 {
        font-size: $main-title;
        font-weight: bold;
        color: $font-color;
      }

      img {
        width: 20%;
        max-width: 200px;
        display: block;
        // height: 28px;
        margin-right: 4px;
      }
    }

    .desc {
      color: $sub-font-color;
      font-size: $medium-txt-1;
      margin-top: 10px;
      font-weight: bold;
    }
  }

  .pro-list {
    display: flex;
    flex-direction: column;
    // align-items: center;
    gap: 28px;

    .pro-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;

      width: 70%;
      max-width: 800px;
      border-radius: 25px;
      padding: 25px 35px;
      border: 1.5px solid #e5e8ef;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);

      &.reverse {
        flex-direction: row-reverse;
        margin-left: auto;
        display: flex;
        .pro-info {
          text-align: right;
          .pro-detail {
            justify-content: flex-end;
          }
        }
      }

      .pro-img-box {
        width: 30%;

        img {
          width: 100%;
          height: auto;
        }
      }

      .pro-info {
        width: 55%;
        text-align: left;
        padding-left: 20px;

        .pro-title {
          font-size: $medium-txt-2;
          font-weight: bold;
          color: $font-color;
          margin-bottom: 5px;
        }

        .pro-name {
          color: $point-color;
          font-size: $medium-txt-2;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .pro-detail {
          display: flex;
          align-items: center;
          gap: 22px;
          font-size: $medium-txt-2;
          justify-content: center;
          // color: $sub-font-color;
          font-weight: bold;
          margin-top: 40px;

          b {
            color: $point-color;
            font-weight: bold;
            margin-left: 4px;
          }

          span {
            font-weight: bold;
          }
        }
      }
      // .pro-info:nth-child(2) {
      //   text-align: right !important;
      //   .pro-detail {
      //     text-align: right;
      //     justify-content: flex-end;
      //   }
      // }
    }
  }
}
</style>
