interface IVideo {
  id: number;
  videoId: string;
  art?: string;
  start: number;
  end?: number;
  name: string;
  canPlay: boolean;
  channel: IChannel;
}

interface IAddVideo {
  videoId: string;
  art?: string;
  start: number;
  end?: number;
  name: string;
  channel: IChannel;
}

interface IProgress {
  progress: number;
}

interface IPlayer {
  B: string;
  G: any;
  I: any;
  addCueRange: Function;
  clearVideo: Function;
  closure_uid_502609550: number;
  cuePlaylist: Function;
  cueVideoById: Function;
  cueVideoByUrl: Function;
  getApiInterface: Function;
  getAvailablePlaybackRates: Function;
  getAvailableQualityLevels: Function;
  getCurrentTime: Function;
  getDebugText: Function;
  getDuration: Function;
  getMediaReferenceTime: Function;
  getPlaybackQuality: Function;
  getPlaybackRate: Function;
  getPlayerMode: Function;
  getPlayerState: Function;
  getPlaylist: Function;
  getPlaylistId: Function;
  getPlaylistIndex: Function;
  getSphericalProperties: Function;
  getVideoBytesLoaded: Function;
  getVideoBytesTotal: Function;
  getVideoData: Function;
  getVideoLoadedFraction: Function;
  getVideoStartBytes: Function;
  getVideoUrl: Function;
  getVolume: Function;
  h: any;
  hideVideoInfo: Function;
  i: any;
  id: number;
  isMuted: Function;
  isVideoInfoVisible: Function;
  j: number;
  l: any;
  loadModule: Function;
  loadPlaylist: Function;
  loadVideoById: Function;
  loadVideoByUrl: Function;
  logImaAdEvent: Function;
  mute: Function;
  nextVideo: Function;
  o: any;
  pauseVideo: Function;
  playVideo: Function;
  playVideoAt: Function;
  playerInfo: {
    apiInterface: string[];
    videoBytesLoaded: number;
    availablePlaybackRates: number[];
    availableQualityLevels: string[];
    currentTime: number;
    currentTimeLastUpdated_: number;
    debugText: string;
    duration: number;
    mediaReferenceTime: number;
    muted: boolean;
    option: null;
    options: string[];
    playbackQuality: string;
    playbackRate: number;
    playerMode: {};
    playerState: number;
    playlist: null;
    playlistId: null;
    playlistIndex: number;
    sphericalProperties: {};
    videoBytesLoaded: number;
    videoBytesTotal: number;
    videoData: {
      video_id: string;
      author: string;
      title: string;
      video_quality: string;
      video_quality_features: Array;
    };
    videoEmbedCode: string;
    videoInfoVisible: boolean;
    videoLoadedFraction: number;
    videoStartBytes: number;
    videoUrl: string;
    volume: number;
  };
  previousVideo: Function;
  removeCueRange: Function;
  removeEventListener: Function;
  s: Array;
  seekTo: Function;
  setLoop: Function;
  setOption: Function;
  setPlaybackQuality: Function;
  setPlaybackRate: Function;
  setShuffle: Function;
  setSphericalProperties: Function;
  setVolume: Function;
  showVideoInfo: Function;
  stopVideo: Function;
  u: boolean;
  unMute: Function;
  unloadModule: Function;
  getIframe: Function;
}
