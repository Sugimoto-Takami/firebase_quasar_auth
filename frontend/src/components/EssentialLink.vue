<template>
  <q-item class="q-hover" clickable tag="a" :href="link" target="_blank" @click.prevent="handleClick">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EssentialLink'
});

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  action?: () => void;
};

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: undefined,
  icon: '',
  action: undefined
});

function handleClick() {
  if (props.action) {
    props.action();
  }
}
</script>
