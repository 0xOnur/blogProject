import React, {useState} from 'react';
import { Button, Modal, ListGroup, ListGroupItem, Image } from "react-bootstrap";
import { getFollowers, getFollowing } from "../../api/userApi";

const FollowCard = ({user_id, modalTitle, show, onHide}) => {

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  if(modalTitle === "Followers"){
      const fetchFollowers = async () => {
        const followers = await getFollowers(user_id);
        setFollowers(followers);
      };
      fetchFollowers();

  }else if(modalTitle === "Following"){
    const fetchFollowing = async () => {
      const following = await getFollowing(user_id);
      setFollowing(following);
    };
    fetchFollowing();
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
        {modalTitle === "Followers" ? (
            followers.map((follower) => (
              <ListGroupItem key={follower._id}>
                <Image alt="" width={40} height={40} src={follower.image} roundedCircle />{' '}
                {follower.username}
              </ListGroupItem>
            ))
        ):(
            following.map((follower) => (
              <ListGroupItem key={follower._id}>
                <Image alt="" width={40} height={40} src={follower.image} roundedCircle />{' '}
                {follower.username}
              </ListGroupItem>
            ))
        )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FollowCard