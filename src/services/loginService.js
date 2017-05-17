/**
 * Created by zkw on 2017/5/17.
 */
import { api, apiPath } from '../utils/WebAPI';

class loginService {
  login(username, password) {
    return api.post(apiPath.login, {name: username, password: password});
  }
}

export default new loginService();
