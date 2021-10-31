interface IChannel {
  english_name: string;
  name: string;
  photo: string;
}

interface ISong {
  amUrl: string;
  art: string;
  available_at: string;
  channel: IChannel;
  channel_id: string;
  creator_id: string;
  start: number;
  end: number;
  itunesid: number;
  name: string;
  original_artist: string;
  video_id: string;
}

interface ISongs {
  songs: ISong[];
  offset: number;
  total: number;
  org?: string;
  limit: number;
  channel_id?: string;
  count: number;
}

interface IOrg {
  name: string;
  short: string;
  name_jp: string;
}

interface IChannelByOrg {
  id: string;
  name: string;
  english_name: string;
  type: string;
  org: string;
  group: string;
  photo: string;
  twitter: string;
  video_count: string;
  subscriber_count: string;
  clip_count: number;
  top_topics: string[];
}
