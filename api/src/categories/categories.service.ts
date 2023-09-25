import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: TreeRepository<Category>,
  ) {}

  async create(category: CreateCategoryDto, parentId?: string) {
    if (parentId) {
      // 添加子节点
      const parent = await this.repository.findOne({ where: { id: parentId } });
      category.parent = parent;
    }
    return await this.repository.save(category);
  }

  async findAll() {
    return await this.repository.findTrees();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, category: UpdateCategoryDto, parentId?: string) {
    if (parentId) {
      // 更新父节点
      const parent = await this.repository.findOne({ where: { id: parentId } });
      category.parent = parent;
    }
    return await this.repository.update(id, category);
  }

  async destroy(id: string) {
    return this.repository.delete(id);
  }
}
