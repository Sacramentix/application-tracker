<script setup lang="ts">
import { config } from '../composables/config';

</script>
<template>
    <details config>
        <summary>
            <h2>Config</h2>
        </summary>
        <div>
            <div>
                <label >Show comfirm dialog when deleting application</label>
                <input type="checkbox" v-model="config.comfirmToDeleteApplication">
            </div>
            <div>
                <label >Show comfirm dialog when deleting interview</label>
                <input type="checkbox" v-model="config.comfirmToDeleteInterview">
            </div>
        </div>
    </details>
</template>
<style lang="scss">
[config] {
    align-self: start;
    padding: 5px 15px;
    border-radius: 10px;
    background: #fff2;
    summary {
        padding: 5px 15px;
        cursor: pointer;
    }
    h2 {
        display: inline;
    }
    > div {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
}
</style>