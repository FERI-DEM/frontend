import * as React from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';

const swrConfig: SWRConfiguration = {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    refreshInterval: 15000,
};

export const SWRConfigurationProvider = ({ children }: any) => <SWRConfig value={swrConfig}>{children}</SWRConfig>;
