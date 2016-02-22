import assign from 'lodash/object/assign';
import * as actions from './actions';
import * as stores from './stores';

export { default as createModalComponent } from './components/createModalComponent';
export { default as Dim } from './components/DimContainer';
export const flux = assign({}, actions, stores);
