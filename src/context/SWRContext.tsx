import * as React from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';

const swrConfig: SWRConfiguration = {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
};

export const SWRConfigurationProvider = ({ children }: any) => <SWRConfig value={swrConfig}>{children}</SWRConfig>;
