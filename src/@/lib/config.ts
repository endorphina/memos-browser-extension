import { getStorageItem, setStorageItem } from './utils.ts';
import { configType } from './validators/config.ts';

const DEFAULTS: configType = {
    baseUrl: '',
    apiKey: '',
    user: '',
    defaultVisibility: { name: 'Public' },
};

const CONFIG_KEY = 'memos_config';

export async function getConfig(): Promise<configType> {
    const config = await getStorageItem(CONFIG_KEY);
    return config ? JSON.parse(config) : DEFAULTS;
}

export async function saveConfig(config: configType) {
    return await setStorageItem(CONFIG_KEY, JSON.stringify(config));
}

export async function isConfigured() {
    const config = await getConfig();
    return (
        !!config.baseUrl &&
        config.baseUrl !== '' &&
        !!config.apiKey &&
        config.apiKey !== '' &&
        !!config.user &&
        config.user !== ''
    );
}

export async function clearConfig() {
    return await setStorageItem(
        CONFIG_KEY,
        JSON.stringify({
            baseUrl: '',
            apiKey: '',
            user: '',
        })
    );
}

export interface Config {
  baseUrl: string;
  apiKey: string;
  user: string;
  defaultVisibility: { name: string };
  contentTemplate: string; // NEU: Template für Memo-Inhalt
}

// Standard-Template als Konstante
export const DEFAULT_CONTENT_TEMPLATE = '# {title}\n- [Source]({url})';

// Beim Laden der Config den Default-Wert setzen
export async function getConfig(): Promise {
  const result = await browser.storage.local.get([
    'baseUrl',
    'apiKey',
    'user',
    'defaultVisibility',
    'contentTemplate', // NEU
  ]);
  
  return {
    baseUrl: result.baseUrl || '',
    apiKey: result.apiKey || '',
    user: result.user || '',
    defaultVisibility: result.defaultVisibility || { name: 'Public' },
    contentTemplate: result.contentTemplate || DEFAULT_CONTENT_TEMPLATE, // NEU
  };
}

// Funktion zum Speichern der Config
export async function saveConfig(config: Partial): Promise {
  await browser.storage.local.set(config);
}
