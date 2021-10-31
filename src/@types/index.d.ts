interface Dictionary<T> {
  [Key: any]: T;
}

interface IChannelArtTheme {
  main: string;
  sub: string;
  channel: IChannel;
}
