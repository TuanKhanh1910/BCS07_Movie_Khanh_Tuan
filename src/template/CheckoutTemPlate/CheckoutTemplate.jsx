import React, { Fragment, useEffect } from "react";
import BookTickets from "../../pages/BookTickets/BookTickets";
import { layDuLieuLocal } from "../../util/localStore";

const CheckoutTemplate = () => {
  useEffect(() => {
    const user = layDuLieuLocal("user");
    if (user) {
      console.log(user);
    } else {
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  return (
    <Fragment>
      <BookTickets />
    </Fragment>
  );
};

export default CheckoutTemplate;
