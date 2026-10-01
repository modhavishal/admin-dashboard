import { useState } from 'react'
import { KeyRound, UserRoundPen } from 'lucide-react'
import toast from 'react-hot-toast'
import PasswordChangeForm from '../components/PasswordChangeForm'
import ProfileForm from '../components/ProfileForm'
import { saveAccountProfile } from '../firebase'
import { useAuthStore } from '../store'

type ProfileTab = 'profile' | 'password'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile')
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)

  if (!user) return null

  const tabs = [
    { id: 'profile' as const, label: 'Profile details', icon: UserRoundPen },
    { id: 'password' as const, label: 'Change password', icon: KeyRound },
  ]

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <header className="border-b border-slate-200 pb-7">
        <p className="text-xs font-semibold uppercase text-blue-600">Account settings</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Profile</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your account information and security preferences.
        </p>
        <div className="mt-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">{user.name}</p>
            <p className="truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
      </header>

      <div role="tablist" aria-label="Profile settings" className="flex gap-6 border-b border-slate-200">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`${id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`${id}-panel`}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-semibold transition ${activeTab === id ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>

      <section
        id={`${activeTab}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeTab}-tab`}
        className="py-7"
      >
        {activeTab === 'profile' ? (
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-slate-900">Personal information</h2>
            <p className="mb-6 mt-1 text-sm text-slate-500">
              Fields marked <span className="font-semibold text-red-600">*</span> are required.
            </p>
            <ProfileForm
              user={user}
              onSave={async (profile) => {
                try {
                  const result = await saveAccountProfile(profile)
                  updateProfile(result.user)
                  toast.success(
                    result.emailChangePending
                      ? 'Profile updated. Check your new email to verify the address change.'
                      : 'Profile updated successfully.',
                  )
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : 'Unable to update your profile.')
                }
              }}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Change password</h2>
            <p className="mb-6 mt-1 text-sm text-slate-500">
              Fields marked <span className="font-semibold text-red-600">*</span> are required.
            </p>
            <PasswordChangeForm />
          </div>
        )}
      </section>
    </div>
  )
}