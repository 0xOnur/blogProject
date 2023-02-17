import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Post from "../Post";
import {useSelector, useDispatch} from 'react-redux';
import { Row,Col } from 'react-bootstrap';
import {fetchUserPosts, getUserById} from '../../api/userApi';
import UserCard from "./UserCard";
import {followUser, unFollowUser} from '../../api/userApi';


const Profile = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getUserById(id)).then((result) => {
      if(result) {
        dispatch(fetchUserPosts(id)).then((result) => {
        });
      }
    });
  }, [dispatch, id]);
  

  const user = useSelector((state) => state?.user.userProfile);
  
  const posts = useSelector((state) => state?.user?.userPosts);

  const currentUser = useSelector((state) => state?.user?.user?.userFound);
  
  const currentUserId = currentUser?._id;


  const handleFollow = () => {
    followUser({id: id, currentUserId}).then((response) => {
      dispatch(getUserById(id));
    });
  }

  const handleUnFollow = () => {
    unFollowUser({id: id, currentUserId}).then((response) => {
      dispatch(getUserById(id));
    });
  }

  

  return (
      (
        <div className='container pb-5'>
          <Row style={{marginTop: '1rem'}}>
          {user?.username ? 
            (<>
              <UserCard user={user} currentUser={currentUser} handleFollow={handleFollow} handleUnFollow={handleUnFollow} />
              
              {posts?.length > 0 ? (
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
      )
  )
}

export default Profile