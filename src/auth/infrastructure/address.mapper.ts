import { Injectable } from '@nestjs/common';
import { IMapper } from '../../common/domain';
import { Address } from '../domain';
import { IAddress } from '../domain/interfaces';

@Injectable()
export class AddressMapper implements IMapper<Address, IAddress> {
  toPersistence(entity: Address): IAddress {
    return {
      postalCode: entity.postalCode,
      lineAddress: entity.lineAddress,
      city: entity.city,
      state: entity.state,
    };
  }

  toDomain(record: IAddress): Address {
    return new Address({
      postalCode: record.postalCode,
      lineAddress: record.lineAddress,
      city: record.city,
      state: record.state,
    });
  }
}
