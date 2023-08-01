import React, { Fragment, useEffect } from "react";
import BookTickets from "../../pages/BookTickets/BookTickets";
import { layDuLieuLocal } from "../../util/localStore";
import { useNavigate } from "react-router-dom";

const CheckoutTemplate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = layDuLieuLocal("user");
    if (user) {
      console.log(user);
    } else {
      return navigate("/login");
    }
  }, []);

  return (
    <Fragment>
      <BookTickets />
    </Fragment>
  );
};

export default CheckoutTemplate;
