export default {
    namespaced: true,
    state: {
        step: 2
    },
    mutations: {
        changeStep(state, { step }) {
            state.step = step
        }
    }
}