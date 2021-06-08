import globalConfig from '@/config/global-config';

export default {
    computed: {
        globalConfig() {
            return globalConfig;
        }
    },
    methods: {
        setCurrentUserToLocalStorage(collection, id) {
            return new Promise((resolve) => {
                let ref = collection.doc(id);
                ref.onSnapshot(function(doc) {
                    if(doc.exists) {
                        let data = doc.data();
                        let user = {
                            name: data.name,
                            email: data.email,
                        }

                        if(data.is_admin) user.is_admin = true;

                        localStorage.user = JSON.stringify(user);
                        resolve(user);
                    } else {
                        resolve(false);
                    }
                })
            })
        },
        removeCurrentUser() {
            return new Promise((resolve) => {
                let user = localStorage.getItem('user');
                if(user) {
                    localStorage.removeItem('user');
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        }
    }
}