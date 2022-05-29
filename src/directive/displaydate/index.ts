import moment from 'momnet';
import { DirectiveBinding } from 'vue';

function displayDate(elm: HTMLElement, binding: DirectiveBinding) {
  const inputEl = elm.querySelector('INPUT') as HTMLInputElement;
  if (!inputEl) {
    return;
  }
  const dateVal = moment(inputEl.value).format('YYYY-MM-DD HH:mm');
  if (dateVal === 'Invalid date') {
    inputEl.value = '';
    return;
  }
  inputEl.value = dateVal;
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    displayDate(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    displayDate(el, binding);
  },
};
