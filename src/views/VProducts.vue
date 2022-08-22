<template>
  <q-page padding>
    <q-table
      ref="tableProducts"
      tabindex="0"
      title="Produtos"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
      selection="single"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :filter="filter"
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
        <q-btn color="secondary" icon-right="archive" label="Novo Produto" />
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent, nextTick, ref } from "vue";
import { IColumn } from "../interfaces/icolumn";
import { IRow } from "../interfaces/irow";

export default defineComponent({
  name: "VHome",

  setup() {
    const filter = ref("");
    const selected = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
    });
    const navigationActive = ref(false);
    const tableRef = ref(null);

    const columns: Array<IColumn> = [
      {
        name: "id",
        label: "ID",
        align: "left",
        sortable: true,
        field: (row) => row.id,
        format: (val) => val,
      },
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
        format: (val) => val,
      },
      {
        name: "unity",
        label: "Un.",
        align: "center",
        sortable: true,
        field: (row) => row.unity,
        format: (val) => val,
      },
      {
        name: "purchase",
        label: "Compra",
        align: "center",
        field: (row) => row.purchase,
        format: (val) => val,
      },
      {
        name: "sale",
        label: "Venda",
        align: "center",
        sortable: true,
        field: (row) => row.sale,
        format: (val) => val,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
      {
        name: "profit",
        label: "Lucro",
        align: "center",
        sortable: true,
        field: (row) => row.profit,
        format: (val) => `${val}%`,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
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

    const rows: Array<IRow> = [
      {
        id: 1,
        reference: "1232233",
        name: "Lorem Ipsum",
        category: "Lorem Ipsum",
        unity: "UN",
        purchase: 6,
        sale: 4,
        profit: 65,
        inventory: 12,
        minInventory: 5,
        createdAt: "2020-01-01T02:42:27.000Z",
      },
    ];

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
    };
  },
});
</script>

<style></style>
