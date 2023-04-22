<script setup lang="ts">
import { allJobResponse, allJobStatus } from "./type";
import type { Application } from './type';
import { useVModel } from '@vueuse/core';
import { onMounted, ref, watch } from "vue";
import { config } from "../composables/config";

const props = defineProps<{
  modelValue: Application,
  deleteItself: () => void
}>();

const emit = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emit)



function autoGrow(e:Event) {
  const textarea = (e.target as HTMLTextAreaElement);
  textarea.setAttribute("style", "height:" + (textarea.scrollHeight - 8) + "px;");
}

function addInterview() {
  data.value.interviews.push({
    response: "not Yet"
  })
}

function deleteInterview(i:number) {
  if (!config.value.comfirmToDeleteInterview || window.confirm(`Do you really want to delete this interview?`))
    data.value.interviews.splice(i, 1);
}


watch(data, (v,old) => {
  // oldOffer = data.value.offer;
}, {deep: true});

const card = ref<HTMLDetailsElement>();

onMounted(()=>{
  console.log(card.value);
  card.value?.querySelectorAll("textarea").forEach(t=>t.setAttribute("style", "height:" + (t.scrollHeight - 8) + "px;"));
})

</script>
<template>
  <details application-card :open="data.detailsOpen" ref="card" :key="data.uuid">
    <summary @click.prevent="data.detailsOpen = !data.detailsOpen">
      <h3>{{ data.business }} | {{ data.jobTitle }}</h3>
    </summary>
    <ul>
      <li>
        <label>business:</label>
        <input type="text" v-model="data.business" />
      </li>
      <li>
        <label>Job title:</label>
        <input type="text" v-model="data.jobTitle" />
      </li>
      <li>
        <label>info:</label>
        <textarea @input="autoGrow" type="text" v-model="data.info">
        </textarea>
      </li>
      <li>
        <label>link:</label>
        <input type="text" v-model="data.link" />
      </li>
      <li>
        <label>email:</label>
        <input type="email" v-model="data.email" />
      </li>
      <li>
        <label>phone:</label>
        <input type="tel" v-model="data.phone" />
      </li>
      <li>
        <label>pay:</label>
        <input type="number" v-model="data.pay" />
      </li>
      <li>
        <label>hour per week:</label>
        <input type="number" v-model="data.hourPerWeek" />
      </li>
      <li>
        <label>apply date:</label>
        <input type="date" :value="data.applyDate && new Date(data.applyDate - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0]" @input="data.applyDate = new Date(($event.target as HTMLInputElement).value).getTime()"/>
      </li>
      <li>
        <label>interviews:</label>
        <ul v-for="(interview, i) in data.interviews">
          <li>
            <label>with:</label>
            <input type="text" v-model="data.interviews[i].with" />
          </li>
          <li>
            <label>email:</label>
            <input type="text" v-model="data.interviews[i].email" />
          </li>
          <li>
            <label>phone:</label>
            <input type="text" v-model="data.interviews[i].phone" />
          </li>
          <li>
            <label>scheduled at:</label>
            <!-- data.interviews[i].scheduledAt = new Date($event.target.value).getTime() -->
            <input type="datetime-local" :value="data.interviews[i].scheduledAt && new Date(data.interviews[i].scheduledAt! - (new Date().getTimezoneOffset() * 60000)).toISOString().split('Z')[0]" @input="data.interviews[i].scheduledAt = new Date(($event.target as HTMLInputElement).value).getTime()" />
          </li>
          <li>
            <label>response:</label>
            <select v-model="data.interviews[i].response">
              <option v-for="v in allJobResponse" :value="v">{{ v }}</option>
            </select>
          </li>
          <button delete-button @click="deleteInterview(i)">delete interview</button>
        </ul>
        <button add-interview @click="addInterview">add</button>
      </li>
      <li>
        <label>initial response:</label>
        <select v-model="data.response">
          <option v-for="v in allJobResponse" :value="v">{{ v }}</option>
        </select>
      </li>
      <li>
        <label>status:</label>
        <select v-model="data.status">
          <option v-for="v in allJobStatus" :value="v">{{ v }}</option>
        </select>
      </li>
    </ul>
    <button delete-button @click="deleteItself()">delete application</button>
  </details>
</template>

<style lang="scss">
[application-card] {
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px#fff5;
  // border-radius: 15px;
  background: #fff1;
  padding: 3px;
  summary {
    padding: 5px 0;
  }
  h3 {
    display: inline;
    
  }
  textarea {
    // display: inline;
    box-sizing: content-box;
    min-height: 2ch;
    width: calc(100% - 8px);
    border: solid 1px #fff2;
    background: transparent;
    overflow-y: hidden;
    color: #ddd;
    padding: 3px;
  }
  ul {
    list-style: none;
    padding: 1ch 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  li {
    display: flex;
    flex-wrap: wrap;
    :is(input, select) {
      background: #fff1;
      border: solid 1px #fff2;
      border-radius: 5px;
      color: currentColor;
      flex: 1;
    }
    option {
      color: initial;
    }
    > ul {
      width: 100%;
      padding-left: 2ch;
      border-bottom: solid 1px#fff2;
    }
  }
  [delete-button] {
    width: 100%;
    background: #F55050;
    color: #fff;
  }
  [add-interview] {
    width: 100%;
    background: #03C988;
    color: #fff;
  }
}
</style>
