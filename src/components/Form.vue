<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const state = reactive({
  firstName: '', //matches state.firstName
  lastName: '', //matches state.lastName
  message: '', //matches state.message
  contact: {
    email: '', //matches state.email
  },
  queryType: '',
  consent: false,
})

const rules = {
  firstName: { required }, // Matches state.firstName
  lastName: { required }, // Matches state.lastName
  message: { required },
  contact: {
    email: { required, email }, // Matches state.contact.email
  },
  queryType: { required },
  consent: {
    required: helpers.withMessage('You must agree to be contacted.', (value) => value === true),
  },
}

const v$ = useVuelidate(rules, state)

const submit = () => {
  v$.value.$touch()
  if (v$.value.$invalid) {
    console.log('Form is invalid')
    return
  }
  console.log('Form submitted successfully', state)
}
</script>

<template>
  <div class="bg-form-green-1 w-screen h-screen flex items-center justify-center font-karla">
    <form action="submit" @submit.prevent="submit">
      <div class="min-h-96 md:w-form py-6 px-8 bg-white rounded-xl">
        <h1 class="text-3xl font-semibold mb-5">Contact Us</h1>
        <div class="flex flex-col items-center justify-between w-full">
          <div class="flex flex-col md:flex-row w-full md:gap-3 mb-5">
            <div class="flex flex-col md:w-1/2 mb-5 md:mb-0">
              <label for="firstName" class="mb-1"
                >First Name <span class="text-form-green-2">*</span></label
              >
              <input
                type="text"
                id="firstName"
                name="firstName"
                v-model="state.firstName"
                class="rounded-md border border-form-green-2 p-2 w-full"
              />
              <span class="text-red-500" v-for="error of v$.firstName.$errors" :key="error.$uid">{{
                error.$message
              }}</span>
            </div>
            <div class="flex flex-col md:w-1/2">
              <label for="lastName" class="mb-1"
                >Last Name <span class="text-form-green-2">*</span></label
              >
              <input
                type="text"
                id="lastName"
                name="lastName"
                v-model="state.lastName"
                class="rounded-md border border-form-green-2 p-2"
              />
              <span class="text-red-500" v-for="error of v$.lastName.$errors" :key="error.$uid">{{
                error.$message
              }}</span>
            </div>
          </div>
          <div class="flex flex-col w-full mb-5">
            <label for="email" class="mb-1"
              >Email Address <span class="text-form-green-2">*</span></label
            >
            <input
              type="email"
              id="email"
              name="email"
              v-model="state.contact.email"
              class="rounded-md border border-form-green-2 p-2"
            />
            <span
              class="text-red-500"
              v-for="error of v$.contact.email.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
          <div class="flex flex-col w-full mb-5">
            <label for="queryType" class="mb-3"
              >Query Type <span class="text-form-green-2"> *</span></label
            >
            <div class="flex flex-col md:flex-row w-full md:gap-3 gap-6">
              <label
                for="general-enquiry"
                class="flex items-center gap-3 md:w-1/2 border border-form-green-2 rounded-lg md:px-4 md:py-2 p-3"
                ><input
                  type="radio"
                  id="general-enquiry"
                  name="queryType"
                  v-model="state.queryType"
                  value="general"
                  class=""
                />
                General Enquiry</label
              >
              <label
                for="support-request"
                class="flex items-center gap-3 md:w-1/2 border border-form-green-2 rounded-lg md:px-4 md:py-2 p-3"
                ><input
                  type="radio"
                  class=""
                  id="support-request"
                  name="queryType"
                  v-model="state.queryType"
                  value="support"
                />
                Support Request</label
              >
            </div>
            <span class="text-red-500" v-for="error of v$.queryType.$errors" :key="error.$uid">{{
              error.$message
            }}</span>
          </div>
          <div class="flex flex-col w-full gap-2">
            <label for="message">Message <span class="text-form-green-2">*</span></label>
            <textarea
              name="message"
              id="message"
              class="border border-form-green-2 rounded-lg h-24 p-3 resize-none"
              v-model="state.message"
            ></textarea>
            <span class="text-red-500" v-for="error of v$.message.$errors" :key="error.$uid">{{
              error.$message
            }}</span>
          </div>
          <p class="w-full my-8 flex gap-3 items-center">
            <input type="checkbox" name="consent" id="consent" v-model="state.consent" />I consent
            to being contacted by the team<span class="text-form-green-2">*</span>
          </p>
          <span class="text-red-500" v-for="error of v$.consent.$errors" :key="error.$uid">{{
            error.$message
          }}</span>
          <button
            type="submit"
            @click="submit"
            class="w-full font-medium text-white bg-form-green-2 rounded-md p-3 mb-3 hover:bg-opacity-90"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
label {
  color: #4b5563;
}

input:focus,
textarea:focus {
  outline: #0c7d68;
}
</style>
