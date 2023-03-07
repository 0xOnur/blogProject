import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import {createPost} from '../api/postsApi';
import PostsModal from "./postsModal";
import {fetchSingleUser} from "../api/userApi";
import { useForm } from "react-hook-form";



const tags = ["Fun", "Programming", "Health", "Science","Teknoloji"];

const AddPostForm = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.user?._id);

  !userId && (
    setTimeout(() => {
      navigate("/login");
    }, 0)
  );


  const error = useSelector((state) => state.post.error);
  const isPending = useSelector((state) => state.post.isPending)

  const [modalShow, setModalShow] = useState(false);

  const onSubmit = (data)=> {

    const formData = new FormData();
    
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);
    formData.append("content", data.content);
    formData.append("tag", data.tag);
    formData.append("creator", userId);
    formData.append("image", data.image[0]);

    if(userId) {
      dispatch(createPost(formData)).then((response) => {
        console.log(response);
        if(response?.error?.message){
          setModalShow(true);
        }else {
          dispatch(fetchSingleUser(userId));
          setModalShow(true);
          setTimeout(() => {
            navigate(`/posts/${response?.payload?._id}`);
          }, 3000);
        }
      });
    }
  };

  return (
    <>
    <Container className="mt-5">
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control {...register("title", { required: true })} type="text" placeholder="Başlık" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubTitle">
            <Form.Label>Subtitle</Form.Label>
            <Form.Control {...register("subTitle", { required: true })}  type="text" placeholder="Alt Başlık" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select topic</Form.Label>
            <Form.Select {...register("tag", { required: true })}>
              {tags.map((tag,index) => {
                return <option key={index} value={tag}>{tag}</option>
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <InputGroup>
              <InputGroup.Text>Content</InputGroup.Text>
              <Form.Control {...register("content", { required: true })} as="textarea" aria-label="With textarea" />
            </InputGroup>
          </Form.Group>
          
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Blog Photo</Form.Label>
            <br />
            <Form.Control {...register("image")} name="image" type="file" />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Create
          </Button>
          {error?.message ? (
            <PostsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              title="Error"
              body="Post not created!"
              description={error?.message}
            />
          ):(
            <PostsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              title="Success"
              body="Post created!"
              description="Redirecting to post.."
            />
          )}
          {
            isPending && (
              <PostsModal
                show={isPending}
                onHide={() => setModalShow(false)}
                title="Loading"
                body="Please wait.."
                description="Post is creating.."
              />
            )
          }
        </Form>
    </Container>
    </>    
  );
};

export default AddPostForm;
