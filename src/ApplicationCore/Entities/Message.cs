using System;

namespace ApplicationCore.Entities
{
    public sealed class Message
    {
        public int Id { get; set; }
        public string FromUserId { get; set; }
        public DateTime DateSent { get; set; }
        public DateTime DateRead { get; set; }
        public string Context { get; set; }
    }
}
