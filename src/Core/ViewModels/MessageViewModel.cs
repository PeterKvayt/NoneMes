using System;
using System.ComponentModel.DataAnnotations;

namespace Core.ViewModels
{
    public sealed class MessageViewModel
    {
        public int Id { get; set; }
        public string FromUserId { get; set; }
        public DateTime DateSent { get; set; }
        public DateTime DateRead { get; set; }
        [MinLength(1)]
        public string Context { get; set; }
    }
}
