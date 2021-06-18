import wretch, { Wretcher } from 'wretch';

// custom fetch
export const axivios = (): Wretcher => {
  return wretch().url(process.env.REACT_APP_TALLY_REST_API);
};
