import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {//all state will be saved here.
  url: {},
  generes: {} // inside movie categories called generes and after getting data we can use generes inside application
 },
  reducers: {
    
    //action is getApiconfiguration
    getApiconfiguration : (state, action) => {
       //ye state wahi state h initialstate jo uppar ha,   
       // access url from above initialstate
       //lets say, maine api call karwayi configuration ki from TMDB. Base_url, images url, logo, poster
       // need only one time.
       // once we get data, waha pe hum action call karwadenge -> getApiconfiguration -> then iske method
       // ke andar jo hum value pass krenge, wo hume as a action milegi aur wo hume action.payload me new
       // miljayegi aur fir state.url se url me uppar save hojyegi linenno 6
        state.url = action.payload;
    },
    getGenres: (state, action) => {
        state.genres = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getApiconfiguration,getGenres } = homeSlice.actions

export default homeSlice.reducer