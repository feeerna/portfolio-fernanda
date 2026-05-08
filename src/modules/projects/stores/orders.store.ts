import { defineStore } from "pinia";
import { OrdersService } from "../services/orders.services";
import { OrdersInterface } from "../interfaces/orders.interface";
export const useOrdersStore: any = defineStore({
  id: "orders-store",
  state: () => ({
    moduleMode: "",
    limit: 10,
    page: 1,
    search: "",
    isActive: true,
    initDate: "",
    endDate: "",
    itemsCount: 0,
    totalPages: 0,
    advancedSearchActive: false,
    list: [] as Array<OrdersInterface>,
    selectedItem: {} as OrdersInterface,
    resolutionTypeId: 0
  }),
  actions: {
    async getPaginatedOrders() {
        let response = await OrdersService.getPaginated(
          this.limit,
          this.page,
          this.search,
          this.initDate ?? undefined,
          this.endDate ?? undefined
        );
        if (response.status == 201) {
          const _response = response.data.response;
          console.log(response)
          return {
            list: _response.list,
            itemsCount: _response.count,
            totalPages: Math.ceil(_response.totalPages),
          };
        }
    },
    async add(data: any) {
        let response = await OrdersService.add({
          //company_id: data.companyId,
          orders_type_id: data.ordersTypeId,
          //is_active: true,
          name: data.name,
          description: data.description,
        });
        if (response.status == 201) {
          this.loadPaginatedList();
          return {
            error: false,
            data: response.data
          };
        }
        else {
          return {
            error: true,
            data: {}
          }

        }
    },
    async loadPaginatedList(){
        let response: any = await this.getPaginatedOrders();
        console.log(response)
        this.list = response.list;
        this.itemsCount = response.itemsCount;
        this.totalPages = response.totalPages;
        return response
    },

    async edit(id: string, data: any) {
        let response = await OrdersService.edit(id, {
          //company_id: data.companyId,
          orders_type_id: data.ordersTypeId,
          //is_active: true,
          name: data.name,
          description: data.description,
        });
        if (response.status == 200) {
          this.loadPaginatedList();
          return {
            error: false,
            data: response.data
          };
        } else {
          return {
            error: true,
            data: {}
          };
        }
    },
    
    async convertOrderToInvoice(data: any) {
        let response = await OrdersService.convertIntoInvoice({
          resolution_type_id: data.resolution_type_id,
          orderIds: data.orders
        });
        if (response.status == 201) {
          this.loadPaginatedList();
          return {
            error: false,
            data: response.data.response
          };
        } else {
          return {
            error: true,
            data: response.data.response.validationError.message
          };
        }

    },
    async delete() {
      let is_active = !this.selectedItem.is_active;
        let response = await OrdersService.delete(
          this.selectedItem.id,
          is_active
        );
        if (response.status == 200) {
          this.loadPaginatedList();
          return {
            error: false,
          };
        } else {
          return {
            error: true,
          };
        }
    },
  },
});
