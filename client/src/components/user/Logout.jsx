import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserModal from "./UserModal";
import { logoutUser } from "../../api/userApi";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state?.user?.user);



    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (user.userFound) {
            dispatch(logoutUser()).then(() => {
                setModalShow(true);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            });
        } else {
          navigate("/");
        }
    }, [navigate]);
    
    return (
        <div>
            {!user?.userFound && (
                <UserModal
                    show={modalShow}
                    title={"Success"}
                    body={"You have been logged out."}
                    description={""}
                    onHide={() => setModalShow(false)}
                />
            )}
        </div>
    );
};

export default Logout;
