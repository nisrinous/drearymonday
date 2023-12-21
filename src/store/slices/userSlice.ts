import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  token: string;
  id: string;
  membership: string;
  role: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {} as UserState,
  reducers: {
    setAttribute: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setAttribute } = userSlice.actions;
export default userSlice.reducer;
