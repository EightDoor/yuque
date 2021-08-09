export interface TocList {
  data: TocListData[];
}
export interface TocListData {
  type: string;
  title: string;
  uuid: string;
  url: string;
  prev_uuid: string;
  sibling_uuid: string;
  child_uuid: string;
  parent_uuid: string;
  doc_id: number;
  level: number;
  id: number;
  open_window: number;
  visible: number;
  depth: number;
  slug: string;
}
