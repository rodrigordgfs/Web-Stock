<template>
  <q-page padding>
    <q-table
      ref="tableProducts"
      tabindex="0"
      title="Produtos"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="id"
      v-model:pagination="pagination"
      :filter="filter"
      @row-click="handleRowClick"
      @focusin="activateNavigation"
      @focusout="deactivateNavigation"
      @keydown="onKey"
    >
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="400"
          v-model="filter"
          placeholder="Procurar"
          class="q-mr-md"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="secondary"
          icon-right="archive"
          label="Novo Produto"
          @click="handleClickNewProduct"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { IProduct } from "@/interfaces/IProduct";
import { useStore } from "@/store";
import { GET_PRODUCTS } from "@/utils/constants";
import moment from "moment";
import { useQuasar } from "quasar";
import { computed, defineComponent, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { IColumn } from "../../interfaces/IColumn";

export default defineComponent({
  name: "VHome",

  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar();

    $q.loading.show({
      message: "Carregando os Produtos! Por favor aguarde ...",
    });

    const filter = ref("");
    const selected = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
    });
    const navigationActive = ref(false);
    const tableRef = ref(null);

    const columns: IColumn[] = [
      {
        name: "reference",
        align: "left",
        label: "Referencia",
        sortable: true,
        field: (row) => row.reference,
        format: (val) => val,
      },
      {
        name: "name",
        label: "Nome",
        align: "left",
        sortable: true,
        field: (row) => row.name,
        format: (val) => val,
      },
      {
        name: "category",
        label: "Categoria",
        align: "left",
        sortable: true,
        field: (row) => row.category,
        format: (val) => store.state.category.categories.find((categorie) => categorie.id === val)?.name,
      },
      {
        name: "unity",
        label: "Un.",
        align: "center",
        sortable: true,
        field: (row) => row.unity,
        format: (val) => store.state.unity.unities.find((unity) => unity.id === val)?.name,
      },
      {
        name: "purchase",
        label: "Compra",
        align: "center",
        field: (row) => Number(row.purchase).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        format: (val) => val,	
      },
      {
        name: "sale",
        label: "Venda",
        align: "center",
        sortable: true,
        field: (row) => Number(row.sale).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        format: (val) => val
      },
      {
        name: "inventory",
        label: "Estoque",
        align: "center",
        field: (row) => row.inventory,
        format: (val) => val,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
      {
        name: "minInventory",
        label: "Est. Min.",
        align: "center",
        field: (row) => row.minInventory,
        format: (val) => val,
      },
      {
        name: "createdAt",
        label: "Data de cadastro",
        align: "left",
        field: (row) => row.createdAt,
        format: (val) => moment(val).format("DD/MM/YYYY - HH:mm:ss"),
      },
    ];

    const rows = computed((): IProduct[] => store.state.product.products);

    const activateNavigation = (): void => {
      navigationActive.value = true;
    };

    const deactivateNavigation = (): void => {
      navigationActive.value = false;
    };

    const onKey = (evt) => {
      if (
        navigationActive.value !== true ||
        [33, 34, 35, 36, 38, 40].indexOf(evt.keyCode) === -1 ||
        tableRef.value === null
      ) {
        return;
      }

      evt.preventDefault();

      const { computedRowsNumber, computedRows } = tableRef.value;

      if (computedRows.length === 0) {
        return;
      }

      const currentIndex =
        selected.value.length > 0
          ? computedRows.indexOf(selected.value[0])
          : -1;
      const currentPage = pagination.value.page;
      const rowsPerPage =
        pagination.value.rowsPerPage === 0
          ? computedRowsNumber
          : pagination.value.rowsPerPage;
      const lastIndex = computedRows.length - 1;
      const lastPage = Math.ceil(computedRowsNumber / rowsPerPage);

      let index = currentIndex;
      let page = currentPage;

      switch (evt.keyCode) {
        case 36: // Home
          page = 1;
          index = 0;
          break;
        case 35: // End
          page = lastPage;
          index = rowsPerPage - 1;
          break;
        case 33: // PageUp
          page = currentPage <= 1 ? lastPage : currentPage - 1;
          if (index < 0) {
            index = 0;
          }
          break;
        case 34: // PageDown
          page = currentPage >= lastPage ? 1 : currentPage + 1;
          if (index < 0) {
            index = rowsPerPage - 1;
          }
          break;
        case 38: // ArrowUp
          if (currentIndex <= 0) {
            page = currentPage <= 1 ? lastPage : currentPage - 1;
            index = rowsPerPage - 1;
          } else {
            index = currentIndex - 1;
          }
          break;
        case 40: // ArrowDown
          if (currentIndex >= lastIndex) {
            page = currentPage >= lastPage ? 1 : currentPage + 1;
            index = 0;
          } else {
            index = currentIndex + 1;
          }
          break;
      }

      if (page !== pagination.value.page) {
        pagination.value.page = page;

        nextTick(() => {
          const { computedRows } = tableRef.value;
          selected.value = [
            computedRows[Math.min(index, computedRows.length - 1)],
          ];
        });
      } else {
        selected.value = [computedRows[index]];
      }
    };

    const handleClickNewProduct = () => {
      router.push("/products/new");
    };

    const handleRowClick = (event, row, index) => {
      router.push(`/products/${row.id}`);
    }

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

    store
      .dispatch(GET_PRODUCTS)
      .catch(({ message }) => {
        errorMessage(`Não foi possível carregar os produtos!<br>${message}`);
      })
      .finally(() => {
        $q.loading.hide();
      });

    return {
      columns,
      rows,
      filter,
      selected,
      pagination,
      activateNavigation,
      deactivateNavigation,
      tableRef,
      onKey,
      handleClickNewProduct,
      handleRowClick
    };
  },
});
</script>

<style></style>
