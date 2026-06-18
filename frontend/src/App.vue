<script setup>
import { ref } from 'vue'
const drawer = ref(true)
</script>

<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" permanent>
            <v-list-item
                title="La Perlita"
                subtitle="Panel de gestión"
                prepend-icon="mdi-silverware-fork-knife"
                class="py-4"
            ></v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item
                    prepend-icon="mdi-food"
                    title="Productos"
                    value="productos"
                    to="/productos"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-package-variant"
                    title="Stock"
                    value="stock"
                    to="/stock"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-clipboard-list"
                    title="Pedidos"
                    value="pedidos"
                    to="/pedidos"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-chart-bar"
                    title="Balance del día"
                    value="balance"
                    to="/balance"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar elevation="1">
            <v-app-bar-title>La Perlita App</v-app-bar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid class="pa-6">
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped></style>
