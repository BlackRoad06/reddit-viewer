import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loadAllPosts = createAsyncThunk(
    "postPreviews/loadAllPreviews",
    async () => {
        const response = await fetch("https://www.reddit.com/r/popular/new.json");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        return json.data.children;
     
    }
);


export const postPreviewsSlice = createSlice({
    name: "postPreviews",
    initialState: {
        posts: [],
        isLoadingPostPreviews: false,
        hasError: false,
        errorMessage: null, // To store error message
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllPosts.pending, (state) => {
                state.isLoadingPostPreviews = true; // Set loading state
                state.hasError = false; // Reset error state
                state.errorMessage = null; // Clear previous error message
            })
            .addCase(loadAllPosts.fulfilled, (state, action) => {
                state.isLoadingPostPreviews = false; // Reset loading state
                state.posts = action.payload; // Store fetched posts
            })
            .addCase(loadAllPosts.rejected, (state, action) => {
                state.isLoadingPostPreviews = false; // Reset loading state
                state.hasError = true; // Set error state
                state.errorMessage = action.error.message; // Store error message
            });
    }
});

export const selectAllPosts = (state) => state.postPreviews.posts;
export const isLoading = (state) => state.postPreviews.isLoadingPostPreviews;
export default postPreviewsSlice.reducer;