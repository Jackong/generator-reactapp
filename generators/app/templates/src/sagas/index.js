import errorFlow from './error';
import taskFlow from './task';

export default function* sagas() {
  yield [
    errorFlow(),
    taskFlow(),
  ];
}
