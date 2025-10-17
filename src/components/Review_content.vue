<script setup>
import { ref, computed } from "vue";

const cnt = ref(0);
const activeFilter = ref("추천순");
const rating = ref(0);
// const reviewTxt = ref("");
// const reviewList = ref([]);
const imgUrl = ref("");

const reviews = ref([
  {
    id: 1,
    userImage: "",
    username: "성다영",
    date: "2025.09.16",
    service: "카이저제빙기 디테일 클리어서비스 이용",
    images: ["", ""],
    comment:
      "예약 후 빠른 연락과 제빙기별 맞춤으로 상담해주셨습니다!! 그리고 기사분의 전문성과 청소 용품 퀄리티도 좋습니다 생각보다 디테일한 부분까지 분해하시는데 오히려 좋은 것 같아요! 깨끗해진 제빙기를 보니 기분도 좋고 매장이 화사해지고 개운해서 더 좋아용",
    likes: 5,
    rating: 5,
  },
  {
    id: 2,
    userImage: "",
    username: "성다영2",
    date: "2025.09.16",
    service: "카이저제빙기 디테일 클리어서비스 이용",
    images: ["", "", "", ""],
    comment:
      "예약 후 빠른 연락과 제빙기별 맞춤으로 상담해주셨습니다!! 그리고 기사분의 전문성과 청소 용품 퀄리티도 좋습니다 생각보다 디테일한 부분까지 분해하시는데 오히려 좋은 것 같아요! 깨끗해진 제빙기를 보니 기분도 좋고 매장이 화사해지고 개운해서 더 좋아용",
    likes: 10,
    rating: 4,
  },
]);

// 총 리뷰 개수
const totalReviews = computed(() => reviews.value.length);

// 별점별 개수 계산
const ratingCounts = computed(() => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.value.forEach((review) => {
    counts[review.rating]++;
  });
  return counts;
});

// 평균 점수 계산 (소수점 1자리)
const averageScore = computed(() => {
  if (totalReviews.value === 0) return 0;
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return (sum / totalReviews.value).toFixed(1);
});

// 별점별 비율 계산 (퍼센트)
const getRatingPercentage = (rating) => {
  if (totalReviews.value === 0) return 0;
  return Math.round((ratingCounts.value[rating] / totalReviews.value) * 100);
};
</script>

<template>
  <div class="inner rev-con">
    <!-- 타이틀 -->
    <div class="title-section">
      <h2>고객후기</h2>
      <p>퓨어러스의 제빙기 케어 사례를 확인하세요.</p>
    </div>

    <div class="postrev">
      <div class="postrev-cnt">리뷰 수 {{ totalReviews }}</div>
      <!-- <div :class="isCntReview">{{}}</div> -->
      <button class="postrev-btn">리뷰 남기기</button>
    </div>

    <!-- 총 만족도 ==========================-->
    <div class="rating-section">
      <div class="rating-summary">
        <div class="rating-score">
          <i class="score-text">4.9</i>
          <div class="stars">
            <div class="star filled">★</div>
            <div class="star filled">★</div>
            <div class="star half">★</div>
            <div class="star filled">★</div>
            <div class="star empty">★</div>
          </div>
        </div>
        <div class="divider-line"></div>
      </div>

      <div class="allscore">
        <i class="stats-title">총 만족도</i>
        <div class="stat-item">
          <div class="stat-label"><span class="point">5</span><span class="unit">점</span></div>
          <div class="stat-count">283</div>
          <div class="stat-bar-container">
            <div class="stat-bar-bg"></div>
            <div class="stat-bar-fill" style="width: 82.6%"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">4점</div>
          <div class="stat-count">37</div>
          <div class="stat-bar-container">
            <div class="stat-bar-bg"></div>
            <div class="stat-bar-fill" style="width: 12.9%"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">3점</div>
          <div class="stat-count">9</div>
          <div class="stat-bar-container">
            <div class="stat-bar-bg"></div>
            <div class="stat-bar-fill" style="width: 7.8%"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">2점</div>
          <div class="stat-count">5</div>
          <div class="stat-bar-container">
            <div class="stat-bar-bg"></div>
            <div class="stat-bar-fill" style="width: 6.4%"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">1점</div>
          <div class="stat-count">0</div>
          <div class="stat-bar-container">
            <div class="stat-bar-bg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="review-lis" v-for="(item, i) in reviews">
        </div> -->
    <!--  -->
    <!-- 리뷰 목록 -->
    <div class="review-list">
      <!-- <div class="review-list" v-for="(item, i) in revList" :key="i" > -->
      <div class="divider"></div>
      <div class="grp-btn">
        <!-- 필터 버튼 -->
        <div class="filter-buttons">
          <!-- 필터 아이콘  -->
          <!-- <div class="filler-icon"></div> -->
          <button class="filter-btn" @click="seqBest">추천순</button>
          <button class="filter-btn" @click="seqLast">최신순</button>
          <button class="filter-btn photo" @click="selPhoto">
            <div class="img-icon"></div>
            사진 리뷰
          </button>
        </div>

        <!--  상세 필터 ===============================-->
        <!-- <div class="filter-detail">
              <i class="fa-solid fa-filter"></i>
              <button class="filter-btn">상세 필터</button>
            </div> -->
      </div>

      <div class="divider"></div>

      <!-- 리뷰 아이템 -->
      <div class="review-item" v-for="review in reviews" :key="review.id">
        <!-- 사용자 정보 -->
        <div class="user-info">
          <img src="/images/profile.png" alt="프로필" class="profile-img" />
          <!-- <img :src="review.userImage" alt="프로필" class="profile-img" /> -->
          <div class="user-details">
            <span class="username">{{ review.username }}</span>
            <div class="stars">
              <i class="star" v-for="n in 5" :key="n"></i>
            </div>
          </div>
          <div class="review-meta">{{ review.date }} ∙ {{ review.service }}</div>
        </div>

        <!-- 이미지 갤러리 -->
        <div class="image-gallery" v-if="review.images">
          <img class="review-img" src="\images\review\review1.png" alt="" />
          <!-- <img v-for="(img, idx) in review.images" :key="idx" :src="img" alt="리뷰 이미지" class="review-img" /> -->
        </div>

        <!-- 리뷰 내용 -->
        <p class="review-text">{{ review.content }}</p>

        <!-- 좋아요 버튼 -->

        <div class="like-div">
          <!-- <button :class="{ active: activeFilter === '추천순' }" @click="setFilter('추천순')"> -->
          <button class="like-btn">
            <i class="like-icon"></i>
            <span>{{ review.likes }}</span>
          </button>
        </div>

        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/_variables" as *;

