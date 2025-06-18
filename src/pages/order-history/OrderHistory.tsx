import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getDeliveries } from "../../store/deliverySlice";

const DeliveryList = () => {
  const dispatch = useAppDispatch();
  const { deliveries, loading, error } = useAppSelector((state) => state.delivery);

  useEffect(() => {
    dispatch(getDeliveries({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) return <p>Loading deliveries...</p>;
  if (error) return <p>{error}</p>;

  if(deliveries.length==0){
    return (
      <div>No deliveries Yet</div>
    )
  }

  return (
    <div>
      {deliveries.map((d) => (
        <div key={d.orderId}>
          <p><strong>Status:</strong> {d?.status}</p>
          <p><strong>Amount:</strong> ₹{d.totalOrderAmount}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DeliveryList;
