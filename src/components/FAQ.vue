<template>
  <div class="inner">
    <div class="faq">
      <h1 class="faq-title">F A Q</h1>

      <div class="faq-item" v-for="(item, index) in faqList" :key="index" :class="{ active: activeIndex === index }">
        <div class="faq-question" @click="toggleFAQ(index)">
          <span class="faq-arrow">
            <i class="fa-solid fa-angle-down"></i>
          </span>
          {{ item.question }}
        </div>

        <transition name="faq">
          <div class="faq-answer" v-if="activeIndex === index">
            {{ item.answer }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQ",
  data() {
    return {
      activeIndex: 0,
      faqList: [
        {
          question: "제빙기 청소는 왜 해야 하나요?",
          answer:
            "얼음을 만드는 제빙기는 물을 사용하기 때문에 세균, 곰팡이, 물때, 석회질 등이 쉽게 생길 수 있습니다. 이런 오염물질은 얼음의 위생을 해치고, 기계 고장의 원인이 되며, 심하면 제빙기 수명까지 단축시킬 수 있습니다. 정기적인 청소는 깨끗한 얼음을 제공하고 기계를 오래 사용하는 데 필수적입니다.",
        },
        {
          question: "청소 주기는 어떻게 되나요?",
          answer: "일반적으로 1~3개월에 한 번 정기 청소를 권장합니다.",
        },
        {
          question: "직접 청소할 수도 있지 않나요?",
          answer: "간단한 부분 청소는 가능하지만 내부 세척은 전문가의 장비와 약품이 필요합니다.",
        },
        {
          question: "청소하면 어떤 점이 좋아지나요?",
          answer: "청결한 얼음 제공은 물론, 냉각 효율과 기기 수명이 향상됩니다.",
        },
        {
          question: "청소 과정은 어떻게 되나요?",
          answer: "내부 분해, 세척, 살균, 헹굼, 건조 순으로 진행됩니다.",
        },
        {
          question: "청소 비용은 어떻게 되나요?",
          answer: "기기 종류와 오염도에 따라 다르지만 상담 시 안내드립니다.",
        },
        {
          question: "청소 후 바로 얼음을 사용할 수 있나요?",
          answer: "헹굼과 살균 후 충분한 건조 과정을 거치면 바로 사용 가능합니다.",
        },
        {
          question: "친환경 세제를 사용하나요?",
          answer: "네, 인체와 환경에 무해한 친환경 세제를 사용합니다.",
        },
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.faq {
  font-family: "Pretendard", sans-serif;
  background: #fff;
  padding: 120px 170px;
  transition: all 0.3s ease;

  .faq-title {
    font-size: $main-title;
    font-weight: bold;
    color: $point-color;
    margin-bottom: 60px;
    text-align: left;
  }

  .faq-item {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    padding: 20px 0;
    transition: all 0.3s ease;

    &.active .faq-arrow {
      transform: rotate(180deg);
      color: $point-color;
    }
  }

  .faq-question {
    display: flex;
    align-items: center;
    font-size: $medium-txt-2;
    font-weight: bold;
    color: $font-color;
    cursor: pointer;
    user-select: none;
  }

  .faq-arrow {
    display: inline-block;
    margin-right: 15px;
    font-size: $small-txt;
    color: $sub-font-color;
    transition: transform 0.3s ease;
  }

  .faq-answer {
    margin-left: 35px;
    margin-top: 10px;
    font-size: $small-txt;
    color: $sub-font-color;
    line-height: 1.6;
  }

  /* 애니메이션 */
  .faq-enter-active,
  .faq-leave-active {
    transition: all 0.3s ease;
  }
  .faq-enter-from,
  .faq-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }

  /*  768px 이하 (태블릿) */
  @media (max-width: 768px) {
    padding: 50px 24px; /* 위아래 여백 줄임 */

    .faq-title {
      font-size: 26px;
      margin-bottom: 30px;
      color: $point-color;
    }

    .faq-item {
      padding: 16px 0;
    }

    .faq-question {
      font-size: 17px;
      line-height: 1.4;
    }

    .faq-answer {
      font-size: 14px;
      line-height: 1.5;
      margin-left: 28px;
    }
  }
}
/*  390px 이하 (모바일) */
@media (max-width: 390px) {
  .faq {
    padding: 30px 0; /* 위아래 줄이되 자연스럽게 */
    background: #fff;
    .faq-title {
      text-align: left;
      font-size: 22px;
      letter-spacing: 1px;
      color: #004b9b;
      margin-bottom: 24px;
    }

    .faq-item {
      border: none;
      border-radius: 8px;
      // margin-bottom: 10px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      padding: 0px;

      &.active {
        background: #fff;
      }

      .faq-question {
        padding: 15px 0;
        font-size: 15px;
        color: #003366;

        .faq-arrow {
          font-size: 13px;
          color: #007bff;
          margin-right: 10px;
        }
      }

      .faq-answer {
        background: #fff;
        margin: 0;
        padding: 10px 12px 14px;
        border-top: 1px solid #f0f0f0;
        font-size: 13px;
        line-height: 1.5;
        color: #4a4a4a;
      }
    }
  }
}
</style>
