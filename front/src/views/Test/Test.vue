<template>
  <div>
    <UploadFiles
      action="/api/upload"
      :data="{
        directory: 'avatar'
      }"
      :limit="1"
      :defaultPics="defaultPics"
      @removeCallBack="removeCallBack"
      @successCallback="successCallback"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultPics: []
    };
  },
  methods: {
    removeCallBack (file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    successCallback (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    }
  }
};
</script>

<style lang="scss" scoped></style>
