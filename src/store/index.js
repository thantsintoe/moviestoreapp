import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const env = 'debug'

const debug = env !== 'production'

const state = {
    added: [],
    all: [
        {
            homeTeam: 'Manchester United',
            awayTeam: 'Spur'
        },
        {
            homeTeam: 'Arsenal',
            awayTeam: 'Liverpool'
        }
    ]
}

// getters
const getters = {
    allProducts: state => state.all, // would need action/muutation if data fetched async
    getNumberOfProducts: state => (state.all) ? state.all.length : 0,
    cartProducts: state => {
        return state.added.map(({id, quantity}) => {
            const product = state.all.find(p => p.id === id)

            return {
                name: product.name,
                price: product.price,
                quantity
            }
        })
    }
}

// actions
const actions = {
    addToCart ({commit}, product) {
        commit(types.ADD_TO_CART, {
            id: product.id
        })
    }
}

// mutations
const mutations = {
    [types.ADD_TO_CART] (state, {id}) {
        const record = state.added.find(p => p.id === id)

        if (!record) {
            state.added.push({
                id,
                quantity: 1
            })
        } else {
            record.quantity++
        }
    }
}

// one store for entire app
export default new Vuex.Store({
    state,
    strict: debug,
    debug,
    getters,
    actions,
    mutations
})
