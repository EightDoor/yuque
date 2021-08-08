export interface UserInfo {
  data?: UserInfoData;
}

export interface UserInfoData {
  id: number;
  type: string;
  space_id: number;
  account_id: number;
  login: string;
  name: string;
  avatar_url: string;
  books_count: number;
  public_books_count: number;
  followers_count: number;
  following_count: number;
  public: number;
  description: string;
  created_at: string;
  updated_at: string;
  _serializer: string;
}