import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import FileBase64 from 'react-file-base64';
import {
  Container,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import {createPost} from '../actions/post';

const tags = ["Fun", "Programming", "Health", "Science","Teknoloji"];

const AddPostForm = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState();
  const [image, setImage] = useState();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData((prev)=> {
      return{
        ...prev,
        image:image,
        [name]: value,
      }
    })
  }

  const onSubmit = (event)=> {
    dispatch(createPost(postData)).then(() => {
      console.log("Post created");
    });
    navigate('/');
  };

  return (
    <>
    <Container className="mt-5">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Başlık</Form.Label>
            <Form.Control onChange={handleChange} name="title" type="text" required placeholder="Başlık" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubTitle">
            <Form.Label>Alt Başlık</Form.Label>
            <Form.Control onChange={handleChange} name="subTitle" type="text" required placeholder="Alt Başlık" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Konu Etiketi Seçin:</Form.Label>
            <Form.Select onChange={handleChange} name="tag" required>
              {tags.map((tag,index) => {
                return <option key={index} value={tag}>{tag}</option>
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <InputGroup>
              <InputGroup.Text>İçeriği Giriniz</InputGroup.Text>
              <Form.Control onChange={handleChange} name="content" required as="textarea" aria-label="With textarea" />
            </InputGroup>
          </Form.Group>
          
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Blog Kapak Fotoğrafı</Form.Label>
            <br />
            <FileBase64 multiple={false} onDone={({base64}) => setImage(base64)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Yayınla
          </Button>
        </Form>
    </Container>
    </>    
  );
};

export default AddPostForm;
