<template>
  <svg
    :aria-hidden="!alt"
    viewBox="0 0 40 47"
    width="3em"
    hidden="3em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ alt }}</title>
    <g
      fill="none"
      fill-rule="evenodd"
    >
      <path
        fill="#FFF"
        d="M6 6h28v29H6z"
      />
      <g
        fill="#0AB3AF"
        fill-rule="nonzero"
      >
        <path
          d="M23.225 21.667H14V26h9.003c.533 0 1.02-.217 1.42-.563.355-.347.576-.867.576-1.517a2.558 2.558 0 00-.488-1.56c-.354-.433-.754-.693-1.286-.693zm.31-5.244c.4-.26.577-.823.577-1.56 0-.65-.177-1.126-.488-1.43-.31-.26-.71-.433-1.153-.433H14v3.9h8.294c.443 0 .887-.217 1.242-.477z"
        />
        <path
          d="M38.205 0H2.07C.921 0 0 .916 0 2.016V38.02c0 1.1.92 1.787 2.025 1.787h5.34V47l6.628-7.146h24.212c1.105 0 1.795-.687 1.795-1.833V2.061C40 .962 39.31.046 38.159.046L38.205 0zm-6.076 29.18c-.46.825-1.15 1.512-1.98 2.016-.874.55-1.84 1.054-2.945 1.283-1.105.274-2.302.503-3.545.503H7.365V7.33h18.504c.92 0 1.703.184 2.44.596.69.366 1.334.87 1.84 1.466a6.85 6.85 0 011.566 4.443c0 1.191-.323 2.337-.921 3.436a5.744 5.744 0 01-2.762 2.474c1.473.412 2.624 1.145 3.498 2.198.829 1.1 1.243 2.52 1.243 4.307 0 1.145-.23 2.107-.69 2.931h.046z"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'StoryblokIcon',
  props: {
    alt: {
      type: String,
      required: false,
      default: undefined,
    },
  },
}
</script>
