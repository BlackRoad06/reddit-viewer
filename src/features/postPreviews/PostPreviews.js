import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts, selectAllPosts, isLoading } from "./postPreviewsSlice";
import './PostPreviews.css';
import CommentIcon from "./comments-svgrepo-com.svg";
import Comments from "../comments/Comments";
import { loadCommentsForPost } from "../comments/commentsSlice";

const PostPreviews = () => {
    const dispatch = useDispatch();
    const postPreviews = useSelector(selectAllPosts);
    const isLoadingPosts = useSelector(isLoading);
    const [expandedPostIds, setExpandedPostIds] = useState(new Set());

    useEffect(() => {
        dispatch(loadAllPosts()); 
    }, [dispatch]);

    if (isLoadingPosts) {
        return <div>Loading posts...</div>;
    }

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString(); // Converts to a readable date format
    };

    const handleCommentClick = (postId) => {
        setExpandedPostIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId); // Collapse if already expanded
            } else {
                newSet.add(postId); // Expand if not
                dispatch(loadCommentsForPost(postId)); // Fetch comments for the selected post
            }
            return newSet;
        });
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
                            <span className="comment-icon" onClick={() => handleCommentClick(post.data.id)}>
                                <img src={CommentIcon} alt="comment-Icon" />
                            </span>
                        </div>
                        {/* Render comments component for the selected post */}
                        {expandedPostIds.has(post.data.id) && <Comments postId={post.data.id} />}
                    </div>
                ))
            ) : (
                <div>No posts available.</div>
            )}
        </div>
    );
};

export default PostPreviews;