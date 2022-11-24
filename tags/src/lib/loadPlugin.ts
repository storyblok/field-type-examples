import Vue, {Component, ComponentOptions} from "vue";
import {makeStoryblokPluginComponent, Plugin} from "@/lib/Plugin";

declare global {
  interface Window {
    Fieldtype: Component
    Storyblok: {
      vue: typeof Vue
      plugin: ComponentOptions<Vue> | typeof Vue
    }
    storyblok: { field_types: Record<string, Component> }
    StoryblokPluginRegistered: boolean
  }
}

const removeDefaultStoryblokStyles = () => {
  document
      .getElementsByTagName("body")[0]
      .removeAttribute("class");

  document
    ?.querySelector(`link[href^="https://plugins.storyblok.com"]`)
    ?.remove();

  // Remove padding around body
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.innerText = "body { margin: 0px; }"
  document
      .getElementsByTagName('head')[0]
      .appendChild(style)
};

export const loadPlugin = (plugin:Plugin) => {
  removeDefaultStoryblokStyles()
  const StoryblokPluginComponent = makeStoryblokPluginComponent(plugin)
  if (process.env.NODE_ENV === "development") {
    window.Fieldtype = StoryblokPluginComponent
    const customComp = window.Storyblok.vue.extend(StoryblokPluginComponent)
    window.Storyblok.vue.component("custom-plugin", customComp)
    window.StoryblokPluginRegistered = true
  } else {
    window.storyblok.field_types[plugin.name] = StoryblokPluginComponent
  }
};
