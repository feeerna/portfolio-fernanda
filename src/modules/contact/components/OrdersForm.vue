<!-- ******************** HTML ******************** -->
<template>
  <v-card>
    <v-card-title>
      <strong>
        {{
          ordersStore.moduleMode === "add"
            ? "Agregar [[ORDERS]]"
            : "Editar [[ORDERS]]"
        }}
      </strong>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit" class="mt-4">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="formData.name"
              :rules="nameRules"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Nombre"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="formData.ordersTypeId"
              :items="typeOrders"
              :rules="ordersTypeIdRules"
              item-title="name"
              item-value="id"
              color="#841811ff"
              density="compact"
              variant="outlined"
              label="Tipo de [[ORDERS]]"
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="formData.description"
              :rules="descriptionRules"
              color="#841811ff"
              variant="outlined"
              label="Descripción del [[ORDERS]]"
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-4">
          <v-btn
            class="mr-4 d-none d-sm-flex"
            size="small"
            color="#841811ff"
            variant="outlined"
            @click="close"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="mr-4 d-flex d-sm-none"
            size="small"
            color="#841811ff"
            variant="outlined"
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <br />
          <v-btn
            class="d-none d-sm-flex"
            size="small"
            :color="ordersStore.moduleMode === 'add' ? 'success' : 'primary'"
            variant="outlined"
            type="submit"
          >
            {{ ordersStore.moduleMode === "add" ? "Agregar" : "Editar" }}
          </v-btn>
          <v-btn
            class="d-flex d-sm-none"
            size="small"
            :color="ordersStore.moduleMode === 'add' ? 'success' : 'primary'"
            variant="outlined"
            type="submit"
          >
            <v-icon>{{
              ordersStore.moduleMode === "add" ? "mdi-plus" : "mdi-pencil"
            }}</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue-demi";
import { useOrdersStore } from "../stores/orders.store";
import * as Yup from "yup";
const swal: any = inject("$swal");
const emit = defineEmits(["onAddSuccess", "onClose"]);

const ordersStore = useOrdersStore();

let typeOrders = ref([
  { name: "Tipo 1", id: 1 },
  { name: "Tipo 2", id: 2 },
]);

let formData = reactive({
  name: "",
  description: "",
  companyId: "",
  ordersTypeId: "",
  //is_active: true,
});

const validations = {
  name: Yup.string().required("El nombre es requerido").trim(),
  description: Yup.string().required("Se necesita una descripción").trim(),
  //companyId: Yup.number().required("Seleccione una compañia por favor"),
  ordersTypeId: Yup.number().required(
    "Seleccione un tipo de [[ORDERS]] por favor"
  ),
};

const nameRules = ref([
  async (value: any) => {
    try {
      await validations.name.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en el nombre";
    }
  },
]);

const descriptionRules = ref([
  async (value: any) => {
    try {
      await validations.description.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación en la descripción";
    }
  },
]);

const ordersTypeIdRules = ref([
  async (value: any) => {
    try {
      await validations.ordersTypeId.validate(value);
      return true;
    } catch (e: any) {
      return "Error de validación del tipo de [[ORDERS]]";
    }
  },
]);



let validationSchema = Yup.object(validations);

const setForm = () => {
  if (ordersStore.moduleMode !== "edit") return;
  formData.name = ordersStore.selectedItem.name;
  formData.description = ordersStore.selectedItem.description;
  //formData.companyId = ordersStore.selectedItem.company_id;
  formData.ordersTypeId = ordersStore.selectedItem.orders_type_id;
};

const close = () => {
  emit("onClose");
};

const submit = async () => {
  try {
    await validationSchema.validate(formData);
    const addMode = ordersStore.moduleMode === "add";
    let response;
    if (addMode) {
      response = await ordersStore.add(formData);
    } else {
      const id = ordersStore.selectedItem.id;
      response = await ordersStore.edit(id, formData);
    }
    emit("onAddSuccess");
    if (!response.error) {
      swal.fire({
        icon: "success",
        text: addMode ? "Agregado con éxito" : "Actulizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      swal.fire({
        icon: "error",
        text: "Error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    swal.fire({
      icon: "warning",
      text: "Ocurrió un error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
// const getCompany = async () => {
//   const response = await ordersStore.getCompanies();
//   companies.value = response;
// };

onMounted(() => {
  //getCompany();
  setForm();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
