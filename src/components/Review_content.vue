<script setup>
import { ref, computed, onMounted } from "vue";
// import { PostModal } from "@/components/Post_Modal.vue";
// const PostModal = useModal();

const SHEETDB_API = "https://sheetdb.io/api/v1/63h80yl17hy1y";
const revInfo = ref([]);
const rating = ref(0);
const selRating = ref(0);
const activeFilter = ref("최신순");
const isLoading = ref(true);
const selectedImage = ref(null);
const showImageModal = ref(false);
const copiedSuccess = ref(false);
const hoverRating = ref(0);

onMounted(() => {
  getReviewsInfo();
  console.log(averageScore.value);
});

const getReviewsInfo = async () => {
  try {
    const response = await fetch(SHEETDB_API);
    const data = await response.json();

    // comment가 있는 것만 필터링 후 map
    revInfo.value = data
      .filter((item) => item.REV_COMMENT) // comment가 있는 것만 먼저 필터링
      .map((item) => ({
        id: item.id,
        username: item.USER_NM,
        rating: Number(item.REV_RATING) || 0,
        comment: item.REV_COMMENT,
        date: item.REV_DT || "",
        service: item.SERVICE || "",
        likes: Number(item.REV_LIKES) || 0,
        images: item.REV_IMG ? item.REV_IMG.split(",").map((img) => img.trim()) : [],
        userImage: item.USER_IMG ? item.USER_IMG : [],
      }));

    console.log("리뷰 불러오기 확인:", revInfo.value);
    console.log("리뷰 개수:", revInfo.value.length);
  } catch (error) {
    console.error("Error:", error);
  }
};


// 카드형 리뷰 데이터
// const reviewCards = ref([
//   {
//     profileImg: "/images/profile.png",
//     username: "000 고객님",
//     date: "2025.09.16",
//     service: "카이저제빙기 디테일 클리어서비스 이용",
//     mainImage: "/images/img1.png",
//     description:
//       "퓨어러스는 제빙기 내부에 있는 모든 오염들에 대해 완벽한 케어를 목표로 하고 있습니다. 전문적인 장비와 기술로 깨끗하게 청소해주셔서 정말 만족스럽습니다.",
//   },
//   {
//     profileImg: "/images/profile.png",
//     username: "000 고객님",
//     date: "2025.09.16",
//     service: "카이저제빙기 디테일 클리어서비스 이용",
//     mainImage: "/images/img2.png",
//     description:
//       "퓨어러스는 제빙기 내부에 있는 모든 오염들에 대해 완벽한 케어를 목표로 하고 있습니다. 전문적인 장비와 기술로 깨끗하게 청소해주셔서 정말 만족스럽습니다.",
//   },
//   {
//     profileImg: "/images/profile.png",
//     username: "000 고객님",
//     date: "2025.09.16",
//     service: "카이저제빙기 디테일 클리어서비스 이용",
//     mainImage: "/images/img3.png",
//     description:
//       "퓨어러스는 제빙기 내부에 있는 모든 오염들에 대해 완벽한 케어를 목표로 하고 있습니다. 전문적인 장비와 기술로 깨끗하게 청소해주셔서 정말 만족스럽습니다.",
//   },
// ]);

// 총 리뷰 개수
const totalReviews = computed(() => revInfo.value?.length || 0);

// 별점별 개수 계산
const getRatingCounts = computed(() => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  revInfo.value.forEach((review) => {
    counts[Math.ceil(review.rating)]++;
  });

  return counts;
});

