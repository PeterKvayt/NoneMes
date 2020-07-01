using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModels
{
    public sealed class UserViewModel
    {
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        public string Patronomic { get; set; }
        public string Address { get; set; }
        public DateTime DayOfBith { get; set; }
    }
}
