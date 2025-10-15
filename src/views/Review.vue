<template>
  <div class="review">
    <!-- 상단 배너 -->
    <div class="review_top">
      <!-- 헤더 -->
      <Header_w />
      <div class="inner banner">
        <!-- 리뷰 textbox -->
        <div class="review-div">
          <img src="/images/eventText.png" alt="리뷰 작성 혜택" />
        </div>

        <!-- 쿠폰 img-->
        <div class="review-div">
          <img src="/images/coupon.png" alt="1회 테어 무상제공" />
        </div>

        <!-- 이동버튼 -->
        <div class="review-div">
          <button class="glass-btn">
            리뷰 작성 하고 쿠폰 받기
            <img src="/images/download.svg" alt="리뷰쓰고 쿠폰 다운" />
          </button>
        </div>
        <!--  -->
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="review-main">
      <div class="inner">
        <!-- 타이틀 -->
        <div class="title-box">
          <h2>고객후기</h2>
          <p>퓨어러스의 제빙기 케어 사례를 확인하세요.</p>
        </div>

        <!-- 베스트 리뷰 카드 -->
        <div class="card-section">
          <div class="best-card">리뷰카드</div>
          <div class="best-card">리뷰카드</div>
          <div class="best-card">리뷰카드</div>
        </div>

        <button class="postrev-btn">리뷰 남기기</button>

        <!-- 리뷰 목록 -->
        <div class="review-list">
          <div class="divider"></div>
          <!-- 필터 버튼 -->
          <div class="filter-buttons">
            <button class="filter-btn active">추천순</button>
            <button class="filter-btn">최신순</button>
            <button class="filter-btn photo">사진 리뷰</button>
          </div>

          <div class="divider"></div>

          <!-- 리뷰 아이템 -->
          <div class="review-item" v-for="review in reviews" :key="review.id">
            <!-- 사용자 정보 -->
            <div class="user-info">
              <img :src="review.userImage" alt="프로필" class="profile-img" />
              <div class="user-details">
                <span class="username">{{ review.username }}</span>
                <div class="stars">
                  <i class="star" v-for="n in 5" :key="n"></i>
                </div>
              </div>
              <span class="review-meta"> {{ review.date }} ∙ {{ review.service }} </span>
            </div>

            <!-- 이미지 갤러리 -->
            <div class="image-gallery" v-if="review.images">
              <img v-for="(img, idx) in review.images" :key="idx" :src="img" alt="리뷰 이미지" class="review-img" />
            </div>

            <!-- 리뷰 내용 -->
            <p class="review-text">{{ review.content }}</p>

            <!-- 좋아요 버튼 -->
            <button class="like-btn">
              <i class="heart-icon"></i>
              <span>{{ review.likes }}</span>
            </button>

            <div class="divider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header_w from "@/components/Header_w.vue";
