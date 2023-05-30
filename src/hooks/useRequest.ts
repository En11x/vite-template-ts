import { Response } from '@/service';
import { Ref, computed, ref } from 'vue';
import { delay, debounce, throttle } from 'lodash';

interface IUseRequestOptions<T = any> {
  debounce?: boolean;
  debounceInterval?: number;
  throttle?: boolean;
  throttleInterval?: number;
  polling?: boolean;
  pollingInterval?: number;
  autoRun?: boolean;
  onFinish?: (data: T) => void;
}

interface IUserRequestReturnType<D, T> {
  loading: Ref<boolean>;
  data: Ref<T | undefined>;
  error: any;
  refetch: (...args: any[]) => Promise<void>;
  refetchParams: (params: D) => Promise<void>;
}

const defaultOption: IUseRequestOptions = {
  debounce: false,
  debounceInterval: 1000,
  throttle: false,
  throttleInterval: 1000,
  polling: false,
  pollingInterval: 5000,
  autoRun: true,
  onFinish: undefined,
};

const useRequest = <ParamType = any, DataType = Response<any>>(
  request: (p: ParamType) => Promise<DataType>,
  params: ParamType,
  opt?: IUseRequestOptions<DataType>,
): IUserRequestReturnType<ParamType, DataType> => {
  const option = Object.assign({}, defaultOption, opt);
  const loading = ref(false);
  const data = ref<DataType>();

  if (option.debounce && option.throttle) {
    console.warn('only one');
  }

  const run = async (): Promise<void> => {
    loading.value = true;
    data.value = await request(params);
    loading.value = true;
    option.onFinish && option.onFinish(data.value);
  };

  const runParams = async (_params: ParamType): Promise<void> => {
    loading.value = true;
    data.value = await request(_params);
    loading.value = false;
    option.onFinish && option.onFinish(data.value);
  };

  const polling = async () => {
    loading.value = true;
    data.value = await request(params);
    loading.value = false;
    option.onFinish && option.onFinish(data.value);
    delay(polling, option.pollingInterval as number);
  };

  option.autoRun && run();

  option.polling && polling();

  const runComputed = computed(() => {
    if (option.debounce) {
      return {
        run: debounce(run, option.debounceInterval),
        runParams: debounce(runParams, option.debounceInterval),
      };
    }
    if (option.throttle) {
      return {
        run: throttle(run, option.throttleInterval),
        runParams: throttle(runParams, option.throttleInterval),
      };
    }

    return { run, runParams };
  });

  return {
    loading,
    data,
    refetch: runComputed.value.run as () => Promise<void>,
    refetchParams: runComputed.value.runParams as (
      p: ParamType,
    ) => Promise<void>,
    error: '',
  };
};

export default useRequest;
