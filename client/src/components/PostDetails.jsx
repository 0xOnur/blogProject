import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Button, Col, Badge, Row } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../images/noimage.svg";
import { fetchSinglePost, deletePost } from "../api/postsApi";
import { fetchSingleUser } from "../api/userApi";
import EditPost from "./EditPost";

const PostDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPost = useSelector((state) => state.post.currentPost);


  const currentUser = useSelector((state) => state.user.user);
  

  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    dispatch(fetchSinglePost(id))
  }, [dispatch, id, editMode]);
  

  const convertTime = useCallback((time) => {
    return moment(time).fromNow();
  }, []);

  const removePost = () => {
    dispatch(deletePost(id)).then(() => {
      //this area getUserById dispatch for update user's posts in redux store
      console.log(currentUser.userFound._id);
      dispatch(fetchSingleUser(currentUser.userFound._id))
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  return (
    <>
      <style type="text/css">
        {`
        a {
          text-decoration: none;
          background-color: transparent;
        }
        .post-content {
          margin-top: 1rem;
          margin-bottom: 3rem;
          border: 1px solid #dee2e6;
          border-radius: 0.5rem;
          background-color: #f8f9fa;
          padding: 1rem 1.5rem;
        }
        .post-content-img{
          max-width: 100%;
          padding: 0px; 
          border: 0px solid #dee2e6;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          margin-top: 2rem;
        }
        p{
          align: justify;
        }
      `}
      </style>

      {currentPost ? (
        <>
          {editMode ? (
            <EditPost post={currentPost} closeEditMode={closeEditMode} />
          ):(
            <div className="container post-content mt-5">
              <Row>
                <Col md="12">
                  <h3>{currentPost?.title}</h3>
                  <h5>{currentPost?.subTitle}</h5>
                </Col>


              {currentUser.userFound &&(currentUser?.userFound?._id === currentPost?.creator?._id && (
                  <>
                  <Col md="12 mb-3">
                    <Button onClick={openEditMode} className="" variant="secondary">
                      Düzenle <FaRegEdit />
                    </Button>
                  </Col>
                  <Col md="12 mb-3">
                    <Button onClick={removePost} variant="danger">
                      Sil <FaTrash />
                    </Button>
                  </Col>
                </>)
                
              )}
                <hr />
              </Row>

              <Row>
                <Col md="12">
                  <h6>
                    {convertTime(currentPost?.created)} 
                    <a href={"/users/"+currentPost.creator._id}> {currentPost?.creator?.username}</a>
                  </h6>
                </Col>
                <Col md="12">
                  <h6>
                    Last update: {convertTime(currentPost?.updated)}{" "}
                    <a href={"/users/"+currentPost.creator._id}> {currentPost?.creator?.username}</a>
                  </h6>
                </Col>
                <Col md="12">
                  <h5>
                    <Badge bg="secondary">#{currentPost?.tag}</Badge>
                  </h5>
                </Col>
                <Col md="12">
                  <img
                    className="post-content-img"
                    src={currentPost?.image || noImage}
                    alt=""
                  />
                  <p>{currentPost?.content}</p>
                </Col>
              </Row>
            </div>
          )}
        </>
      ):(
        <div className="post-content">
          <h4>404 Post not found</h4>
          <p>Post not found or deleted</p>
        </div>
      )
      }
    </>
  );
};

export default PostDetails;
