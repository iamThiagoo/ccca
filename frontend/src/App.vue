<template>
  <h1>Preencha o Formulário</h1>

  <form @submit.prevent="onSubmit" style="display: flex; flex-direction: column; gap: 10px;">
    <div style="display: flex; flex-direction: column;margin: 10px 0; gap: 5px;">
      <label for="name">Nome</label>
      <input class="input-name" type="text" v-model="data.name" style="padding: 8px; text-align: center;" />
    </div>

    <div style="display: flex; flex-direction: column;margin: 10px 0; gap: 5px;">
      <label for="email">Email</label>
      <input class="input-email" type="text" v-model="data.email" style="padding: 8px; text-align: center;" />
    </div>

    <div style="display: flex; flex-direction: column;margin: 10px 0; gap: 5px;">
      <label for="cpf">CPF</label>
      <input class="input-cpf" type="text" v-model="data.cpf" style="padding: 8px; text-align: center;" />
    </div>

    <div style="display: flex; flex-direction: column;margin: 10px 0; gap: 5px;">
      <label for="password">Senha</label>
      <input class="input-password" type="text" v-model="data.password" style="padding: 8px; text-align: center;" />
    </div>

    <div>
      <input class="input-passenger" type="checkbox" v-model="data.isPassenger" />
      <label for="isPassenger">É passageiro</label>
    </div>

    <button class="button-submit" type="submit">Salvar</button>
    <button type="button" @click="fill">Preencher dados</button>
    <p v-if="accountId">ID da conta: {{ accountId }}</p>

    <p class="p-status" v-if="status">Status: {{ status }}</p>
    <p class="p-message" v-if="message">Erro: {{ message }}</p>
  </form>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue';

const accountId = ref<string>('');
const message = ref<string>('');
const status = ref<string>('');

const data = reactive({
  name: '',
  email: '',
  cpf: '',
  password: '',
  isPassenger: false,
})

const fill = () => {
  data.name = 'John Doe';
  data.email = `john.doe${Math.random()}@example.com`;
  data.cpf = '974.563.215-58';
  data.password = '123456';
  data.isPassenger = true;
}

const onSubmit = async () => {
  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const output = await response.json();

  if (output.accountId) {
    accountId.value = output.accountId;
    status.value = 'success';
  } else {
    message.value = output.message;
    status.value = 'error';
  }
}

</script>
