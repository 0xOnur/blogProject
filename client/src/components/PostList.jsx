import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Post from './Post';
import { Row,Col } from 'react-bootstrap';
import {fetchPosts} from '../api/postsApi';
import {tokenIsExpired, logoutUser} from '../api/userApi';

const PostList = () => {

  const dispatch = useDispatch();

  const token = useSelector((state) => state?.user?.user?.token);

  
  useEffect(() => {
    if(tokenIsExpired(token) === true) {
      dispatch(logoutUser());
    }
  }, [dispatch, token])
  
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state?.post?.posts);

  return (
    <>
      <div className='container pb-5'>
      <Row>
        {posts?.length > 0 && posts?.map(post => 
          <Col key={post?._id} className='mb-5 mt-5' sm='12' md='6' xl='4'> 
            <Post key={post?._id} post={post} />
          </Col> )}
      </Row>
      </div>
    </>
  )
}

export default PostList;