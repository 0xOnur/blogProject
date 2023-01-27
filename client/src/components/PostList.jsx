import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Post from './Post';
import { Row,Col } from 'react-bootstrap';


const PostList = () => {
  const posts = useSelector((state) => state?.post?.posts);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

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