const CLIENT_ID = ''
const CLIENT_SECRET = ''
const REFRESH_TOKEN =  ''

const Fieldtype = {
  mixins: [window.Storyblok.plugin],
  template: `<div>
    <div class="uk-margin">
     Selected: {{ model.spotify_name }}
    </div>
    <form class="uk-form uk-margin-bottom" @submit.prevent="search">
      <div class="uk-margin">
        <input class="uk-input uk-form-width-medium" v-model="query" placeholder="Search artist" />
        <button class="uk-button uk-button-default" type="submit">Search</button>
      </div>
    </form>
    <div v-for="artist in artists" :key="artist.id" @click="setItem(artist.name, artist.id)" style="cursor:pointer;" class="uk-margin-bottom flex">
      <img v-if="artist.images[0]" :src="artist.images[0].url" style="height:56px;width:56px;"  class="uk-border-circle uk-margin-right" />
      <span>{{artist.name}}</span>
    </div>
  </div>`,
  data() {
    return {
      artists: [],
      query: '',
    }
  },
  methods: {
    initWith() {
      return {
        plugin: 'spotify-search',
        spotify_id: '',
        spotify_name: '',
      }
    },
    fetchToken() {
      return fetch('https://accounts.spotify.com/api/token', {
        body: `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}&client_secret=${CLIENT_SECRET}&client_id=${CLIENT_ID}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      }).then((response) => response.json())
    },
    search() {
      if (this.query === '') {
        this.artists = []
        return
      }

      const spotifyApi = 'https://api.spotify.com/v1/search'
      const url = `${spotifyApi}?q=${this.query}&type=artist&limit=5`

      this.fetchToken()
        .then((data) => {
          return fetch(url, {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          })
        })
        .then((response) => response.json())
        .then((data) => {
          this.artists = data.artists.items
        })
    },
    setItem(name, id) {
      this.model.spotify_name = name
      this.model.spotify_id = id
    },
  },
  watch: {
    model: {
      handler: function (value) {
        this.$emit('changed-model', value)
      },
      deep: true,
    },
  },
}
