<template>
  <!-- process wrap -->
  <div class="process-wrap" ref="processRef">
    <div class="inner">
      <!-- 타이틀 -->
      <h2 class="title">청소 과정 한눈에</h2>
      <!-- 웹 / 태블릿용 슬라이드 (모바일에서 아코디언으로 변경) -->
      <div class="slide-wrap">
        <ul class="process">
          <li
            class="txt"
            v-for="(pro, index) in process"
            :key="pro.id"
            :class="[
              {
                click: isMobile ? openedIndex === index : current === index,
                open: openedIndex === index,
              },
            ]"
            @click="handleClick(index)"
          >
          <!-- 과정 텍스트 -->
            <p>{{ pro.id }} {{ pro.title }}</p>

            <transition name="accordion">
              <div
                class="img"
                v-if="isMobile ? openedIndex === index : current === index"
                :class="{ upward: index === process.length - 1 }"
              >
                <img
                  :src="processImg[index].img"
                  :alt="processImg[index].alt"
                />
              </div>
            </transition>
          </li>
        </ul>
      </div>
      <!-- 모바일용 안내 문구 -->
      <p class="clickTxt" v-if="isMobile">▲ 과정을 클릭해보세요 !</p>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const current = ref(0); //슬라이드 현재 인덱스
const openedIndex = ref(0); //모바일에서 열린 아코디언 인덱스
const isMobile = ref(false); //모바일 여부감지
const processRef = ref(null); //스크롤 트리거 감지용

const process = [
  { id: "01", title: "제품 완전 분해" },
  { id: "02", title: "전용 세정제로 세척" },
  { id: "03", title: "고압 스팀 살균 세척" },
  { id: "04", title: "친환경 UV 살균 소독" },
  { id: "05", title: "제품 조립" },
  { id: "06", title: "테스트 작동" },
];
const processImg = [
  { img: "/images/process2.png", alt: "process1" },
  { img: "/images/process1.png", alt: "process2" },
  { img: "/images/process3.png", alt: "process3" },
  { img: "/images/process4.png", alt: "process4" },
  { img: "/images/process5.png", alt: "process5" },
  { img: "/images/process6.png", alt: "process6" },
];

let interval = null; //슬라이드 타이머
let inProcess = false; //슬라이드 실행 중 여부
let clickTimeout = null;


const startSlide = () => {
  if (isMobile.value) return; //모바일에서는 자동재생 안함
  clearInterval(interval);
  current.value = 0;
  interval = setInterval(() => {
    current.value = (current.value + 1) % process.length;
  }, 1500);
};

const stopSlide = () => {
  clearInterval(interval);
  current.value = 0;
  inProcess = false;
};

// 클릭핸들러
const handleClick = (index) => {
  // 모바일 - 아코디언 토글
  if (isMobile.value) {
    openedIndex.value = openedIndex.value === index ? null : index;
    current.value = index;
    return;
  }

  //웹 / 태블릿 - 클릭 시 해당 항목으로 이동 + 클릭한 인덱스에서 슬라이드 재시작
  clearInterval(interval);
  clearTimeout(clickTimeout);

  startSlide();
  current.value = index;
};

//스크롤 핸들러 (섹션 진입 시 자동 재생)
const handleScroll = () => {
  if (!processRef.value || isMobile.value) return; //!섹션 진입 , 모바일 - 실행 안함

  // 슬라이드 시작할 위치값 
  const rect = processRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;

  if (isVisible && !inProcess) {
    inProcess = true;
    startSlide();
  } else if (!isVisible && inProcess) {
    stopSlide();
  }
};

// 리사이즈 핸들러
const handleResize = () => {
  isMobile.value = window.innerWidth <= 450;
};

// 마운트 시 이벤트 등록 / 언마운트 시 해제
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
onBeforeUnmount(() => {
  clearInterval(interval);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.process-wrap {
  padding-bottom: $web-spacing;
  .inner {
    // 타이틀
    .title {
      text-align: center;
      font-size: $main-title;
      margin-bottom: 60px;
    }
    //슬라이드 래퍼
    .slide-wrap {
      width: 100%;
      border-radius: 30px;
      overflow: hidden;
      //리스트
      .process {
        width: 100%;
        height: 500px;
        position: relative;

        //각 단계 텍스트
        .txt {
          width: 40%;
          height: calc(100% / 6);
          display: flex;
          align-items: center;
          background-color: $main-color;
          padding-left: 46px;
          cursor: pointer;
          transition: all 0.2s ease;
          p {
            font-size: $medium-txt-2;
            font-weight: 500;
            color: $font-color;
          }
          //클릭된 상태
          &.click {
            background-color: #daecf8;
          }
          &.click p {
            font-weight: bold;
            font-size: 28px;
          }

          //이미지 영역
          .img {
            position: absolute;
            right: 0;
            top: 0;
            width: 60%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
    //모바일용 안내 텍스트
    .clickTxt{
      font-size: 14px;
      color: $font-color;
      text-align: center;
      margin-top: 16px;
    }
  }
}

//태블릿용 스타일
@media screen and (max-width: 768px) {
  .process-wrap {
    padding-bottom: $tab-spacing;
    .inner {
      .title {
        font-size: $medium-txt-2;
        margin-bottom: 30px;
      }
      .slide-wrap {
        border-radius: 20px;
        height: 280px;
        .process {
          width: 100%;
          height: 100%;
          .txt {
            padding-left: 20px;
            p {
              font-size: 16px;
            }
            &.click p {
              font-size: $small-txt;
            }
          }
        }
      }
    }
  }
}
// 모바일용 텍스트
@media screen and (max-width: 450px) {
  .process-wrap {
    padding-bottom: $mo-spacing;
    .inner {
      .title {
        font-size: 20px;
        margin-bottom: 24px;
      }
      .slide-wrap {
        border-radius: 16px;
        height: auto;
        .process {
          height: auto;
          .txt {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            border-bottom: 1px solid rgba(9, 40, 87, 0.1);
            position: relative;
            overflow: hidden;
            padding-left: 0;
            p {
              font-size: 14px;
              padding: 14px 20px;
            }
            &:last-child {
              border-bottom: none;
            }
            &.click p {
              font-size: 16px;
            }
            .img {
              position: static;
              width: 100%;
              height: auto;
              overflow: hidden;
              img {
                width: 100%;
                height: auto;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  //아코디언 애니메이션
  .accordion-enter-active,
  .accordion-leave-active {
    transition: all 0.3s ease;
  }
  .accordion-enter-from,
  .accordion-leave-to {
    opacity: 0;
    max-height: 0;
  }
}
</style>