// 평균 점수 계산 (소수점 1자리)
const averageScore = computed(() => {
  if (totalReviews.value === 0) return 0;
  const sum = revInfo.value.reduce((acc, review) => acc + review.rating, 0);
  console.log(sum);

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

// 좋아요 토글
const toggleLike = (reviewId) => {
  const review = revInfo.value.find((r) => r.id === reviewId);
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

      <button @click="openModal" class="postrev-btn">리뷰 남기기</button>
    </div>

    <div class="review-section">
      <div class="show-review">
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
                <span class="point">{{ ratingCnt }}</span>
                <span class="unit">점</span>
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
            <div class="filter-tabs">
              <!-- <div class="filler-icon"></div> -->
              <button class="filter-btn" @click="seqLast">최신순</button>
              <button class="filter-btn" @click="seqBest">추천순</button>
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
          <div class="review-item" v-for="(review, i) in revInfo" :key="i">
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
            </div>
            <div class="review-meta">{{ review.date }} ∙ {{ review.service }}</div>

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
                <i class="like-icon" :class="{ filled: isLiked(revInfo.id) }"></i>
                <span>{{ review.likes }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="show-postcard">
        <div class="carddiv">
          <div class="card-rating">
            <!-- 별점 선택 -->
            <span @click="selRating = n" :class="{ spanActive: n <= selRating }">
              <i class="fas fa-star" v-for="n in 5" :key="n"></i>
            </span>
          </div>
          <div class="text-box">
            <!-- 후기 작성 -->
            <textarea v-model="txtRevCon" placeholder="리뷰를 작성하세요."></textarea>
            <!-- 사진 업로드 -->
            <div class="file-btn">
              <input type="file" @change="uploadImage" accept="image/*" />
              <!-- 등록 버튼 -->
            </div>
            <button class="submit-btn" @click="submitReview">등록하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/_variables" as *;
.rev-con {
  display: block;
  height: auto;
  background-color: #fff;
  font-style: normal;
}

// 타이틀 박스
.title-section {
  padding: 100px 0;
  text-align: center;
  color: $font-color;

  h2 {
    font-size: $main-title;
    margin-bottom: 28px;
  }

  p {
    font-size: $esti-medium-txt;
    color: #666;
  }
}

.review-section {
  position: relative;
  display: flex;
  justify-content: space-around;
  gap: 0 50px;

  .revlist-wrap {
    width: 60%;
  }

  .show-postcard {
    display: block;
    align-items: center;
    width: 40%;
    position: sticky;

    .carddiv {
      // width: 100%;
      height: 50vh;
      border-radius: 16px;
      background-color: $sub-color;
      padding: 30px;
    }

    .card-rating {
      &:spanactive {
        border-color: $point-color;
        color: $point-color;
        font-weight: bold;
        .i {
          color: $point-color;
        }
      }
      //
    }

    .text-box {
      width: 100%;
      height: 8vh;
      border-radius: 16px;
      border: 1px solid #ccc;
    }
  }
}
.submit-btn {
  width: 100%;
  background: #0a66c2;
  color: $sub-font-color;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: $main-color;
}
// 평점 섹션 =========================
.rating-section {
  display: flex;
  align-items: center;
  gap: 100px;
  padding: 30px 90px;
  border-radius: 16px;
  background-color: #f2f4f6;
  margin-top: 15px;
  margin-bottom: 30px;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 60px;
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
  // margin-bottom: 10px;
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

//
.modal_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal_section {
  background-color: #fff;
  width: 560px;
  // height: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  border-radius: 30px;
  padding: 40px 50px 50px;
  .x-mark {
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: $medium-txt-2;
    cursor: pointer;
  }
}

// 리뷰 목록
.review-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
}
.grp-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 필터 버튼
  .filter-tabs {
    display: flex;
    gap: 20px;
    align-items: center;

    &.active {
      color: $point-color;
      .img-icon {
        color: $point-color;
      }
    }

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
    align-items: center;
    color: $border-color;
    .fa-filter {
      font-family: "Font Awesome 5 Free";
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
      align-items: center;
      .img-icon {
        font-family: "Font Awesome 5 Free";
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
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 30px;
  &:last-child {
    border: none;
  }
}

// 사용자 정보
.user-info {
  display: flex;
  align-content: start;
  align-items: end;
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
  gap: 5px;
}

.username {
  color: #6b7684;
  font-weight: 500;
}

.review-meta {
  color: #999;
  font-size: $small-txt;
}

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
}

// 좋아요 버튼
// .like-div {

// }
.like-btn {
  color: $border-color;
  padding: 10px 20px;
  border: 1px solid $border-color;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background: transparent;
  font-size: $esti-medium-txt;
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
    font-style: normal;
    font-family: "Font Awesome 5 Free";
    color: $border-color;
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
  }
}

// ============================================
// @media screen and (max-width: 1200px)
// @media screen and (max-width: 850px)
@media (max-width: 768px) {
  .rev-con {
    .title-section {
      padding: 50px 0;
      h2 {
        font-size: 24px;
        margin-bottom: 15px;
      }
      p {
        font-size: 16px;
      }
    }

    .review-section {
      position: relative;
      display: block;
      justify-content: space-around;
      gap: 50px;

      .revlist-wrap {
        width: 100%;
      }

      .show-postcard {
        width: 100%;
      }

      .post-card {
        // margin: 15px auto;

        input,
        textarea {
          margin: 30px;
        }

        button {
          width: 100%;
          background: #0a66c2;
          color: var(--button-text);
          border: none;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }

    .rating-section {
      gap: 20px;
      padding: 30px;
      .rating-summary {
        gap: 35px;
        align-items: center;
        padding-bottom: 10px;
        .rating-score {
          width: 100%;
        }
      }
    }
    .review-list {
      .review-item {
        gap: 15px;
        .review-text {
          p {
            font-size: 16px;
          }
        }
        .like-div {
          .like-btn {
            padding: 5px 10px;
            i,
            span {
              font-size: 16px;
            }
          }
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
      }
    }
  }

  .allscore {
    min-width: 200px;
  }
}

// @media screen and (max-width: 450px)

@media (max-width: 390px) {
  .rev-con {
    .title-section {
      padding: 30px 0;
      h2 {
        font-size: 22px;
        margin-bottom: 15px;
      }
      p {
        font-size: 14px;
      }
    }
    .postrev {
      .postrev-cnt {
        font-size: 14px;
      }
      .postrev-btn {
        font-size: 14px;
      }
    }

    .rating-section {
      flex-direction: column;
      gap: 5px;
      padding: 20px;
      .divider-line {
        display: none;
      }
      .rating-summary {
        gap: 35px;
        align-items: center;
        padding-bottom: 10px;
        .rating-score {
          width: 100%;
          .score-text {
            font-size: 20px;
          }
          .stars-container {
            .stars {
              gap: 3px;
              i {
                font-size: 14px;
              }
            }
          }
        }
      }
      .allscore {
        .stats-title {
          font-size: 14px;
        }
        .stat-label {
          .point,
          .unit {
            font-size: 14px;
          }
        }

        .stat-item {
          gap: 0;
          .stat-count {
            width: 15px;
          }
          .stat-bar-container {
            margin: 0 20px 0 7px;
          }
        }
      }
    }
    .review-list {
      margin-bottom: 20px;
      .grp-btn {
        .filter-tabs {
          gap: 10px;
          .filter-btn {
            font-size: 14px;
            &.photo {
              gap: 5px;
              .img-icon {
                font-size: 12px;
                padding-top: 0;
              }
            }
          }
        }
        .filter-detail {
          gap: 5px;
          .fa-filter {
            font-size: 12px;
            padding-top: 0;
          }
          .filter-btn {
            font-size: 14px;
          }
        }
      }
      .review-item {
        gap: 10px;
        padding-bottom: 15px;
        .review-text {
          p {
            font-size: 16px;
          }
        }
        .like-div {
          .like-btn {
            padding: 5px 10px;
            i,
            span {
              font-size: 16px;
            }
          }
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          .profile-img {
            width: 35px;
            height: 35px;
          }
          .user-details {
            display: flex;
            flex-direction: column;
            gap: 5px;
            .username {
              font-size: 12px;
            }
            // 개별 별점 컨테이너
            .stars-container {
              margin: 0;

              .stars {
                gap: 3px; // 간격 좁게

                i {
                  font-size: 12px; // 개별 별점 크기 (작게)
                }
              }
            }
          }
        }
        .review-meta {
          font-size: 12px;
        }
        .image-gallery {
          flex-wrap: nowrap;
          .review-img {
            width: 120px;
            height: 120px;
            border-radius: 8px;
          }
        }
        .review-text {
          p {
            font-size: 14px;
          }
        }
        .like-div {
          .like-btn {
            padding: 3px 6px;
            gap: 3px;
            .like-icon {
              font-size: 14px;
            }
            span {
              font-size: 14px;
            }
          }
        }
      }
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
