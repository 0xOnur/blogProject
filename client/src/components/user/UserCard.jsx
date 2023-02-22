import React, {useState} from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import FollowCard from "./FollowCard";
import EditProfile from "./EditProfile";

const UserCard = React.memo(({user, currentUser, handleFollow, handleUnFollow}) => {

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  const closeEditProfile = () => {setEditProfile(false)};

  return (
    <>
      <Row className="justify-content-center mb-3">
        <Col className="text-center">
          <Image src={user.image} width={150} height={150} roundedCircle />
          <h2 className="text-center">{user.username}</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mb-3">
        <Col md="12" className="text-center">
        {currentUser && (
          <>
            {currentUser._id === user._id ? (
              <>
              <Button variant="primary" onClick={()=> setEditProfile(true)}>Edit Profile</Button>
              {editProfile && <EditProfile show={editProfile} handleclose={closeEditProfile} />}
              </>

            ) : (
              <>
                {user.followers.includes(currentUser._id) ? (
                  <Button onClick={handleUnFollow} variant="outline-primary">Unfollow</Button>
                ) : (
                  <Button onClick={handleFollow} variant="primary">Follow</Button>
                )}
              </>
            )}
          </>
        )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="12" className="text-center">
          <Button onClick={()=> setShowFollowers(true)} variant="outline-primary">{user.followers.length} Followers</Button>{" "}
          <Button onClick={()=> setShowFollowing(true)} variant="outline-primary">{user.following.length} Following</Button>
        </Col>
      </Row>

      {showFollowers && (
        <FollowCard user_id={user._id} modalTitle={"Followers"} show={showFollowers} onHide={() => setShowFollowers(false)} />
      )}

      {showFollowing && (
        <FollowCard user_id={user._id}  modalTitle={"Following"} show={showFollowing} onHide={() => setShowFollowing(false)} />
      )}
    </>
  );
});

export default UserCard;
