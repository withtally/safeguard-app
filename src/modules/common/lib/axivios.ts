import wretch, { Wretcher } from "wretch";

// custom fetch
export const axivios = (): Wretcher => {
  const configValue = process.env.REACT_APP_TALLY_REST_API as string;
  return wretch().url(configValue);
};
