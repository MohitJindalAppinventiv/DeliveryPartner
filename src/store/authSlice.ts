// authSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import {
  saveAuthToken,
  getAuthToken,
  removeAuthToken,
} from "../utils/authStorage";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const storedToken=getAuthToken();

const initialState: AuthState = {
  isAuthenticated: !!storedToken,
  token: storedToken,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/deliveryPartner/login", data, {
      headers: { "Content-Type": "application/json" },
    });

    const { accessToken } = response.data;
    console.log(accessToken)


    saveAuthToken(accessToken);
    return accessToken;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Something went wrong"
    );
  }
});


export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.patch("/auth/deliveryPartner/logout");
    removeAuthToken();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to logout"
    );
  }
});




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("logout")
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      removeAuthToken();
      
    },
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
