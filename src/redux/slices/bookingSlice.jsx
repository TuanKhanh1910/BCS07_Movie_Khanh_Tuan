import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rapServ } from "../../services/rapServices";
import { ThongTinLichchieu } from "../../_model/InfoPhongVe";

export const getListTicketRoomApi = createAsyncThunk(
  "ticket/getListTicketRoomApi",
  async (maLichChieu) => {
    const res = await rapServ.getListTicketRoom(maLichChieu);
    // console.log("res: ", res);
    return res.data.content;
  }
);
export const getControlTicketApi = createAsyncThunk(
  "ticket/getControlTicketApi",
  async (infoBooking) => {
    const res = await rapServ.getControlTicket(infoBooking);
    console.log("res:", res);
    return res.data.content;
  }
);
const initialState = {
  rapPhim: new ThongTinLichchieu(),
  danhSachGheDangDat: [],
  controlBooking: {},
};
export const bookingSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    layInfoGhe: (state, action) => {
      // console.log(state);
      // console.log("ghế được chọn : ", action.payload);
      // cập nhập xem thử bên trong mảng danhSSachGheDangDgDat có ghế gửi lên ko
      let index = state.danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.tenGhe == action.payload.tenGhe
      );
      if (index != -1) {
        // nếu tìm thấy ghế được chọn trong mảng thì click vào xóa mảng còn nếu chưa thì add vào
        state.danhSachGheDangDat.splice(index, 1);
      } else {
        state.danhSachGheDangDat.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListTicketRoomApi.fulfilled, (state, action) => {
      // console.log("state:", state);
      // console.log("action:", action.payload);
      state.rapPhim = action.payload;
    });
    builder.addCase(getListTicketRoomApi.rejected, (state, action) => {
      // console.log("action: ", action);
    });
    builder.addCase(getControlTicketApi.fulfilled, (state, action) => {
      // if()
      // const index =
      console.log("state:", state);
      console.log("action:", action.payload);
      state.controlBooking = action.payload;
    });
  },
});
export const { layInfoGhe } = bookingSlice.actions;
// để sử dụng trong component

export default bookingSlice.reducer;
// import trong store của redux
