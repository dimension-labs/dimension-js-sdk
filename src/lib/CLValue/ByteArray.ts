import { Ok } from 'ts-results';
import { concat } from '@ethersproject/bytes';

import {
  CLType,
  CLValue,
  ToBytesResult,
  CLValueBytesParsers,
  CLErrorCodes,
  ResultAndRemainder,
  resultHelper
} from './index';
import { BYTE_ARRAY_ID, CLTypeTag } from './constants';
import { toBytesU32 } from '../ByteConverters';

export const CL_BYTE_ARRAY_MAX_LENGTH = 32;

export class CLByteArrayType extends CLType {
  linksTo = CLByteArray;
  tag = CLTypeTag.ByteArray;

  size: number;

  constructor(size: number) {
    super();
    this.size = size;
  }

  toString(): string {
    return BYTE_ARRAY_ID;
  }

  toBytes(): Uint8Array {
    return concat([Uint8Array.from([this.tag]), toBytesU32(this.size)]);
  }

  toJSON(): { [BYTE_ARRAY_ID]: number } {
    return {
      [BYTE_ARRAY_ID]: this.size
    };
  }
}

export class CLByteArrayBytesParser extends CLValueBytesParsers {
  toBytes(value: CLByteArray): ToBytesResult {
    return Ok(value.data);
  }

  fromBytesWithRemainder(
    bytes: Uint8Array,
    type: CLByteArrayType
  ): ResultAndRemainder<CLByteArray, CLErrorCodes> {
    const byteArray = new CLByteArray(bytes.subarray(0, type.size));
    return resultHelper(Ok(byteArray), bytes.subarray(type.size));
  }
}

export class CLByteArray extends CLValue {
  data: Uint8Array;
  /**
   * Constructs a new `CLByteArray`.
   *
   * @param v The bytes array with max length 32.
   */
  constructor(v: Uint8Array) {
    super();
    this.data = v;
  }

  clType(): CLType {
    return new CLByteArrayType(this.data.length);
  }

  value(): Uint8Array {
    return this.data;
  }
}
