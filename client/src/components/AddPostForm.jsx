import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from 'react-file-base64';
import {
  Container,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import {createPost} from '../api/postsApi';
import PostsModal from "./postsModal";


const tags = ["Fun", "Programming", "Health", "Science","Teknoloji"];

const AddPostForm = () => {
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.user?.userFound?._id);

  !userId && (
    setTimeout(() => {
      navigate("/login");
    }, 0)
  );


  const error = useSelector((state) => state.post.error);
  console.log(error);

  const [modalShow, setModalShow] = useState(false);

  const [postData, setPostData] = useState();
  const [image, setImage] = useState();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData((prev)=> {
      return{
        ...prev,
        image:image,
        creator: userId,
        [name]: value,
      }
    })
  }

  useEffect(() => {
    setPostData((prev)=> {
        return{
          ...prev,
          image:image,
        }
      })
  }, [image]);

  

  const onSubmit = (event)=> {
    event.preventDefault();
    if(userId) {
      dispatch(createPost(postData)).then((response) => {
        console.log(response);
        if(response?.error?.message){
          setModalShow(true);
          console.log(response.error.message);
        }else {
          setModalShow(true);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      });
    }
  };

  return (
    <>
    <Container className="mt-5">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Başlık</Form.Label>
            <Form.Control onChange={handleChange} name="title" type="text" placeholder="Başlık" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubTitle">
            <Form.Label>Alt Başlık</Form.Label>
            <Form.Control onChange={handleChange} name="subTitle" type="text" placeholder="Alt Başlık" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Konu Etiketi Seçin:</Form.Label>
            <Form.Select onChange={handleChange} name="tag">
              {tags.map((tag,index) => {
                return <option key={index} value={tag}>{tag}</option>
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <InputGroup>
              <InputGroup.Text>İçeriği Giriniz</InputGroup.Text>
              <Form.Control onChange={handleChange} name="content" as="textarea" aria-label="With textarea" />
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
          {error?.message ? (
            <PostsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              title="Hata"
              body="Post oluşturulamadı!"
              description="Boş bıraktığınız alanları doldurunuz."
            />
          ):(
            <PostsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              title="Başarılı"
              body="Post oluşturuldu!"
              description="Anasayfaya yönlendiriliyorsunuz.."
            />
          )}
        </Form>
    </Container>
    </>    
  );
};

export default AddPostForm;
