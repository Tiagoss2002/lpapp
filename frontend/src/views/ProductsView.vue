<template>
    <v-container fluid>

        <!-- Header -->
        <v-row class="mb-4" align="center">
            <v-col>
                <h2 class="text-h5 font-weight-bold">Productos</h2>
                <span class="text-medium-emphasis">Gestión del menú</span>
            </v-col>
            <v-col cols="auto">
                <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
                    Nuevo producto
                </v-btn>
            </v-col>
        </v-row>

        <!-- Filtros -->
        <v-row class="mb-4">
            <v-col cols="12" md="5">
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Buscar producto..."
                    variant="outlined"
                    density="compact"
                    hide-details
                    clearable
                ></v-text-field>
            </v-col>
        </v-row>

        <!-- Tabla -->
        <v-card elevation="1" rounded="lg">
            <v-data-table
                :headers="headers"
                :items="filteredProducts"
                :search="search"
                :items-per-page="10"
                class="elevation-0"
                :loading="loading"
                loading-text="Cargando productos..."
                no-data-text="No hay productos cargados"
            >
                <!-- Precio -->
                <template #item.price="{ item }">
                    <span class="font-weight-medium">${{ formatPrice(item.price) }}</span>
                </template>

                <!-- Estado -->
                <template #item.active="{ item }">
                    <v-chip
                        :color="item.active ? 'success' : 'error'"
                        size="small"
                        variant="tonal"
                    >
                        {{ item.active ? 'Activo' : 'Inactivo' }}
                    </v-chip>
                </template>

                <!-- Acciones -->
                <template #item.actions="{ item }">
                    <v-menu>
                        <template #activator="{ props }">
                            <v-btn
                                v-bind="props"
                                icon="mdi-dots-vertical"
                                variant="text"
                                size="small"
                            ></v-btn>
                        </template>
                        <v-list density="compact">
                            <v-list-item
                                prepend-icon="mdi-pencil"
                                title="Editar"
                                @click="openEditDialog(item)"
                            ></v-list-item>
                            <v-list-item
                                prepend-icon="mdi-package-variant-plus"
                                title="Agregar stock"
                                @click="openStockDialog(item)"
                            ></v-list-item>
                            <v-divider></v-divider>
                            <v-list-item
                                prepend-icon="mdi-delete"
                                title="Eliminar"
                                class="text-error"
                                @click="confirmDelete(item)"
                            ></v-list-item>
                        </v-list>
                    </v-menu>
                </template>

            </v-data-table>
        </v-card>

		<!-- Dialog Agregar Stock -->
		<v-dialog v-model="stockDialog" max-width="400">
			<v-card rounded="lg">
				<v-card-title class="text-h6 font-weight-bold pa-6 pb-2">
					Agregar stock
				</v-card-title>
				<v-card-subtitle class="px-6 pb-4">
					{{ selectedProduct?.name }}
				</v-card-subtitle>

				<v-card-text class="px-6">
					<v-text-field
						v-model.number="stockQuantity"
						label="Cantidad a agregar"
						type="number"
						variant="outlined"
						:min="1"
						prepend-inner-icon="mdi-package-variant-plus"
						hide-details="auto"
						:rules="[v => v > 0 || 'Ingresá una cantidad válida']"
						autofocus
					></v-text-field>
				</v-card-text>

				<v-card-actions class="px-6 pb-6 pt-2">
					<v-spacer></v-spacer>
					<v-btn variant="text" @click="closeStockDialog">Cancelar</v-btn>
					<v-btn
						color="primary"
						variant="flat"
						:loading="stockLoading"
						:disabled="!stockQuantity || stockQuantity < 1"
						@click="submitStock"
					>
						Confirmar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

    </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'
const router = useRouter()

const products = ref([])
const loading = ref(false)
const search = ref('')
const filterActive = ref('Todos')

// --- Stock ---
const stockDialog = ref(false)
const selectedProduct = ref(null)
const stockQuantity = ref(null)
const stockLoading = ref(false)

const openStockDialog = (item) => {
    selectedProduct.value = item
    stockQuantity.value = null
    stockDialog.value = true
}

const closeStockDialog = () => {
    stockDialog.value = false
    selectedProduct.value = null
    stockQuantity.value = null
}

const submitStock = async () => {
    if (!stockQuantity.value || stockQuantity.value < 1) return
    stockLoading.value = true
    try {
        await api.post('/stock/add', {
            product_id: selectedProduct.value.id,
            quantity: stockQuantity.value,
        })
        closeStockDialog()
        // Opcional: mostrar snackbar de éxito
    } catch (e) {
        console.error('Error al agregar stock', e)
    } finally {
        stockLoading.value = false
    }
}

const headers = [
    { title: 'Nombre', key: 'name', sortable: true },
    { title: 'Descripción', key: 'description', sortable: false },
    { title: 'Precio', key: 'price', sortable: true },
    { title: 'Estado', key: 'active', sortable: false },
    { title: 'Acciones', key: 'actions', sortable: false, align: 'center' },
]

const filteredProducts = computed(() => {
    if (filterActive.value === 'Activos') return products.value.filter(p => p.active)
    if (filterActive.value === 'Inactivos') return products.value.filter(p => !p.active)
    return products.value
})

const formatPrice = (price) => {
    return Number(price).toLocaleString('es-AR')
}

const fetchProducts = async () => {
    loading.value = true
    try {
        const { data } = await api.get('/products')
        products.value = data
    } catch (e) {
        console.error('Error al cargar productos', e)
    } finally {
        loading.value = false
    }
}

const openCreateDialog = () => {
    router.push('/productos/crear')
}

const openEditDialog = (item) => {
    router.push(`/productos/${item.id}/editar`)
}

const confirmDelete = (item) => {}

onMounted(fetchProducts)
</script>