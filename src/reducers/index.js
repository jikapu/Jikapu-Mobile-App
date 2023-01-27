import { combineReducers } from 'redux';
import userReducer from '@/reducers/auth';
import {commonReducer} from '@/reducers/common/CommonReducer';
import {homeReducer} from '@/reducers/home/homeReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  common:commonReducer,
  home:homeReducer
});