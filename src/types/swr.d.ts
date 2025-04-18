import { Key } from 'swr';

declare module 'swr' {
  interface SWRResponse<Data = any, Error = any> {
    data: Data;
    error?: Error;
    mutate: KeyedMutator<Data>;
    isValidating: boolean;
    isLoading: boolean;
  }
}