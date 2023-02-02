import React from "react";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {Form, Button, Col, Container, Row } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../api/userApi';


const Login = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  user?.user.userFound && (
    setTimeout(() => {
      navigate("/");
    }, 0)
  );
  
  const onSubmit = (data) => {
    dispatch(createUser(data)).then(() => {
      console.log("User created");
    }).catch((err) => {
      console.log(err);
    });
    console.log(data);
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
                        {errors.username && <span>This field is required</span>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMail">
                        <Form.Label>Mail</Form.Label>
                        <Form.Control {...register("email", { required: true })} type="email" required placeholder="Enter Username" />
                        {errors.email && <span>This field is required</span>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register("password", { required: true })} type="password" placeholder="Enter Password" />
                        {errors.password && <span>This field is required</span>}
                  </Form.Group>

                  <Col className="form-header">
                    <Button type="submit" variant="primary">Register</Button>
                  </Col>
              </form>
            </Row>
        </Container>
    </>
  );
};

export default Login;
