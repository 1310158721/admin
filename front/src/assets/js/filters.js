import Vue from 'vue';
import { $formDate } from '@/assets/js/utils';

Vue.filter('createdTimeFilters', date => {
  return $formDate(new Date(date), 'yyyy-MM-dd hh:mm:ss');
});
