import { TocListData } from '@/types/yuque/toc_list';

export interface KnowledgeBaseType {
  data: KnowledgeBaseTypeData[];
}
export interface KnowledgeBaseTypeDataUser {
  id: number;
  type: string;
  login: string;
  name: string;
  description: string;
  avatar_url: string;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
  _serializer: string;
}
export interface KnowledgeBaseTypeData {
  id: number;
  type: string;
  slug: string;
  name: string;
  user_id: number;
  description: string;
  creator_id: number;
  public: number;
  items_count: number;
  likes_count: number;
  watches_count: number;
  content_updated_at: string;
  updated_at: string;
  created_at: string;
  namespace: string;
  user: KnowledgeBaseTypeDataUser;
  _serializer: string;
  // 扩展字段

  // 子级数据
  list?: TocListData[];
  // 是否展开
  isShow?: boolean;
}
