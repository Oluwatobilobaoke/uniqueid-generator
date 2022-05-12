import {
  DEFAULT_SEQUENCE,
  DEFAULT_VALUE,
  Epoch,
  MACHINE_ID_MASK,
  MACHINE_ID_SHIFT,
  SEQUENCE_MASK,
  TIMESTAMP_LEFT_SHIFT,
  USIGNED_INCREASE,
} from './constants';

import type { DMCorn, YDMCornGenerateCustomIdOptions, YDMCornOptions } from './interfaces';

import { getNowBigInt } from './helpers';

export class YDMCorn {
  /**
   * DMCorn start epoch
   */
  public readonly epoch: number;

  /**
   * Internal worker ID
   */
  public readonly machineId: bigint;

  /**
   * Sequence increment for process
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private sequence: bigint = BigInt(DEFAULT_SEQUENCE);

  /**
   * Latest timestamp
   */
  private latestTimestamp: bigint = getNowBigInt();

  /**
   * Constructor
   */
  public constructor({ epoch = Epoch.UNIX, machineId = DEFAULT_VALUE }: YDMCornOptions = {}) {
    if (epoch > Number(getNowBigInt())) {
      throw new Error('Epoch must be less than current time');
    }
    this.epoch = epoch;

    this.machineId = BigInt(machineId) & MACHINE_ID_MASK;
  }

  /**
   * Generate a DMCorn
   */
  public nextId(): DMCorn {
    const timestamp = getNowBigInt();
    if (this.latestTimestamp === timestamp) {
      this.sequence = (this.sequence + USIGNED_INCREASE) & SEQUENCE_MASK;
    } else {
      this.sequence = BigInt(DEFAULT_SEQUENCE);

      this.latestTimestamp = timestamp;
    }

    return this.generateCustomId({
      timestamp: Number(timestamp),
      sequence: Number(this.sequence),
    });
  }

  /**
   * Generate a custom DMCorn
   */
  public generateCustomId({ timestamp, sequence }: YDMCornGenerateCustomIdOptions): DMCorn {
    return (
      ((BigInt(timestamp) - BigInt(this.epoch)) << TIMESTAMP_LEFT_SHIFT) |
      (BigInt(sequence) << MACHINE_ID_SHIFT) |
      this.machineId
    ).toString();
  }
}
