import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { Chart, LinearScale } from 'chart.js';
import { SankeyController, Flow } from 'chartjs-chart-sankey';

Chart.register(LinearScale, SankeyController, Flow);
createApp(App).mount('#app')
