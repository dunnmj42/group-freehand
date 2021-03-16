import axios from 'axios';
import { actionChannel, put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });

    if(action.history) {
      yield action.history.push("/dashboard")
    }

  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* sendMail(action) {
  try {
    yield axios.post('/send', action.payload)
  } catch (error) {
    console.log('Send mail error:', error)
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('SEND_MAIL', sendMail)
}

export default userSaga;
