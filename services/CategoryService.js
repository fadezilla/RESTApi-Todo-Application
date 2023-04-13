class CategoryService {
    constructor(db) {
      this.client = db.sequelize;
      this.Category = db.Category;
    }
  
    async getAll() {
      return this.Category.findAll();
    }
  
    async create(name) {
      return this.Category.create({
        name: name,
      });
    }
  
    async delete(id) {
      return this.Category.destroy({
        where: {
          id: id,
        },
      });
    }
  }
  
  module.exports = CategoryService;