import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Post from './Post';
import { Row, Col, Container } from 'react-bootstrap';
import {fetchPosts} from '../api/postsApi';


const PostList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state?.post?.posts);

  return (
    <>
      <Container>
        <Row>
          {posts?.length > 0 && posts?.map(post => 
            <Col key={post?._id} className='mb-5 mt-5' sm='12' md='6' xl='4' xxl='3' > 
              <Post key={post?._id} post={post} />
            </Col> )}
        </Row>
      </Container>
    </>
  )
}

export default PostList;