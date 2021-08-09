export interface ContentDetail {
  abilities: ContentDetailAbilities;
  data: ContentDetailData;
}
export interface ContentDetailAbilities {
  update: boolean;
  destroy: boolean;
}
export interface ContentDetailDataBookUser {
  id: number;
  type: string;
  login: string;
  name: string;
  description: string;
  avatar_url: string;
  books_count: number;
  public_books_count: number;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
  _serializer: string;
}
export interface ContentDetailDataBook {
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
  user: ContentDetailDataBookUser;
  _serializer: string;
}
export interface ContentDetailDataCreator {
  id: number;
  type: string;
  login: string;
  name: string;
  description: string;
  avatar_url: string;
  books_count: number;
  public_books_count: number;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
  _serializer: string;
}
export interface ContentDetailData {
  id: number;
  slug: string;
  title: string;
  book_id: number;
  book: ContentDetailDataBook;
  user_id: number;
  creator: ContentDetailDataCreator;
  format: string;
  body: string;
  body_draft: string;
  body_html: string;
  body_lake: string;
  body_draft_lake: string;
  public: number;
  status: number;
  view_status: number;
  read_status: number;
  likes_count: number;
  comments_count: number;
  content_updated_at: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  first_published_at: string;
  word_count: number;
  description: string;
  hits: number;
  _serializer: string;
}
