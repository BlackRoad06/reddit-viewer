import { configureStore } from "@reduxjs/toolkit";
import PostPreviewsReducer from "./features/postPreviews/postPreviewsSlice";
import commentsSliceReducer from "./features/comments/commentsSlice";


export default configureStore({
    reducer: {
      postPreviews: PostPreviewsReducer,
      comments: commentsSliceReducer,
    },
  });
  