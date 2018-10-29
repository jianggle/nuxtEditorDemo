import Vue from 'vue'
import {
	Loading,
    MessageBox,
    Dialog,
    Button,
} from 'element-ui';

Vue.use(Loading.directive);
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Dialog);
Vue.use(Button);
