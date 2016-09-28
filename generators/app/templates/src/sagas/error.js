import { takeEvery } from 'redux-saga';
import { ERROR } from '../actions';

export default function* flow() {
  yield takeEvery(ERROR.CATCH, function* ({ payload }) {
    window.handleError(payload);
  });
}
