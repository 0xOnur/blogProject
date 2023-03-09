import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import modules from "./ReactQuillModules"

import PostsModal from "./postsModal";
import { updatePost } from "../api/postsApi";

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

const EditPost = React.memo(({ post, closeEditMode }) => {
  const { register, handleSubmit } = useForm();
  const [modalShow, setModalShow] = useState(false);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.post.error);
  const isPending = useSelector((state) => state.post.isPending);


  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);
    formData.append("tag", data.tag);
    formData.append("content", content);
    formData.append(
      "image",
      data.image.length > 0 ? data.image[0] : post.image
    );
    formData.append("creator", post.creator._id);

    setModalShow(true);

    dispatch(updatePost({ id: post._id, formData })).then((response) => {
      if (!response?.error) {
        setTimeout(() => {
          navigate(`/posts/${post._id}`);
          closeEditMode();
        }, 3000);
      } else {
        setModalShow(true);
      }
    });
  };

  return (
    <>
      {isPending === true ? (
        <PostsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Loading..."
          body="Loading changes..."
        />
      ) : (
        <>
          <Container className="mt-5 mb-5">
            <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  {...register("title", { required: true })}
                  defaultValue={post?.title}
                  type="text"
                  required
                  placeholder="Title"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubTitle">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control
                  {...register("subTitle", { required: true })}
                  defaultValue={post?.subTitle}
                  type="text"
                  placeholder="Subtitle"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Select topic</Form.Label>
                <Form.Select
                  {...register("tag", { required: true })}
                  defaultValue={post?.tag}
                  required
                >
                  {tags.map((tag, index) => {
                    return (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    );
                  })}
                </Form.Select>
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
              
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Blog Photo</Form.Label>
                <br />
                <Form.Control type="file" name="image" {...register("image")} />
              </Form.Group>
              
              <Button
                onClick={closeEditMode}
                variant="primary"
                className="mt-3"
              >
                Cancel
              </Button>{" "}
              
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
              ) : (
                <PostsModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  title="Başarılı"
                  body="Blog başarıyla güncellendi"
                />
              )}
            
            </Form>
          </Container>
        </>
      )}
    </>
  );
});

export default EditPost;
