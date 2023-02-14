import React from 'react'
import {Row, Col, Image, Button} from 'react-bootstrap'

const UserCard = ({user}) => {
 

  return (
    <>
        {/* this area user profile card with circular profile photo */}
    <Row className="justify-content-center mb-3">
    
        <Col className="text-center" >
            <Image src={user.image} width={150} height={150} roundedCircle />
            <h2 className="text-center">{user.username}</h2>
        </Col>
        </Row>
        <Row className="justify-content-center">
        <Col md='12' className="text-center">
            <Button variant="outline-primary">Followers</Button>{' '}
       
            <Button variant="outline-primary">Following</Button>
        </Col>
    </Row>

    </>
  )
}

export default UserCard