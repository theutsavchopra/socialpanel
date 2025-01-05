export interface SiteSettings {
  siteName: string;
  supportEmail: string;
  smtpHost: string;
  smtpPort: number;
  youtubeApiKey: string;
  merchantId: string;
  paymentApiKey: string;
}

export type SettingsKey = keyof SiteSettings;
