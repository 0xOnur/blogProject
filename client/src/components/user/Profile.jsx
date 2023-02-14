import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Post from "../Post";
import {useSelector, useDispatch} from 'react-redux';
import { Row,Col } from 'react-bootstrap';
import {fetchUserPosts, getUserById} from '../../api/userApi';
import UserCard from "./UserCard";

const Profile = () => {
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getUserById(id)).then(() => {
      dispatch(fetchUserPosts(id));
    });
  }, [dispatch, id]);

  const user = useSelector((state) => state?.user?.userProfile);
  
  const posts = useSelector((state) => state?.user?.userPosts);

  
  // useEffect(() => {
  //   dispatch(getUserById(id));
  // }, [dispatch, id]);

  // const posts = useSelector((state) => state?.user?.userPosts);


  return (
    <>
      <div className='container pb-5'>
      <Row style={{marginTop: '1rem'}}>

        {user.username ? 
          (<>
            <UserCard user={user} />
            {posts.length > 0 ? (
              <>
                {posts?.length > 0 && posts?.map(post => 
                  <Col key={post?._id} className='mb-5 mt-5' sm='12' md='6' xl='4'> 
                    <Post key={post?._id} post={post} />
                  </Col> 
                )}
              </>
            ):
              <h4 className='text-center mt-5'>Henüz post yok</h4>
            }
          </>)
          : <h1 className='text-center mt-5'>Kullanıcı bulunamadı</h1>}
            

            
          </Row>
      </div>
    </>
  )
}

export default Profile