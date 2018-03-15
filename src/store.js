import movieDB from './database/movie.js'
import serieDB from './database/serie.js'
import shuffle from './assets/js/shuffle'

export default {
    modules: {
        navigator: {
            strict: true,
            namespaced: true,
            state: {
                stack: [],
                options: {}
            },
            mutations: {
                push (state, page) {
                    state.stack.push(page)
                },
                pop (state) {
                    if (state.stack.length > 1) {
                    state.stack.pop()
                    }
                },
                replace (state, page) {
                    state.stack.pop()
                    state.stack.push(page)
                },
                reset (state, page) {
                    state.stack = [page || state.stack[0]]
                },
                clear (state) {
                    state.stack = []
                },
                options (state, newOptions = {}) {
                    state.options = newOptions
                }
            }
        },

        splitter: {
            strict: true,
            namespaced: true,
            state: {
                open: false
            },
            mutations: {
                toggle (state, shouldOpen) {
                    if (typeof shouldOpen === 'boolean') {
                    state.open = shouldOpen
                    } else {
                    state.open = !state.open
                    }
                }
            }
        },

        tabbar: {
            strict: true,
            namespaced: true,
            state: {
                index: 0
            },
            mutations: {
                set (state, index) {
                    state.index = index
                }
            }
        },

        fixtures: {
            strict: true,
            namespaced: true,
            state: {
                currentGenere: ['All Movies'],
                currentMovie: [],
                movies: [],
                series: [],
                wishlist: [],
                font: 'zg'
            },
            getters: {
                getCurrentMovie: (state) => {
                    return state.currentMovie
                },
                getCurrentGenere: (state) => {
                    return state.currentGenere
                },
                getAllMovies: (state) => {
                    return state.movies
                },
                getAllSeries: (state) => {
                    return state.series
                }
            },
            actions: {
                LOAD_MOVIE_LIST: function ({ commit }) {
                    commit('SET_MOVIE_LIST', { list: movieDB })
                },
                LOAD_SERIE_LIST: function ({ commit }) {
                    commit('SET_SERIE_LIST', { list: serieDB })
                },
                LOAD_WISH_LIST: function ({ commit }, inputList) {
                    commit('SET_WISH_LIST', {list: inputList})
                },
                CLEAR_WISH_LIST: function ({ commit }) {
                    commit('CLEAR_WISH_LIST')
                },
                SAVE_CURRENT_MOVIE: function ({ commit }, clickedMatch) {
                    commit('DELETE_CURRENT_DATA')
                },
                SHUFFLE_MOVIE_LIST: function ({ commit }) {
                    commit('SHUFFLE_MOVIE_LIST')
                },
                CLEAR_CURRENT_DATA: function ({ commit }) {
                    commit('DELETE_CURRENT_DATA')
                },
                SAVE_CURRENT_GENERE: function ({ commit }, selectedGenere) {
                    commit('SET_CURRENT_GENERE', { genere: selectedGenere })
                },
                ADD_TO_WISHLIST: function ({ commit }, wishMovie) {
                    commit('ADD_TO_WISHLIST', { movie: wishMovie })
                },
                TOGGLE_FONT: function ({ commit }) {
                    commit('TOGGLE_FONT')
                }
            },
            mutations: {
                SET_MOVIE_LIST: (state, { list }) => {
                    state.movies = shuffle(list)
                },
                SET_SERIE_LIST: (state, { list }) => {
                    state.series = shuffle(list)
                },
                SET_WISH_LIST: (state, { list }) => {
                    state.wishlist = list
                },
                CLEAR_WISH_LIST: (state) => {
                    state.wishlist = []
                    localStorage.setItem('wishList', '')
                },
                SET_CURRENT_MOVIE: (state, {team, index}) => {
                    state.currentMovie.splice(index, 1)
                    state.currentMovie[index] = team
                },
                SHUFFLE_MOVIE_LIST: (state) => {
                    state.movies = shuffle(state.movies)
                },
                DELETE_CURRENT_DATA: (state) => {
                    state.currentMovie.pop()
                    state.currentMovie.pop()
                    state.currentMovie.pop()
                },
                SET_CURRENT_GENERE: (state, { genere }) => {
                    state.currentGenere.pop()
                    state.currentGenere[0] = genere
                },
                ADD_TO_WISHLIST: (state, { movie }) => {
                    if (state.wishlist !== null) {
                        state.wishlist.push(movie)
                    } else {
                        state.wishlist = [movie]
                    }

                    // localStorage.setItem('wishList', JSON.stringify(state.wishlist))
                },
                TOGGLE_FONT: (state) => {
                    if (state.font === 'zg') {
                        state.font = 'uni'
                    } else if (state.font === 'uni') {
                        state.font = 'zg'
                    }
                }
            }
        }
    }
  }

