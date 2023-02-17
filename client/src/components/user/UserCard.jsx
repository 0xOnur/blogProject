import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

const UserCard = React.memo(({user, currentUser, handleFollow}) => {
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
              <Button variant="outline-primary">Edit Profile</Button>
            ) : (
              <>
                {user.followers.includes(currentUser._id) ? (
                  <Button variant="outline-primary">Unfollow</Button>
                ) : (
                  <Button onClick={handleFollow} variant="outline-primary">
                    Follow
                  </Button>
                )}
              </>
            )}
          </>
        )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="12" className="text-center">
          <Button variant="outline-primary">Followers</Button>{" "}
          <Button variant="outline-primary">Following</Button>
        </Col>
      </Row>
    </>
  );
});

export default UserCard;
