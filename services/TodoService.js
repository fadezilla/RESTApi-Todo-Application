class TodoService {
    constructor(db) {
      this.client = db.sequelize;
      this.Todo = db.Todo;
    }
  
    async getOne(name) {
      return this.Todo.findOne({
        where: { name },
      });
    }
  
    async getAll() {
      return this.Todo.findAll();
    }

    async getOneById(id) {
      return this.Todo.findOne({
        where: { id },
      });
    }
    
    async update(id, name, categoryId, userId) {
      return this.Todo.update(
        { name, categoryId: categoryId, UserId: userId },
        { where: { id } }
      );
    }
  
    async create(name, categoryId, userId) {
      return this.Todo.create({
        name,
        CategoryId: categoryId,
        UserId: userId,
      });
    }
  
    async delete(id) {
      return this.Todo.destroy({
        where: { id },
      });
    }
  }
  
  module.exports = TodoService;