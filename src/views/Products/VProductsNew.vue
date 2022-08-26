div
<template>
  <q-page padding>
    <div class="row">
      <q-card>
          <q-item>
            <q-item-section>
              <q-item-label>Detalhes do Produto</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section>
            <q-form class="row q-col-gutter-sm" @submit.prevent="handleSave">
              <q-input
                class="col-12"
                filled
                v-model="form.name"
                label="Nome"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Campo Nome é obrigatório',
                ]"
              />
              <q-select
                class="col-12 col-md-6"
                filled
                v-model="form.category"
                :options="optionsCategory"
                label="Categoria"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.value > 0) || 'Campo Categoria é obrigatório',
                ]"
              />
              <q-select
                class="col-12 col-md-6"
                filled
                v-model="form.unity"
                :options="optionsUnity"
                label="Unidade"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.value > 0) || 'Campo Unidade é obrigatório',
                ]"
              />
              <q-input
                class="col-12"
                filled
                v-model="form.description"
                type="textarea"
                label="Descrição"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Campo Descrição é obrigatório',
                ]"
              />
              <q-input
                class="col-12 col-md-6"
                filled
                v-model="form.purchase"
                label="Preço de Compra"
                mask="##.###,##"
                unmasked-value
                reverse-fill-mask
                prefix="R$"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Campo Preço de Compra é obrigatório',
                ]"
              />
              <q-input
                class="col-12 col-md-6"
                filled
                v-model="form.sale"
                label="Preço de Venda"
                mask="##.###,##"
                unmasked-value
                reverse-fill-mask
                prefix="R$"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Campo Preço de Venda é obrigatório',
                ]"
              />
              <q-input
                class="col-12 col-md-6"
                filled
                v-model="form.inventory"
                label="Estoque"
                type="number"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Campo Estoque é obrigatório',
                ]"
              />
              <q-input
                class="col-12 col-md-6"
                filled
                v-model="form.minInventory"
                label="Estoque Mínimo"
                type="number"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Campo Estoque Mínimo é obrigatório',
                ]"
              />
              <q-input
                filled
                class="col-12 col-md-6"
                v-model="form.reference"
                label="Referência"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Campo Referencia é obrigatório',
                ]"
              />
              <q-input
                v-if="editMode"
                class="col-12 col-md-6"
                filled
                disable
                v-model="form.id"
                label="Código"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Campo Código é obrigatório',
                ]"
              />
              <q-input
                class="col-12 col-md-6"
                v-if="editMode"
                disable
                filled
                v-model="form.user"
                label="Criado por"
              />
              <q-btn
                label="Salvar"
                color="secondary"
                class="full-width q-mt-md"
                type="submit"
              />
            </q-form>
          </q-card-section>
        </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="delete" color="secondary" @click="handleDelete" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { useStore } from "@/store";
import {
DELETE_PRODUCT,
GETBYID_PRODUCT,
GET_CATEGORIES,
GET_UNITIES,
PATCH_PRODUCTS,
POST_PRODUCTS
} from "@/utils/constants";
import moment from "moment";
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { IProduct } from "../../interfaces/IProduct";
import { ISelect } from "../../interfaces/ISelect";

