<script setup>
import { ref, computed, onMounted } from "vue";

const activeFilter = ref("추천순");
const rating = ref(0);
const userImgUrl = ref("/images/profile.png");
const revImgUrl = ref(["/images/review/review1.png", "/images/Real-riv.png", "/images/Real-riv3.png"]);

const reviews = ref([
  {
    id: 1,
    userImage: userImgUrl.value,
    username: "ㅇㅇ2",
    date: "2025.09.16",
    service: "카이저제빙기 디테일 클리어서비스 이용",
    images: [revImgUrl.value[0], revImgUrl.value[1]],
    comment: "아주 굳b",
    likes: 5,
    rating: 3.5,
  },
  {
    id: 2,
    userImage: userImgUrl.value,
    username: "ㅇㅇ",
    date: "2025.09.13",
    service: " 제빙기   이용",
    images: [revImgUrl.value[2]], // ✅ 배열로 (1개여도)
    comment: "test comment",
    likes: 10,
    rating: 1,
  },
  {
    id: 3,
    userImage: userImgUrl.value,
    username: "ㅇㅇ",
    date: "2025.09.13",
    service: " 제빙기   이용",
    images: [], // ✅ 배열로 (1개여도)
    comment: "test comment",
    likes: 10,
    rating: 2,
  },
]);

// 총 리뷰 개수
const totalReviews = computed(() => reviews.value.length);

// 별점별 개수 계산
const getRatingCounts = computed(() => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.value.forEach((review) => {
    counts[Math.ceil(review.rating)]++;
  });

  console.log(counts);

  return counts;
});

// 평균 점수 계산 (소수점 1자리)
const averageScore = computed(() => {
  if (totalReviews.value === 0) return 0;
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return (sum / totalReviews.value).toFixed(1);
});

// // 별점별 비율 계산 (퍼센트)
// const getRatingPercentage = (rating) => {
//   if (totalReviews.value === 0) return 0;
//   starCnt.value = Math.round((ratingCounts.value[rating] / totalReviews.value) * 100);
//   return;
// };

// 좋아요 상태 관리
const likedReviews = ref(new Set());

// 초기 로드 시 localStorage에서 불러오기
onMounted(() => {
  const saved = localStorage.getItem("likedReviews");
  if (saved) {
    likedReviews.value = new Set(JSON.parse(saved));
  }
});

// 좋아요 토글
const toggleLike = (reviewId) => {
  const review = reviews.value.find((r) => r.id === reviewId);
  if (!review) return;

  if (likedReviews.value.has(reviewId)) {
    // 좋아요 취소
    review.likes--;
    likedReviews.value.delete(reviewId);
  } else {
    // 좋아요 추가
    review.likes++;
    likedReviews.value.add(reviewId);
  }

  // localStorage에 저장
  localStorage.setItem("likedReviews", JSON.stringify([...likedReviews.value]));
};