.rev-con {
  width: 100%;
  height: auto;
  position: relative;
  align-items: flex-start;
  // background-color: $main-color;
  background-color: #fff;
  font-style: normal;
}

// 타이틀 박스
.title-section {
  padding: 100px 0;
  height: max-content;
  text-align: center;
  color: $font-color;

  h2 {
    font-size: $main-title;
    margin-bottom: 10px;
  }

  p {
    font-size: $esti-medium-txt;
    color: #666;
    padding-top: 20px;
  }
}

//리뷰 남기기 ============================

.postrev {
  // font-size: $small-txt;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .postrev-cnt {
    font-size: $small-txt;
    font-weight: bold;
    color: #333;
  }

  .postrev-btn {
    color: $point-color;
    font-size: $small-txt;
    font-weight: bold;
    background: transparent;
    border: transparent;
    text-align: right;
    cursor: pointer;
  }
}

// ========================================

// 평점 섹션 =========================
.rating-section {
  display: flex;
  align-items: center;
  gap: 226px;
  padding: 30px 90px 30px 90px;
  border-radius: 16px;
  background-color: #f2f4f6;
  margin: 40px 0;
}

.rating-summary {
  display: flex;
  align-items: flex-start;
  gap: $tab-spacing;
}

.rating-score {
  width: 150px;
  text-align: center;

  .score-text {
    font-size: $medium-txt-1;
    font-weight: 700;
    font-style: normal;
    display: block;
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 7px;
    justify-content: center;
  }

  .star {
    font-size: 18px;
    font-style: normal;

    &.filled {
      color: $point-color;
    }

    &.half {
      color: $point-color;
    }

    &.empty {
      color: #dce7fb;
    }
  }
}

.allscore {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;

  .stats-title {
    color: #333;
    font-size: $small-txt;
    font-weight: 600;
    font-style: normal;
    margin-bottom: 5px;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  .stat-label {
    width: 31px;
    font-size: 15px;
    color: #6b7684;

    .point {
      font-size: 15px;
    }

    .unit {
      font-size: 14px;
    }
  }

  .stat-count {
    position: absolute;
    right: 0;
    font-size: 14px;
    color: #6b7684;
    width: 30px;
    text-align: right;
  }

  .stat-bar-container {
    flex: 1;
    height: 10px;
    position: relative;
    margin: 0 45px 0 7px;
  }

  .stat-bar-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    border-radius: 16px;
    background-color: #dce7fb;
  }

  .stat-bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 10px;
    border-radius: 16px;
    background-color: $point-color;
  }
}

.divider-line {
  width: 1px;
  height: 120px;
  background-color: #d9d9d9;
}
// end 평정 섹션 =====================

//
.review-li {
  // background: $bg-light;
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  h2 {
    // color: $text-color;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    // color: $text-color;
  }
}

