using System;

namespace ApplicationCore.Entities
{
    public class Message: BaseEntity
    {
        public string FromUserId { get; set; }
        public DateTime DateSent { get; set; }
        public DateTime DateRead { get; set; }
        public string Context { get; set; }
    }
}
