<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "AppComponent",
  props: {
    text: String
  }
}
</script>
