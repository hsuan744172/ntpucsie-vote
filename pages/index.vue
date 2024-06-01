<template>
  <div class="flex flex-col items-center">
    <ElAlert
      show-icon
      center
      class="!mb-2.5 !w-1/3 !min-w-fit"
    >
      <template #title>
        <div class="mr-3 items-center text-gray-600">
          由臺北大學三峽校區學生會投票系統修改
          <a
            href="https://github.com/ntpusu/ntpusu-vote"
            target="_blank"
            class="whitespace-pre-wrap break-all font-bold text-blue-400 hover:text-blue-500 hover:underline"
          >
            github
          </a>
        </div>
      </template>
    </ElAlert>
    <ElSteps
      direction="vertical"
      align-center
      space="12dvh"
      class="mt-5 w-full !flex-wrap content-center"
    >
      <ElStep
        v-for="(activity, index) in activities"
        :key="index"
        :status="style(activity.start, activity.end)"
        class="tracking-[1.5px]"
      >
        <template #title>
          <div class="font-bold sm:text-lg">
            {{ activity.content }}
          </div>
        </template>
        <template #description>
          <div class="min-w-max sm:text-base">
            <span>{{
              activity.start.toLocaleString(undefined, {
                dateStyle: "long",
                timeStyle: activity.showTime ? "medium" : undefined,
              })
            }}</span>
            <span v-if="activity.showEnd"> 〜 </span>
            <span v-if="activity.showEnd && !activity.showTime">{{
              activity.end.toLocaleString(undefined, {
                dateStyle: "long",
                timeStyle: activity.showTime ? "medium" : undefined,
              })
            }}</span>
          </div>
          <div
            v-if="activity.showEnd && activity.showTime"
            class="min-w-max sm:text-base"
          >
            {{
              activity.end.toLocaleString(undefined, {
                dateStyle: "long",
                timeStyle: activity.showTime ? "medium" : undefined,
              })
            }}
          </div>
        </template>
      </ElStep>
    </ElSteps>

    <div class="mb-8 mt-5 flex justify-center space-x-4">
      <ElButton
        v-if="status === 'authenticated'"
        type="success"
        class="font-bold"
        @click="router.push('/vote')"
      >
        前 往 投 票 頁 面
      </ElButton>
      <ElButton
        v-else
        type="primary"
        class="font-bold"
        @click="router.push('/login')"
      >
        前 往 登 入 頁 面
      </ElButton>
      <ElButton
        type="primary"
        class="font-bold"
        @click="showCard = true"
      >
        查 看 投 票 教 學
      </ElButton>
    </div>

    <transition name="fade">
      <ElCard
        v-if="showCard"
        class="box-card"
        :style="{ marginTop: '20px' }"
      >
        <template #header>
          <div class="clearfix">
            <span>投票教學</span>
            <ElButton
              style="float: right; padding: 3px 0"
              type="text"
              @click="showCard = false"
              >關閉</ElButton
            >
          </div>
        </template>
        <div>
          <p>1.請同學先登入網站</p>
          <p>2.請透過學校google帳號登入</p>
          <p>
            3.成功登入後即可查看投票項目，請點選投票項目藍色〔投票〕按鈕進行投票
          </p>
          <p>4.投票按下確認即無法修改</p>
          <p>5.投票結束後顯示結果，並且無法再進行投票</p>
        </div>
      </ElCard>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElAlert, ElButton, ElCard, ElSteps, ElStep } from "element-plus";
import "element-plus/dist/index.css";

definePageMeta({
  auth: false,
  title: "首頁",
});

const router = useRouter();

const { status } = useAuthState();

const style = (start: Date, end: Date) => {
  return Date.now() < start.getTime()
    ? "process"
    : Date.now() < end.getTime()
      ? "finish"
      : "success";
};

const showCard = ref(false);

const activities = [
  {
    content: "公布參選人資訊",
    start: new Date(2024, 5, 9),
    end: new Date(2024, 5, 9),
    showEnd: false,
    showTime: false,
  },
  {
    content: "線上投票",
    start: new Date(2024, 5, 14),
    end: new Date(2024, 5, 15),
    showEnd: false,
    showTime: false,
  },
  {
    content: "當選名單公告",
    start: new Date(2024, 5, 15),
    end: new Date(2024, 5, 15),
    showEnd: false,
    showTime: false,
  },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.box-card {
  width: 80%;
  max-width: 600px;
}
</style>
