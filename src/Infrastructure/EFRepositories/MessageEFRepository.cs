using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.EFRepositories
{
    sealed class MessageEFRepository : IRepository<Message>
    {
        private ApplicationContext _context;

        public MessageEFRepository(ApplicationContext context)
        {
            _context = context;
        }

        public int Create(Message item)
        {
            if (item == null)
            {
                throw new ArgumentNullException();
            }

            try
            {
                _context.Messages.Add(item);
                _context.SaveChanges();

                return item.Id;
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public void Delete(int id)
        {
            try
            {
                var item = Get(id);
                _context.Messages.Remove(item);
                _context.SaveChanges();
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public Message Get(int id)
        {
            try
            {
                return _context.Messages.FirstOrDefault(message => message.Id == id);
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public IEnumerable<Message> GetAll()
        {
            try
            {
                return _context.Messages.ToList();
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public void Update(Message item)
        {
            if (item == null)
            {
                throw new ArgumentNullException();
            }

            try
            {
                _context.Messages.Update(item);
            }
            catch (Exception exception)
            {
                throw;
            }
        }
    }
}
