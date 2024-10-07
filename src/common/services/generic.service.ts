import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class GenericService <T extends ObjectLiteral> {
    constructor(private readonly repository: Repository<T>){}

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<T> {
        const entity = this.repository.findOne({ where: { id } as any})
        if(!entity) throw new NotFoundException(`Entity with id ${id} not found`);
        return entity;
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        const updated = await this.repository.update(id, data);
        
        if(!updated) throw new NotFoundException(`Entity with id ${id} not found`);

        const entityUpdate = await this.repository.findOne({ where: { id } as any})

        if(!entityUpdate) throw new NotFoundException(`Entity with id ${id} not found`);

        return entityUpdate;
    }

    async delete(id: string): Promise<T> {
        const deleted = await this.repository.delete(id);

        if(deleted.affected === 0) throw new NotFoundException(`Entity with id ${id} not found`);

        const entityDelete = await this.repository.findOne({ where: { id } as any})

        return entityDelete;
    }
}
