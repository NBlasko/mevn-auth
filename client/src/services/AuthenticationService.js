import Api from '@/services/Api';

export default {
    register (credentials){
        return Api().post('register', credentials);
    }
}

//AuthenticationService.register({
    //email: bla
    //password: 123123
//})