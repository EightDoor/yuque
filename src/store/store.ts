import { KnowledgeBaseTypeData } from '@/types/yuque/knowledge_base';
import { TocListData } from '@/types/yuque/toc_list';
import { createLogger, createStore } from 'vuex';

export interface BaseStateType {
  data: Partial<TocListData> ;
  know: Partial<KnowledgeBaseTypeData>;
}
const store = createStore<BaseStateType>({
  plugins: [createLogger()],
  state: {
    data: {},
    know: {},
  },
  mutations: {
    update(state, payload) {
      state.data = payload.data;
      state.know = payload.know;
    },
  },
});

export default store;
