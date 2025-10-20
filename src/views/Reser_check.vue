<template>
  <div class="reser_check">
    <!-- 헤더영역 -->
    <Header_w lineColor="#092857" />
    <Side_menu />
    <!-- 헤더 구분선 -->
    <hr class="header_line" />
    <!-- 예약내역 조회 입력창 -->
    <Reser_list_check v-if="step === 'input'" @next="gotoList" />
    <!-- 예약 내역 목록 -->
    <Reser_list v-if="step === 'reserCheck'" />
    <!-- 하단 -->
    <Footer_w />
    <!-- 퀵버튼 -->
    <Quick_btn />
  </div>
</template>

<script setup>
import Footer_w from "@/components/Footer_w.vue";
import Header_w from "@/components/Header_w.vue";
import Quick_btn from "@/components/Quick_btn.vue";
import Reser_list from "@/components/Reser_list.vue";
import Reser_list_check from "@/components/Reser_list_check.vue";
import Side_menu from "@/components/Side_menu.vue";
import { ref } from "vue";

const step = ref("input");
const gotoList = () => {
  step.value = "reserCheck";
};
</script>

<style lang="scss" scoped></style>
