<template>
  <div class="faq">
    <h1 class="faq-title">F A Q</h1>

    <div class="faq-item" v-for="(item, index) in faqList" :key="index" :class="{ active: activeIndex === index }">
      <div class="faq-question" @click="toggleFAQ(index)">
        <span class="faq-arrow">
          {{ activeIndex === index ? "▲" : "▼" }}
        </span>
        {{ item.question }}
      </div>

      <div class="faq-answer" v-if="activeIndex === index">
        {{ item.answer }}
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
  padding: $web-spacing;

  .faq-title {
    font-size: $main-title;
    font-weight: bold;
    color: $point-color;
    margin-bottom: 40px;
  }

  .faq-item {
    border-bottom: 0.3px solid $border-color;
    padding: 20px 0;
    transition: all 0.3s ease;

    &.active .faq-arrow {
      transform: rotate(180deg);
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
    // transition: transform 0.3s ease;
  }

  .faq-answer {
    margin-left: 35px;
    margin-top: 10px;
    font-size: $small-txt;
    color: $sub-font-color;
    line-height: 1.6;
  }
}
</style>
