using System;
using System.ComponentModel.DataAnnotations;

namespace Core.ViewModels
{
    public sealed class MessageViewModel
    {
        public bool Owner { get; set; }
        public DateTime DateSent { get; set; }

        [Required]
        public string Context { get; set; }
    }
}
