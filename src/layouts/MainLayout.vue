<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar class="bg-dark text-white">
        <span class="text-weight-bold cursor-pointer" @click="onLogoClick">Fisium</span>
        <q-space />
        <nav-bar-not-logged v-if="!userStore.isLoggedIn()"></nav-bar-not-logged>
        <nav-bar-logout v-else></nav-bar-logout>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import NavBarNotLogged from 'src/components/NavBarNotLogged.vue';
import NavBarLogout from 'src/components/NavBarLogout.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/UserStore';

const router = useRouter();
const userStore = useUserStore();

function onLogoClick() {
  router.push({ name: 'home' }).then(() => { }).catch(() => { });
}

</script>



