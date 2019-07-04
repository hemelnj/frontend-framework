import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import Authorization from '../mixins/authorization'

export default Route.extend(Authorization, {


});