export default {
  data() {
    return {
      reviews: [
        {
          id: 1,
          userImage: "",
          username: "성다영",
          date: "2025.09.16",
          service: "카이저제빙기 디테일 클리어서비스 이용",
          images: ["", ""],
          content:
            "예약 후 빠른 연락과 제빙기별 맞춤으로 상담해주셨습니다!! 그리고 기사분의 전문성과 청소 용품 퀄리티도 좋습니다 생각보다 디테일한 부분까지 분해하시는데 오히려 좋은 것 같아요! 깨끗해진 제빙기를 보니 기분도 좋고 매장이 화사해지고 개운해서 더 좋아용",
          likes: 5,
        },
        {
          id: 2,
          userImage: "",
          username: "성다영2",
          date: "2025.09.16",
          service: "카이저제빙기 디테일 클리어서비스 이용",
          images: ["", "", "", ""],
          content:
            "예약 후 빠른 연락과 제빙기별 맞춤으로 상담해주셨습니다!! 그리고 기사분의 전문성과 청소 용품 퀄리티도 좋습니다 생각보다 디테일한 부분까지 분해하시는데 오히려 좋은 것 같아요! 깨끗해진 제빙기를 보니 기분도 좋고 매장이 화사해지고 개운해서 더 좋아용",
          likes: 10,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables" as *;
// ===================================================
$bd-alpha: rgba(97, 188, 225, 0.5); // #61BCE1 50%
$g1: #92d3cd;
$g2: #76c6d3;
$g3: #62bde1;
$g4: #4da5e4;
// 테두리 그라데이션
$border-grad: linear-gradient(135deg, $g1 0%, $g2 25%, $g3 60%, $g4 100%);

.review {
  font-family: Pretendard;
  width: 100%;
  height: 4000px;
  position: relative;
  align-items: center;
  background-color: $main-color;

  &_top {
    position: relative;
    background-color: #061c34;
    max-height: 974px;
    min-height: 974px;
    display: block;
    // $border-color
    // 별, 눈송이 등 배경 장식
    &::after {
      margin: 90px;
      padding: 100px;
      content: "";
      position: absolute;
      inset: 0;
      background-image: url("/images/eventModal_star_4x.png"); // Vite 기준 public/images/* 경로
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      pointer-events: none;
      z-index: 0;
    }
  }
}

.review-div {
  padding: 25px;
  // 위치확인용
  // background-color: #000;
}

// banner ============================================
.banner {
  padding: 30px;
  gap: 20px;
  text-align: center;
}

.glass-btn {
  height: 90px;
  width: 530px;
  padding: 0 30px;
  align-items: center;
  text-align: center;
  color: $grey-color;
  font-size: $esti-large-txt;
  gap: 15px;
  border-radius: 50px;
  border: 1px solid transparent;
  background: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 0 0 0.5px $bd-alpha inset, 0 6px 24px rgba(97, 188, 225, 0.1); /* 외곽선 느낌을 조금 더 선명하게 */
  cursor: pointer;

  /* 상단 유리 하이라이트 */
  &::after {
    content: "";
    position: absolute;
    inset: 1px 1px auto 1px;
    height: 90%;
    // height: 45%;
    border-radius: 50px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    pointer-events: none;
  }

  &:hover {
    color: #061c34;
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)) padding-box, $border-grad border-box;
    box-shadow: 0 0 0 0.5px $bd-alpha inset, 0 8px 28px rgba(33, 150, 243, 0.28), /* 블루 글로우 */ 0 6px 24px rgba(0, 0, 0, 0.25);
    transform: translateY(-1px);
  }
}
// 리뷰 목록
.review-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

// 필터 버튼
.filter-buttons {
  display: flex;
  gap: 44px;
  font-size: $small-txt;
}

.filter-btn {
  background: transparent;
  border: transparent;
  color: $border-color;
  font-weight: 700;
  font-size: $small-txt;
  cursor: pointer;

  &.active {
    color: $point-color;
  }

  &.photo {
    // background-color: $point-color;
    color: $sub-font-color;
    padding: 5px 20px;
    border-radius: 4px;
  }
}

// 구분선
.divider {
  height: 1px;
  background-color: #d9d9d9;
  width: 100%;
}

// 리뷰 아이템
.review-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 사용자 정보
.user-info {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: $small-txt;
}

.profile-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stars {
  display: flex;
  gap: 5px;
  color: $point-color;
}

.star {
  font-weight: bold;
  font-family: "Font Awesome 6 Free";
  font-size: $small-txt;
  font-style: normal;
}

.username {
  color: #6b7684;
  font-weight: 500;
}

.review-meta {
  color: #999;
  font-size: $small-txt;
}

// 이미지 갤러리
.image-gallery {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.review-img {
  width: 155px;
  height: 155px;
  border-radius: 16px;
  object-fit: cover;
}

// 리뷰 텍스트
.review-text {
  color: $sub-font-color;
  line-height: 1.6;
  font-size: $small-txt;
}

// 좋아요 버튼

.like-btn {
  width: 110px;
  height: 60px;
  border: 1px solid $border-color;
  align-items: center;
  justify-content: center;
  background: $main-color;
  gap: 15px;
  font-size: $medium-txt-2;
  border-radius: 50px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    border-color: $point-color;

    .heart-icon {
      color: $point-color;
    }
  }
}

.heart-icon {
  width: 24px;
  height: 27px;
  position: relative;
  font-size: 25px;
  font-family: "Font Awesome 7 Free";
  color: $border-color;
  // text-align: left;
  display: flex;
  // justify-items: ;
}

// 타이틀 박스
.title-box {
  text-align: center;
  margin: 100px 0;
  // gap: 20px; //적용이 안댐...

  h2 {
    // font-size: $medium-txt-1;
    font-size: $main-title;
    margin-bottom: 10px;
  }

  p {
    font-size: $esti-medium-txt;
    color: #666;
    padding-top: 20px;
  }
}

// 카드 섹션
.card-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 40px 0;
}

.best-card {
  height: 300px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.postrev-btn {
  color: $point-color;
  font-size: $small-txt;
  font-weight: bold;
  background: transparent;
  border: transparent;
  text-align: right;
  padding: 0 45px;
  width: 100%;
}
</style>
