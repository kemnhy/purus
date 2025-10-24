<template>
  <!-- banner wrap -->
  <div class="banner-wrap" ref="bannerRef">
    <div class="inner">
      <!-- text -->
      <div class="txt">
        <div class="banner-title">
          <p>Purus에 제빙기사님이 오셨어요!</p>
          <h2>불편사항은 Purus에게 맡겨주세요!</h2>
        </div>
        <!-- scroll event text -->
        <div class="animation-txt">
          <div
            v-for="(text, i) in texts"
            :key="i"
            class="box"
            :class="{ visible: isVisible }"
            :style="{ transitionDelay: `${i * 0.6}s` }"
          >
            <p v-html="text"></p>
          </div>
        </div>
      </div>
      <!-- image -->
      <div class="img">
        <img src="/images/cleaner.png" alt="cleaner" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// scroll event text data
const texts = [
  "휴일에도 신속히 처리해드립니다.",
  "원하는 시간, 일정만 입력하면 <br />Purus가 알아서 청소해드립니다.",
  "작업 후 청소 전 후 사진을 고객님께 <br />전송해 드립니다.",
];

const bannerRef = ref(null);
const isVisible = ref(false);

// 스크롤 위치 감지 -> 화면 중간 진입 시 애니메이션 시작 설정
const handleScroll = () => {
  if (!bannerRef.value) return;
  const rect = bannerRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  if (rect.top < windowHeight * 0.5) {
    isVisible.value = true;
  }
};

// 페이지 진입 / 스크롤 이벤트 
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.banner-wrap {
  width: 100%;
  padding: $web-spacing 0;
  background-color: $sub-color;
  .inner {
    display: flex;
    align-items: center;
    // 텍스트 영역
    .txt {
      width: 60%;
      // 타이틀
      .banner-title {
        margin-left: 120px;
        p {
          font-size: $medium-txt-2;
        }
        h2 {
          color: $point-color;
          font-size: 50px;
          padding: 35px 0 65px 0;
          max-width: 480px;
          line-height: 1.1;
        }
      }
      // 스크롤 이벤트 텍스트
      .animation-txt {
        display: flex;
        flex-direction: column;
        gap: 28px;
        .box {
          max-width: 550px;
          height: 110px;
          background-color: $font-color;
          border-radius: 100px;
          opacity: 0;
          transform: translateY(80px);
          transition: all 0.8s ease;
          // 애니메이션 텍스트 bgc, 위치 조정
          &:first-child {
            margin-left: 150px;
          }
          &:nth-child(2) {
            background-color: $point-color;
          }
          &:nth-child(3) {
            background-color: #80c5ff;
            margin-left: 80px;
          }
          p {
            height: 100%;
            font-size: 28px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1.2;
          }
          // 스크롤 후 애니메이션 활성화 상태 스타일
          &.visible {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
    // 이미지 영역
    .img {
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      img {
        width: 90%;
        display: block;
      }
    }
  }
}
// responsive
@media screen and (max-width: 1200px) {
  .banner-wrap {
    .inner {
      .txt {
        .banner-title {
          p {
            font-size: 20px;
          }
          h2 {
            font-size: 40px;
          }
        }
        .animation-txt {
          .box {
            max-width: 400px;
            height: 80px;
            p {
              font-size: $small-txt;
            }
          }
        }
      }
    }
  }
}
// 태블릿 스타일
@media screen and (max-width: 850px) {
  .banner-wrap {
    padding: $tab-spacing 0;
    .inner {
      .txt {
        .banner-title {
          margin-left: 0px;
          p {
            font-size: 20px;
          }
          h2 {
            font-size: 36px;
            padding: 15px 0 30px 0;
          }
        }
        .animation-txt {
          gap: 16px;
          .box {
            max-width: 330px;
            height: 70px;
            &:first-child {
              margin-left: 80px;
            }
            &:nth-child(3) {
              margin-left: 50px;
            }
            p {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
// 모바일 스타일
@media screen and (max-width: 450px) {
  .banner-wrap {
    padding: 0 0 $mo-spacing 0;
    .inner {
      flex-direction: column-reverse;
      .txt {
        width: 100%;
        .banner-title {
          margin-left: 0px;
          p {
            font-size: 16px;
            text-align: center;
          }
          h2 {
            font-size: $medium-txt-2;
            padding: 15px 0 30px 0;
            text-align: center;
          }
        }
        .animation-txt {
          gap: 16px;
          .box {
            max-width: 280px;
            height: 60px;
            &:first-child {
              margin-left: 80px;
            }
            &:nth-child(3) {
              margin-left: 50px;
            }
            p {
              font-size: 14px;
            }
          }
        }
      }
      .img{
        width: 100%;
        display: block;
        img{
          width: 90%;
          margin: auto;
          object-fit: contain;
          aspect-ratio: 1 / 1;
        }
      }
    }
  }
}
@media screen and (max-width: 390px){
.banner-wrap {
    .inner {
      .txt {
        width: 100%;
        .banner-title {
          p {
            font-size: 16px;
            text-align: center;
          }
          h2 {
            font-size: $medium-txt-2;
            padding: 15px 20px 24px 20px;
            text-align: center;
          }
        }
        .animation-txt {
          gap: 12px;
          .box {
            max-width: 250px;
            height: 60px;
            &:first-child {
              margin-left:50px;
            }
            &:nth-child(3) {
              margin-left: 30px;
            }
            p {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}

</style>
