using System;
using System.ComponentModel.DataAnnotations;

namespace Core.ViewModels
{
    public sealed class SendMessageViewModel
    {
        [Required]
        public string RecipientUserId { get; set; }

        [Required]
        public string Context { get; set; }

        [Required]
        public DateTime DateSent { get; set; }
    }
}
