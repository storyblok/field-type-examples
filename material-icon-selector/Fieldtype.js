const Fieldtype = {
  mixins: [window.Storyblok.plugin],
  template: 
  `<div>
  <label for="icon-style">Icon Style</label>
  <select id="icon-style" class="uk-width-1-1 uk-margin-bottom" v-model="iconClass" @change="loadStyles()">
    <option value="material-icons">Regular</option>
    <option value="material-icons-outlined">Outlined</option>
    <option value="material-icons-round">Round</option>
    <option value="material-icons-sharp">Sharp</option>
    <option value="material-icons-two-tone">Two-toned</option>
  </select>
  
  <label for="icon-search">Search icons</label>
  <input id="icon-search" class="uk-width-1-1 uk-margin-bottom" v-model="search"/>
  
  <div class="uk-margin-bottom">
    <button class="icon-link uk-button" @click="setIcon(icon)" :key="icon" v-for="icon in filteredIcons" style="margin: 5px; display: inline-flex; place-items:center;">
      <span :class="iconClass" aria-hidden="true">{{ icon }}</span>
    </button>
  </div>
  
  <div class="uk-flex uk-flex-middle uk-margin-bottom" v-if="model.icon">
    <div class="uk-flex uk-flex-middle util__grow ">
      Selected icon: <span :class="iconClass + ' uk-margin-left'" aria-hidden="true">{{ model.icon }}</span>
    </div>
    <button class="uk-button" @click="removeIcon" aria-label="Remove icon"><span aria-hidden="true">Remove</span></button>
  </div>
  
  </div>`,
  
  data() {
    var icons = [];
    
    // Fetch codepoints for material icons
    fetch('https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints')
    .then(response => response.text())
    .then(text => {
      // Create new array item from each new line
      let iconArray = text.split('\n')
      
      // Strip down each array item into just the first string, aka the name of the icon
      iconArray.forEach(function(icon, index) {
        this[index] = icon.split(' ')[0];
      }, iconArray);
      
      // Push new array data into our icons array and filter so everything is unique
      icons.push(iconArray.filter((v, i, a) => a.indexOf(v) === i))
    })
    
    return {
      icons: icons,
      search: '',
      iconClass: 'material-icons'
    }
  },
  computed: {
    filteredIcons() {
      let result;
      
      if (this.icons[0]) {
        const icons = this.icons[0]
        
        // Filter icons by search term, even if empty
        let filteredIcons = icons.filter((icon) => {
          return icon.indexOf(this.search) > -1
        })
        
        // Set result to filtered icons and limit to first 24 icons
        result = filteredIcons.slice(0,24)
      }

      return result
    },
    
    pluginCreated() {
      const head = document.getElementsByTagName('head')[0]
      let link = document.createElement('link');
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Two+Tone|Material+Icons+Sharp';
      head.appendChild(link);
    },
  },
  methods: {
    initWith() {
      return {
        plugin: 'material-icon-selector',
        icon: '',
        class: 'material-icons',
      }
    },
    setIcon(icon) {
      this.model.icon = icon
      this.model.class = this.iconClass
    },
    removeIcon() {
      this.model.icon = ''
      this.model.class = ''
    
    }
  },
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  }
}