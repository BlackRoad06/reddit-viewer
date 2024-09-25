import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts, selectAllPosts, isLoading } from "./postPreviewsSlice";
import './PostPreviews.css';

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

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString(); // Converts to a readable date format
    };
    

    return (
        <div>
            {postPreviews.length > 0 ? (
                postPreviews.map((post) => (
                    <div key={post.data.id} className="post-container">
                        <h3>{post.data.title}</h3>
                        {post.data.thumbnail && post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default' && (
                            <img src={post.data.thumbnail} alt={post.data.title} className="post-image" />
                        )}
                       <div className="bottom-div">
                        <p><span className="author-label">Posted by: </span><span>{post.data.author}</span></p>
                        <p><span>{formatDate(post.data.created_utc)}</span></p>
                        <span className="icon-placeholder">🌟</span>
                        </div>
                    </div>
                ))
            ) : (
                <div>No posts available.</div>
            )}
        </div>
    );
};


export default PostPreviews; 