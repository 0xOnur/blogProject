import React from 'react'
import {Card, Button} from 'react-bootstrap';
import moment from 'moment'
import {Link} from 'react-router-dom';
import noImage from '../images/noimage.svg';

const Post = React.memo(({post}) => {

  const convertTime = (time) => {
    return moment(time).fromNow();
  }

  return (
    <>
    <style type="text/css">
        {`
        a {
          text-decoration: none;
          background-color: transparent;
        }
      `}
      </style>
        <Card style={{ width: '100%', height:'auto'}} className="bg-dark text-white postCard">
          <Card.Img style={{opacity:'0.7'}} width={"auto"} height={"auto"} variant="top" src={post.image || noImage} />
          <Card.Body>
          <Card.Text>{convertTime(post.created)}</Card.Text>
            <Card.Text>Creator: <a href = {'/users/'+post.creator?._id}>{post.creator?.username}</a></Card.Text>
            <Card.Text>#{post.tag}</Card.Text>
            <Card.Title>{post.title}</Card.Title>
         
            <Card.Text>
              {post.content?.substring(0,150)+'...'}
            </Card.Text>
            <Button variant="primary"><Link style={{color:"white", textDecoration:"none"}} to={`/posts/${post._id}`}>More..</Link></Button>
          </Card.Body>
        </Card>
    </>
  )
});

export default Post;