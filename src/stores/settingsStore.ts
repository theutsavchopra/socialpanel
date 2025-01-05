import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SiteSettings {
  siteName: string;
  supportEmail: string;
  smtpHost: string;
  smtpPort: number;
  youtubeApiKey: string;
  merchantId: string;
  paymentApiKey: string;
}

interface SettingsState {
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;
}

const defaultSettings: SiteSettings = {
  siteName: 'SMM Store',
  supportEmail: 'support@example.com',
  smtpHost: 'smtp.example.com',
  smtpPort: 587,
  youtubeApiKey: '',
  merchantId: '',
  paymentApiKey: ''
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      }))
    }),
    {
      name: 'site-settings'
    }
  )
);
