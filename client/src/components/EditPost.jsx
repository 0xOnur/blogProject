import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PostsModal from "./postsModal";
import {updatePost} from '../api/postsApi';
import {
    Container,
    Form,
    Button,
    InputGroup,
  } from "react-bootstrap";

const tags = ["Fun", "Programming", "Health", "Science","Teknoloji"];


const EditPost = React.memo(({post, closeEditMode}) => {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector((state) => state.post.error);
    const isPending = useSelector((state) => state.post.isPending);


    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (data) => {
        console.log("data: ", data);
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("subTitle", data.subTitle);
        formData.append("tag", data.tag);
        formData.append("content", data.content);
        formData.append("image", data.image.length > 0? data.image[0] : post.image);
        formData.append("creator", post.creator._id);

        setModalShow(true);
        

        dispatch(updatePost({id: post._id, formData})).then((response) => {
            console.log("response: ", response);
            if(!response?.error) {
                console.log("Post updated");
                setTimeout(() => {
                    navigate(`/posts/${post._id}`);
                    closeEditMode();
                }, 3000);

            }else {
                setModalShow(true);
            }
        })
    }

    return (
        
        <>
            {isPending === true ? 
            (
                <PostsModal 
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="Loading..."
                    body="Loading changes..."
                />
            )
            : (
                <>
                    <Container className="mt-5">
                        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control {...register("title", { required: true })} defaultValue={post?.title} type="text" required placeholder="Başlık" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSubTitle">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control {...register("subTitle", { required: true })} defaultValue={post?.subTitle} type="text" placeholder="Alt Başlık" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Select topic</Form.Label>
                                <Form.Select {...register("tag", { required: true })} defaultValue={post?.tag}  required>
                                {tags.map((tag,index) => {
                                    return <option key={index} value={tag}>{tag}</option>
                                })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <InputGroup>
                                <InputGroup.Text>Content</InputGroup.Text>
                                <Form.Control {...register("content", { required: true })} defaultValue={post?.content} required as="textarea" aria-label="With textarea" />
                                </InputGroup>
                            </Form.Group>
                            
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Blog Photo</Form.Label>
                                <br />
                                <Form.Control type="file" name="image" {...register("image")} />
                                
                            </Form.Group>

                            <Button onClick={closeEditMode} variant="primary" className="mt-3">
                                Cancel
                            </Button>{' '}
                            <Button variant="primary" type="submit" className="mt-3">
                                Publish
                            </Button>
                            {error?.message ? (
                                <PostsModal 
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    title="Hata"
                                    body={error?.message}
                                />
                            ):
                            (
                                <PostsModal 
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    title="Başarılı"
                                    body="Blog başarıyla güncellendi"
                                />
                            )

                            }
                        </Form>
                    </Container>
                </>
            )}
        
        </>  
    )
})

export default EditPost