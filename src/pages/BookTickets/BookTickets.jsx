import React, { Fragment, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllTicketApi,
  layInfoGhe,
} from "../../redux/slices/bookingSlice.jsx";
import { CloseSquareOutlined } from "@ant-design/icons";
const BookTickets = () => {
  const { rapPhim, danhSachGheDangDat } = useSelector((state) => state.booking);
  // console.log("rapPhim: ", rapPhim);
  console.log("danh sách ghê đang đặt :", danhSachGheDangDat);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTicketApi(params.id));
  }, []);
  const { thongTinPhim, danhSachGhe } = rapPhim;
  // console.log(danhSachGhe);
  const renderGhe = () => {
    return danhSachGhe.map((ghe, index) => {
      // console.log(ghe);
      // const sttGhe = ghe;
      let gheVip = ghe.loaiGhe == "Vip" ? "gheVip" : "";
      let gheDaDat = ghe.loaiGhe == "daDat" ? "gheDaDat" : "";
      let cssgheDangDat = "";
      //  kiêm tra từng cái ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD != -1) {
        cssgheDangDat = "gheDangDat";
      }
      return (
        <Fragment>
          <button
            onClick={() => {
              dispatch(layInfoGhe(ghe));
            }}
            disabled={ghe.daDat}
            className={`ghe ${gheVip} ${gheDaDat} ${cssgheDangDat}`}
            key={index}
          >
            {ghe.daDat ? <CloseSquareOutlined /> : ghe.stt}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  const { diaChi, tenPhim, ngayChieu, gioChieu } = rapPhim.thongTinPhim;
  return (
    <div
      className="bg-cover bg-center"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundImage: "url(./img/film.jpg",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.2",
        }}
      >
        <div className="container ">
          <div className="flex gap-10 ">
            <div className="w-3/12">
              {/* {rapPhim.thongTinPhim?.map((item, index) => { */}
              {/* return ( */}
              {/* <div key={index}> */}
              <h3 className="text-center text-lg text-white">
                <span className="text-blue-800 text-bold">
                  {danhSachGheDangDat
                    .reduce((tongTien, ghe, index) => {
                      return (tongTien += ghe.giaVe);
                    }, 0)
                    .toLocaleString()}{" "}
                  VND
                </span>
              </h3>
              <hr />
              <h3 className="text-xl text-red-600 ">{tenPhim}</h3>
              <p className=" text-red-600 my-2">Địa Điểm : {diaChi}</p>
              <p className=" text-red-600 my-2">Ngày Chiếu : {ngayChieu}</p>
              <p className=" text-red-600 my-2">Giờ Chiếu :{gioChieu} </p>

              <hr />

              <div className="grid grid-cols-2 ">
                <div>
                  <span className="text-red-600">Ghế:</span>
                  {danhSachGheDangDat.map((gheDD, index) => {
                    return (
                      <span key={index} className="text-green-600 text-xl mx-1">
                        {gheDD.stt}
                      </span>
                    );
                  })}
                </div>
              </div>
              <hr />
              <div className="my-5 text-white">
                <i>Email</i>
                <br />
                {/* {email} */}
              </div>
              <hr />
              <div className="my-5  text-white">
                <i>Số Điện Thoại</i>
                <br />
                {/* {soDT} */}
              </div>
              <hr />
              <div className="flex flex-col justify-end items-center">
                <button className="w-full py-2 bg-green-500  hover:bg-yellow-400 rounded-xl text-white text-center ">
                  ĐẶT VÉ
                </button>
              </div>
              {/* </div> */}
              {/* ); */}
              {/* })} */}
            </div>
            <div className="w-9/12 text-center mr-5">
              <div className="my-2 d-flex justify-content-center relative">
                <div className="bg-yellow-700 h-3 w-full"></div>
                <div className="screen text-center mb-10">
                  <h3 className="text-center text-black absolute  right-1/2">
                    Màn Hình
                  </h3>
                </div>
                <div>{renderGhe()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTickets;
