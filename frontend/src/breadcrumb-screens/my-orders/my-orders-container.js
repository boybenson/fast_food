import React, { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import {
  fetchMyOrders,
  fetchMyOrdersRequest,
} from "../../redux/order/my-orders-slice";
import MyOrderComponent from "./my-orders-component";

const MyOrdersContainer = ({ history }) => {
  const { status, myOrders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiReq = async () => {
      const res = await dispatch(fetchMyOrdersRequest());
      const data = unwrapResult(res);
      if (data.status === 200) {
        dispatch(fetchMyOrders(data));
      }
    };

    apiReq();
  }, [dispatch]);

  const handleGoBack = () => history.goBack();

  return (
    <div>
      <Container>
        {status === "loading" && <Loader />}

        {status === "success" && (
          <MyOrderComponent
            customerOrders={myOrders.customerOrders}
            handleGoBack={handleGoBack}
          />
        )}
      </Container>
    </div>
  );
};

export default MyOrdersContainer;
