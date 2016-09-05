import taskFlow from './task';

export default function* sagas() {
  yield [
    taskFlow(),
  ];
}
