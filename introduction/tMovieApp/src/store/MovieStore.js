import {observable, action, configure, runInAction} from "mobx";
import {API_BASE} from "../Constants";
import axios from 'axios';
import AuthStore from "./AuthStore";

configure({
    enforceActions: "observed"
});

class MovieStore {
    @observable movies = [];
    @observable loading = false;

    @action async _getMovies(){
        this.loading = true;
        try {
            const {data} = await axios.get(`${API_BASE}/api/movies`, {
                headers: {
                    'x-access-token': AuthStore.token
                }
            });

            runInAction(()=> {
                this.movies = data;
                this.loading = false;
            })
        } catch (e) {
            this.loading = false;
        }
    }
}

export default new MovieStore();