export default defineComponent({
  name: "VProducTs",

  props: {
    id: {
      type: String,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();
    const id = ref(props.id !== "new" ? props.id : null);
    const editMode = ref(!!id.value);

    $q.loading.show({
      message: "Carregando dados! Por favor aguarde ...",
    });

    Promise.all([store.dispatch(GET_CATEGORIES), store.dispatch(GET_UNITIES)])
      .catch(({ message }) => {
        errorMessage(`Não foi possível carregar os dados.<br>${message}`);
      })
      .finally(() => {
        $q.loading.hide();
      });

    const form = ref<IProduct>({
      id: null,
      reference: null,
      name: null,
      category: {
        value: null,
        label: null,
      },
      description: null,
      unity: {
        value: null,
        label: null,
      },
      purchase: null,
      sale: null,
      inventory: null,
      minInventory: null,
      user: null,
      createdAt: null,
    });

    if (editMode.value) {
      store
        .dispatch(GETBYID_PRODUCT, id.value)
        .then(({ data }) => {
          form.value = {
            ...data,
            category: {
              value: data.category,
              label: store.state.category.categories.find(
                (category) => category.id === data.category
              ).name,
            },
            unity: {
              value: data.unity,
              label: store.state.unity.unities.find(
                (unity) => unity.id === data.unity
              ).name,
            },
          };
        })
        .catch(({ message }) => {
          errorMessage(`Não foi possível carregar os dados.<br>${message}`);
          router.push("/products");
        })
        .finally(() => {
          $q.loading.hide();
        });
    }

    const optionsCategory = computed((): Array<ISelect> => {
      return store.state.category.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
    });

    const optionsUnity = computed((): Array<ISelect> => {
      return store.state.unity.unities.map((unity) => {
        return {
          label: unity.name,
          value: unity.id,
        };
      });
    });

    const errorMessage = (message: string) => {
      $q.notify({
        type: "negative",
        html: true,
        message: "Ops! Algo de errado aconteceu!",
        caption: message,
        position: "top-right",
        progress: true,
      });
    };

    const formatCurrency = (value: number) => {
      return (
        String(value).substring(0, String(value).length - 2) +
        "." +
        String(value).substring(String(value).length - 2)
      );
    };

    const saveProduct = () => {
      const data = {
        reference: form.value.reference,
        name: form.value.name,
        category: form.value.category.value,
        description: form.value.description,
        unity: form.value.unity.value,
        purchase: formatCurrency(form.value.purchase),
        sale: formatCurrency(form.value.sale),
        inventory: form.value.inventory,
        minInventory: form.value.minInventory,
        createdAt: moment().format("YYYY-MM-DDTHH:mm:ss"),
        user: "ADMIN",
      };
      store
        .dispatch(editMode.value ? PATCH_PRODUCTS : POST_PRODUCTS, data)
        .then(() => {
          $q.notify({
            type: "positive",
            message: "Sucesso!",
            caption: "Produto cadastrado com sucesso",
            position: "top-right",
            progress: true,
          });
          router.push("/products");
        })
        .catch(({ message }) => {
          errorMessage(`Não foi possível salvar o produto.<br>${message}`);
        })
        .finally(() => {
          $q.loading.hide();
        });
    };

    const editProduct = () => {
      const data = {
        id: id.value,
        reference: form.value.reference,
        name: form.value.name,
        category: form.value.category.value,
        description: form.value.description,
        unity: form.value.unity.value,
        purchase: formatCurrency(form.value.purchase),
        sale: formatCurrency(form.value.sale),
        inventory: form.value.inventory,
        minInventory: form.value.minInventory,
        user: "ADMIN",
      };
      store
        .dispatch(editMode.value ? PATCH_PRODUCTS : POST_PRODUCTS, data)
        .then(() => {
          $q.notify({
            type: "positive",
            message: "Sucesso!",
            caption: "Produto editado com sucesso",
            position: "top-right",
            progress: true,
          });
          router.push("/products");
        })
        .catch(({ message }) => {
          errorMessage(`Não foi possível salvar o produto.<br>${message}`);
        })
        .finally(() => {
          $q.loading.hide();
        });
    };

    const handleSave = () => {
      $q.loading.show({
        message: "Salvando dados! Por favor aguarde ...",
      });
      if (editMode.value) {
        editProduct();
      } else {
        saveProduct();
      }
    };

    const handleDelete = () => {
      $q.dialog({
        title: "Atenção",
        message: "Deseja realmente deletar este produto?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        $q.loading.show({
          message: "Deletando dados! Por favor aguarde ...",
        });
        store
          .dispatch(DELETE_PRODUCT, id.value)
          .then(() => {
            $q.notify({
              type: "positive",
              message: "Sucesso!",
              caption: "Produto excluido com sucesso",
              position: "top-right",
              progress: true,
            });
            router.push("/products");
          })
          .catch(({ message }) => {
            errorMessage(`Não foi possível deletar o produto.<br>${message}`);
          })
          .finally(() => {
            $q.loading.hide();
          });
      });
    };

    return {
      form,
      optionsCategory,
      optionsUnity,
      editMode,
      handleSave,
      handleDelete,
    };
  },
});
</script>

<style scoped></style>
