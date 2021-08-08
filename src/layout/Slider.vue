<template>
  <div class="userInfo">
    {{userInfo.name}}
  </div>
  <div class="containerSilder">
    <ul class="ul">
      <li v-for="(item, index) in knowledgeBaseData" :key="index">
        <div class="name">
          <img class="img" src="/images/yuque/name.png"/>{{item.name}}
        </div>
        <div class="count">
          <img class="img" src="/images/yuque/count.png"/>{{item.items_count}}
        </div>
        <div class="time">
          <img class="img" src="/images/yuque/update_time.png"/>{{format(item.content_updated_at)}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserInfoData } from '@/types/yuque/user';
import Business from '@/utils/business';
import { reqGet } from "@/utils/request";
import { KnowledgeBaseType, KnowledgeBaseTypeData } from "@/types/yuque/knowledge_base";
import utils from '@/utils/index';

const Slider = defineComponent({
  name: 'slider',
  setup() {
    const offset = 10000;
    const knowledgeBaseData = ref<KnowledgeBaseTypeData[]>([])
    let userInfo = ref<Partial<UserInfoData>>({});
    const router = useRouter();
    const list = reactive<Layout.SliderType[]>([
      {
        title: '首页',
        url: 'home',
      },
    ]);
    function change(item: any) {
      console.log(`当前选择的: ${JSON.stringify(item)}`);
      router.push(item.url);
    }

    onMounted(() => {
      Business.getUserInfo().then((res) => {
        if (res) {
          userInfo.value = res;
          console.log(userInfo, 'user')
          getKnowledgeBase();
        }
      });
    });

    // 知识库
    function getKnowledgeBase() {
      reqGet<KnowledgeBaseType[]>(`users/${userInfo.value.id}/repos`, {
        type: "all",
        offset: offset,
      }).then(res=>{
        knowledgeBaseData.value = res.data;
      })
    }
    function format(val: string) {
      return utils.formatTime(val)
    }
    return {
      change,
      list,

      // userInfo
      userInfo,
      // 知识库
      knowledgeBaseData,
      format,
    };
  },
});

export default Slider;
</script>
<style lang="less" scoped>
@import 'slider.module';
</style>
