<template>
  <section class="real-review">
    <div class="inner">
      <div class="title-box">
        <div class="stars">★★★★★</div>
        <h2 class="title">사장님 리얼 리뷰</h2>
      </div>

      <div class="review-list">
        <div class="review-item" v-for="(review, index) in reviews" :key="index" :class="{ reverse: index % 2 === 1 }">
          <div class="img-box">
            <img :src="review.image" alt="리뷰 이미지" />
          </div>
          <div class="text-box">
            <div class="rating">
              ★★★★★<span>{{ review.star }}</span>
            </div>
            <p class="desc">“{{ review.text }}”</p>
            <p class="writer">- {{ review.writer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  {
    image: "/public/images/Real_review1.png",
    text: "예전엔 얼음에서 약간 비린내가 났는데,청소 받고 나니 완전히 없어졌습니다.고객들도 음료 맛이 깔끔해졌다고 해요.",
    writer: "네이버 yg***님",
  },
  {
    image: "/public/images/Real_review2.png",
    text: "제빙기 청소를 미루다 보니 얼음에서 냄새가 나고 음료 맛까지 영향을 줬습니다. 청소 서비스를 받은 후에는 잡내가 싹 사라지고,얼음이 투명하게 맑아져서 음료 퀼리티가 달라졌습니다.",
    writer: "네이버 dm***님",
  },
  {
    image: "/public/images/Real_review3.png",
    text: "다른 업체도 알아봤는데,여기처럼 꼼꼼하게 청소해주는 곳은 처음입니다. 정기적으로 이용하고 싶어요.",
    writer: "네이버 nh***님",
  },
  {
    image: "/public/images/Real_review4.png",
    text: "얼음에서 냄새가 사라지고,손님 반응이 확 달라졌습니다!",
    writer: "네이버 dy***님",
  },
];
</script>
<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.real-review {
  display: flex;
  justify-content: center;
  padding: 100px 0;
  background-color: #f0faff;
}
.inner {
  width: 100%;
  max-width: 1320px;
}
.title-box {
  text-align: center;
  margin-bottom: 60px;
}
.stars {
  font-size: $main-title;
  color: $point-color;
  margin-bottom: 10px;
}
.title {
  font-size: $main-title;
  color: $font-color;
  font-weight: 700;
}
.review-list {
  display: flex;
  gap: 50px;
  flex-direction: column;
}
.review-item {
  display: flex;
  align-items: center;
  // gap: 50px;
  background-color: #fff;
  border-radius: 14px;
  overflow: hidden;
  border-radius: 30px;
  // padding: 30px 40px;
  &.reverse {
    flex-direction: row-reverse;
  }
}
.img-box {
  flex: 1 1 40%;
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    
  }
}
.text-box {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
}
.rating {
  font-size: $small-txt;
  color: $point-color;
  margin-bottom: 10px;
  span{
    color: $sub-font-color;
    font-size: 16px;
    margin-left: 4px;
  }
}
.desc {
  font-size: $medium-txt-2;
  font-weight: 500;
  color: $font-color;
  margin-bottom: 16px;
  line-height: 1.4;
}
.writer {
  font-size: $small-txt;
  color: $sub-font-color;
}
</style>
