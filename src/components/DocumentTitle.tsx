import { useEffect } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';

interface DocumentTitleProps {
  title?: string;
}

export default function DocumentTitle({ title }: DocumentTitleProps) {
  const siteName = useSettingsStore(state => state.settings.siteName);

  useEffect(() => {
    document.title = title ? `${title} | ${siteName}` : siteName;
  }, [title, siteName]);

  return null;
}
