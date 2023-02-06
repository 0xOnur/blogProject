import React from 'react'
import {Card, Button} from 'react-bootstrap';
import moment from 'moment'
import {Link} from 'react-router-dom';
import noImage from '../images/noimage.svg';

const Post = ({post}) => {

  const convertTime = (time) => {
    return moment(time).fromNow();
  }

  return (
    <>
        <Card style={{ width: '20rem'}} className="bg-dark text-white postCard">
          <Card.Img style={{opacity:'0.6'}} variant="top" src={post.image || noImage} />
          <Card.Body>
          <Card.Text>{convertTime(post.created)}</Card.Text>
            <Card.Text>Yazar: {post.creator?.username}</Card.Text>
            <Card.Text>#{post.tag}</Card.Text>
            <Card.Title>{post.title}</Card.Title>
            <br />
            <Card.Subtitle>{post.subTitle}</Card.Subtitle>
            <br />
            <Card.Text>
              {post.content?.substring(0,150)+'...'}
            </Card.Text>
            <Button variant="primary"><Link style={{color:"white", textDecoration:"none"}} to={`/posts/${post._id}`}>Daha fazla..</Link></Button>
          </Card.Body>
        </Card>
    </>
  )
}

export default Post;