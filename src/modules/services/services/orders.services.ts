import { useAuthStore } from "@/modules/auth/store/useStoreAuth";
import { Http as axios } from "@/utils/http/http";
//import axios from "axios";
//import { URL_API } from "@/main";

// const URL_API = import.meta.env.VITE_EXPRESS_API_URL;
import { getApiUrl } from "@/utils/http/get-api-url";
const URL_API = getApiUrl();
const { user } = useAuthStore();

export const OrdersService = {
  add: async (data: object) => {
    return axios.post({
      url: `${URL_API}/orders`,
      data,
    });
  },
  edit: async (id: string, data: object) => {
    return axios.put({
      url: `${URL_API}/orders/${id}`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  delete: async (id: number, is_active: boolean) => {
    return axios.delete({
      url: `${URL_API}/orders/${id}`,
      config: {
        data: {
          is_active: is_active,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  getOne: async (id: string) => {
    return axios.get({
      url: `${URL_API}/orders/${id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  getAll: async () => {
    return axios.get({
      url: `${URL_API}/orders`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  // With Express
  // getPaginated: async (
  //   limit: number,
  //   page: number,
  //   search: string,
  //   isActive: boolean,
  //   initDate: string,
  //   endDate: string
  // ) => {
  //   return axios.post(
  //     `${URL_API}/page/orders`,
  //     {
  //       where: search,
  //       isActive: isActive ? "active" : "inactive",
  //       size: limit,
  //       page: page,
  //       initDate: initDate,
  //       endDate: endDate,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     }
  //   );
  // },

  // Whit Nest
  getPaginated: async (
    limit: number,
    page: number,
    search: string,
    initDate: string | undefined,
    endDate: string | undefined
  ) => {
    return axios.get({
      url: `${URL_API}/billings/find/orders/pagination`,
      config: {
        params: {
          page: page,
          limit: limit,
          search: search,
          initDate: initDate,
          endDate: endDate,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  convertIntoInvoice: async (data: object) => {
    return axios.post({
      url: `${URL_API}/billings/orders/convert-into-invoice`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
};
