<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-md-7">
        <q-card>
          <q-expansion-item
            default-opened
            expand-separator
            icon="archive"
            label="Detalhes do Produto"
            header-style="background-color: #f2f2f2;"
          >
            <q-card>
              <q-card-section>
                <q-form class="row justify-center q-gutter-y-sm" @submit.prevent="handleSave">
                  <div v-if="editMode" class="col-12">
                    <q-input
                      filled
                      disable
                      v-model="data.id"
                      label="Código"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Campo Código é obrigatório',
                      ]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="data.reference"
                      label="Referência"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Campo Referencia é obrigatório',
                      ]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="data.name"
                      label="Nome"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Campo Nome é obrigatório',
                      ]"
                    />
                  </div>
                  <div class="col-12">
                    <q-select
                      filled
                      v-model="data.category"
                      :options="optionsCategory"
                      label="Categoria"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.value > 0) ||
                          'Campo Categoria é obrigatório',
                      ]"
                    />
                  </div>
                  <div class="col-12">
                    <q-select
                      filled
                      v-model="data.unity"
                      :options="optionsUnity"
                      label="Unidade"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.value.length > 0) ||
                          'Campo Unidade é obrigatório',
                      ]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="data.description"
                      type="textarea"
                      label="Descrição"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Campo Descrição é obrigatório',
                      ]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="data.purchase"
                      label="Preço de Compra"
                      mask="##.###,##"
                      prefix="R$"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Campo Preço de Compra é obrigatório',
                      ]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="data.sale"
                      label="Preço de Venda"
                      mask="##.###,##"
                      prefix="R$"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Campo Preço de Venda é obrigatório',
                      ]"
                    />
                  </div>
                  <div v-if="editMode" class="col-12">
                    <q-input
                      filled
                      v-model="data.profit"
                      label="Lucro"
                      mask="##.###,##"
                      prefix="R$"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="data.inventory"
                      label="Estoque"
                      type="number"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Campo Estoque é obrigatório',
                      ]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="data.minInventory"
                      label="Estoque Mínimo"
                      type="number"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Campo Estoque Mínimo é obrigatório',
                      ]"
                    />
                  </div>
                  <q-btn
                    label="Salvar"
                    color="secondary"
                    class="full-width"
                    type="submit"
                  />
                </q-form>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { GET_CATEGORIES } from "@/utils/constants";
import { computed, defineComponent, ref } from "vue";
import { ISelect } from "../../interfaces/iselect";

export default defineComponent({
  name: "VProdutcs",

  props: {
    id: {
      type: Number,
    },
  },

  setup(props) {
    const store = useStore();
    store.dispatch(GET_CATEGORIES);
    
    const data = ref({
      id: null,
      reference: null,
      name: null,
      category: null,
      description: null,
      unity: null,
      purchase: null,
      sale: null,
      profit: null,
      inventory: null,
      minInventory: null
    });
    const editMode = computed(() => props.id > 0);

    const optionsCategory: Array<ISelect> = store.state.category.categories.map(
      (category) => {
        console.log(category);
        
        return {
          label: category.name,
          value: category.id,
        };
      }
    );

    const optionsUnity: Array<ISelect> = [
      {
        label: "Kilo",
        value: "kilo",
      },
      {
        label: "Litro",
        value: "litro",
      },
      {
        label: "Unidade",
        value: "unidade",
      },
    ];

    const handleSave = () => {
      console.log(data.value);
    }

    return {
      data,
      optionsCategory,
      optionsUnity,
      editMode,
      handleSave
    };
  },
});
</script>

<style></style>
