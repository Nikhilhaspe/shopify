import { takeLatest, put, all, call } from "redux-saga/effects";
import { signInWithEmailAndPassword } from "firebase/auth";

import UserActionTypes from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";
import { signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { SignInSuccess, SignInFailure } from "./user.actions";

// COMMON GENERATOR FUNCTION
export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSS = yield getDoc(userRef);
    yield put(SignInSuccess({ id: userSS.id, ...userSS.data() }));
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

// GOOGLE SIGN IN
export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// EMAIL SIGN IN
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
