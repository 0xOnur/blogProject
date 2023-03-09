import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import modules from "./ReactQuillModules"

import {
  Container,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import {createPost} from '../api/postsApi';
import PostsModal from "./postsModal";
import {fetchSingleUser} from "../api/userApi";


const tags = [
  "Humor",
  "Programming",
  "Health",
  "Science",
  "Technology",
  "Education",
  "Politics",
  "Books",
  "Food",
  "Movies",
  "Music",
  "Sports",
  "Travel"
];

const AddPostForm = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {register, handleSubmit} = useForm();
  const [content, setContent] = useState("");
  const [modalShow, setModalShow] = useState(false);


  const userId = useSelector((state) => state.user.user?._id);
  const error = useSelector((state) => state.post.error);
  const isPending = useSelector((state) => state.post.isPending)

  !userId && (
    setTimeout(() => {
      navigate("/login");
    }, 0)
  );


  const onSubmit = (data)=> {
    const formData = new FormData();
    
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);
    formData.append("content", content);
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
    <Container className="mt-5 mb-5">
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Form.Group className="mb-3 w-50" controlId="formTitle">
            <Form.Control {...register("title", { required: true })} type="text" placeholder="Title" />
          </Form.Group>

          <Form.Group className="mb-3 w-50" controlId="formSubTitle">
            <Form.Control {...register("subTitle", { required: true })}  type="text" placeholder="Subtitle" />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>Select topic</Form.Label>
            <Form.Select {...register("tag", { required: true })}>
              {tags.map((tag,index) => {
                return <option key={index} value={tag}>{tag}</option>
              })}
            </Form.Select>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <InputGroup>
              <InputGroup.Text>Content</InputGroup.Text>
              <Form.Control {...register("content", { required: true })} as="textarea" aria-label="With textarea" />
            </InputGroup>
          </Form.Group> */}

          <Form.Group controlId="formFile" className="mb-3 w-50">
            <Form.Label>Cover Photo</Form.Label>
            <br />
            <Form.Control {...register("image")} name="image" type="file" />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <InputGroup>
              <Form.Label>Content</Form.Label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                className=" h-100 w-100"
              />
            </InputGroup>
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
