import { put, takeEvery } from 'redux-saga/effects';
import { axios } from 'axios';

//SAGA
//generator function to POST event details to database. Will be fired on ADD_EVENT
function* addEvent(action) {
  try {
    console.log('post new event');
    const newEvent = action.payload;
    const response = yield axios.post('/api/event', newEvent);
    console.log('NEW EVENT ADDED:', response);
  } catch (error) {
    console.error('ERROR in adding new event', error);
  }
} // end addEvent

//generator function to GET persons details from database. Will be fired on FETCH_EVENTS
function* fetchEvents() {
    try {
        const events = yield axios.get('/api/event');
        console.log('GET ALL EVENTS:', events.data);
        yield put({ type: 'SET_EVENTS', payload: events.data})
    } catch (error) {
        console.error('ERROR in getting events', error)
    }
} // end fetchEvents

function* eventsSaga() {
    yield takeEvery('ADD_EVENT', addEvent);
    yield takeEvery('FETCH_EVENTS', fetchEvents);
}

export default eventsSaga;