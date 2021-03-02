import { requestLogin} from '@/api/login';
import { userInfo} from '@/api/user';
import { 
	setAuthInfo, removeAuthInfo
} from '@/session/index';

const store = new Vuex.Store({
	state: {
        token:'',
        userInfo:{}
	},
	mutations: {
		SET_LOGIN_INFO:(state, loginInfo) => {
			state.token = loginInfo;
		},
		get_user_info:(state,user_info)=>{
			state.userInfo=user_info;
		},
		REMOVE_LOGIN_INFO:(state) => {
			state.token = "";
		}
	},
	actions: {
		// 设置用户授权信息
		setAuthInfo:({commit}, authData) => {
			commit('SET_LOGIN_INFO', authData);
		},
		// 移除用户授权信息
		removeAuthInfo:({commit}) => {
			commit('REMOVE_LOGIN_INFO');
		},
		// 执行登录操作
		goLogin({commit}, loginForm) {
			return new Promise((resolve, reject) => {
				requestLogin(loginForm).then(res => {
					console.log(res)
					if(res.code == 200000) {
						setAuthInfo(res.data);
					}
					resolve(res);
				}).catch(error => {
					console.log(error)
					reject(error);
				});
			}).catch(error => {
				reject(error);
			});
		},
		getUserInfo({ commit }) {
			userInfo().then(res => {
				if(res.code == 200000) {
				  commit('get_user_info', res.data);
				  localStorage.setItem("yk-userInfo",JSON.stringify(res.data));
				}else {
					
				}
			}).catch(err => {
				console.log(err)
			})
		},
		// 退出
		goLogOut() {
			return new Promise((resolve, reject) => {
				requestLogout({}).then(res => {
					removeAuthInfo();
					resolve(res);
				});
				// resolve();
			}).catch(error => {
				reject(error);
			});
		}
	}
});

export default store
