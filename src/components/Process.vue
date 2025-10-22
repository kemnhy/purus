<template>
  <div class="process-wrap" ref="processRef">
    <div class="inner">
      <h2 class="title">청소 과정 한눈에</h2>
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
      <p class="clickTxt" v-if="isMobile">▲ 과정을 클릭해보세요 !</p>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const current = ref(0);
const openedIndex = ref(null);
const isMobile = ref(false);

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

let interval = null;
let inProcess = false;
let clickTimeout = null;
const processRef = ref(null);

const startSlide = () => {
  if (isMobile.value) return;
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

const handleClick = (index) => {
  if (isMobile.value) {
    openedIndex.value = openedIndex.value === index ? null : index;
    current.value = index;
    return;
  }

  clearInterval(interval);
  clearTimeout(clickTimeout);

  startSlide();
  current.value = index;
};

const handleScroll = () => {
  if (!processRef.value || isMobile.value) return;
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

const handleResize = () => {
  isMobile.value = window.innerWidth <= 390;
};

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
    .title {
      text-align: center;
      font-size: $main-title;
      margin-bottom: 60px;
    }
    .slide-wrap {
      width: 100%;
      border-radius: 30px;
      overflow: hidden;
      .process {
        width: 100%;
        height: 500px;
        position: relative;

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
          &.click {
            background-color: #daecf8;
          }
          &.click p {
            background-color: #daecf8;
            font-weight: bold;
            font-size: 28px;
          }

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
    .clickTxt{
      font-size: 14px;
      color: $font-color;
      text-align: center;
      margin-top: 16px;
    }
  }
}

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
@media screen and (max-width: 390px) {
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
            background: #f2f6f8;
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
