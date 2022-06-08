import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Business } from '../models/Business';
import { BusinessRepository } from '../repositories/BusinessRepository';

@Service()
export class BusinessService {
    constructor(
        @OrmRepository() private businessRepository: BusinessRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public find(): Promise<Business[]> {
        this.log.info('Find all businesses');
        return this.businessRepository.find();
    }

    public findByBusiness(business: Business): Promise<Business[]> {
        this.log.info('Find all businesses of the business', business.toString());
        return this.businessRepository.find({
            where: {
                id: business.id,
            },
        });
    }

    public findOne(id: string): Promise<Business | undefined> {
        this.log.info('Find one businesses');
        return this.businessRepository.findOne({ id });
    }

    public async create(business: Business): Promise<Business> {
        this.log.info('Create a new business => ', business.toString());
        business.id = uuid.v1();
        const newBusiness = await this.businessRepository.save(business);
        return newBusiness;
    }

    public update(id: string, business: Business): Promise<Business> {
        this.log.info('Update a business');
        business.id = id;
        return this.businessRepository.save(business);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a business');
        await this.businessRepository.delete(id);
        return;
    }
}
