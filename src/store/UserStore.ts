import {makeAutoObservable} from 'mobx';
import getUser from '../api/getUser';
import {User} from '../types/user';

export class UserStore {
  users: User[] = [];
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  getUserById = async (id: number) => {
    let user = this.users.find(user => user.id === id);
    if (user) return user;
    this.setLoading(true);
    user = (await getUser(id)).user;
    this.setLoading(false);
    this.addUser(user);
    return user;
  };

  setLoading = (value: boolean) => (this.isLoading = value);
  addUser = (user: User) => this.users.push(user);
}

export default new UserStore();
