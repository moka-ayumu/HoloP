import axios from "axios";

export async function getSongs(
  org: string = "",
  offset: number = 0,
  limit: number = 20,
  channel_id: string = ""
): Promise<ISongs> {
  const res = await axios.post(
    "https://holodex.net/api/v2/songs/latest",
    {
      org,
      paginated: 1,
      offset,
      limit,
      channel_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const resData: any = res.data;

  return {
    songs: resData["items"],
    offset,
    total: resData["total"],
    limit,
    channel_id,
    org,
    count: limit,
  };
}

export async function getNextSongs(songs: ISongs): Promise<ISongs> {
  let resData: ISongs = await getSongs(
    songs.org,
    songs.offset + songs.limit,
    songs.limit,
    songs.channel_id
  );
  resData.count += songs.count;
  return resData;
}

export async function getPrevSongs(songs: ISongs): Promise<ISongs> {
  let resData: ISongs = await getSongs(
    songs.org,
    songs.offset - songs.limit,
    songs.limit,
    songs.channel_id
  );
  resData.count = songs.count - resData.count;
  return resData;
}

export async function getOrgs(): Promise<IOrg[]> {
  const res = await axios.get("https://holodex.net/orgs.json");
  return res.data;
}

export async function getChannelsByOrg(
  orgName: string
): Promise<IChannelByOrg[]> {
  let offset = 0;
  let all: IChannelByOrg[] = [];
  do {
    const res = await axios.get(
      `https://holodex.net/api/v2/channels?limit=100&offset=${offset}&type=vtuber&org=${orgName}&sort=suborg&order=asc`
    );
    all = [...all, ...res.data];
    offset += 100;
  } while (all.length === offset);
  return all;
}
