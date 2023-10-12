# Hosted Plugin

This field plugin allows developers to create and deploy plugins independently of the Storyblok interface. Previously, users had to bundle their plugins, copy the bundled output, and paste it inside the Storyblok UI. To streamline this process and reduce steps, we have introduced a proxy plugin that renders an iframe and communicates seamlessly with the Storyblok interface.

> **Note:** This field plugin is provided "as is" and should be used at your own risk, as some features might be missing.

## App Description
A version of the hosted field plugin, has already been published and is free to use at your own risk. Follow the next section to install **sb-hosted-plugin** to your space.

### How to Set Up
1. Add the field plugin to your space by opening the [installation link](https://app.storyblok.com/#!/install/storyblok-gmbh@hosted-field-plugin) and selecting a specific space.
2. Add a new field to your **Blok Library** inside your story.
3. Select **Field Type** as **Plugin**.
4. In the **Custom Type** input, choose **sb-hosted-plugin**.
5. Copy and paste the URL of your field plugin under Add options → `HOST_URL`. (e.g. `http://localhost:8080`)

## Next Steps
For detailed information on field plugins within Storyblok, check out the following articles:

- [Introduction to Field Plugins](https://www.storyblok.com/docs/plugins/field-plugins/introduction)

