import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {fetchPosts} from '../actions/post';
import {useSelector} from 'react-redux';
import Post from './Post';
import { Row } from 'react-bootstrap';
import gridFour from '../images/grid_four.svg';
import gridThree from '../images/grid_three.svg';



const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(fetchPosts());
    document.title = "Post List";
  }, [dispatch])


  return (
    <>
      <div className='container' style={{display:'flex', padding:'0px'}}>
      <Row>
        {posts.length > 0 && posts.map(post => <Post key={post?._id} post={post} /> )}
        </Row>
      </div>
    </>
    
  )
}

export default PostList;