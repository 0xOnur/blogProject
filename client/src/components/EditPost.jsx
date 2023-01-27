import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import FileBase64 from 'react-file-base64';
import {updatePost} from '../api/index';
import {
    Container,
    Form,
    Button,
    InputGroup,
  } from "react-bootstrap";

const tags = ["Fun", "Programming", "Health", "Science","Teknoloji"];


const EditPost = ({post, closeEditMode}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [postData, setPostData] = useState(post);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData((prev)=> {
          return{
            ...prev,
            [name]: value,
          }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(updatePost({id:post._id, postData})).then(() => {
            console.log("Post updated");
            setPostData(null);
            closeEditMode();
            navigate(`/posts/${post._id}`);
        })
    }
    console.log(postData);

    console.log("editPost render edildi");
    return (
        <>
        <Container className="mt-5">
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Başlık</Form.Label>
                    <Form.Control onChange={handleChange} defaultValue={post?.title} name="title" type="text" required placeholder="Başlık" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubTitle">
                    <Form.Label>Alt Başlık</Form.Label>
                    <Form.Control onChange={handleChange} defaultValue={post?.subTitle} name="subTitle" type="text" placeholder="Alt Başlık" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Konu Etiketi Seçin:</Form.Label>
                    <Form.Select onChange={handleChange} defaultValue={post?.tag}  name="tag" required>
                    {tags.map((tag,index) => {
                        return <option key={index} value={tag}>{tag}</option>
                    })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                    <InputGroup.Text>İçeriği Giriniz</InputGroup.Text>
                    <Form.Control onChange={handleChange} defaultValue={post?.content} name="content" required as="textarea" aria-label="With textarea" />
                    </InputGroup>
                </Form.Group>
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Blog Kapak Fotoğrafı</Form.Label>
                    <br />
                    <FileBase64 multiple={false} onDone={({base64}) => setPostData(
                        (prev)=> {
                            return{
                                ...prev,
                                image:base64,
                            }
                        }
                    )} />
                </Form.Group>

                <Button onClick={closeEditMode} variant="primary" className="mt-3">
                    Vazgeç
                </Button>{' '}
                <Button variant="primary" type="submit" className="mt-3">
                    Yayınla
                </Button>
            </Form>
        </Container>
        </>  
    )
}

export default EditPost