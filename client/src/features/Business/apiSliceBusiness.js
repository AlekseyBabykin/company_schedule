import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
const token = localStorage.getItem("token");

const salesUserId = token ? jwtDecode(token).id : null;

const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const fetchCompanyInfo = createAsyncThunk(
  "api/fetchCompanyInfo",
  async () => {
    console.log(token);
    console.log(salesUserId);
    try {
      const response = await axios.get(`${apiUrl}/api/company/info`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCompanyInfoById = createAsyncThunk(
  "api/fetchCompanyInfoById",
  async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/company/info/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCompanyCreate = createAsyncThunk(
  "api/fetchCompanyCreate",
  async ({ name, info }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/company/create`,
        { salesUserId, name, info },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUpdateCompany = createAsyncThunk(
  "api/fetchUpdateCompany",
  async ({ companyId, name, info }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/company/info/update/${companyId}`,
        {
          data: {
            name,
            info,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDeleteCompany = createAsyncThunk(
  "api/fetchDeleteCompany",
  async (companyId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/company/info/${companyId}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companies = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCompanyCreate.fulfilled, (state, action) => {
        state.companies = [action.payload];
      })
      .addCase(fetchUpdateCompany.fulfilled, (state, action) => {
        const { companyId, name, info } = action.payload;
        const existingCompany = state.companies.find(
          (company) => company.id === companyId
        );
        if (existingCompany) {
          existingCompany.name = name;
          existingCompany.info = info;
        }
      })
      .addCase(fetchDeleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload
        );
      });
  },
});

export default companySlice.reducer;