// 좋아요 상태 확인
const isLiked = (reviewId) => {
  return likedReviews.value.has(reviewId);
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
          <i class="score-text">{{ averageScore }}</i>
          <div class="stars-container">
            <!-- 배경 (빈 별) -->
            <div class="stars stars-bg">
              <i v-for="star in 5" :key="`bg-${star}`" class="fas fa-star"></i>
            </div>
            <!-- 채워진 별 (평점만큼) -->
            <div class="stars stars-fill" :style="{ width: `${(averageScore / 5) * 100}%` }">
              <i v-for="star in 5" :key="`fill-${star}`" class="fas fa-star"></i>
            </div>
          </div>
        </div>
        <div class="divider-line"></div>
      </div>

      <div class="allscore">
        <i class="stats-title">총 만족도</i>
        <div class="stat-item" v-for="ratingCnt in [5, 4, 3, 2, 1]" :key="ratingCnt">
          <div class="stat-label">
            <span class="point">{{ ratingCnt }}</span
            ><span class="unit">점</span>
          </div>
          <!-- <div class="stat-count" v-if="ratingCounts.counts.le === ">{{ }}</div> -->
          <div class="stat-count">{{ getRatingCounts[ratingCnt] }}</div>
          <!-- 개수 바 -->
          <div class="stat-bar-container">
            <div class="stat-bar-bg"></div>
            <div class="stat-bar-fill" :style="{ width: `${(getRatingCounts[rating] / totalReviews) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 리뷰 목록 -->
    <div class="review-list">
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
        <div class="filter-detail">
          <i class="fa-solid fa-filter"></i>
          <button class="filter-btn">상세 필터</button>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 리뷰 아이템 -->
      <div class="review-item" v-for="(review, i) in reviews" :key="i">
        <!-- 사용자 정보 -->
        <div class="user-info">
          <img v-if="review.userImage" :src="review.userImage" alt="프로필" class="profile-img" />
          <!-- 개별 점수 -->
          <div class="user-details">
            <span class="username">{{ review.username }}</span>
            <div class="stars-container">
              <div class="stars stars-bg">
                <i v-for="star in 5" :key="`bg-${star}`" class="fas fa-star"></i>
              </div>
              <div class="stars stars-fill" :style="{ width: `${(review.rating / 5) * 100}%` }">
                <i v-for="star in 5" :key="`fill-${star}`" class="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div class="review-meta">{{ review.date }} ∙ {{ review.service }}</div>
        </div>

        <!-- 이미지 갤러리 -->
        <div class="image-gallery" v-if="review.images && review.images.length > 0">
          <img v-for="(img, idx) in review.images" :key="idx" :src="img" alt="리뷰 이미지" class="review-img" />
          {{ (img, idx) }}
        </div>

        <!-- 리뷰 내용 -->
        <div class="review-text" v-if="review.comment">
          <p>{{ review.comment }}</p>
        </div>

        <!-- 좋아요 버튼 -->
        <div class="like-div">
          <button class="like-btn" @click="toggleLike(review.id)" :class="{ active: isLiked(review.id) }">
            <i class="like-icon" :class="{ filled: isLiked(reviews.id) }"></i>
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
  background-color: #fff;
  font-style: normal;
}

// 타이틀 박스
.title-section {
  padding: 100px 0;
  // height: max-content;
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

// 평점 섹션 =========================
.rating-section {
  display: flex;
  align-items: center;
  gap: 226px;
  padding: 30px 90px;
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
    margin-bottom: 10px;
  }

  .stars {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 7px;
  }

  .star {
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    font-family: "Font Awesome 5 Free";
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

//리뷰 남기기 버튼 ============================
.postrev {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
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
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
}
// ========================================

//========================================
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
  gap: 10px;
  // margin: 40px;
}
.grp-btn {
  display: flex;
  justify-content: space-between;

  // 필터 버튼
  .filter-buttons {
    display: flex;
    gap: 20px;

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
    // font-size: $small-txt;

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
  // justify-content: flex-start;
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
  .review-list {
    min-width: 600px;
  }

  .user-info {
    display: block;
    align-items: center;
    gap: 11px;
    font-size: $small-txt;
  }

  .rating-section {
    gap: $tab-spacing;
    min-width: 600px;
    padding: 30px 79px 30px 70px;
    margin: 40px 0;
  }

  .allscore {
    min-width: 200px;
  }
  // .rating-summary {
  //   gap: $tab-spacing;
  // }
  // .rating-section {
  //   gap: $tab-spacing;
  // }
}

// ========== 평점 섹션의 평균 별점 (큰 크기) ==========
.rating-score {
  width: 150px;
  text-align: center;

  .score-text {
    font-size: $medium-txt-1;
    font-weight: 700;
    font-style: normal;
    display: block;
    margin-bottom: 10px;
  }

  // 평균 별점 컨테이너
  .stars-container {
    height: 24px; // 큰 별점 높이
  }

  .stars {
    gap: 8px; // 간격도 조금 더 넓게

    i {
      font-size: 24px; // 평균 별점 크기 (크게)
    }
  }
}

// ========== 개별 리뷰의 별점 (작은 크기) ==========
.user-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;

  .username {
    color: #6b7684;
    font-weight: 500;
  }

  // 개별 별점 컨테이너
  .stars-container {
    margin: 0;
    height: 14px; // 작은 별점 높이
  }

  .stars {
    gap: 3px; // 간격 좁게

    i {
      font-size: 14px; // 개별 별점 크기 (작게)
    }
  }
}

// ========== 별점 컨테이너 공통 스타일 ==========
.stars-container {
  position: relative;
  width: fit-content;
  margin: 0 auto;
}

.stars {
  display: flex;
}

// 배경 별 (빈 별)
.stars-bg {
  position: relative;

  i {
    color: #dce7fb;
  }
}

// 채워진 별 (평점만큼)
.stars-fill {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: width 0.3s ease;

  i {
    color: $point-color;
  }
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
