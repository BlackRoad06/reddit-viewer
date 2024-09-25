import { configureStore } from "@reduxjs/toolkit";
import PostPreviewsReducer from "./features/postPreviews/postPreviewsSlice";
import PostPreviews from "./features/postPreviews/PostPreviews";

export default configureStore({
    reducer: {
      postPreviews: PostPreviewsReducer,
    },
  });
  