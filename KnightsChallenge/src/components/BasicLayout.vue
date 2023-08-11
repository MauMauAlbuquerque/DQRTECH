<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import logo from '@/assets/small-logo.jpg'
  import pt_BR from 'ant-design-vue/es/locale/pt_BR.js'


  const router = useRouter()
  const selectedKeys1 = ref(['1'])

  const handleMenu = (item: any) => {
    item.key === undefined ? router.push({ name: 'Instructions' }) : router.push({ name: item.key })
  }
</script>
<template>
  <a-config-provider :locale="pt_BR">
    <a-layout class="layout-full-content">
      <a-layout-header class="header">
        <a-row>
          <a-col :span="1">
            <div class="logo">
              <a-image :width="40" :height="50" :preview="false" :src="logo" @click="handleMenu"/>
            </div>
          </a-col>
          <a-col :span="19">
            <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="selectedKeys1" :style="{ lineHeight: '64px' }"
              @click="handleMenu">
              <a-menu-item key="Instructions">Instruções</a-menu-item>
              <a-menu-item key="KnightsCenter">Knights Center</a-menu-item>
            </a-menu>
          </a-col>
          <a-col :span="4">
            <a-row justify="end">
              <UserLayout />
            </a-row>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ padding: '24px', minHeight: '280px' }"><router-view /></div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Knights Challenge
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>
<style>
  .site-layout-background {
    background: #fff;
  }

  .logo {
    margin-left: -29px;
    margin-right: 12px;
  }

  .ant-pro-drop-down .action {
    margin-right: 8px;
  }

  .ant-dropdown-menu-item {
    min-width: 160px;
    font-family: 'Roboto';
    font-size: 20px;
  }

  .ant-menu-title-content {
    font-family: 'Roboto';
    font-size: 15px;
  }

</style>