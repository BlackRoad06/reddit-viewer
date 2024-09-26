import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCommentsForPost, selectAllComments, isLoadingComments } from './commentsSlice';
import './Comments.css'; 

const Comments = ({ postId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(selectAllComments);
    const isLoading = useSelector(isLoadingComments);
    const hasError = useSelector((state) => state.comments.hasError);

    useEffect(() => {
        if (postId) {
            dispatch(loadCommentsForPost(postId));
        }
    }, [dispatch, postId]);

    if (isLoading) {
        return <div>Loading comments...</div>;
    }

    if (hasError) {
        return <div>Error loading comments. Please try again.</div>;
    }

    return (
        <div>
            <h5 className="comments-heading">Comments</h5>
            {comments.length > 0 ? (
                <ul>
                    {comments.map(comment => (
                        <li key={comment.data.id} className="comment-item">
                            <p className="comment-body">{comment.data.body}</p>
                            <p className="comment-author">Posted by: {comment.data.author}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div><h5>No comments available.</h5></div>
            )}
        </div>
    );
}

export default Comments;