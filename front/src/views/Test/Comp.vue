<template>
  <div>
    <div>
      <slot name='first'></slot>
    </div>
    <div>
      <!-- 一个不带 name 的 <slot> 出口会带有隐含的名字“default” -->
      <slot></slot>
    </div>
    <div>
      <slot name='second'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comp'
};
</script>
