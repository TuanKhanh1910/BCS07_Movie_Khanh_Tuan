import React, { Fragment } from "react";
import BookTickets from "../../pages/BookTickets/BookTickets";
import { layDuLieuLocal } from "../../util/localStore";
import { NavLink } from "react-router-dom";

const CheckoutTemplate = () => {
  if (!layDuLieuLocal("user")) {
    return <NavLink to="/login" />;
  }
  return (
    <Fragment>
      <BookTickets />
    </Fragment>
  );
};

export default CheckoutTemplate;
