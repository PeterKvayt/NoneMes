using System.Collections.Generic;

namespace Core.Interfaces
{
    public interface IRepository<Entity>
    {
        IEnumerable<Entity> GetAll();
        Entity Get(int id);
        /// <summary>
        /// Create new item in data base and return it's id.
        /// </summary>
        /// <param name="item">New item.</param>
        /// <returns>New item id.</returns>
        int Create(Entity item);
        void Update(Entity item);
        void Delete(int id);
    }
}
