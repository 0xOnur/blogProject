import React, {useEffect, useState,useCallback} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaTrash } from "react-icons/fa";
import {Button, Col, Badge, Row} from 'react-bootstrap';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import noImage from '../images/noimage.svg';
import { fetchSinglePost, deletePost } from '../actions/post';
import EditPost from './EditPost';

const PostDetails = () => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const currentPost = useSelector((state) => state.post.currentPost);

  const [editMode, setEditMode] = useState(false);

  //RESİM UPDATE OLDUKTAN SONRA GÜNCELLENMİYOR!!!!
  useEffect(()=> {
    dispatch(fetchSinglePost(id));
  },[dispatch, id, editMode])



  const convertTime = useCallback((time) => {
    return moment(time).fromNow();
  }, []);

  const removePost = () => {
    dispatch(deletePost(id));
    setTimeout(() => {
      navigate('/posts');
    }, 1000);
  }

  const openEditMode = () => {
    setEditMode(true);
  }

  const closeEditMode = () => {
    setEditMode(false);
  }

  console.log("postDetails render edildi");

  return (
    <>
    <style type="text/css">
      {`
        .post-content {
          margin-top: 1rem;
          margin-bottom: 3rem;
          border: 1px solid #dee2e6;
          border-radius: 0.5rem;
          background-color: #f8f9fa;
          padding: 1rem 1.5rem;
        }
        .post-content-img{
          width: 100%;
          padding: 0px; 
          border: 0px solid #dee2e6;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
        }
        p{
          align: justify;
        }
      `}
      </style>

      {
        editMode ? (
          <EditPost post={currentPost} closeEditMode={closeEditMode} />
        ): (
          <div className='container post-content mt-5'>
              <Row>
                <Col md='12'>
                  <h3>{currentPost?.title}</h3>
                  <h5>{currentPost?.subTitle}</h5>
                </Col>
                
                <Col md='12 mb-3' >
                  <Button onClick={openEditMode} className='' variant="secondary">Düzenle <FaRegEdit /></Button>
                </Col>
                <Col md='12 mb-3' >
                  <Button onClick={removePost} variant="danger">Sil <FaTrash /></Button>
                </Col>
                <hr /> 
              </Row>

              <Row>
                <Col md='12'>
                  <h6>{convertTime(currentPost?.created)} {currentPost?.creator}</h6>
                </Col>
                <Col md='12'>
                  <h5><Badge bg="secondary">#{currentPost?.tag}</Badge></h5>
                </Col>
                <Col md='12'>
                  <img className='post-content-img' src={currentPost?.image || noImage} alt='' />
                  <p>{currentPost?.content}</p>
                </Col>
              </Row>
            </div>
        )
      }

    </>
  )
}

export default PostDetails