// 리뷰 목록
.review-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  // margin: 40px;
}
.grp-btn {
  display: flex;
  justify-content: space-between;

  // 필터 버튼
  .filter-buttons {
    display: flex;
    gap: 40px;

    &.hover {
      color: $point-color;
      .img-icon {
        color: $point-color;
      }
    }
  }

  .filter-detail {
    gap: 10px;
    display: flex;
    justify-content: left;
    color: $border-color;
    font-family: "Font Awesome 5 Free";
    .fa-filter {
      padding-top: 6px;
    }
  }

  .filter-btn {
    display: flex;
    justify-content: right;
    background: transparent;
    border: transparent;
    font-weight: 700;
    color: $border-color;
    cursor: pointer;
    font-size: $small-txt;

    &.active {
      color: $point-color;
    }

    &.photo {
      gap: 10px;
      font-family: "Font Awesome 5 Free";
      .img-icon {
        padding-top: 5px;
      }
    }
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
  gap: 30px;
  padding: 20px 0;
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
  gap: 3px;
  color: $point-color;
}

.star {
  color: $point-color;
  font-weight: 900;
  font-family: "Font Awesome 5 Free";
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
  width: 140px;
  height: 140px;
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
.like-div {
  // gap: 10px;
  .like-btn {
    color: $border-color;
    width: 80px;
    height: 40px;
    border: 1px solid $border-color;
    align-items: center;
    background: transparent;
    font-size: $esti-medium-txt;
    font-size: $esti-medium-txt;
    font-weight: solid;
    border-radius: 50px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      border-color: $point-color;
      color: $point-color;
      font-weight: bold;
      .like-icon {
        color: $point-color;
      }
    }

    &:active {
      border-color: $point-color;
      color: $point-color;
      font-weight: bold;
      .like-icon {
        color: $point-color;
      }
    }

    .like-icon {
      width: 24px;
      height: 27px;
      gap: 15px;
      font-style: normal;
      font-family: "Font Awesome 5 Free";
      color: $border-color;
    }
  }
}

// 카드 섹션
.card-section {
  display: flex;
  // grid-templates-columns: repeat(3, 1fr);
  gap: 25px;
  margin: 60px 0 40px;
  background-color: #4da5e4;
}

.best-card {
  width: 100%;
  height: 670px;
  position: relative;
  border-radius: 16px;
  box-shadow: 0px 10px 15px rgba(41, 106, 243, 0.25);
  background: white;
  overflow: hidden;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 179px;
  object-fit: cover;
}

.card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 30px 30px;
  gap: 36px;
  justify-content: center;
}

.card-user {
  display: flex;
  align-items: center;
  gap: 21px;
}

.card-profile {
  width: 94px;
  height: 97px;
  border-radius: 50%;
  object-fit: cover;
}

.card-user-info {
  display: flex;
  flex-direction: column;
  width: 226px;
}

.card-stars {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}

.card-star {
  font-size: 18px;
  color: $point-color;
  font-style: normal;
}

.card-username {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  text-align: center;

  .name {
    font-size: $esti-medium-txt;
    font-weight: 500;
    color: white;
  }

  .suffix {
    font-size: 18px;
    color: white;
  }
}

.card-date {
  font-size: 18px;
  color: #f0f0f0;
  line-height: 1.4;

  p {
    margin: 0;
  }
}

.card-text {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .quote-icon {
    width: 21px;
    height: 15px;
  }

  .text-content {
    font-size: 24px;
    font-weight: 300;
    color: #6b7684;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.card-review-img {
  width: 100%;
  border-radius: 16px;
  max-height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .user-info {
    display: block;
    align-items: center;
    gap: 11px;
    font-size: $small-txt;
  }

  .rating-section {
    gap: $tab-spacing;
    padding: 30px 79px 30px 70px;
    margin: 40px 0;
  }

  // .rating-summary {
  //   gap: $tab-spacing;
  // }
  // .rating-section {
  //   gap: $tab-spacing;
  // }
}
</style>

<!-- 추후 수정 -->
<!-- 베스트 리뷰 카드 ============-->
<!-- <div class="card-section">
          <div class="best-card" v-for="(card, index) in bestReviews" :key="index">
            <img :src="card.bgImage" alt="배경" class="card-bg" />
            <div class="card-content">
              <div class="card-user">
                <img :src="card.userImage" alt="프로필" class="card-profile" />
                <div class="card-user-info">
                  <div class="card-stars">
                    <div class="card-star">⭐</div>
                    <div class="card-star">⭐</div>
                    <div class="card-star">⭐</div>
                    <div class="card-star">⭐</div>
                    <div class="card-star">⭐</div>
                  </div>
                  <div class="card-username">
                    <span class="name">{{ card.username }}</span>
                    <span class="suffix">고객님</span>
                  </div>
                </div>
              </div>
              <div class="card-date">
                <p>{{ card.date }} ∙ {{ card.service }}</p>
              </div>
              <div class="card-text">
                <img src="/images/downlode.svg" alt="인용" class="quote-icon" />
                <div class="text-content">{{ card.content }}</div>
              </div>
              <img :src="card.reviewImage" alt="리뷰 이미지" class="card-review-img" />
            </div>
          </div>
        </div> -->
