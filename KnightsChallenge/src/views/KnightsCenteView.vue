<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import moment from 'moment'
import { ArrowUpOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue'

import { getKnights, editNickname, deleteKnight, register } from '@/api/knights'
const listHeroes = ref(false)
const registerLoading = ref(false)
const pageloading = ref(false)
const openModalRegister = ref(false)
const openModalEditKnight = ref(false)
const openModalInfoKnight = ref(false)
const editedKnight = ref({ id: '', nickName: '' })
const infoKnight = ref()
let data = ref([])
const formState = reactive({
  name: '',
  nickname: '',
  birthday: '',
  weapons: [],
  mainWeapon: '',
  keyAttribute: ''
})

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const columns = [
  {
    name: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    name: 'aa',
    dataIndex: 'nickname',
    key: 'nickname',
  }, {
    title: 'Idade',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Armas',
    dataIndex: 'weapons',
    key: 'weapons',
  }, {
    title: 'Atributo',
    key: 'keyAttribute',
    dataIndex: 'keyAttribute',
  },
  {
    title: 'Ataque',
    key: 'attack',
    dataIndex: 'attack',
  },
  {
    title: 'Exp',
    key: 'exp',
    dataIndex: 'exp',
  },
  {
    title: 'Ações',
    key: 'action',
  }];

const options = [
  { value: 'Espada' },
  { value: 'Gládio' },
  { value: 'Arco' },
  { value: 'Lança' },
  { value: 'Alabarda' }
];

const atributes = [
  "força",
  "destreza",
  "constituição",
  "inteligência",
  "sabedoria",
  "carisma"
]

const handleCancel = () => {
  registerLoading.value = false
  openModalRegister.value = false
  editedKnight.value.nickName = ''
  editedKnight.value.id = ''
  openModalEditKnight.value = false
}

const delKnight = (id: string) => {
  pageloading.value = true
  deleteKnight(id).then(() => {
    pageloading.value = false
    fillTable()
    notification.success({
      message: 'Atenção',
      description:
        'Alteração realizada com sucesso',
    })
  }).catch(() => {
    pageloading.value = false
    notification.error({
      message: 'Atenção',
      description:
        'Não foi possível realizar a operação',
    })
  })
}

const handleRegister = async () => {
  registerLoading.value = true
  if(!validateFiels()){
    notification.error({
      message: 'Atenção',
      description:
        'Dados Incorreto',
    })
    registerLoading.value = false
  }else {
  let data: any = {
    name: formState.name,
    nickname: formState.nickname,
    weapons: [],
    keyAttribute: formState.keyAttribute,
    birthday: formState.birthday.format('YYYY-MM-DD')
  }

  for (let index = 0; index < formState.weapons.length; index++) {
    const item = formState.weapons[index];
    let itemMap: any = {
      name: item,
      mod: Math.random(),
      attr: "strength",
      equipped: true,
    }
    if (item === formState.mainWeapon) {
      itemMap.equipped = true
      data.weapons.push(itemMap)
    } else {
      itemMap.equipped = false
      data.weapons.push(itemMap)
    }
  }
  pageloading.value = true
  register(data).then(() => {
    pageloading.value = false
    openModalRegister.value = false
    registerLoading.value = false
    fillTable()
    clearForm()
    notification.success({
      message: 'Atenção',
      description:
        'Alteração realizada com sucesso',
    })
  }).catch(() => {
    pageloading.value = false
    registerLoading.value = false
    notification.error({
      message: 'Atenção',
      description:
        'Não foi possível realizar a operação',
    })
  })
}
}
const clearForm = () => {
  formState.name = ''
  formState.nickname = ''
  formState.birthday = ''
  formState.weapons = []
  formState.mainWeapon = ''
  formState.keyAttribute = ''
}
const handleEditKnight = () => {
  pageloading.value = true
  registerLoading.value = true
  openModalEditKnight.value = false
  console.log(editedKnight.value)
  if (editedKnight.value.nickName.trim() !== '' && editedKnight.value.nickName.trim() !== undefined) {
    editNickname(editedKnight.value.nickName, editedKnight.value.id).then(() => {
      registerLoading.value = false
      pageloading.value = false
      editedKnight.value.nickName = ''
      editedKnight.value.id = ''
      fillTable()
      notification.success({
        message: 'Atenção',
        description:
          'Alteração realizada com sucesso',
      })
    }).catch(() => {
      pageloading.value = false
      openModalEditKnight.value = true
      registerLoading.value = false
      notification.error({
        message: 'Atenção',
        description:
          'Não foi possível realizar a operação',
      })
    })
  } else {
    registerLoading.value = false
    pageloading.value = false
    notification.error({
      message: 'Atenção',
      description:
        'Preencha o nome de forma correta!',
    })
  }
}

const modalEditKnight = (nickname: string, key: string) => {
  console.log(nickname)
  openModalEditKnight.value = true
  editedKnight.value.nickName = nickname
  editedKnight.value.id = key
}

const modalInfoKnight = (key: string) => {
  openModalInfoKnight.value = true
  infoKnight.value = data.value.filter((item: any) => item.key === key)[0]
}

const heroes = () => {
  getKnights(listHeroes.value ? '?filter=heroes' : undefined).then((result: any) => {
    data.value = result.data
  }).catch(() => {
    notification.error({
      message: 'Atenção',
      description:
        'Não foi possível realizar a operação',
    })
  })
}

const fillTable = () => {
  getKnights(undefined).then((result: any) => {
    data.value = result.data
  }).catch(() => {
    notification.error({
      message: 'Atenção',
      description:
        'Não foi possível realizar a operação',
    })
  })
}

const validateFiels = () => {
 if( formState.name == '' || formState.name  === undefined ||
  formState.nickname == '' || formState.nickname  === undefined ||
  formState.birthday == '' || formState.birthday  === undefined ||
  formState.weapons.length === 0 || formState.weapons  === undefined ||
  formState.mainWeapon == '' || formState.mainWeapon  === undefined||
  formState.keyAttribute == '' || formState.keyAttribute  === undefined) {
    return false
  } else return true
}
onMounted(() => {
  fillTable()
})
</script>

<template>
  <a-spin :spinning="pageloading">
    <a-card title="Knights Cadastro de Heróis">
      <a-space align="center" style="margin-bottom: 16px">
        Listar Guerreiros que se tornaram heróis:
        <a-switch v-model:checked="listHeroes" @change="heroes"></a-switch>
      </a-space>
      <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
              Name
            </span>
          </template>
          <template v-if="column.key === 'nickname'">
            <span>
              Apelido
            </span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-if="column.key === 'weapons'">
            {{ record.weapons.length }}
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="modalEditKnight(record.nickname, record.key)">Atualizar</a>
              <a-divider type="vertical" />
              <a @click="modalInfoKnight(record.key)">Informações</a>
              <a-divider type="vertical" />
              <a-popconfirm title="Você tem certeza que deseja Deletar o Guerreiro" ok-text="Deletar"
                cancel-text="Cancelar" @confirm="delKnight(record.key)">
                <a href="#">Delete</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
      <a-button @click="() => { openModalRegister = true }">Adicionar knight</a-button>
      <a-modal v-model:open="openModalRegister" title="Cadastro de knight">
        <template #footer>
          <a-button key="Cancelar" @click="handleCancel">Return</a-button>
          <a-button key="Cadastrar" type="primary" :loading="registerLoading" @click="handleRegister">Cadastrar</a-button>
        </template>
        <div style="margin-top: 10%;">
          <a-form :model="formState" v-bind="layout" name="nest-messages">
            <a-form-item :name="formState.name" label="Nome">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item :name="formState.nickname" label="Apelido">
              <a-input v-model:value="formState.nickname" style="width: 100%;" />
            </a-form-item>
            <a-form-item :name="formState.birthday" label="Data de Nascimento">
              <a-date-picker v-model:value="formState.birthday" format="DD/MM/YYYY" style="width: 100%;" />
            </a-form-item>
            <a-form-item :name="formState.weapons" label="Armas">
              <a-select v-model:value="formState.weapons" mode="tags" style="width: 100%" placeholder="Armas"
                :options="options"></a-select>
            </a-form-item>
            <a-form-item :name="formState.mainWeapon" label="Arma Principal">
              <a-select ref="select" v-model:value="formState.mainWeapon" style="width: 100%;">
                <a-select-option v-for="weapon in options" :key="weapon" :value="weapon.value">{{ weapon.value
                }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :name="formState.mainWeapon" label="Atributo Principal">
              <a-select ref="select" v-model:value="formState.keyAttribute" style="width: 100%;">
                <a-select-option v-for="atribute in atributes" :key="atribute" :value="atribute">{{ atribute
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
      <a-modal v-model:open="openModalEditKnight" title=" Editar Guerreiro">
        <template #footer>
          <a-button key="back" @click="handleCancel">Cancelar</a-button>
          <a-button key="submit" type="primary" :loading="registerLoading" @click="handleEditKnight">Atualizar</a-button>
        </template>
        <a-form-item :name="editedKnight" label="Apelido">
          <a-input v-model:value="editedKnight.nickName" style="width: 100%;" />
        </a-form-item>
      </a-modal>
      <a-modal v-model:open="openModalInfoKnight" title="Informações do Guerreiro" style="width: 100%;">
        <a-descriptions bordered>
          <a-descriptions-item label="Nome">{{ infoKnight.name }}</a-descriptions-item>
          <a-descriptions-item label="Apelido">{{ infoKnight.nickname }}</a-descriptions-item>
          <a-descriptions-item label="Data de Nascimento">{{ moment(infoKnight.birthday).format('DD/MM/YYYY') }}</a-descriptions-item>
          <a-descriptions-item label="Idade">{{ infoKnight.age }}</a-descriptions-item>
          <a-descriptions-item label="Exp" :span="2">
            <a-statistic :value="infoKnight.exp" suffix="XP" :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px">
              <template #prefix>
                <ArrowUpOutlined />
              </template>
            </a-statistic>
          </a-descriptions-item>
          <a-descriptions-item label="Hero" :span="3">
            <a-badge status="processing" text="Progresso" />
            <a-progress :percent="50" size="small" />
          </a-descriptions-item>
          <a-descriptions-item label="Atributo">{{ infoKnight.keyAttribute }}</a-descriptions-item>
          <a-descriptions-item label="Ataque">{{ infoKnight.attack }}</a-descriptions-item>
          <a-descriptions-item label="Arma Principal">{{ infoKnight.weapons.find((item: any) => item.equipped).name
          }}</a-descriptions-item>
          <a-descriptions-item label="Armas">
            <span v-for="weapon in infoKnight.weapons" :key="weapon.name">
              {{ weapon.name }}
              <br />
            </span>
          </a-descriptions-item>
        </a-descriptions>
      </a-modal>
    </a-card>
  </a-spin>
</template>
