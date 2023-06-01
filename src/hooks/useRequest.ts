import { computed, ref } from 'vue';
import { delay, debounce, throttle } from 'lodash';

type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData>;

interface Options<TData, TParams extends any[]> {
  manual?: boolean;

  defaultParams?: TParams;

  debounceInterval?: number;
  throttleInterval?: number;
  polling?: boolean;
  pollingInterval?: number;

  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
}

interface Result<TData, TParams extends any[]> {
  loading: boolean;
  data?: TData;
  error?: Error;
  refresh: Service<TData, TParams>;
}

const useRequest = <TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
): Result<TData, TParams> => {
  const {
    manual = false,
    defaultParams,
    debounceInterval,
    throttleInterval,
    polling,
    pollingInterval,
    onSuccess,
    onError,
    onFinally,
  } = options!;
  const loading = ref(false);
  const data = ref<TData>();
  const error = ref<Error>();

  if (debounceInterval && throttleInterval) {
    console.warn('only one');
  }

  const run = async (...params: TParams) => {
    loading.value = true;
    service(...params)
      .then((res) => {
        data.value = res;
        onSuccess && onSuccess(res, params);
      })
      .catch((e) => {
        error.value = e;
        onError && onError(e, params);
      })
      .finally(() => {
        loading.value = false;
        onFinally && onFinally(params, data.value);
      });
  };

  const poll = async () => {
    run(...(defaultParams as TParams));
    delay(poll, pollingInterval as number);
  };

  !manual && run(...(defaultParams as TParams));

  polling && poll();

  const runComputed = computed(() => {
    if (debounceInterval) {
      return debounce(run, debounceInterval);
    }

    if (throttleInterval) {
      return throttle(run, throttleInterval);
    }

    return run;
  });

  return {
    loading: loading.value,
    data: data.value,
    error: error.value,
    refresh: runComputed.value as Service<TData, TParams>,
  };
};

export default useRequest;
