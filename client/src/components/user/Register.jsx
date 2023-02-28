import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {Form, Button, Col, Container, Row } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../api/userApi';
import UserModal from "./UserModal";


const Register = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const user = useSelector(state => state.user);

  console.log(user?.error)

  useEffect(() => {
    if (user?.user.userFound) {
      navigate("/");
    }
  }, [navigate]);
  
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image[0]);

    dispatch(createUser(formData)).then((response) => {
      if (response?.error?.message) {
          setModalShow(true);
      }else {
        setTimeout(() => {
          navigate("/");
        }, 3000);
        setModalShow(true);
      }
    })
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
            <Col>
                <h1 className="form-header">Register</h1>
              </Col>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control {...register("username", { required: true })} type="text" placeholder="Enter Username" />
                        {errors.username && <span>username is required</span>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMail">
                        <Form.Label>Mail</Form.Label>
                        <Form.Control {...register("email", { required: true })} type="email" placeholder="Enter Username" />
                        {errors.email && <span>email is required</span>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register("password", { required: true })} type="password" placeholder="Enter Password" />
                        {errors.password && <span>enter password</span>}
                  </Form.Group>

                  <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <br />
                        <Form.Control {...register("image")} name="image" type="file" />
                  </Form.Group>

                  <Col className="form-header">
                    <Button type="submit" variant="primary">Register</Button>

                    {/* This area check errors for Modal */}
                    {user?.error?.message && 
                      <UserModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        title="Hata"
                        body={user?.error?.message}
                      />
                    }

                    {!user?.error && 
                      <UserModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        title="Success"
                        body={"Welcome " + user?.user?.userFound?.username}
                        description="Redirecting to home page..."
                      />
                    }
                  </Col>
              </form>
            </Row>
        </Container>
    </>
  );
};

export default Register;
