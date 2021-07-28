<template>
    <div>
        please input douyu cookie first
        <n-input
            type="textarea"
            placeholder="Douyu Cookie"
        />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { NInput } from 'naive-ui'

export default {
    components: { NInput },
    setup () {
        const state = reactive({
            
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style scoped>

</style>