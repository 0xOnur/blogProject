import React from 'react'
import {Card, Button, ListGroup, Col} from 'react-bootstrap';
import moment from 'moment'
import {Link} from 'react-router-dom';
import noImage from '../images/noimage.svg';

const Post = ({post}) => {

  const convertTime = (time) => {
    return moment(time).fromNow();
  }

  return (
    <>
    <Col md='auto' >
      <div className='m-5' >
        <Card style={{ width: '20rem'}} className="bg-dark text-white">
          <Card.Img style={{opacity:'0.6'}} variant="top" src={post.image || noImage} />
          <Card.ImgOverlay style={{position:'relative'}}>
            <Card.Text>{convertTime(post.created)}</Card.Text>
            <Card.Text>Yazar: Onur</Card.Text>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle>{post.subTitle}</Card.Subtitle>
            <br />
            <Card.Text>
              {post.content?.substring(0,150)+'...'}
            </Card.Text>
            <Button variant="primary"><Link style={{color:"white", textDecoration:"none"}} to={`/posts/${post._id}`}>Daha fazla..</Link></Button>
          </Card.Body>
          <ListGroup className="list-group-flush ">
            <ListGroup.Item>#{post.tag}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </Col>
    </>
  )
}

export default Post;