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

  const userId = useSelector((state) => state.user.user?.userFound?._id);

  !userId && (
    setTimeout(() => {
      navigate("/login");
    }, 0)
  );


  const error = useSelector((state) => state.post.error);

  const [modalShow, setModalShow] = useState(false);

  const onSubmit = (data)=> {

    console.log("data: ", data);
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
            <Form.Label>Başlık</Form.Label>
            <Form.Control {...register("title", { required: true })} type="text" placeholder="Başlık" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubTitle">
            <Form.Label>Alt Başlık</Form.Label>
            <Form.Control {...register("subTitle", { required: true })}  type="text" placeholder="Alt Başlık" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Konu Etiketi Seçin:</Form.Label>
            <Form.Select {...register("tag", { required: true })}>
              {tags.map((tag,index) => {
                return <option key={index} value={tag}>{tag}</option>
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <InputGroup>
              <InputGroup.Text>İçeriği Giriniz</InputGroup.Text>
              <Form.Control {...register("content", { required: true })} as="textarea" aria-label="With textarea" />
            </InputGroup>
          </Form.Group>
          
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Blog Kapak Fotoğrafı</Form.Label>
            <br />
            <Form.Control {...register("image", { required: true })} name="image" type="file" />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Yayınla
          </Button>
          {error?.messages ? (
            <PostsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              title="Hata"
              body="Post oluşturulamadı!"
              description={error?.messages}
            />
          ):(
            <PostsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              title="Başarılı"
              body="Post oluşturuldu!"
              description="Post'a yönlendiriliyorsunuz.."
            />
          )}
        </Form>
    </Container>
    </>    
  );
};

export default AddPostForm;
