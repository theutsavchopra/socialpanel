import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Key, Globe, CreditCard } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';

export default function SettingsPanel() {
  const { settings, updateSettings } = useSettingsStore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(settings);

  const handleChange = (key: keyof typeof settings, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      updateSettings(formData);
      toast({
        title: "Settings saved",
        description: "Your changes have been saved successfully.",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your application settings</p>
      </div>

      <div className="grid gap-6">
        <SettingSection
          icon={Globe}
          title="Site Settings"
          description="General website configuration"
        >
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Site Name</label>
              <Input
                value={formData.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                placeholder="My SMM Store"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Support Email</label>
              <Input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                placeholder="support@example.com"
              />
            </div>
          </div>
        </SettingSection>

        <SettingSection
          icon={Mail}
          title="Email Settings"
          description="Configure email notifications and templates"
        >
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">SMTP Host</label>
              <Input
                value={formData.smtpHost}
                onChange={(e) => handleChange('smtpHost', e.target.value)}
                placeholder="smtp.example.com"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">SMTP Port</label>
              <Input
                type="number"
                value={formData.smtpPort}
                onChange={(e) => handleChange('smtpPort', parseInt(e.target.value))}
                placeholder="587"
              />
            </div>
          </div>
        </SettingSection>

        <SettingSection
          icon={Key}
          title="API Keys"
          description="Manage API keys and access tokens"
        >
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">YouTube API Key</label>
              <Input
                type="password"
                value={formData.youtubeApiKey}
                onChange={(e) => handleChange('youtubeApiKey', e.target.value)}
                placeholder="Enter API key"
              />
            </div>
          </div>
        </SettingSection>

        <SettingSection
          icon={CreditCard}
          title="Payment Settings"
          description="Configure payment providers and options"
        >
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Merchant ID</label>
              <Input
                value={formData.merchantId}
                onChange={(e) => handleChange('merchantId', e.target.value)}
                placeholder="Enter merchant ID"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Payment API Key</label>
              <Input
                type="password"
                value={formData.paymentApiKey}
                onChange={(e) => handleChange('paymentApiKey', e.target.value)}
                placeholder="Enter API key"
              />
            </div>
          </div>
        </SettingSection>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-red-500 hover:bg-red-600"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}

interface SettingSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingSection({ icon: Icon, title, description, children }: SettingSectionProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-50">
            <Icon className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );
}
