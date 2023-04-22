<script setup lang="ts">
import type { Application, JobStatus } from './components/type';
import ApplicationCard from "./components/Application-card.vue";
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { config } from "./composables/config";
import Config from './components/Config.vue';
import { applications } from './composables/applications';
import SankeyChart from './components/SankeyChart.vue';

const computedFilterByStatus = (status:JobStatus) =>  computed(()=> applications.value.filter(a=>a.status==status));
const needToApplyApplications = computedFilterByStatus("need to apply");
const haveAppliedApplications = computedFilterByStatus("have apply");
const followApplications = computedFilterByStatus("follow");
const interviewApplications = computedFilterByStatus("interview");
const offerApplications = computedFilterByStatus("offer");
const rejectedApplications = computedFilterByStatus("rejected");
const acceptedApplications = computedFilterByStatus("accepted");

const getApp = (a:Application) => applications.value.findIndex(b=>b.uuid==a.uuid);

function addJobINeedToApply() {
  applications.value.push({
    uuid: uuidv4(),
    business: "Yet another company",
    jobTitle: "An awesome job title",
    status: "need to apply",
    response: "not Yet",
    detailsOpen: true,
    interviews: []
  })
}

function addJobIHaveApplied() {
  applications.value.push({
    uuid: uuidv4(),
    business: "Yet another company",
    jobTitle: "An awesome job title",
    status: "have apply",
    applyDate: Date.now(),
    response: "not Yet",
    detailsOpen: true,
    interviews: []
  })
}

function addJobIReceivedFollowUp() {
  applications.value.push({
    uuid: uuidv4(),
    business: "Yet another company",
    jobTitle: "An awesome job title",
    status: "follow",
    applyDate: Date.now(),
    response: "follow",
    detailsOpen: true,
    interviews: []
  })
}
function addJobIScheduledInterviewWith() {
  applications.value.push({
    uuid: uuidv4(),
    business: "Yet another company",
    jobTitle: "An awesome job title",
    status: "interview",
    applyDate: Date.now(),
    response: "follow",
    detailsOpen: true,
    interviews: [{
      response: "not Yet"
    }]
  })
}

function addJobIWasRejectedFor() {
  applications.value.push({
    uuid: uuidv4(),
    business: "Yet another company",
    jobTitle: "An awesome job title",
    status: "rejected",
    applyDate: Date.now(),
    response: "automated reject",
    detailsOpen: true,
    interviews: [{
      response: "not Yet"
    }]
  })
}

function deleteJobApplication(a:Application) {
  
  return () => {
    if (!config.value.comfirmToDeleteApplication || window.confirm(`Do you really want to delete this job ${a.business} | ${a.jobTitle} ?`))
      applications.value.splice(applications.value.findIndex(b=>b.uuid==a.uuid), 1);
  }
}

function closeAllDetails() {
  applications.value.forEach((a,i)=>applications.value[i].detailsOpen = false);
}

</script>

<template>
  <main>
    <h1>Application tracker</h1>
    <config/>
    <button close-details @click="closeAllDetails">Close all details</button>
    <section tracker-columns >
      <div need-to-apply>
        <h2>Jobs I need to apply</h2>
        <button add-button @click="addJobINeedToApply">+</button>
        <ApplicationCard v-for="a in needToApplyApplications" v-model="applications[getApp(a)]" :delete-itself="deleteJobApplication(a)"/>
      </div>
      <div have-applied>
        <h2>Jobs I applied for</h2>
        <button add-button @click="addJobIHaveApplied">+</button>
        <ApplicationCard v-for="a in haveAppliedApplications" v-model="applications[getApp(a)]" :delete-itself="deleteJobApplication(a)"/>
      </div>
      <div follow>
        <h2>Jobs I received a follow up</h2>
        <button add-button @click="addJobIReceivedFollowUp">+</button>
        <ApplicationCard v-for="a in followApplications" v-model="applications[getApp(a)]" :delete-itself="deleteJobApplication(a)"/>
      </div>
      <div interview>
        <h2>Jobs I scheduled interview with</h2>
        <button add-button @click="addJobIScheduledInterviewWith">+</button>
        <ApplicationCard v-for="a in interviewApplications" v-model="applications[getApp(a)]" :delete-itself="deleteJobApplication(a)"/>
      </div>
      <div rejected>
        <h2>Jobs I was rejected for</h2>
        <button add-button @click="addJobIWasRejectedFor">+</button>
        <ApplicationCard v-for="a in rejectedApplications" v-model="applications[getApp(a)]" :delete-itself="deleteJobApplication(a)"/>
      </div>
      <!-- <div have-offer>

      </div> -->
    </section>
    <section tracker-columns >
      <div offer>
        <h2>Jobs I received offer for</h2>
        <ApplicationCard v-for="a in offerApplications" v-model="applications[getApp(a)]" :delete-itself="deleteJobApplication(a)"/>
      </div>
      <div accepted>
        <h2>Jobs I accepted</h2>
        <ApplicationCard v-for="a in acceptedApplications" v-model="applications[getApp(a)]" :delete-itself="deleteJobApplication(a)"/>
      </div>
    </section>
    <SankeyChart/>
  </main>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
  background: #222;
  color: #ccc;
  font-family: monospace;
}
main {
  padding: 3px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}


[need-to-apply] {
  --column-background: #0A4D68;
  --column-color: #ddd;
}
[have-applied] {
  --column-background: #05BFDB;
  --column-color: #000;
}
[follow] {
  --column-background: #03C988;
  --column-color: #000;
}
[interview] {
  --column-background: #A31ACB;
  --column-color: #000;
}
[rejected] {
  --column-background: #F55050;
  --column-color: #ddd;
}
[offer] {
  --column-background: #735F32;
  --column-color: #ddd;
}
[accepted] {
  --column-background: #C69749;
  --column-color: #ddd;
}

[tracker-columns] {
  // border: solid 3px #fff5;
  border-radius: 15px;
  // padding: 3px;
  gap: 3px;
  display: flex;
  overflow-x: auto;
  min-width: 100%;
  min-height: max(90vh, 40ch);
  > div {
    border: solid 1px #fff5;
    border-radius: 15px;
    // padding: 3px;
    overflow: hidden;
    flex: 1 0 40ch;
    min-height: 100%;
    h2 {
      margin: 0;
      padding: 1em 0;
      text-align: center;
      background: var(--column-background);
      color: var(--column-color);
      // background: #0f05;
    }
  }
}
[close-details] {
  align-self: flex-start;
  padding: 10px 15px;
  border-radius: 10px;
  background: #fff2;
  border: 0;
  color: #ddd;
  cursor: pointer;
}
[add-button] {
  width: 100%;
  background: var(--column-background);
  color: var(--column-color);
  filter: brightness(0.9);
  font-size: 1.5em;
  font-weight: 1000;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
}
</style>
