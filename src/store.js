import { configureStore } from "@reduxjs/toolkit";
import PostPreviewsReducer from "./features/postPreviews/postPreviewsSlice";


export default configureStore({
    reducer: {
      postPreviews: PostPreviewsReducer,
    },
  });
  