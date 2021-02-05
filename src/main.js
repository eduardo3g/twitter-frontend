import Vue from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';

Amplify.configure({
  Auth: {
    region: process.env.VUE_APP_COGNITO_REGION,
    userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.VUE_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: true,
  },
});

const appConfig = {
  'aws_appsync_graphqlEndpoint': process.env.VUE_APP_APPSYNC_GRAPHQL_ENDPOINT,
  'aws_appsync_region': process.env.VUE_APP_APPSYNC_REGION,
  'aws_appsync_authenticationType': process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
};

Amplify.configure(appConfig);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
