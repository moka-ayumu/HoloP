import { combineReducers } from "redux";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import ColorThief from "colorthief";
import { rgbToHex } from "./utils/utils";
import thunk from "redux-thunk";
import tinycolor from "tinycolor2";

export const fetchThemeByChannel = createAsyncThunk(
  "fetchThemeByChannel",
  async (channel: IChannel, thunkAPI) => {
    let state: any = thunkAPI.getState();
    state = state.playerSlice;
    if (
      state.channelArtThemes.findIndex(
        (e: IChannelArtTheme) => e.channel.english_name === channel.english_name
      ) === -1
    ) {
      let main = await getThemeByImg(channel.photo);
      const mainTinyColor = tinycolor(main);
      let sub = main;
      if (!mainTinyColor.isLight()) {
        main = mainTinyColor.lighten(20).toHexString();
      } else {
        sub = mainTinyColor.darken(20).toHexString();
      }
      return { channel, main, sub };
    } else {
      return { channel, main: "existed", sub: "" };
    }
  }
);

export const getThemeByImg = async (url: string): Promise<string> => {
  const thumburl = url;
  return new Promise((resolve) => {
    const thumb = document.createElement("img");
    thumb.crossOrigin = "annoymous";
    thumb.src = thumburl;
    thumb.onload = () => {
      const colorThief = new ColorThief();
      const res = rgbToHex(colorThief.getColor(thumb));
      resolve(res);
    };
  });
};

const getNowTheme = (channelArtThemes: IChannelArtTheme[], nowPlaying: any) => {
  return channelArtThemes.find(
    (v) => v.channel.photo === nowPlaying.channel.photo
  );
};

export const playerSlice = createSlice({
  name: "playerSliceReducer",
  initialState: {
    nowPlaying: {},
    nowTheme: {
      main: "#ffcccc",
      sub: "#ff8585",
    },
    progress: { progress: 0 },
    playlist: [],
    channelArtThemes: [],
    count: 0,
  },
  reducers: {
    add: (state, action) => {
      const payload: IVideo = action.payload;
      if (state.playlist.length === 0) {
        //최초 플레이리스트 추가
        state.playlist.push({ id: 0, canPlay: true, ...payload });
        state.nowPlaying = state.playlist[0];
        state.nowTheme = getNowTheme(state.channelArtThemes, state.nowPlaying);
        state.count++;
      } else {
        const findI = state.playlist.findIndex(
          (video) => video.videoId === payload.videoId
        );
        if (findI !== -1) {
          state.playlist.slice(findI, 1);
        }
        state.playlist.push({
          id: state.playlist.at(-1).id + 1,
          canPlay: true,
          ...payload,
        });
      }
    },
    remove: (state, action) => {
      const nowPlaying: any = state.nowPlaying;
      if (action.payload === nowPlaying.id && state.playlist.length > 1) {
        const playlist: IVideo[] = state.playlist;
        const nowPos = playlist.findIndex(
          (video) => video.id === nowPlaying.id
        );
        state.nowPlaying =
          nowPos === playlist.length - 1 ? playlist[0] : playlist[nowPos + 1];
        state.count++;
      }
      state.playlist = state.playlist.filter(
        (video: IVideo) => video.id !== action.payload
      );
    },
    next: (state, action) => {
      const playlist: IVideo[] = state.playlist;
      const nowPlaying: any = state.nowPlaying;
      const nowPos = playlist.findIndex((video) => video.id === nowPlaying.id);
      state.nowPlaying =
        nowPos === playlist.length - 1 ? playlist[0] : playlist[nowPos + 1];
      state.nowTheme = getNowTheme(state.channelArtThemes, state.nowPlaying);
      state.count++;
    },
    set: (state, action) => {
      const playlist: IVideo[] = state.playlist;
      state.nowPlaying = playlist[action.payload];
      state.nowTheme = getNowTheme(state.channelArtThemes, state.nowPlaying);
      state.count++;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    addChannelTheme: (state, action) => {
      state.channelArtThemes.push(action.payload);
    },
    setVideoCanPlay: (state, action) => {
      const playlist: IVideo[] = state.playlist;
      const Pos = playlist.findIndex((video) => video.id === action.payload.id);
      state.playlist[Pos].canPlay = action.payload.canPlay;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchThemeByChannel.fulfilled, (state, action) => {
      if (action.payload.main !== "existed") {
        state.channelArtThemes.push(action.payload);
      }
    });
  },
});

export const themeSlice = createSlice({
  name: "themeSliceReducer",
  initialState: {
    mainColor: "#f2f2f2",
  },
  reducers: {
    setMainColor: (state, action) => {
      state.mainColor = action.payload;
    },
  },
});

export const flowBarSlice = createSlice({
  name: "flowBarSliceReducer",
  initialState: {
    selectedTab: "songs",
    songs: {
      selected: ["Hololive", null],
    },
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setSongsSelected: (state, action) => {
      state.songs.selected = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  playerSlice: playerSlice.reducer,
  themeSlice: themeSlice.reducer,
  flowBarSlice: flowBarSlice.reducer,
});
const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
