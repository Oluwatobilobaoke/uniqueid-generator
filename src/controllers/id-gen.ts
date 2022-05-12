import { getNowBigInt } from '../utils/helpers';
import { YDMCorn } from '../utils/generator';
interface IHelperResponse {
  success: boolean;
  status: number;
  data?: string;
  error?: any;
  message?: string;
}

export const generatorController = async (start: string, machineId: number): Promise<IHelperResponse> => {
  try {
    const epoch = +new Date(start);

    if (epoch > Number(getNowBigInt())) {
      return {
        success: false,
        status: 400,
        error: 'Epoch must be less than current time',
      };
    }

    const ydmcorn = new YDMCorn({
      epoch,
      machineId,
    });

    const id = ydmcorn.nextId();

    return {
      success: true,
      status: 200,
      message: 'id generated successfully',
      data: id,
    };
  } catch (error) {
    return {
      success: false,
      status: 400,
      error: error,
    };
  }
};
