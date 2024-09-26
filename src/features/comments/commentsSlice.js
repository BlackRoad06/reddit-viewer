import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loadCommentsForPost = createAsyncThunk(
    "comments/loadCommentsForPostId",
    async (postId) => {
        const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch comments");
        }
        const json = await response.json();
        return json[1].data.children; // Comments are in the second element of the response array
    }
);

export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
        isLoadingComments: false,
        hasError: false,
        errorMessage: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCommentsForPost.pending, (state) => {
                state.isLoadingComments = true; 
                state.hasError = false; 
                state.errorMessage = null; 
            })
            .addCase(loadCommentsForPost.fulfilled, (state, action) => {
                state.isLoadingComments = false; 
                state.comments = action.payload; 
            })
            .addCase(loadCommentsForPost.rejected, (state, action) => {
                state.isLoadingComments = false; 
                state.hasError = true; 
                state.errorMessage = action.error.message;
            });
    }
});

export const selectAllComments = (state) => state.comments.comments;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export default commentsSlice.reducer;