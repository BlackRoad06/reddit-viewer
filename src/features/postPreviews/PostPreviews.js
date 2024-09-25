import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts, selectAllPosts, isLoading } from "./postPreviewsSlice";

const PostPreviews = () => {
    const dispatch = useDispatch();
    const postPreviews = useSelector(selectAllPosts);
    const isLoadingPosts = useSelector(isLoading);
    

    useEffect(() => {
        dispatch(loadAllPosts()); // Dispatch action to load posts
    }, [dispatch]);

    if (isLoadingPosts) {
        return <div>Loading posts...</div>;
    }

    return (
        <div>
            {postPreviews.map((post) => {
                const { id, title, thumbnail } = post.data;

                return (
                    <div key={id} className="post-preview"> {/* Parent div for each post */}
                        <div className="title-container"> {/* First child div for title */}
                            <h3>{title}</h3>
                        </div>
                        <div className="image-container"> {/* Second child div for image */}
                            {thumbnail && 
                                (thumbnail !== 'self' && 
                                thumbnail !== 'default' && 
                                (thumbnail.endsWith('.jpg') || thumbnail.endsWith('.png')) 
                                    ? <img src={thumbnail} alt={title} />
                                    : <img src="path/to/default/image.png" alt="Default" />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


export default PostPreviews; 