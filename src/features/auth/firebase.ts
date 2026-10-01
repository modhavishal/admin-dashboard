import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as updateFirebaseUserProfile,
  updatePassword,
  verifyBeforeUpdateEmail,
  type User as FirebaseUser,
} from 'firebase/auth'
import type { ProfileFormValues } from './schema'
import type { User } from './types'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const isConfigured = Object.values(firebaseConfig).every((value) => value?.trim())
export const firebaseAuth = isConfigured
  ? getAuth(getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null

function requireFirebaseAuth() {
  if (!firebaseAuth) {
    throw new Error('Firebase is not configured. Add Firebase settings to .env.local.')
  }

  return firebaseAuth
}

export function toAppUser(user: FirebaseUser): User {
  return {
    name: user.displayName || user.email?.split('@')[0] || 'Admin',
    email: user.email || '',
  }
}

function authErrorMessage(error: unknown, fallback: string) {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error ? error.message : fallback
  }

  switch (error.code) {
    case 'auth/configuration-not-found':
      return 'Firebase Authentication is not configured for this project. Enable Email/Password in Firebase Console.'
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is not enabled in Firebase Authentication.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email or password is incorrect.'
    case 'auth/email-already-in-use':
      return 'An account already exists for this email. Try signing in instead.'
    case 'auth/weak-password':
      return 'Choose a stronger password with at least 6 characters.'
    case 'auth/invalid-email':
      return 'Enter a valid email address.'
    case 'auth/requires-recent-login':
      return 'For security, sign in again before changing your email address.'
    case 'auth/too-many-requests':
      return 'Too many requests. Please wait a while and try again.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    default:
      return fallback
  }
}

export async function signInAccount(email: string, password: string) {
  try {
    const credential = await signInWithEmailAndPassword(
      requireFirebaseAuth(),
      email,
      password,
    )
    return toAppUser(credential.user)
  } catch (error) {
    throw new Error(authErrorMessage(error, 'Unable to sign in. Please try again.'))
  }
}

export async function registerAccount(name: string, email: string, password: string) {
  try {
    const credential = await createUserWithEmailAndPassword(
      requireFirebaseAuth(),
      email,
      password,
    )
    await updateFirebaseUserProfile(credential.user, { displayName: name.trim() })
    return toAppUser(credential.user)
  } catch (error) {
    throw new Error(authErrorMessage(error, 'Unable to create your account. Please try again.'))
  }
}

export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(requireFirebaseAuth(), email)
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 'auth/user-not-found') {
      return
    }

    throw new Error(authErrorMessage(error, 'Unable to send a reset link right now. Please try again.'))
  }
}

export async function saveAccountProfile(profile: ProfileFormValues) {
  const auth = requireFirebaseAuth()
  const user = auth.currentUser

  if (!user) {
    throw new Error('Your session has expired. Sign in again to update your profile.')
  }

  try {
    await updateFirebaseUserProfile(user, { displayName: profile.name.trim() })

    const emailChanged = profile.email.trim().toLowerCase() !== user.email?.toLowerCase()
    if (emailChanged) {
      await verifyBeforeUpdateEmail(user, profile.email.trim())
    }

    return {
      user: toAppUser(user),
      emailChangePending: emailChanged,
    }
  } catch (error) {
    throw new Error(authErrorMessage(error, 'Unable to update your profile. Please try again.'))
  }
}

export async function changeAccountPassword(currentPassword: string, newPassword: string) {
  const auth = requireFirebaseAuth()
  const user = auth.currentUser

  if (!user?.email) {
    throw new Error('Your session has expired. Sign in again to change your password.')
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)
    await updatePassword(user, newPassword)
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password')
    ) {
      throw new Error('Your current password is incorrect.')
    }

    throw new Error(authErrorMessage(error, 'Unable to change your password. Please try again.'))
  }
}

export async function signOutAccount() {
  try {
    await signOut(requireFirebaseAuth())
  } catch (error) {
    throw new Error(authErrorMessage(error, 'Unable to sign out. Please try again.'))
  }
}

export { onAuthStateChanged }