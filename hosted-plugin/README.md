# Hosted Plugin

This field plugin allows developers to create and deploy plugins independently of the Storyblok interface. Previously, users had to bundle their plugins, copy the bundled output, and paste it inside the Storyblok UI. To streamline this process and reduce steps, we have introduced a proxy plugin that renders an iframe and communicates seamlessly with the Storyblok interface.

> **Note:** This field plugin is provided "as is" and should be used at your own risk, as some features might be missing.

## App Description

### How to Set Up
1. Add a new field in your **Blok Library**.
2. Select **Field Type** as **Plugin**.
3. In the **Custom Type** input, choose **sb-hosted-plugin**.
4. Copy and paste the URL of your field plugin under Add options → `HOST_URL`.

## Next Steps
For detailed information on field plugins within Storyblok, check out the following articles:

- [Introduction to Field Plugins](https://www.storyblok.com/docs/plugins/field-plugins/introduction)

