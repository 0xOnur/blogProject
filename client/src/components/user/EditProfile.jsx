import React, { useState } from "react";
import { Form, Button, Modal, Image } from "react-bootstrap/";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUser } from "../../api/userApi";
import UserModal from "./UserModal";

const EditProfile = ({ show, handleclose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user.userProfile);

  const isPending = useSelector((state) => state.user.isPending);

  const error = useSelector((state) => state.user.error);
  console.log(error);

  const [modalShow, setModalShow] = useState(false);

  const onSubmit = (data) => {
    const userData = new FormData();
    userData.append("username", data.username);
    userData.append("image",data.image.length > 0 ? data.image[0] : user.image);
    userData.append("imageId", user.imageId);

    dispatch(updateUser({ id: user._id, userData })).then((response) => {
      if (response?.error) {
        console.log(response, 27);
      } else {
        setModalShow(false);
        handleclose();
      }
    });
  };

  return (
    <>
      {isPending === true ? (
        <UserModal
          show={modalShow}
          title="Updating Profile"
          body="Please wait while we update your profile"
          description="This may take a few seconds"
          onHide={() => setModalShow(false)}
        />
      ) : (
        <>
          {error?.message && (
              <UserModal
                show={modalShow}
                title="Error"
                body={error.message}
                onHide={() => setModalShow(false)}
              />
            )
          }
        </>
      )}

      <Modal show={show} onHide={handleclose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        {...register("username", { required: true })}
                        type="text"
                        defaultValue={user.username}
                      />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Avatar</Form.Label>
                      <br />
                      <Image
                        src={user.image}
                        width="50px"
                        height="50px"
                        roundedCircle
                      />
                      <br />
                      <br />
                      <Form.Control
                        {...register("image")}
                        name="image"
                        type="file"
                      />
                    </Form.Group>

                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleclose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => setModalShow(true)}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal>
    </>
  );
};

export default EditProfile;
