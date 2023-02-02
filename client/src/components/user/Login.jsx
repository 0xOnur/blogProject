import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {Form, Button, Col, Container, Row } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../api/userApi';
import UserModal from "./UserModal";

const Login = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(state => state.user);


  useEffect(() => {
    if (user?.user?.userFound) {
      navigate("/");
    }
  }, [navigate]);
  

  const [modalShow, setModalShow] = useState(false);


  const onSubmit = (data) => {
    dispatch(loginUser(data)).then((data) => {
      if (data.payload.userFound) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } 
    });
  };

  return (
    <>
    <style type="text/css">
      {`
        .form-header{
          text-align: center;
          margin-top: 1rem;
        }
        .form-card{
          margin-top: 1rem;
          border: 1px solid #dee2e6;
          border-radius: 0.5rem;
          background-color: #f8f9fa;
          padding: 1rem 1.5rem;
        }
      `}
    </style>
      <Container className="form-card">
        <Row>
          <Col md='12'>
            <h1 className="form-header">Giriş Yap</h1>
          </Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Col>
              <Form.Group className="mb-3" controlId="formMail">
                  <Form.Label>Mail</Form.Label>
                  <Form.Control {...register("email", { required: true })} type="email" required placeholder="Enter Username" />
                  {user.error?.message === "User not found" && <UserModal
                    show={modalShow}
                    title={"Hata"}
                    body={"Kullanıcı Bulunamadı"}
                    description={"Lütfen kayıt olunuz."}
                    onHide={() => setModalShow(false)}
                  />}
                  
                  {errors.email && <span>Lütfen bu alanı doldurun!</span>}
                </Form.Group>
            </Col>
          
            <Col>
              <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control  {...register("password", { required: true })} type="password" placeholder="Enter Password" />
                  {errors.password && <span>Lütfen bu alanı doldurun!</span>}
                  {user.error?.message === "Wrong password" && <UserModal
                    show={modalShow}
                    title={"Hata"}
                    body={"Yanlış Şifre"}
                    description={"Şifrenizi yenileyin"}
                    onHide={() => setModalShow(false)}
                  />}
                </Form.Group>
            </Col>
            {user.user.userFound ?( <UserModal
                    show={modalShow}
                    title={"Giriş Başarılı"}
                    body={"Merhaba " + user.user.userFound.username}
                    description={"Anasayfaya yönlendiriliyorsunuz..."}
                    onHide={() => setModalShow(false)}
                  />): (<></>)}

            <Col className="form-header">
              <Button onClick={() => setModalShow(true)} type="submit" variant="primary">Giriş Yap</Button>{" "}
            </Col>
            <hr/>
            <Col md='12' className="form-header">
              <h5>Hesabım Yok</h5>
              <Button href="/register" variant="primary">Kayıt Ol</Button>
            </Col>
          </form>
        </Row>
      </Container>
    </>
  );
};

export default Login;
