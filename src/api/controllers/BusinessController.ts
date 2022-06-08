import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { BusinessNotFoundError } from '../errors/BusinessNotFoundError';
import { Business } from '../models/Business';
import { BusinessService } from '../services/Business';

class BaseBusiness {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsString()
    public description: string;

    @IsBoolean()
    public isActive: boolean;
}

export class BusinessResponse extends BaseBusiness {
    @IsUUID()
    public id: string;
}

class CreateBusinessBody extends BaseBusiness {}

@Authorized()
@JsonController('/business')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class BusinessController {
    constructor(private businessService: BusinessService) {}

    @Get()
    @ResponseSchema(BusinessResponse, { isArray: true })
    public find(): Promise<Business[]> {
        return this.businessService.find();
    }

    @Get('/:id')
    @OnUndefined(BusinessNotFoundError)
    @ResponseSchema(BusinessResponse)
    public one(@Param('id') id: string): Promise<Business | undefined> {
        return this.businessService.findOne(id);
    }

    @Post()
    @ResponseSchema(BusinessResponse)
    public create(@Body({ required: true }) body: CreateBusinessBody): Promise<Business> {
        const business = new Business();
        business.name = body.name;
        business.description = body.description;
        business.isActive = body.isActive;

        return this.businessService.create(business);
    }

    @Put()
    @ResponseSchema(BusinessResponse)
    public update(@Param('id') id: string, @Body({ required: true }) body: BaseBusiness): Promise<Business> {
        const business = new Business();
        business.name = body.name;
        business.description = body.description;
        business.isActive = body.isActive;

        return this.businessService.update(id, business);
    }

    @Delete()
    public delete(@Param('id') id: string): Promise<void> {
        return this.businessService.delete(id);
    }
}
