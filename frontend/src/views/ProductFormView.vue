<template>
    <v-container fluid>

        <!-- Header -->
        <v-row class="mb-4" align="center">
            <v-col cols="auto">
                <v-btn
                    icon="mdi-arrow-left"
                    variant="text"
                    @click="router.push('/productos')"
                ></v-btn>
            </v-col>
            <v-col>
                <h2 class="text-h5 font-weight-bold">
                    {{ isEditing ? 'Editar producto' : 'Nuevo producto' }}
                </h2>
                <span class="text-medium-emphasis">
                    {{ isEditing ? 'Modificá los datos del producto' : 'Completá los datos del nuevo producto' }}
                </span>
            </v-col>
        </v-row>

        <!-- Formulario -->
        <v-row justify="center">
            <v-col cols="12" md="7">
                <v-card elevation="1" rounded="lg" class="pa-6">
                    <v-form ref="formRef" @submit.prevent="submitForm">
                        <v-row>

                            <v-col cols="12">
                                <v-text-field
                                    v-model="form.name"
                                    label="Nombre del producto"
                                    variant="outlined"
                                    :rules="[rules.required]"
                                    placeholder="Ej: Milanesa con papas fritas"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    v-model="form.description"
                                    label="Descripción"
                                    variant="outlined"
                                    rows="3"
                                    placeholder="Ej: Milanesa de carne con papas fritas y ensalada"
                                ></v-textarea>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="form.price"
                                    label="Precio"
                                    variant="outlined"
                                    type="number"
                                    prefix="$"
                                    :rules="[rules.required, rules.positive]"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="form.active"
                                    label="Estado"
                                    variant="outlined"
                                    :items="statusOptions"
                                    item-title="label"
                                    item-value="value"
                                ></v-select>
                            </v-col>

                        </v-row>

                        <!-- Botones -->
                        <v-row class="mt-2">
                            <v-col>
                                <v-btn
                                    variant="text"
                                    @click="router.push('/productos')"
                                >
                                    Cancelar
                                </v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn
                                    color="primary"
                                    type="submit"
                                    :loading="loading"
                                    prepend-icon="mdi-check"
                                >
                                    {{ isEditing ? 'Guardar cambios' : 'Crear producto' }}
                                </v-btn>
                            </v-col>
                        </v-row>

                    </v-form>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const loading = ref(false)

const isEditing = computed(() => !!route.params.id)

const form = ref({
    name: '',
    description: '',
    price: '',
    active: true,
})

const statusOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
]

const rules = {
    required: v => !!v || 'Este campo es obligatorio',
    positive: v => v > 0 || 'El precio debe ser mayor a 0',
}

const fetchProduct = async () => {
    try {
        const { data } = await api.get(`/products/${route.params.id}`)
        form.value = {
            name: data.name,
            description: data.description,
            price: data.price,
            active: !!data.active,
        }
    } catch (e) {
        console.error('Error al cargar producto', e)
    }
}

const submitForm = async () => {
    console.log(form.value)
    console.log('asdasd')
    const { valid } = await formRef.value.validate()
    if (!valid) return

    loading.value = true
    try {
        if (isEditing.value) {
            await api.put(`/products/${route.params.id}`, form.value)
        } else {
            await api.post('/products', form.value)
        }

        console.log('llego hast aca')
        router.push('/productos')
    } catch (e) {
        console.error('Error al guardar producto', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    if (isEditing.value) fetchProduct()
})
</script>