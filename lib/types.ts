export interface ProjectItem {
  id: string;
  sort_order?: number;
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  link_url?: string | null;
  image_path?: string | null;
  image?: string | null;
  award?: string | null;
  problem?: string | null;
  my_role?: string | null;
  tech?: string[];
  awards?: Array<{ level: string; title: string; detail: string }>;
  media?: Array<{ type: string; path: string; caption?: string }>;
  published?: boolean;
}

export interface VideoItem {
  id: string;
  sort_order?: number;
  title: string;
  description?: string;
  category: string;
  duration?: string;
  series_label?: string;
  video_url: string;
  thumbnail_path?: string | null;
  published?: boolean;
}

export interface IslamPostItem {
  id: string;
  sort_order?: number;
  caption?: string;
  category: string;
  images?: string[];
  alt_text?: string;
  published?: boolean;
}

export interface AnonymousMessagePayload {
  message: string;
  sender_tag?: string;
}

