<script setup lang="ts">
import { Chart } from 'chart.js';
import { onMounted, ref, watch } from 'vue';
import { applications } from '../composables/applications';
import { config } from '../composables/config';

const canvas = ref<HTMLCanvasElement>();
let previousChart:Chart;

function drawCanvas() {
  const a = applications.value;
  if(previousChart != null) {
    previousChart.destroy();

  }

  const applicationsFirstProcess = [
    { from: "Applications", to: "automated reject", flow: a.filter(b=>b.response == "automated reject").length },
    { from: "Applications", to: "rejected", flow: a.filter(b=>b.response == "reject" && b.interviews.length == 0).length },
    { from: "Applications", to: "ghosted", flow: a.filter(b=>b.response == "ghosted").length },
    { from: "Applications", to: "follow", flow: a.filter(b=>b.response == "follow").length },
    { from: "Applications", to: "pending", flow: a.filter(b=>b.response == "not Yet").length },
  ];

  const autoRejectToRejected = { from: "automated reject", to: "rejected", flow: a.filter(b=>b.response == "automated reject").length };

  const ghostedToRejected = { from: "ghosted", to: "rejected", flow: a.filter(b=>b.response == "ghosted").length };

  const followToOffer= { from: "follow", to: "offer", flow: a.filter(b=>b.response == "follow" && b.status == "offer" && b.interviews.length == 0).length };

  const applicationsRejection = [
    autoRejectToRejected,
    ghostedToRejected,
    followToOffer
  ]


  const applicationsInterviews = new Map<string,{from:string,to:string,flow:number}>();

  if (config.value.showInterviewInGraph) {
    applications.value.forEach(a=>{
      const sortedInterviews = a.interviews.sort((x,y)=>(x.scheduledAt ?? 0) - (y.scheduledAt ?? 0));
      // We assume that if there for example 3 interviews the 2 previous where successfull
      for (const [j, interview] of sortedInterviews.entries()) {
        if (sortedInterviews[j+1] == null) {
          // const key = `${j} ${interview.response}`;
          // if (!applicationsInterviews.has(key)) applicationsInterviews.set(key,{ from: `interview ${j+1}`, to: interview.response, flow: 0});
          // applicationsInterviews.get(key)!.flow++;
          if (interview.response == "automated reject") {
            const key2 = `${j} ar`;
            if (!applicationsInterviews.has(key2)) applicationsInterviews.set(key2,{ from: `interview ${j+1}`, to: `automated reject after ${j+1} interview${j>10 ? "s" : ""}`, flow: 0});
            applicationsInterviews.get(key2)!.flow++;
          }
          else if (interview.response == "ghosted") {
            const key2 = `${j} g`;
            if (!applicationsInterviews.has(key2)) applicationsInterviews.set(key2,{ from: `interview ${j+1}`, to: `ghosted after ${j+1} interview${j>0 ? "s" : ""}`, flow: 0});
            applicationsInterviews.get(key2)!.flow++;
          }
          else if (a.status == "offer" && ["automated follow", "follow"].includes(interview.response)) {
            const key2 = `${j} o`;
            if (!applicationsInterviews.has(key2)) applicationsInterviews.set(key2,{ from: `interview ${j+1}`, to: `offer after ${j+1} interview${j>0 ? "s" : ""}`, flow: 0});
            applicationsInterviews.get(key2)!.flow++;
          }
          else {
            const key2 = `${j} o`;
            if (!applicationsInterviews.has(key2)) applicationsInterviews.set(key2,{ from: `interview ${j+1}`, to: `pending after ${j+1} interview${j>0 ? "s" : ""}`, flow: 0});
            applicationsInterviews.get(key2)!.flow++;
          }
          if (j==0) {
            const key2 = `f ${j}`;
            if (!applicationsInterviews.has(key2)) applicationsInterviews.set(key2,{ from: `follow`, to: `interview ${j+1}`, flow: 0});
            applicationsInterviews.get(key2)!.flow++;
          }
        } else {
          const key = `${j} ${j+1}`;
          if (!applicationsInterviews.has(key)) applicationsInterviews.set(key,{ from: `interview ${j+1}`, to: `interview ${j+2}`, flow: 0});
          applicationsInterviews.get(key)!.flow++;
          if (j==0) {
            const key2 = `f ${j}`;
            if (!applicationsInterviews.has(key2)) applicationsInterviews.set(key2,{ from: `follow`, to: `interview ${j+1}`, flow: 0});
            applicationsInterviews.get(key2)!.flow++;
          }
        }
      }
    });
  } else {
    applications.value.forEach(a=>{
      const sortedInterviews = a.interviews.sort((x,y)=>(x.scheduledAt ?? 0) - (y.scheduledAt ?? 0));
      // TODO: make data without interviews
    });
  }

  const data = [
    ...applicationsFirstProcess.filter(a=>a.flow > 0),

    ...Array.from(applicationsInterviews, ([k, v]) => v),

    ...applicationsRejection.filter(a=>a.flow > 0),

  ];

  // const data = [

  // ]

  console.log(data);
  


  previousChart = new Chart(canvas.value!, {
    type: "sankey",
    data: {
      datasets: [
        {
          data,
          //   priority,
          //   labels,
          colorFrom: (c) => {
            const from = c?.dataset?.data[c?.dataIndex]?.from;
            if (from == "Applications") return "#05BFDB";
            if (from == "automated reject") return "#f22";
            if (from == "ghosted") return "#654E92";
            if (from == "follow") return "#9CFF2E";
            if (from?.startsWith("interview")) return "#00FFD1";
            return "#fff";
          },
          colorTo: (c) => {
            const to = c?.dataset?.data[c?.dataIndex]?.to;
            if (to == "rejected") return "#d11";
            if (to?.startsWith("automated reject")) return "#f22";
            if (to?.startsWith("ghosted")) return "#654E92";
            if (to == "follow") return "#9CFF2E";
            if (to?.startsWith("interview")) return "#00FFD1";
            return "#fff";
          },
          borderWidth: 2,
          borderColor: 'black'
        }
      ]
    }
  });
}

watch(applications,(a,o)=>{
    drawCanvas() 
}, {deep: true});

onMounted(() => {
  drawCanvas();
});
</script>
<template>
  <canvas ref="canvas"></canvas>
</template>